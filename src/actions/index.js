import getCurrenciesAPI from '../services/currenciesAPI';

// Coloque suas actions aqui
export const SET_LOGIN = 'SET_LOGIN';
export const CURRENCIES_REQUEST = 'CURRENCIES_REQUEST';
export const ACTION_FETCH_CURRENCIES = 'ACTION_FETCH_CURRENCIES';
export const SET_EXPENSE_FORM = 'SET_EXPENSE_FORM';
export const ACTION_FETCH_EXCHANGES_RATES = 'ACTION_FETCH_EXCHANGES_RATES';

export const setLogin = (payload) => ({
  type: SET_LOGIN, payload,
});

const currenciesRequest = (payload) => ({
  type: CURRENCIES_REQUEST,
  payload,
});

// const currenciesRequestSuccess = (payload) => ({
//   type: CURRENCIES_REQUEST_SUCCESS,
//   payload,
// });

const fetchCurrenciesAbb = async (dispatch) => {
  const currenciesResponse = await getCurrenciesAPI();
  delete currenciesResponse.USDT;
  const currenciesAbbreviation = Object.keys(currenciesResponse);
  dispatch(currenciesRequest(currenciesAbbreviation));
};

// const fetchExchangesRates = async (dispatch) => {
//   const currenciesResponse = await getCurrenciesAPI();
//   delete currenciesResponse.USDT;
//   dispatch(currenciesRequest(currenciesResponse));
// };

export const actionFetchCurrenciesAbb = () => fetchCurrenciesAbb;

// export const actionfetchExchangesRates = () => fetchExchangesRates;

export const setExpenseForm = (payload) => ({
  type: SET_EXPENSE_FORM,
  payload,
});
