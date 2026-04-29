import { StarIcon } from "@phosphor-icons/react/dist/ssr";

export function Stars({ rating, size = 20 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} de 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon
          key={n}
          size={size}
          weight={n <= rating ? "fill" : "duotone"}
          className={
            n <= rating
              ? "text-[#F5A524]"
              : "text-[var(--color-fg-quaternary)]"
          }
        />
      ))}
    </span>
  );
}
