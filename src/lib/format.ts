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
  if (!input) return 0;
  const cleaned = input.replace(/[^\d,.-]/g, "");
  if (!cleaned) return 0;
  const lastComma = cleaned.lastIndexOf(",");
  const lastDot = cleaned.lastIndexOf(".");
  const decimalSep = lastComma > lastDot ? "," : lastDot > -1 ? "." : null;
  let normalized: string;
  if (decimalSep) {
    const idx = decimalSep === "," ? lastComma : lastDot;
    const intPart = cleaned.slice(0, idx).replace(/[.,]/g, "");
    const decPart = cleaned.slice(idx + 1).replace(/[.,]/g, "");
    normalized = `${intPart}.${decPart}`;
  } else {
    normalized = cleaned;
  }
  const value = Number.parseFloat(normalized);
  if (Number.isNaN(value)) return 0;
  return Math.round(value * 100);
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
