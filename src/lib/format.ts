import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { ptBR } from "date-fns/locale";

export const TIMEZONE = "America/Sao_Paulo";

export function formatMoney(cents: number | null | undefined): string {
  const value = (cents ?? 0) / 100;
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function parseMoneyToCents(input: string): number {
  const digits = input.replace(/\D/g, "");
  return digits ? Number.parseInt(digits, 10) : 0;
}

export function formatDateBR(value: string | Date, pattern = "dd/MM/yyyy") {
  return formatInTimeZone(value, TIMEZONE, pattern, { locale: ptBR });
}

export function formatDateTimeBR(value: string | Date) {
  return formatInTimeZone(value, TIMEZONE, "dd/MM/yyyy HH:mm", { locale: ptBR });
}

export function formatTimeBR(value: string | Date) {
  return formatInTimeZone(value, TIMEZONE, "HH:mm", { locale: ptBR });
}

export function formatRelativeBR(value: string | Date) {
  return format(new Date(value), "PPP", { locale: ptBR });
}
