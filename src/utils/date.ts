// src/utils/date.ts
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es-ES', { dateStyle: 'long' }).format(date);
}