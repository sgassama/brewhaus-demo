import BreweryList from "@/components/BreweryList.vue";
import BreweryTypeSelector from "@/components/BreweryTypeSelector.vue";
import Pagination from "@/components/Pagination.vue";
import SearchBar from "@/components/SearchBar.vue";
import * as api from "@/services/api";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import axios from "axios";
import flushPromises from "flush-promises";
import { describe, expect, it, vi } from "vitest";
import { createRouter, createWebHistory } from "vue-router";

vi.mock("axios");
vi.mock("@/services/api");

const mockedAxios = vi.mocked(axios, true);
const mockedApi = vi.mocked(api, true);
const mockResponse = [
  [{ data: { total: 100 } }],
  [{ data: [{ id: "1", name: "Brewery 1" }] }]
];

const mockRouter = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/", // Root path
      name: "Home",
      component: { template: "<div>Home Page</div>" }
    },
    {
      path: "/brewery/:id",
      name: "Details",
      component: { template: "<div>Details Page</div>" }
    }
  ]
});

describe("BreweryList.vue", () => {
  let mockFetchBreweries: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockFetchBreweries = vi.spyOn(mockedApi, "fetchBreweries") as ReturnType<
      typeof vi.fn
    >;

    mockedAxios.get.mockResolvedValueOnce(mockResponse[0][0]);
    mockedAxios.get.mockResolvedValueOnce(mockResponse[1][0]);
  });

  it("renders the BreweryList and calls fetchBreweries on mount", async () => {
    mockedApi.fetchBreweries.mockResolvedValueOnce(
      {
        breweries: [
          {
            id: "1",
            name: "Brewery One",
            description: "A fine brewery",
            brewery_type: "micro",
            street: "123 Brewery" + " Lane",
            city: "Brewtown",
            state: "TX",
            postal_code: "12345",
            country: "USA",
            website_url: "https://breweryone.com"
          },
          {
            id: "2",
            name: "Brewery Two",
            description: "Another great brewery",
            brewery_type: "regional",
            street: "456 Hops Street",
            city: "Beer City",
            state: "CA",
            postal_code: "67890",
            country: "USA",
            website_url: "https://brewerytwo.com"
          }
        ],
        total: 100
      }
    );
    const wrapper = mount(BreweryList, {
      global: {
        plugins: [mockRouter, createTestingPinia()]
      }
    });

    // Wait for vue updates to be called
    await wrapper.vm.$nextTick();
    wrapper.get("#loading-spinner");

    expect(mockFetchBreweries).toHaveBeenCalledWith(1, 10, "", "");

    // Wait for vue updates to be called
    await flushPromises();
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("Brewery One");
    expect(wrapper.text()).toContain("Brewery Two");
    expect(wrapper.text()).not.toContain("Loading breweries...");
  });

  it("updates the brewery list when the search bar emits a search event", async () => {
    const wrapper = mount(BreweryList, {
      global: {
        plugins: [mockRouter, createTestingPinia()]
      }
    });
    mockFetchBreweries.mockResolvedValueOnce({
      breweries: [
        {
          id: "3",
          name: "Search Brewery",
          description: "Another cool brewery",
          brewery_type: "micro",
          street: "123 Hops Avenue",
          city: "Beer Ville",
          state: "CA",
          postal_code: "90210",
          country: "USA",
          website_url: "https://brewerysearch.com"
        }
      ],
      total: 100
    });
    const searchBar = wrapper.findComponent(SearchBar);
    searchBar.vm.$emit("search", "Search");

    // Wait for fetch and vue updates to be called
    await flushPromises();
    await wrapper.vm.$nextTick();
    expect(mockFetchBreweries).toHaveBeenCalledWith(1, 10, "Search", "");
    expect(wrapper.text()).toContain("Search Brewery");
    expect(wrapper.text()).not.toContain("Brewery One");
  });

  it("navigates to the correct page when pagination buttons are clicked", async () => {
    const wrapper = mount(BreweryList, {
      global: {
        plugins: [mockRouter, createTestingPinia()]
      }
    });

    mockFetchBreweries.mockResolvedValueOnce({
      breweries: [
        {
          id: "4",
          name: "Brewery Page 2",
          description: "Another awesome brewery",
          brewery_type: "large",
          street: "4321 Main Beer Avenue",
          city: "North BeersTown",
          state: "CO",
          postal_code: "80202",
          country: "USA",
          website_url: "https://brewerypagetwo.com"
        }
      ],
      total: 100
    });
    const pagination = wrapper.findComponent(Pagination);
    pagination.vm.$emit("change-page", 2);

    // Wait for fetch and vue updates to be called
    await flushPromises();
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain("Brewery Page 2");
  });

  it("displays the loading message while breweries are being fetched", async () => {
    const wrapper = mount(BreweryList, {
      global: {
        plugins: [mockRouter, createTestingPinia()]
      }
    });

    // Wait for vue updates to be called
    await wrapper.vm.$nextTick();
    // Before breweries are fetched
    expect(wrapper.find("#loading-spinner").exists()).toBe(true);

    // Wait for vue updates to be called
    await flushPromises();
    await wrapper.vm.$nextTick();
    // After breweries are fetched
    expect(wrapper.find("#loading-spinner").exists()).toBe(false);
  });

  it("updates brewery list when BreweryListSelector selection changes", async () => {
    const wrapper = mount(BreweryList, {
      global: {
        plugins: [mockRouter, createTestingPinia()]
      }
    });

    const searchBar = wrapper.findComponent(SearchBar);
    searchBar.vm.$emit("search", "");

    const breweryTypeSelect = wrapper.findComponent(BreweryTypeSelector);
    breweryTypeSelect.vm.$emit("update:modelValue", "large");

    await flushPromises();
    await wrapper.vm.$nextTick();
    expect(mockFetchBreweries).toHaveBeenCalledWith(1, 10, "", "large");
  });
})
;
