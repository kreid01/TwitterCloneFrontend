import React from "react";
import { SignoutButton } from "../SignoutButton";

import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

afterEach(cleanup);
it("renders without crashing", async () => {
  render(
    <BrowserRouter>
      <SignoutButton />
    </BrowserRouter>
  );
});
