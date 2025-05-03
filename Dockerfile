# Multi-stage build for an Astro application with SSR (Server-Side Rendering)

# Stage 1: Build the Astro application
FROM node:22.15.0-alpine AS builder

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set the working directory
WORKDIR /app

# Copy package.json and the lock file
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of the application source code
COPY . .

# Build the application
RUN pnpm build

# Stage 2: Create a lightweight production image
FROM node:22.15.0-alpine AS runner

# Set the working directory
WORKDIR /app

# Create a non-root user to run the application
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 astro \
    && chown -R astro:nodejs /app

# Copy only the necessary files from the builder stage
COPY --from=builder --chown=astro:nodejs /app/package.json ./package.json
COPY --from=builder --chown=astro:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=astro:nodejs /app/dist ./dist

# Switch to the non-root user
USER astro

# Expose the port the app runs on
EXPOSE 4321

# Set the production environment
ENV NODE_ENV=production

# Command to run the application
CMD ["node", "dist/server/entry.mjs"]