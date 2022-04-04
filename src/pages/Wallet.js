import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      expense: 0,
    };
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

export default connect(mapStateToProps, null)(Wallet);
