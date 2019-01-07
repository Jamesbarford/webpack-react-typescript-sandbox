import * as React from "react";
import { shallow } from "enzyme";
import { MyAmazingButton } from "./index";

it("Should change from red to blue when mouse enters", () => {
  const button = shallow(<MyAmazingButton />);
  const btnColor = "btnColor"
  const buttonState = button.state(btnColor);

  expect(buttonState).toEqual("red");
  button.find("button").simulate("mouseEnter");
  expect(button.state(btnColor)).toEqual("blue");
});