import { WifiSlashIcon } from "@phosphor-icons/react/dist/ssr";

export const metadata = { title: "Sem conexão · ZP Barber" };

export default function OfflinePage() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-[var(--color-bg-secondary)] text-[var(--color-fg-secondary)]">
        <WifiSlashIcon size={40} weight="duotone" />
      </div>
      <h1 className="text-display-sm font-semibold text-[var(--color-text-primary)]">
        Sem conexão
      </h1>
      <p className="max-w-sm text-text-md text-[var(--color-text-tertiary)]">
        Não foi possível carregar essa tela. Verifique sua internet e tente novamente.
      </p>
    </div>
  );
}
