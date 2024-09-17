/* eslint-disable react/display-name */

import React from "react";
import { render } from "@testing-library/react";
import RootLayout from "../layout";
import { QueryClient, QueryClientProvider } from "react-query";

// Mock the Navbar and Footer components
jest.mock("@/components/layout/navbar", () => () => <div>Mocked Navbar</div>);
jest.mock("@/components/layout/footer", () => () => <div>Mocked Footer</div>);

describe("RootLayout", () => {
  it("renders children correctly", () => {
    const queryClient = new QueryClient();
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <RootLayout>
          <div>Test Child</div>
        </RootLayout>
      </QueryClientProvider>
    );

    // Check if the mocked Navbar is rendered
    expect(getByText("Mocked Navbar")).toBeInTheDocument();

    // Check if the children are rendered
    expect(getByText("Test Child")).toBeInTheDocument();
  });
});
