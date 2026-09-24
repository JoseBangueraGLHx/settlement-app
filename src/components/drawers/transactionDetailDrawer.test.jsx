import React from "react";
import { render, screen } from "@testing-library/react";
import TransactionDetailDrawer from "./transactionDetailDrawer";
import { mockTransactionDetailData } from "../../mockData";

test("renders the settlement detail sections from the design mock", () => {
  render(<TransactionDetailDrawer visible item={mockTransactionDetailData} onClose={jest.fn()} />);

  expect(screen.getByText("Account ID Overview")).toBeInTheDocument();
  expect(screen.getByText("Main Settlement Info")).toBeInTheDocument();
  expect(screen.getByText("Financial Breakdown")).toBeInTheDocument();
  expect(screen.getByText("Concentration Items")).toBeInTheDocument();
  expect(screen.getByText("Tax Items & Nested Data")).toBeInTheDocument();
});
