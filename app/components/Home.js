import React, { Component } from 'react';
import styles from './Home.css';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      income: [],
      expense: [],
      percent: 0
    };

    this.addValue = this.addValue.bind(this);
  }
  render() {
    const sum = (a, b) => a + b;
    const income = this.state.income;
    const expense = this.state.expense;
    const percent = this.state.percent;
    const total = (income.reduce(sum, 0) - expense.reduce(sum, 0)) * percent / 100;

    return (
      <div>
        <div className={styles.container}>
          <div className={styles.addValue}>
            <select ref="valueType">
              <option value="income">Income</option>
              <option value="expense">Expense</option>
              <option value="percent">percent</option>
            </select>
            <input type="number" min="0" ref="value" />
          </div>
          <button type="button" onClick={this.addValue}>Add</button>
        </div>

        <div>Income</div>
        <Values values={this.state.income} />

        <div>Expense</div>
        <Values values={this.state.expense} />

        <div>Percent: {percent}</div>
        <hr />

        <div>Total: {total}</div>
      </div>
    );
  }
  addValue() {
    const valueType = this.refs.valueType.value;
console.log(valueType);
    // It would be a good idea to validate the value here!
    const value = parseInt(this.refs.value.value, 10);
    console.log(value);
    if (valueType === "percent") {
      this.setState({
        [valueType]: value
      });
    } else {
      this.setState({
        [valueType]: this.state[valueType].concat(value)
      });
    }
    this.refs.value.value = 0;
  }
}

const Values = ({values}) => {
  return (
    <ul>
      {values.map((value, i) =>
        <li key={`value-${i}`}>{value}</li>
      )}
    </ul>
  );
}
