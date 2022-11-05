/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { Navbar } from "./Navbar";

import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter, NavLink } from "react-router-dom";

import renderer from "react-test-renderer";

afterEach(cleanup);
it("matched snapshot", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders without crashing", () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
});

it("end to path functions", () => {
  render(
    <BrowserRouter>
      <NavLink end to="/home">
        Home
      </NavLink>
    </BrowserRouter>
  );
  fireEvent.click(screen.getByText("Home"));
  expect(window.location.pathname).toBe("/home");
});
