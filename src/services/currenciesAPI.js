const getCurrenciesAPI = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currenciesResponse = await response.json();
  return currenciesResponse;
};

export default getCurrenciesAPI;
