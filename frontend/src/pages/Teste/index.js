import React, { useState } from "react";

// import { Container } from './styles';
import AsyncSelect from "react-select/async";

const options = [
  { id: "react", title: "ReactJS" },
  { id: "node", title: "NodeJS" },
  { id: "rn", title: "React Native", name: "hey" }
];

const filterColors = inputValue => {
  console.log(inputValue);
  console.log(
    options.filter(i =>
      i.title.toLowerCase().includes(inputValue.toLowerCase())
    )
  );
  return options.filter(i =>
    i.title.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const loadOptions = (inputValue, callback) => {
  setTimeout(() => {
    callback(filterColors(inputValue));
  }, 1000);
};

class Teste extends React.Component {
  state = { inputValue: "" };

  handleInputChange = newValue => {
    const inputValue = newValue.replace(/\W/g, "");
    this.setState({ inputValue });
    return inputValue;
  };

  render() {
    return (
      <div>
        <AsyncSelect
          id="input-select"
          cacheOptions
          defaultOptions
          loadOptions={loadOptions}
          onInputChange={this.handleInputChange}
        />
      </div>
    );
  }
}

export default Teste;
