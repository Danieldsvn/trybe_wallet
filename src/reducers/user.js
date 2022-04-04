// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SET_LOGIN } from '../redux/actions';

const INITIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_LOGIN:
    return { ...state, email: action.payload };
  default:
    return state;
  }
}

export default user;
