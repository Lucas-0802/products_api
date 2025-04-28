export const formatPrice = (value: string): string => {
  const numericValue = parseFloat(value.replace(/[^\d]/g, "") || "0") / 100;

  if (isNaN(numericValue)) {
    return "R$ 0,00";
  }

  return numericValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const parsePriceToNumber = (value: string): number => {
  const cleanedValue = value.replace(/[^\d,.-]/g, "").replace(",", ".");

  return parseFloat(cleanedValue) || 0;
};
