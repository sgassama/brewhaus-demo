import type { Brewery } from "@/types";
import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import { fetchBreweries, fetchBreweryDetails } from "@/services/api";

vi.mock("axios");
const mockedAxios = vi.mocked(axios, true);

describe("Brewery service API", () => {
  it("fetchBreweries makes correct API call", async () => {
    const mockResponse = [{ id: "1", name: "Brewery 1" }];
    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result: Brewery[] = await fetchBreweries(1, 10, "beer");

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://api.openbrewerydb.org/v1/breweries?page=1&per_page=10&by_name=beer",
    );
    expect(result).toEqual(mockResponse);
  });

  it("fetchBreweryDetails makes correct API call", async () => {
    const mockResponse = { id: "1", name: "Brewery 1" };
    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result: Brewery = await fetchBreweryDetails("1");

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://api.openbrewerydb.org/v1/breweries/1",
    );
    expect(result).toEqual(mockResponse);
  });
});
