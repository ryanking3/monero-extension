document.getElementById("convert").addEventListener("click", async () => {
  const amount = parseFloat(document.getElementById("amount").value);
  const currency = document.getElementById("currency").value;
  const resultEl = document.getElementById("result");

  if (isNaN(amount) || amount <= 0) {
    resultEl.textContent = "Please enter a valid amount.";
    return;
  }

  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=monero&vs_currencies=${currency}`
    );
    const data = await res.json();

    if (!data.monero || !data.monero[currency]) {
      resultEl.textContent = "Error fetching price.";
      return;
    }

    const price = data.monero[currency];
    const xmrAmount = amount / price;

    resultEl.textContent = `${amount} ${currency.toUpperCase()} = ${xmrAmount.toFixed(6)} XMR`;
  } catch (err) {
    console.error(err);
    resultEl.textContent = "Failed to fetch data.";
  }
});

