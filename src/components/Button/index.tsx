/**
 * Example button component that changes from `red` to `blue` on mouse enter
 * then back to `red` on mouse leave.
 */

import * as React from "react";
import "./style.scss";

interface MyAmazingButtonState {
  btnColor: string;
}

export class MyAmazingButton extends React.Component<{}, MyAmazingButtonState> {
  state: MyAmazingButtonState = {
    btnColor: "red"
  };

  toggleButtonColor = () => {
    this.setState(({ btnColor }) => ({
      btnColor: btnColor === "blue" ? "red" : "blue"
    }));
  };

  render() {
    return (
      <button
        className="example"
        onMouseEnter={this.toggleButtonColor}
        onMouseLeave={this.toggleButtonColor}
        style={{ backgroundColor: this.state.btnColor }}
      >
        button
      </button>
    );
  }
}
