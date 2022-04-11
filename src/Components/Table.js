import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Table extends React.Component {
  handleChange = ({ target }) => {
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
  }

  getCurrencyName = (expense) => {
    const names = (expense.exchangeRates[expense.currency].name).split('/');
    return names[0];
  }

  getExchangeRate = (expense) => {
    const strToNumber = parseFloat(expense.exchangeRates[expense.currency].ask);
    const twoPositions = strToNumber.toFixed(2);
    return twoPositions;
  }

  getConvertedValue = (expense) => {
    const value = (expense.value) * (expense.exchangeRates[expense.currency].ask);
    const convertedValue = value.toFixed(2);
    return convertedValue;
  }

  getExpenseValue = (expense) => {
    const expenseValue = expense.value;
    const expenseValueNumber = parseFloat(expenseValue);
    return expenseValueNumber.toFixed(2);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{ expense.description }</td>
              <td>{ expense.tag }</td>
              <td>{ expense.method }</td>
              <td>{ this.getExpenseValue(expense) }</td>
              <td>{ this.getCurrencyName(expense) }</td>
              <td>{ this.getExchangeRate(expense) }</td>
              <td>{ this.getConvertedValue(expense) }</td>
              <td>Real</td>
              <td> </td>
            </tr>
          ))}
        </tbody>

      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(Table);
