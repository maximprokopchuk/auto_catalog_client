import { createAppSlice } from "../../app/createAppSlice";
import {
  createCarModelRequest,
  createCityRequest,
  createCountryRequest,
  deleteCarModelRequest,
  deleteCityRequest,
  deleteCountryRequest,
  getCarModelsRequest,
  getCitiesRequest,
  getCountriesRequest,
} from "./storehousesApi";
import { CarModel, City, Country } from "./storehousesApi";

export interface StorehouseSlice {
  countries: Country[];
  citiesByCountries: Record<number, City[]>;
  carModels: CarModel[];
  isLoading: boolean;
}

const initialState: StorehouseSlice = {
  countries: [],
  citiesByCountries: {},
  carModels: [],
  isLoading: false,
};

export const storehousesSlice = createAppSlice({
  name: "storehouses",
  initialState,
  reducers: (create) => ({
    fetchCountries: create.asyncThunk(
      async (_: void) => {
        const response = await getCountriesRequest();
        return response;
      },
      {
        pending: (state) => {
          state.isLoading = true;
        },
        fulfilled: (state, action) => {
          state.isLoading = false;
          state.countries = action.payload;
        },
        rejected: (state) => {
          state.isLoading = false;
        },
      },
    ),
    createCountry: create.asyncThunk(
      async (name: string) => {
        await createCountryRequest(name);
        const response = await getCountriesRequest();
        return response;
      },
      {
        pending: (state) => {
          state.isLoading = true;
        },
        fulfilled: (state, action) => {
          state.isLoading = false;
          state.countries = action.payload;
        },
        rejected: (state) => {
          state.isLoading = false;
        },
      },
    ),
    deleteCountry: create.asyncThunk(
      async (id: number) => {
        await deleteCountryRequest(id);
        const response = await getCountriesRequest();
        return response;
      },
      {
        pending: (state) => {
          state.isLoading = true;
        },
        fulfilled: (state, action) => {
          state.isLoading = false;
          state.countries = action.payload;
        },
        rejected: (state) => {
          state.isLoading = false;
        },
      },
    ),
    fetchCities: create.asyncThunk(
      async (countryId: number) => {
        const response = await getCitiesRequest(countryId);
        return response;
      },
      {
        pending: (state) => {
          state.isLoading = true;
        },
        fulfilled: (state, action) => {
          state.isLoading = false;
          state.citiesByCountries[action.meta.arg] = action.payload;
        },
        rejected: (state) => {
          state.isLoading = false;
        },
      },
    ),
    createCity: create.asyncThunk(
      async ({ name, countryId }: { name: string; countryId: number }) => {
        await createCityRequest(name, countryId);
        const response = await getCitiesRequest(countryId);
        return response;
      },
      {
        pending: (state) => {
          state.isLoading = true;
        },
        fulfilled: (state, action) => {
          state.isLoading = false;
          state.citiesByCountries[action.meta.arg.countryId] = action.payload;
        },
        rejected: (state) => {
          state.isLoading = false;
        },
      },
    ),
    deleteCity: create.asyncThunk(
      async ({ id, countryId }: { id: number; countryId: number }) => {
        await deleteCityRequest(id);
        const response = getCitiesRequest(countryId);
        return response;
      },
      {
        pending: (state) => {
          state.isLoading = true;
        },
        fulfilled: (state, action) => {
          state.isLoading = false;
          state.citiesByCountries[action.meta.arg.countryId] = action.payload;
        },
        rejected: (state) => {
          state.isLoading = false;
        },
      },
    ),
    fetchCarModels: create.asyncThunk(
      async (_: void) => {
        const response = await getCarModelsRequest();
        return response;
      },
      {
        pending: (state) => {
          state.isLoading = true;
        },
        fulfilled: (state, action) => {
          state.isLoading = false;
          state.carModels = action.payload;
        },
        rejected: (state) => {
          state.isLoading = false;
        },
      },
    ),
    createCarModel: create.asyncThunk(
      async (name: string) => {
        await createCarModelRequest(name);
        const response = await getCarModelsRequest();
        return response;
      },
      {
        pending: (state) => {
          state.isLoading = true;
        },
        fulfilled: (state, action) => {
          state.isLoading = false;
          state.carModels = action.payload;
        },
        rejected: (state) => {
          state.isLoading = false;
        },
      },
    ),
    deleteCarModel: create.asyncThunk(
      async (id: number) => {
        await deleteCarModelRequest(id);
        const response = getCarModelsRequest();
        return response;
      },
      {
        pending: (state) => {
          state.isLoading = true;
        },
        fulfilled: (state, action) => {
          state.isLoading = false;
          state.carModels = action.payload;
        },
        rejected: (state) => {
          state.isLoading = false;
        },
      },
    ),
  }),
  selectors: {
    selectCountries: (state) => state.countries,
    selectCitiesByCountries: (state) => state.citiesByCountries,
    selectCarModels: (state) => state.carModels,
    selectIsLoading: (state) => state.isLoading,
  },
});

export const {
  fetchCities,
  fetchCountries,
  fetchCarModels,
  createCity,
  createCountry,
  deleteCity,
  deleteCountry,
  deleteCarModel,
  createCarModel,
} = storehousesSlice.actions;

export const { selectCountries, selectCitiesByCountries, selectCarModels, selectIsLoading } =
  storehousesSlice.selectors;
