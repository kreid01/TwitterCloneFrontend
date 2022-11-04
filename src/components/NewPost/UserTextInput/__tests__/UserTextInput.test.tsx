import React from "react";
import { UserTextInput } from "../UserTextInput";

import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

const handleChangeMockfn = jest.fn();

afterEach(cleanup);
it("renders without crashing", () => {
  render(
    <UserTextInput
      name="test"
      value="test"
      placeholder="test"
      handleChange={handleChangeMockfn}
    />
  );
});

it("text are handleChange functions", () => {
  render(
    <UserTextInput
      name="test"
      value="test"
      placeholder="Whats Happening?"
      handleChange={handleChangeMockfn}
    />
  );
  fireEvent.change(screen.getByPlaceholderText("Whats Happening?"), {
    target: { value: "a" },
  });
  expect(handleChangeMockfn).toHaveBeenCalled();
});
