function vibrate(pattern: number | number[]) {
  if (typeof window === "undefined") return;
  const nav = window.navigator;
  if (typeof nav.vibrate !== "function") return;
  try {
    nav.vibrate(pattern);
  } catch {
    // Alguns browsers requerem gesture do usuário; falha silenciosa
  }
}

export const haptics = {
  tap: () => vibrate(8),
  success: () => vibrate([12, 60, 12]),
  warn: () => vibrate([20, 40, 20, 40, 20]),
  error: () => vibrate([60, 40, 60]),
};
