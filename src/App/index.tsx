/**
 * Entry point to `App`, presently mounts `MyAmazingButton` component
 */
import * as React from "react";
import { render } from "react-dom";
import { MyAmazingButton } from "../components/Button";

const App: React.FC = () => (
  <div>
    hello world
    <MyAmazingButton />
  </div>
);

render(<App />, document.getElementById("root"));
