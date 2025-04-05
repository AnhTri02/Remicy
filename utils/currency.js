export const fetchExchangeRates = async (base = 'USD') => {
  try {
    const res = await fetch(`https://v6.exchangerate-api.com/v6/9e13da419adab6539177249e/latest/${base}`);
    const data = await res.json();

    if (data.result === "success") {
      return data.conversion_rates;
    } else {
      throw new Error("Failed to fetch exchange rates");
    }
  } catch (err) {
    console.error("Currency API Error:", err);
    return null;
  }
};
