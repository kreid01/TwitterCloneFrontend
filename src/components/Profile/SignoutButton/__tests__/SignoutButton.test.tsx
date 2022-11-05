import React from "react";
import { SignoutButton } from "../SignoutButton";

import { render, cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

import { useGetUser } from "context/UserContext";

afterEach(cleanup);
it("renders without crashing", async () => {
  render(
    <BrowserRouter>
      <SignoutButton />
    </BrowserRouter>
  );
});
