import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionFetchCurrenciesAbb, setExpenseForm } from '../actions';
import getCurrenciesAPI from '../services/currenciesAPI';
import Table from '../Components/Table';

export class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      expenseTotal: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: 0,
      exchangeRates: [],
    };
  }

  componentDidMount() {
    const { getCurrenciesAbb } = this.props;
    getCurrenciesAbb();
  }

  handleChange = ({ target }) => {
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
  }

  handleAddExpenseButton = async () => {
    const { getExpenseForm } = this.props;
    const currenciesResponse = await getCurrenciesAPI();
    delete currenciesResponse.USDT;
    this.setState({
      exchangeRates: currenciesResponse,

    });
    const { value, description, currency, method,
      tag, id, exchangeRates } = this.state;
    const currencyRate = parseFloat(exchangeRates[currency].ask);
    const valueNumber = parseFloat(value);

    const expenseValue = (valueNumber * currencyRate);
    getExpenseForm({
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    });
    this.setState((prevState) => ({
      expenseTotal: prevState.expenseTotal + expenseValue,
      id: prevState.id + 1,
      value: '',
    }));
  }

  render() {
    const { expenseTotal, value, tag, method } = this.state;
    const { userEmail, currencies } = this.props;
    return (
      <>
        <header>
          <p data-testid="email-field">{`Email: ${userEmail} `}</p>
          <p data-testid="total-field">{ expenseTotal.toFixed(2) }</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <section>
          <label htmlFor="value">
            Valor:
            <input
              id="value"
              data-testid="value-input"
              type="number"
              value={ value }
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
          <label htmlFor="method">
            Método de pagamento:
            <select
              id="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            <select
              id="tag"
              data-testid="tag-input"
              value={ tag }
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
        <Table />
      </>
    );
  }
}

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  getCurrenciesAbb: PropTypes.func.isRequired,
  getExpenseForm: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  currencies: state.wallet.currencies,
  // expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrenciesAbb: () => dispatch(actionFetchCurrenciesAbb()),
  getExpenseForm: (form) => dispatch(setExpenseForm(form)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
