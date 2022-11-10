import React from "react";
import { ProfilePostFilters } from "../ProfilePostFilters";

import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

const mockFn = jest.fn();

afterEach(cleanup);
it("renders without crashing", async () => {
  render(
    <BrowserRouter>
      <ProfilePostFilters handleChange={mockFn} />
    </BrowserRouter>
  );
});
