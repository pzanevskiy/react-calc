import React, { Component } from 'react';
import "./App.css";
import Button from './components/buttons/Button';
import Input from './components/input/Input';
import HistoryButton from './components/buttons/HistoryButton'
import 'react-responsive-modal/styles.css';
import Modal from 'react-responsive-modal';
import StoryItem from './components/StoryItem'
import axios from 'axios'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      input: "0",
      history: [],
      open: false
    };

  }
  onOpenModal = () => {
    this.getHistory()
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
  addToHistory = (expression, answer) => {
    axios.post('/new', { expression: expression, answer: answer }).then(response => console.log(response.data));
  }

  getHistory = () => {
    axios.get("/getHistory").then(response => {
      console.log(response)
      let history = response['data']
      console.log(history)
      // history.map(item=>console.log(`${item['expression']} = ${item['answer']}`))
      this.setState({ history })
    })
  }

  solve = (value) => {
    let expr = String(this.state.input);
    console.log(expr);

    if (expr.search(/[Error|NaN|Infinity]/g) !== -1) {
      this.state.input = "0";
    }

    switch (value) {
      case 'C': {
        this.setState({ input: "0" });
        break;
      }

      case '%': {
        let expr = String(this.state.input);
        let percentage = "";

        for (let i = expr.length - 1; i >= 0; i--) {
          let flag = /[-+÷×\s]/.test(expr[i])
          if (flag) {
            break;
          } else {
            percentage += expr[i];
            expr = expr.slice(0, -1);
          }
        }
        percentage = percentage.split("").reverse().join("");
        try {

          if (expr === '') {
            this.state.input = this.state.input + `/100`;
            this.setState({ input: eval(this.state.input) });
          } else {
            let lastOperation = expr.slice(-1);
            expr = expr.slice(0, -1);
            let percentageAnswer;
            switch (lastOperation) {
              case '÷':
              case '×': {
                percentageAnswer = percentage / 100;
                break;
              }
              case '+':
              case '-': {
                let finalExpr = `${expr.replaceAll("÷", "/").replaceAll("×", "*")}/100*${percentage}`;
                percentageAnswer = String(eval(finalExpr));
                break;
              }
              default: {
                break;
              }
            }
            this.setState({ input: expr + lastOperation + percentageAnswer });
          }
        } catch (ex) {
          this.setState({ input: ex.name });
        }
        break;
      }

      case '+/-': {
        if (/[-+÷×]/.test(this.state.input.slice(-1))) {
          break;
        } else {
          this.setState({ input: this.state.input + `×(-1)` })
        }
        break;
      }

      case '=': {
        try {
          let answer = String(eval(this.state.input.replaceAll("÷", "/").replaceAll("×", "*")));
          this.addToHistory(this.state.input, answer)
          this.setState({ input: answer });
        } catch (ex) {
          this.setState({ input: ex.name });
        }
        break;
      }

      case '.': {
        let expr = this.state.input;
        let number = "";
        for (let i = expr.length - 1; i >= 0; i--) {
          if (/[-+÷×\s]/.test(expr[i])) {
            break;
          } else {
            number += expr[i];
            expr = expr.slice(0, -1);
          }
        }
        if (/[.)]/.test(number) && /[.]/.test(value)) {
          break;
        } else {
          if (/[-+÷×]/.test(this.state.input.slice(-1))) {
            this.setState({ input: this.state.input + "0" + value });
          } else {
            this.setState({ input: this.state.input + value });
          }
        }
        break;
      }

      case '0': {
        if (this.state.input === "0") {
          break;
        }
        if ((this.state.input.slice(-1) === "0" && /[-+÷×\s]/.test(this.state.input[this.state.input.length - 2])) || this.state.input.slice(-1) === ")") {
          break;
        } else {
          this.setState({ input: this.state.input + value });
        }
        break;
      }

      default: {
        let lastChar = Array.from(this.state.input);
        lastChar = lastChar.slice(-1);
        if (this.state.input === "0") {
          this.state.input = "";
        }
        if (/[0]/.test(lastChar) && !/[-+÷×]/.test(value) && /[-+÷×]/.test(this.state.input[this.state.input.length - 2])) {
          console.log(`last 0 and input not 0`);
          this.setState({ input: this.state.input.slice(0, -1) + value });
          console.log(this.state.input);
          break;
        }
        if ((/[-+÷×]/.test(lastChar) && /[-+÷×]/.test(value))) {
          this.setState({ input: this.state.input.slice(0, -1) + value });
        } else {
          if (/[)]/.test(lastChar) && !/[-+÷×]/.test(value)) {
            break;
          }
          this.setState({ input: this.state.input + value });
        }
        break;
      }
    }
  }

  render() {
    const { open } = this.state;
    return (
      <div className="app">
        <div className="calc">
          <div className="row">
            <Input input={this.state.input} />
          </div>
          <div className="bg-digits">
            <div className="row">
              <Button handlerClick={this.solve} value="C" />
              <Button handlerClick={this.solve} value="+/-" />
              <Button handlerClick={this.solve} value="%" />
              <Button handlerClick={this.solve} value="&divide;" />
            </div>
            <div className="row">
              <Button handlerClick={this.solve} value="7" />
              <Button handlerClick={this.solve} value="8" />
              <Button handlerClick={this.solve} value="9" />
              <Button handlerClick={this.solve} value="&times;" />
            </div>
            <div className="row">
              <Button handlerClick={this.solve} value="4" />
              <Button handlerClick={this.solve} value="5" />
              <Button handlerClick={this.solve} value="6" />
              <Button handlerClick={this.solve} value="-" />
            </div>
            <div className="row">
              <Button handlerClick={this.solve} value="1" />
              <Button handlerClick={this.solve} value="2" />
              <Button handlerClick={this.solve} value="3" />
              <Button handlerClick={this.solve} value="+" />
            </div>
            <div className="row">
              <Button handlerClick={this.solve} value="0" />
              <Button handlerClick={this.solve} value="." />
              <Button handlerClick={this.solve} value="=" />
            </div>
            <div className="row">
              <HistoryButton onClick={this.onOpenModal} value="History" />
              <Modal open={open} onClose={this.onCloseModal} little>
                {this.state.history.length !== 0 ? this.state.history.map((item,index) => {
                  return (
                    <StoryItem key={index} expression={item['expression']} answer={item['answer']} />
                  )
                }) : <div>Empty history</div>}
              </Modal>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default App;