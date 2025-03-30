import type { Brewery } from '@/types'
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BREWERIES_API_BASE_URL;

export const fetchBreweries = async (page = 1, perPage = 10, query = ""): Promise<Brewery[]> => {
  const params: { page?: number; per_page?: number; query?: string } = {};
  if (page) params.page = page;
  if (perPage) params.per_page = perPage;
  if (query) params.query = query;

  const response = await axios.get(BASE_URL, { params });
  return response.data;
};

export const fetchBreweryDetails = async (id: string): Promise<Brewery> => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};
