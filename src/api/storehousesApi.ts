import config from "../config/config";

export interface Country {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
  parent_id: number;
}

export interface CarModel {
  id: number;
  name: string;
}

export interface CreateCityRequest {
  name: string;
  country_id: number;
}

export const getCountriesRequest: () => Promise<Country[]> = () =>
  fetch(`${config.api_url}/countries/`)
    .then((response) => response.json())
    .then((response) => response.result);

export const createCountryRequest: (name: string) => Promise<Country> = (
  name,
) =>
  fetch(`${config.api_url}/countries/`, {
    method: "POST",
    body: JSON.stringify({ name }),
  })
    .then((response) => response.json())
    .then((response) => response.result);

export const deleteCountryRequest: (id: number) => Promise<Response> = (id) =>
  fetch(`${config.api_url}/countries/${id}/`, {
    method: "DELETE",
  });

export const getCitiesRequest: (countryId: number) => Promise<City[]> = (
  countryId: number,
) =>
  fetch(`${config.api_url}/cities/?country_id=${countryId}`)
    .then((response) => response.json())
    .then((response) => response.result);

export const createCityRequest: (
  name: string,
  countryId: number,
) => Promise<City> = (name, countryId) =>
  fetch(`${config.api_url}/cities/`, {
    method: "POST",
    body: JSON.stringify({ name, country_id: countryId }),
  })
    .then((response) => response.json())
    .then((response) => response.result);

export const deleteCityRequest: (id: number) => Promise<Response> = (id) =>
  fetch(`${config.api_url}/cities/${id}/`, {
    method: "DELETE",
  });

export const getCarModelsRequest: () => Promise<CarModel[]> = () =>
  fetch(`${config.api_url}/car_models/`)
    .then((response) => response.json())
    .then((response) => response.result);

export const createCarModelRequest: (name: string) => Promise<Country> = (
  name,
) =>
  fetch(`${config.api_url}/car_models/`, {
    method: "POST",
    body: JSON.stringify({ name }),
  })
    .then((response) => response.json())
    .then((response) => response.result);

export const deleteCarModelRequest: (id: number) => Promise<Response> = (id) =>
  fetch(`${config.api_url}/car_models/${id}/`, {
    method: "DELETE",
  });
