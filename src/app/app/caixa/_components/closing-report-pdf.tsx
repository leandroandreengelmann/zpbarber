"use client";

import { DownloadSimpleIcon } from "@phosphor-icons/react";
import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  pdf,
} from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/format";
import type { ClosingSummary } from "../actions";

const styles = StyleSheet.create({
  page: { padding: 32, fontSize: 10, color: "#0f1729", fontFamily: "Helvetica" },
  h1: { fontSize: 16, fontWeight: 700, marginBottom: 4 },
  h2: { fontSize: 12, fontWeight: 700, marginTop: 14, marginBottom: 6 },
  muted: { color: "#5e6675", fontSize: 9 },
  rule: { borderBottomWidth: 1, borderBottomColor: "#d6dae3", marginVertical: 6 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
  },
  label: { color: "#5e6675" },
  value: { color: "#0f1729" },
  strong: { fontWeight: 700 },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#0f1729",
    paddingBottom: 4,
    marginTop: 4,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#e5e7eb",
    paddingVertical: 4,
  },
  cellTime: { width: 40 },
  cellClient: { flex: 1 },
  cellBarber: { width: 90 },
  cellMethods: { width: 90 },
  cellTotal: { width: 60, textAlign: "right" },
  movReason: { width: 70 },
  movDesc: { flex: 1 },
  movAuthor: { width: 90 },
  movAmount: { width: 60, textAlign: "right" },
  notes: {
    marginTop: 6,
    padding: 6,
    backgroundColor: "#f5f6f8",
    borderRadius: 3,
  },
});

function formatBR(date: string) {
  return new Date(date).toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatTimeOnly(date: string) {
  return new Date(date).toLocaleTimeString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function ClosingPdf({
  summary,
  detailed,
}: {
  summary: ClosingSummary;
  detailed: boolean;
}) {
  const diff = summary.session.difference_cents;
  const diffLabel =
    diff === 0
      ? "Sem diferença"
      : diff > 0
        ? `Sobra de ${formatMoney(diff)}`
        : `Falta de ${formatMoney(Math.abs(diff))}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.h1}>{summary.shop.name}</Text>
        <Text style={styles.muted}>
          Fechamento de caixa · {formatBR(summary.session.closed_at)}
        </Text>

        <Text style={styles.h2}>Sessão</Text>
        <Line label="Aberto em" value={formatBR(summary.session.opened_at)} />
        <Line label="Aberto por" value={summary.session.opened_by} />
        <Line label="Fechado em" value={formatBR(summary.session.closed_at)} />
        <Line label="Fechado por" value={summary.session.closed_by} />
        <Line
          label="Troco inicial"
          value={formatMoney(summary.session.opening_amount_cents)}
        />

        <Text style={styles.h2}>Faturamento</Text>
        <Line
          label="Total recebido"
          value={formatMoney(summary.totals.paid)}
          strong
        />
        <Line
          label="Dinheiro"
          value={formatMoney(summary.totals.by_method.cash ?? 0)}
        />
        <Line
          label="PIX"
          value={formatMoney(summary.totals.by_method.pix ?? 0)}
        />
        <Line
          label="Débito"
          value={formatMoney(summary.totals.by_method.debit ?? 0)}
        />
        <Line
          label="Crédito"
          value={formatMoney(summary.totals.by_method.credit ?? 0)}
        />
        <Line
          label="Voucher"
          value={formatMoney(summary.totals.by_method.voucher ?? 0)}
        />
        <Line
          label="Outros"
          value={formatMoney(summary.totals.by_method.other ?? 0)}
        />

        <Text style={styles.h2}>Caixa</Text>
        <Line
          label="Suprimentos"
          value={formatMoney(summary.totals.movements_in)}
        />
        <Line
          label="Sangrias"
          value={formatMoney(summary.totals.movements_out)}
        />
        <Line
          label="Esperado em dinheiro"
          value={formatMoney(summary.totals.expected_cash)}
        />
        <Line
          label="Contado"
          value={formatMoney(summary.session.closing_amount_cents)}
          strong
        />
        <Line label="Diferença" value={diffLabel} strong />

        {summary.session.notes && (
          <View style={styles.notes}>
            <Text style={styles.muted}>Observações</Text>
            <Text>{summary.session.notes}</Text>
          </View>
        )}

        {detailed && (
          <>
            <Text style={styles.h2}>Vendas ({summary.sales.length})</Text>
            <View style={styles.tableHeader}>
              <Text style={styles.cellTime}>Hora</Text>
              <Text style={styles.cellClient}>Cliente</Text>
              <Text style={styles.cellBarber}>Barbeiro</Text>
              <Text style={styles.cellMethods}>Pagamentos</Text>
              <Text style={styles.cellTotal}>Total</Text>
            </View>
            {summary.sales.map((s) => (
              <View key={s.id} style={styles.tableRow} wrap={false}>
                <Text style={styles.cellTime}>{formatTimeOnly(s.created_at)}</Text>
                <Text style={styles.cellClient}>{s.client_name}</Text>
                <Text style={styles.cellBarber}>{s.barber_name}</Text>
                <Text style={styles.cellMethods}>{s.methods || "—"}</Text>
                <Text style={styles.cellTotal}>
                  {formatMoney(s.total_cents)}
                </Text>
              </View>
            ))}

            <Text style={styles.h2}>Movimentos ({summary.movements.length})</Text>
            <View style={styles.tableHeader}>
              <Text style={styles.cellTime}>Hora</Text>
              <Text style={styles.movReason}>Motivo</Text>
              <Text style={styles.movDesc}>Descrição</Text>
              <Text style={styles.movAuthor}>Autor</Text>
              <Text style={styles.movAmount}>Valor</Text>
            </View>
            {summary.movements.map((m) => (
              <View key={m.id} style={styles.tableRow} wrap={false}>
                <Text style={styles.cellTime}>{formatTimeOnly(m.created_at)}</Text>
                <Text style={styles.movReason}>{m.reason}</Text>
                <Text style={styles.movDesc}>{m.description || "—"}</Text>
                <Text style={styles.movAuthor}>{m.created_by}</Text>
                <Text style={styles.movAmount}>
                  {m.type === "in" ? "+" : "−"} {formatMoney(m.amount_cents)}
                </Text>
              </View>
            ))}
          </>
        )}
      </Page>
    </Document>
  );
}

function Line({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, strong ? styles.strong : {}]}>{value}</Text>
    </View>
  );
}

export default function PdfDownloadButton({
  summary,
  mode,
}: {
  summary: ClosingSummary;
  mode: "simple" | "detailed";
}) {
  async function handleDownload() {
    const blob = await pdf(
      <ClosingPdf summary={summary} detailed={mode === "detailed"} />
    ).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const date = new Date(summary.session.closed_at)
      .toISOString()
      .slice(0, 10);
    a.download = `fechamento-caixa-${date}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }
  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleDownload}
      className="h-11"
    >
      <DownloadSimpleIcon size={28} weight="duotone" />
      Baixar PDF
    </Button>
  );
}
