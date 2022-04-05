import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionFetchCurrencies } from '../actions';

export class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      expense: 0,
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
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
  getCurrencies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email });

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(actionFetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
