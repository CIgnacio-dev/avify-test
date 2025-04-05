import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import EnergyMix from "./EnergyMix";
import * as service from "../services/energyService";

const mockData = [
  { fuel: "wind", perc: 30 },
  { fuel: "solar", perc: 15 },
];

jest.spyOn(service, "fetchEnergyMix").mockResolvedValue(mockData);

describe("EnergyMix", () => {
  it("renders loading and then energy mix", async () => {
    render(<EnergyMix />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/wind/i)).toBeInTheDocument();
      expect(screen.getByText(/30.0%/)).toBeInTheDocument();
      expect(screen.getByText(/solar/i)).toBeInTheDocument();
    });
  });
});

/* 2nd test */

it("renders items in descending order by percentage", async () => {
    render(<EnergyMix />);
  
    await waitFor(() => {
      const items = screen.getAllByText(/%/);
  
      // Extrae los porcentajes como números
      const values = items.map(el =>
        parseFloat(el.textContent?.replace("%", "") || "0")
      );
  
      const sorted = [...values].sort((a, b) => b - a);
  
      expect(values).toEqual(sorted);
    });
  });
  