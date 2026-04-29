import Image from "next/image";

export function BrandMark({ subtitle }: { subtitle?: string }) {
  return (
    <div className="flex flex-col items-start gap-1">
      <Image
        src="/logo.png"
        alt="ZP Barber"
        width={400}
        height={400}
        priority
        className="h-auto w-[180px] object-contain"
      />
      {subtitle && (
        <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
          {subtitle}
        </span>
      )}
    </div>
  );
}
