import axios from "axios";

const BASE_URL = "https://api.openbrewerydb.org/v1/breweries";

// Fetch breweries with optional pagination and filters
export const fetchBreweries = async (page = 1, per_page = 10, query = "") => {
  const params: { page?: number; per_page?: number; query?: string } = {};
  if (page) params.page = page;
  if (per_page) params.per_page = per_page;
  if (query) params.query = query;

  const response = await axios.get(BASE_URL, { params });
  return response.data; // Array of breweries
};

// Fetch brewery details by ID
export const fetchBreweryDetails = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data; // Details of a specific brewery
};
