export const formatPrice = (
  price: number,
  currencyId: string = "BRL"
): string => {
  const currencySymbols: Record<string, string> = {
    BRL: "R$",
    USD: "$",
    ARS: "$",
  };

  const symbol = currencySymbols[currencyId] || currencyId;

  return `${symbol} ${price.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const formatCondition = (condition: string): string => {
  const conditions: Record<string, string> = {
    new: "Novo",
    used: "Usado",
  };

  return conditions[condition] || condition;
};
