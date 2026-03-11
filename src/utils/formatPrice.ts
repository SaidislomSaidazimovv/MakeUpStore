const EXCHANGE_RATE = 12600;

export function formatPrice(
  price: number | string | null | undefined,
  currency: string,
  noPrice: string = "No price",
  currencyLabel: string = "sum"
): string {
  if (price === null || price === undefined) return noPrice;
  const numeric = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(numeric) || numeric === 0) return noPrice;

  if (currency === "UZS") {
    return (numeric * EXCHANGE_RATE).toLocaleString("uz-UZ") + " " + currencyLabel;
  }
  return "$" + numeric.toFixed(2);
}
