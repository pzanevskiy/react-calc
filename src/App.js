import React, { Component } from 'react';
import "./App.css";
import Button from './components/buttons/Button';
import Input from './components/input/Input';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      input: ""
    };
  }

  solve = (value) => {
    switch (value) {
      case 'C': {
        this.setState({ input: "" });
        break;
      }
      case '%': {
        try {
          this.setState({ input: this.state.input / 100 });
        } catch (ex) {
          this.setState({ input: ex.name });
        }
        break;
      }
      case '=': {
        try {
          this.setState({ input: eval(this.state.input) });
        } catch (ex) {
          this.setState({ input: ex.name });
        }
        break;
      }
      default: {
        let patternSign = /[-+/*]/;
        let lastChar = Array.from(this.state.input);
        lastChar = lastChar.slice(-1);

        if (patternSign.test(lastChar) && patternSign.test(value)) {
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
              <Button handlerClick={this.solve} value="C" content="C" />
              <Button handlerClick={this.solve} value="+/-" content="+/-" />
              <Button handlerClick={this.solve} value="%" content="%" />
              <Button handlerClick={this.solve} value="/" content="/" />
            </div>
            <div className="row">
              <Button handlerClick={this.solve} value="7" content="7" />
              <Button handlerClick={this.solve} value="8" content="8" />
              <Button handlerClick={this.solve} value="9" content="9" />
              <Button handlerClick={this.solve} value="*" content="*" />
            </div>
            <div className="row">
              <Button handlerClick={this.solve} value="4" content="4" />
              <Button handlerClick={this.solve} value="5" content="5" />
              <Button handlerClick={this.solve} value="6" content="6" />
              <Button handlerClick={this.solve} value="-" content="-" />
            </div>
            <div className="row">
              <Button handlerClick={this.solve} value="1" content="1" />
              <Button handlerClick={this.solve} value="2" content="2" />
              <Button handlerClick={this.solve} value="3" content="3" />
              <Button handlerClick={this.solve} value="+" content="+" />
            </div>
            <div className="row">
              <Button handlerClick={this.solve} value="0" content="0" />
              <Button handlerClick={this.solve} value="." content="." />
              <Button handlerClick={this.solve} value="=" content="=" />
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default App;