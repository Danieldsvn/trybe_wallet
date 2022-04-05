import getCurrenciesAPI from '../services/currenciesAPI';

// Coloque aqui suas actions
export const SET_LOGIN = 'SET_LOGIN';

export const CURRENCIES_REQUEST = 'CURRENCIES_REQUEST';

// export const CURRENCIES_REQUEST_SUCCESS = 'CURRENCIES_REQUEST_SUCCESS';

export const ACTION_FETCH_CURRENCIES = 'ACTION_FETCH_CURRENCIES';

export const setLogin = (payload) => ({ type: SET_LOGIN, payload });

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
