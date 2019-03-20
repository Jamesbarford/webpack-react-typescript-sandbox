/**
 * Example button component that changes from `red` to `blue` on mouse enter
 * then back to `red` on mouse leave.
 */

import * as React from "react";

interface MyAmazingButtonState {
  btnColor: string;
  color: string;
}

export class MyAmazingButton extends React.Component<{}, MyAmazingButtonState> {

  state: MyAmazingButtonState = {
    btnColor: "red",
    color: "white"
  }

  handleOnMouseEnter = () => this.setState({ btnColor: "blue" });

  handleOnMouseLeave = () => this.setState({ btnColor: "red" });

  render() {
    return (
      <button
        className="example"
        onMouseEnter={this.handleOnMouseEnter}
        onMouseLeave={this.handleOnMouseLeave}
        style={{ backgroundColor: this.state.btnColor }}
      >
        My button
      </button>
    )
  }
}