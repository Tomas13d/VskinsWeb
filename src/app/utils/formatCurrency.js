export const formatCurrency = (amount, options) =>
    new Intl.NumberFormat("es-AR", {
      ...options,
      style: "currency",
      currency: "ARS",
    }).format(amount);