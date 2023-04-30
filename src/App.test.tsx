import React from "react";
import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {  MemoryRouter, Route, Routes  } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import store from "./store/index";
import App from "./App";

jest.setTimeout(10000);

describe("App", () => {
  it("renders the Home component as the default route", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId("home")).toBeInTheDocument();
  });

  it("renders the NewEmployee component when navigating to /newemployee", async () => {
    render(
        <Provider store={store}>
            <MemoryRouter initialEntries={["/newemployee"]}>
                <App />
            </MemoryRouter>
        </Provider>
    );

    await waitForElementToBeRemoved(() => screen.getByTestId("progressbar"), { timeout: 22000 });
    expect(screen.getByTestId("newEmployee")).toBeInTheDocument();
  });

  it("renders the ListEmployees component when navigating to /listemployees", async () => {
    render(
        <Provider store={store}>
            <MemoryRouter initialEntries={["/listemployees"]}>
                <App />
            </MemoryRouter>
        </Provider>
    );

    await waitForElementToBeRemoved(() => screen.getByTestId("progressbar"), { timeout: 10000 });
    expect(screen.getByTestId("listEmployees")).toBeInTheDocument();
  });
});

