import React, { Component } from 'react';
import "./App.css";
import Button from './components/buttons/Button';
import Input from './components/input/Input';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      input: "0"
    };
  }

  add = (value) => {
    let expr = String(this.state.input);

    console.log(this.state.input);
    if (expr.search(/[Error|NaN|Infinity]/g) !== -1) {
      console.log('true')
      this.state.input = "0";
    } else {
      console.log('not true')
    }

    switch (value) {
      case 'C': {
        this.setState({ input: "0" });
        break;
      }
      case '%': {
        let expr = this.state.input;
        let percentage = "";
        debugger;
        for (let i = expr.length - 1; i >= 0; i--) {
          let flag = /[-+÷×]/.test(expr[i])
          if (flag) {
            console.log(expr[i]);
            break;
          } else {
            percentage += expr[i];
            expr = expr.slice(0, -1);
          }
        }
        percentage = percentage.split("").reverse().join("");
        console.log(`Expr = ${expr}`);
        console.log(`Percent = ${percentage}`);
        try {
          let lastOperation = expr.slice(-1);
          expr = expr.slice(0, -1);
          let percentageAnswer;
          let finalExpr;
          switch (lastOperation) {
            case '÷':
            case '×': {
              percentageAnswer = percentage / 100;
              finalExpr = expr + lastOperation + percentageAnswer;
              break;
            }
            case '+':
            case '-': {
              percentageAnswer = Number(eval(expr)) / 100 * percentage;
              finalExpr = expr + lastOperation + percentageAnswer;
              break;
            }
            default : {
              break;
            }
          }
          this.setState({ input: eval(finalExpr.replace("÷", "/").replace("×", "*")) });
        } catch (ex) {
          this.setState({ input: ex.name });
        }
        break;
      }
      case '=': {
        try {
          let answer = String(eval(this.state.input.replace("÷", "/").replace("×", "*")));
          this.setState({ input: answer });
        } catch (ex) {
          this.setState({ input: ex.name });
        }
        break;
      }
      default: {
        let lastChar = Array.from(this.state.input);
        lastChar = lastChar.slice(-1);

        if (this.state.input === "0" && !/[-+÷×]/.test(value)) {
          this.state.input = '';
        }

        if ((/[-+÷×]/.test(lastChar) && /[-+÷×]/.test(value)) || (/[.]/.test(lastChar) && /[.]/.test(value))) {
          this.setState({ input: this.state.input.slice(0, -1) + value });
        } else {
          this.setState({ input: this.state.input + value });
        }
        break;
      }
    }
  }

  render() {
    return (
      <div className="app">
        <div className="calc">
          <div className="row">
            <Input input={this.state.input} />
          </div>
          <div className="bg-digits">
            <div className="row">
              <Button handlerClick={this.add} value="C" />
              <Button handlerClick={this.add} value="+/-" />
              <Button handlerClick={this.add} value="%" />
              <Button handlerClick={this.add} value="&divide;" />
            </div>
            <div className="row">
              <Button handlerClick={this.add} value="7" />
              <Button handlerClick={this.add} value="8" />
              <Button handlerClick={this.add} value="9" />
              <Button handlerClick={this.add} value="&times;" />
            </div>
            <div className="row">
              <Button handlerClick={this.add} value="4" />
              <Button handlerClick={this.add} value="5" />
              <Button handlerClick={this.add} value="6" />
              <Button handlerClick={this.add} value="-" />
            </div>
            <div className="row">
              <Button handlerClick={this.add} value="1" />
              <Button handlerClick={this.add} value="2" />
              <Button handlerClick={this.add} value="3" />
              <Button handlerClick={this.add} value="+" />
            </div>
            <div className="row">
              <Button handlerClick={this.add} value="0" />
              <Button handlerClick={this.add} value="." />
              <Button handlerClick={this.add} value="=" />
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default App;