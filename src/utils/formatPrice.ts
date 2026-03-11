const EXCHANGE_RATE = 12600;

export function formatPrice(price: number | string | null | undefined, currency: string): string {
  if (price === null || price === undefined) return "Narx yo'q";
  const numeric = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(numeric) || numeric === 0) return "Narx yo'q";

  if (currency === "UZS") {
    return (numeric * EXCHANGE_RATE).toLocaleString("uz-UZ") + " сум";
  }
  return "$" + numeric.toFixed(2);
}
