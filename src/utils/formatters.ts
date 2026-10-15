/**
 * Formatea un importe numérico con coma como separador de miles (ej. 23,550).
 */
export const formatPrice = (price: number): string => {
  if (isNaN(price) || price === null || price === undefined) return '0';
  return Math.round(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Formatea moneda con símbolo de pesos (ej. $23,550 MXN).
 */
export const formatCurrency = (price: number, showCurrencyCode: boolean = true): string => {
  const formatted = formatPrice(price);
  return showCurrencyCode ? `$${formatted} MXN` : `$${formatted}`;
};
