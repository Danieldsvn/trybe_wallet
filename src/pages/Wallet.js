import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getCurrencies from '../services/currenciesAPI';

export class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      expense: 0,
    };
  }

  async componentDidMount() {
    await getCurrencies();
  }

  render() {
    const { expense } = this.state;
    const { userEmail } = this.props;
    return (
      <>
        <header>
          <p data-testid="email-field">{`Email: ${userEmail} `}</p>
          <p data-testid="total-field">{`Despesa total: ${expense}`}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <section />
      </>
    );
  }
}

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email });

const mapDispatchToProps = (dispatch) => ({
  dispatchSetValue: (form) => dispatch(setLogin(form)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
