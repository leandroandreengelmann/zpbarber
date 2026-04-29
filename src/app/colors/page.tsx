"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Palette = {
  name: string;
  label: string;
  // Either a CSS-var token name (resolves --color-<token>-<step>) or a hex array.
  token?: string;
  scale?: Record<number, string>;
};

const STEPS = [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

const PALETTES: Palette[] = [
  { name: "brand", label: "Brand (atual)", token: "brand" },
  {
    name: "black",
    label: "Black / Neutral escuro",
    scale: {
      25: "#fafafa",
      50: "#f5f5f5",
      100: "#e9eaeb",
      200: "#d5d7da",
      300: "#a4a7ae",
      400: "#717680",
      500: "#414651",
      600: "#181d27",
      700: "#0a0d12",
      800: "#070910",
      900: "#04060b",
      950: "#000000",
    },
  },
  { name: "gray-light-mode", label: "Gray (light mode)", token: "gray-light-mode" },
  { name: "gray-dark-mode", label: "Gray (dark mode)", token: "gray-dark-mode" },
  { name: "violet", label: "Violet", token: "violet" },
  { name: "purple", label: "Purple", token: "purple" },
  { name: "indigo", label: "Indigo", token: "indigo" },
  { name: "blue", label: "Blue", token: "blue" },
  { name: "cyan", label: "Cyan", token: "cyan" },
  { name: "teal", label: "Teal", token: "teal" },
  { name: "green", label: "Green", token: "green" },
  { name: "success", label: "Success", token: "success" },
  { name: "yellow", label: "Yellow", token: "yellow" },
  { name: "warning", label: "Warning", token: "warning" },
  { name: "orange", label: "Orange", token: "orange" },
  { name: "error", label: "Error / Red", token: "error" },
  { name: "pink", label: "Pink", token: "pink" },
  { name: "fuchsia", label: "Fuchsia", token: "fuchsia" },
];

const swatch = (p: Palette, step: number): string =>
  p.scale ? p.scale[step] : `var(--color-${p.token}-${step})`;

export default function ColorsPage() {
  const [primary, setPrimary] = useState<string>("brand");
  const active = PALETTES.find((p) => p.name === primary)!;
  const primary600 = swatch(active, 600);
  const primary500 = swatch(active, 500);
  const primary50 = swatch(active, 50);
  const primary700 = swatch(active, 700);

  return (
    <main
      className="min-h-screen w-full px-4 py-6 sm:px-6 sm:py-10 md:px-12"
      style={{
        background: "var(--color-bg-primary)",
        color: "var(--color-text-primary)",
      }}
    >
      <div className="mx-auto max-w-[1280px] space-y-10">
        <header className="space-y-2">
          <h1
            className="font-semibold tracking-tight"
            style={{
              fontSize: "var(--font-size-display-md)",
              lineHeight: "var(--line-height-display-md)",
            }}
          >
            Escolha a cor primária
          </h1>
          <p style={{ color: "var(--color-text-tertiary)" }}>
            Clique em qualquer paleta para previewar como cor primária. O tom 600 é usado como
            <code className="mx-1">--primary</code>.
          </p>
        </header>

        <section
          className="rounded-2xl border p-6 md:p-8"
          style={{
            borderColor: "var(--color-border-primary)",
            background: "var(--color-bg-secondary)",
          }}
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <div
                style={{
                  color: "var(--color-text-tertiary)",
                  fontSize: "var(--font-size-text-sm)",
                }}
              >
                Preview — paleta selecionada
              </div>
              <div className="flex items-center gap-4">
                <div
                  className="h-16 w-16 rounded-xl shadow-sm ring-1 ring-black/5"
                  style={{ background: primary600 }}
                />
                <div>
                  <div
                    className="font-semibold capitalize"
                    style={{
                      fontSize: "var(--font-size-display-xs)",
                      lineHeight: "var(--line-height-display-xs)",
                    }}
                  >
                    {active.label}
                  </div>
                  <div
                    style={{
                      color: "var(--color-text-tertiary)",
                      fontSize: "var(--font-size-text-sm)",
                    }}
                  >
                    {active.scale
                      ? `(custom) 600 = ${active.scale[600]}`
                      : `--color-${active.token}-600`}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                className="rounded-lg px-4 py-2.5 font-semibold text-white transition hover:opacity-90"
                style={{ background: primary600, fontSize: "var(--font-size-text-sm)" }}
              >
                Botão primário
              </button>
              <button
                className="rounded-lg border px-4 py-2.5 font-semibold transition hover:bg-black/5"
                style={{
                  borderColor: primary600,
                  color: primary600,
                  fontSize: "var(--font-size-text-sm)",
                }}
              >
                Outline
              </button>
              <span
                className="rounded-full px-3 py-1 font-medium"
                style={{
                  background: primary50,
                  color: primary700,
                  fontSize: "var(--font-size-text-xs)",
                }}
              >
                Badge
              </span>
              <a
                className="font-semibold underline-offset-4 hover:underline"
                style={{ color: primary500, fontSize: "var(--font-size-text-sm)" }}
              >
                Link
              </a>
            </div>
          </div>

          <div
            className="mt-6 rounded-lg p-4"
            style={{ background: "var(--color-bg-primary)" }}
          >
            <code className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
              {active.scale
                ? `--primary: ${active.scale[600]}; /* custom black scale */`
                : `--primary: var(--color-${active.token}-600);`}
            </code>
          </div>
        </section>

        <section className="space-y-6">
          <h2
            className="font-semibold"
            style={{
              fontSize: "var(--font-size-display-xs)",
              lineHeight: "var(--line-height-display-xs)",
            }}
          >
            Paletas disponíveis
          </h2>

          <div className="grid gap-4">
            {PALETTES.map((p) => {
              const isActive = primary === p.name;
              const ringColor = swatch(p, 600);
              return (
                <button
                  key={p.name}
                  onClick={() => setPrimary(p.name)}
                  className={cn(
                    "group flex flex-col gap-3 rounded-xl border p-4 text-left transition",
                    "hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  )}
                  style={{
                    borderColor: isActive ? ringColor : "var(--color-border-primary)",
                    background: "var(--color-bg-secondary)",
                    boxShadow: isActive ? `0 0 0 2px ${ringColor} inset` : undefined,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-8 w-8 rounded-md ring-1 ring-black/5"
                        style={{ background: swatch(p, 600) }}
                      />
                      <div>
                        <div className="font-semibold">{p.label}</div>
                        <div
                          style={{
                            color: "var(--color-text-tertiary)",
                            fontSize: "var(--font-size-text-xs)",
                          }}
                        >
                          {p.scale ? `custom (${p.scale[950]} → ${p.scale[25]})` : `--color-${p.token}-*`}
                        </div>
                      </div>
                    </div>
                    {isActive && (
                      <span
                        className="rounded-full px-2 py-0.5 font-semibold text-white"
                        style={{
                          background: ringColor,
                          fontSize: "var(--font-size-text-xs)",
                        }}
                      >
                        Selecionada
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-12">
                    {STEPS.map((step) => (
                      <div key={step} className="flex flex-col items-center gap-1">
                        <div
                          className="h-10 w-full rounded-md ring-1 ring-black/5"
                          style={{ background: swatch(p, step) }}
                          title={`${p.name}-${step}`}
                        />
                        <div
                          style={{
                            color: "var(--color-text-tertiary)",
                            fontSize: "10px",
                          }}
                        >
                          {step}
                        </div>
                      </div>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <footer
          className="rounded-xl border p-4 text-sm"
          style={{
            borderColor: "var(--color-border-secondary)",
            color: "var(--color-text-tertiary)",
          }}
        >
          Quando decidir, me diga o nome da paleta (ex.: <code>black</code>, <code>indigo</code>) e
          eu troco o mapeamento de <code>--primary</code> em <code>globals.css</code>.
        </footer>
      </div>
    </main>
  );
}
