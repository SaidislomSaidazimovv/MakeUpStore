const EXCHANGE_RATE = 12600;

export function formatPrice(price: number | string, currency: string): string {
  const numeric = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(numeric)) return "—";

  if (currency === "UZS") {
    return (numeric * EXCHANGE_RATE).toLocaleString() + " UZS";
  }
  return "$" + numeric.toFixed(2);
}
