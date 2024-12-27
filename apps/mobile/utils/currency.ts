export function formatCurrency(
  amount: number | string,
  currency: string = "INR"
) {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (typeof amount === "string") return formatter.format(parseFloat(amount));

  return formatter.format(amount);
}
