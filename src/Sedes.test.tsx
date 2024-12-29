import { render, screen, waitFor } from "@testing-library/react";
import Sedes from "./components/Sede";
import "@testing-library/jest-dom";
import React from "react";

jest.mock("./service/urlApi");

describe("Sedes Component", () => {
  const props = {
    token: "mockToken",
    userAuth: { name: "Test User" },
    onLogout: jest.fn(),
  };

  test("muestra el mensaje de 'Cargando...' mientras los datos se están cargando", async () => {
    render(<Sedes {...props} />);
    await waitFor(() => expect(screen.getByText(/Cargando.../i)).toBeInTheDocument());
  });
});