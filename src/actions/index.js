// Coloque aqui suas actions
export const SET_LOGIN = 'SET_LOGIN';

export const setLogin = (payload) => ({ type: SET_LOGIN, payload });

export const CURRENCIES_REQUEST = 'CURRENCIES_REQUEST';

const currenciesRequest = () => ({
  type: CURRENCIES_REQUEST,
});
