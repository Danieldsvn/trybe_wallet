const getCurrencies = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currenciesResponse = await response.json();
  delete currenciesResponse.USDT;
  const currenciesAbbreviation = Object.keys(currenciesResponse);
  return console.log(currenciesAbbreviation);
}

export default getCurrencies;
