import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionFetchCurrencies, setExpenseForm } from '../actions';

export class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      expenseTotal: 0,
      value: 0,
      description: '',
      currency: 'USD',
      payment: '',
      category: '',
      id: 0,
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange = ({ target }) => {
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
  }

  handleAddExpenseButton = () => {
    const { getExpenseForm } = this.props;
    getExpenseForm(this.state);
    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));
  }

  render() {
    const { expenseTotal } = this.state;
    const { userEmail, currencies } = this.props;
    return (
      <>
        <header>
          <p data-testid="email-field">{`Email: ${userEmail} `}</p>
          <p data-testid="total-field">{`Despesa total: ${expenseTotal}`}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <section>
          <label htmlFor="value">
            Valor:
            <input
              id="value"
              data-testid="value-input"
              type="number"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Despesa:
            <input
              id="description"
              data-testid="description-input"
              type="text"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda
            <select
              id="currency"
              onChange={ this.handleChange }
            >
              { currencies.map((currency) => (
                <option key={ currency }>{currency}</option>
              ))}
            </select>
          </label>
          <label htmlFor="payment">
            Método de pagamento:
            <select
              id="payment"
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="category">
            Categoria:
            <select
              id="category"
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button
            type="submit"
            onClick={ this.handleAddExpenseButton }
          >
            Adicionar despesa
          </button>
        </section>
      </>
    );
  }
}

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  getCurrencies: PropTypes.func.isRequired,
  getExpenseForm: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(actionFetchCurrencies()),
  getExpenseForm: (form) => dispatch(setExpenseForm(form)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
