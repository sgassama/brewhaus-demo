import type { Brewery } from "@/types";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BREWERIES_API_BASE_URL;

export const fetchBreweries = async (
  page = 1,
  perPage = 10,
  query = "",
  type = "",
): Promise<Brewery[]> => {
  const url = `${BASE_URL}?page=${page}&per_page=${perPage}${query && `&by_name=${query}`}${
    type && `&by_type=${type}`
  }`;
  const response = await axios.get(url);
  return response.data;
};

export const fetchBreweryDetails = async (id: string): Promise<Brewery> => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};
