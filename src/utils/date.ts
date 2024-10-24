// src/utils/date.ts
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("es-la", { dateStyle: "long" }).format(date);
}
