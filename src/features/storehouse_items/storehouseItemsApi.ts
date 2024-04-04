import config from "../../config/config";

export interface StorehouseItem {
  component_id: number;
  storehouse_item_id: number;
  storehouse_id: number;
  component_name: string;
  count: number;
  parent_component_id: number;
}

export const getTopLevelStorhouseItemsRequest: (
  cityId: number,
  carModelId: number,
) => Promise<StorehouseItem[]> = (cityId, carModelId) =>
  fetch(`${config.api_url}/items/?city_id=${cityId}&car_model_id=${carModelId}`)
    .then((response) => response.json())
    .then((response) => response.result);

export const getChildStorhouseItemsRequest: (
  cityId: number,
  parentComponentId: number,
) => Promise<StorehouseItem[]> = (cityId, parentComponentId) =>
  fetch(`${config.api_url}/items/?city_id=${cityId}&parent_component_id=${parentComponentId}`)
    .then((response) => response.json())
    .then((response) => response.result);
