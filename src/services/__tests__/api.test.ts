import { fetchBreweries, fetchBreweryDetails } from "@/services/api";
import axios from "axios";
import { describe, expect, it, vi } from "vitest";

vi.mock("axios");
const mockedAxios = vi.mocked(axios, true);

describe("Brewery service API", () => {
  it("fetchBreweries makes correct API call", async () => {
    const mockResponse = [
      [{ data: { total: 100 } }],
      [{ data: [{ id: "1", name: "Brewery 1" }] }]
    ];

    mockedAxios.get.mockResolvedValueOnce(mockResponse[0][0]);
    mockedAxios.get.mockResolvedValueOnce(mockResponse[1][0]);

    const result = await fetchBreweries(1, 10, "beer", "");

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://api.openbrewerydb.org/v1/breweries?page=1&per_page=10&by_name=beer"
    );
    expect(result).toEqual({
      breweries: mockResponse[1][0].data,
      // @ts-ignore
      total: mockResponse[0][0].data.total
    });
  });

  it("fetchBreweryDetails makes correct API call", async () => {
    const mockResponse = { id: "1", name: "Brewery 1" };
    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await fetchBreweryDetails("1");

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://api.openbrewerydb.org/v1/breweries/1"
    );
    expect(result).toEqual(mockResponse);
  });
});
