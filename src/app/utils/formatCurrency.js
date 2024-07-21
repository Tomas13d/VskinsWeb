export const formatCurrency = (amount, options) =>
    new Intl.NumberFormat("es-AR", {
      ...options,
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);