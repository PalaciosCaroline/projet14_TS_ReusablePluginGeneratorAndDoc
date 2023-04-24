export {};

// import React from "react";
// import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import {  MemoryRouter, Route, Routes  } from "react-router-dom";
// import "@testing-library/jest-dom/extend-expect";
// import App from "./App";
// import Home from "./pages/home/Home";
// import NewEmployee from "./pages/NewEmployee";
// import ListEmployees from "./pages/ListEmployees";

// jest.mock("./pages/home/Home", () => () => <div data-testid="home">Home</div>);
// jest.mock("./pages/NewEmployee", () => () => <div data-testid="new-employee">New Employee</div>);
// jest.mock("./pages/ListEmployees", () => () => <div data-testid="list-employees">List Employees</div>);
// jest.mock("./pages/Spinner", () => () => <div data-testid="spinner">Loading...</div>);

// describe("App", () => {
//   it("renders the Home component as the default route", async () => {
//     render(
//       <MemoryRouter initialEntries={["/"]}>
//         <App />
//       </MemoryRouter>
//     );

//     expect(screen.getByTestId("home")).toBeInTheDocument();
//   });
// });
