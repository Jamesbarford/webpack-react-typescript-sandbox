import * as React from "react";

interface MyAmazingButtonState {
  btnColor: string;
  color: string;
}

export class MyAmazingButton extends React.Component<{}, MyAmazingButtonState> {

  state = {
    btnColor: "red",
    color: "white"
  }

  handleOnMouseEnter = () => this.setState({ btnColor: "blue" });

  handleOnMouseLeave = () => this.setState({ btnColor: "red" });

  render() {
    return (
      <button
        onMouseEnter={this.handleOnMouseEnter}
        onMouseLeave={this.handleOnMouseLeave}
        onClick={this.handleOnMouseEnter}
        style={{ backgroundColor: this.state.btnColor }}
      >
        My button
      </button>
    )
  }
}