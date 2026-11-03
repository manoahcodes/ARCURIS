/**
 * Money is stored and calculated as integer ngwee (1 kwacha = 100 ngwee).
 * Never use floats for amounts. Only format at the edge, for display.
 */
export const kwachaToNgwee = (kwacha: number) => Math.round(kwacha * 100);

export function formatKwacha(ngwee: number): string {
  const kwacha = ngwee / 100;
  const hasCents = ngwee % 100 !== 0;
  return `K ${kwacha.toLocaleString("en-US", {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  })}`;
}
