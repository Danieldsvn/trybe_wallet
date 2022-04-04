import React from 'react';
import { connect } from 'react-redux';
import { setLogin } from '../redux/actions';

export class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  handleInput = ({ target }) => {
    const { id, value } = target;
    this.setState({ [id]: value });
  };

  handleButton = () => {
    const { dispatchSetValue, history } = this.props;
    dispatchSetValue(this.state);
    history.push('/carteira');
  }

  validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/; return re.test(email);
  };

  isDisabled = () => {
    const { email, password } = this.state;
    let validEmail = false;
    let validPassword = false;
    const minLength = 6;
    const passwordLength = password.length;
    if (passwordLength >= minLength) validPassword = true;
    if (this.validateEmail(email)) validEmail = true;
    if (validEmail && validPassword) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <div>
        <label htmlFor="email">
          Email:
          <input
            id="email"
            data-testid="email-input"
            type="text"
            onChange={ this.handleInput }
          />

        </label>
        <label htmlFor="password">
          Senha:
          <input
            id="password"
            data-testid="password-input"
            type="text"
            onChange={ this.handleInput }
          />
        </label>
        <button type="submit" onClick={ this.handleButton } disabled={ this.isDisabled() }>Entrar</button>
      </div>
    );
  }
}

// propTypes
const mapDispatchToProps = (dispatch) => ({
  dispatchSetValue: (form) => dispatch(setLogin(form)),
});

export default connect(null, mapDispatchToProps)(Login);
