import getCurrenciesAPI from '../services/currenciesAPI';

// Coloque suas actions aqui
export const SET_LOGIN = 'SET_LOGIN';
export const CURRENCIES_REQUEST = 'CURRENCIES_REQUEST';
export const ACTION_FETCH_CURRENCIES = 'ACTION_FETCH_CURRENCIES';
export const SET_EXPENSE_FORM = 'SET_EXPENSE_FORM';

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

const fetchCurrencies = async (dispatch) => {
  const currenciesResponse = await getCurrenciesAPI();
  dispatch(currenciesRequest(currenciesResponse));
};

export const actionFetchCurrencies = () => fetchCurrencies;

export const setExpenseForm = (payload) => ({
  type: SET_EXPENSE_FORM,
  payload,
});
