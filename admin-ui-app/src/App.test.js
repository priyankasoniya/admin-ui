import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import App from "./App";

const originalError = console.error;

beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

test("test the app for initial states", async () => {
  const { debug, getByText } = render(<App />);
  debug();
  expect(getByText("@ 2022 Admin UI")).toBeInTheDocument();
  expect(getByText("Users")).toBeInTheDocument();
});

const mockResponse = [
  {
    id: "1",
    name: "Aaron Miles",
    email: "aaron@mailinator.com",
    role: "member",
  },
  {
    id: "2",
    name: "Aishwarya Naik",
    email: "aishwarya@mailinator.com",
    role: "member",
  },
  {
    id: "3",
    name: "Arvind Kumar",
    email: "arvind@mailinator.com",
    role: "admin",
  },
  {
    id: "4",
    name: "Caterina Binotto",
    email: "caterina@mailinator.com",
    role: "member",
  },
  {
    id: "5",
    name: "Chetan Kumar",
    email: "chetan@mailinator.com",
    role: "member",
  },
  {
    id: "6",
    name: "Jim McClain",
    email: "jim@mailinator.com",
    role: "member",
  },
];

test("test app for the mocked users data", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockResponse),
    })
  );
  const { debug, getByText } = render(<App />);
  window.alert = () => {};
  await waitFor(() => expect(getByText("search")).toBeInTheDocument());
  debug();
  fireEvent.change(screen.getByText("search"), {
    e: { target: { value: "Chetan" } },
  });
});
