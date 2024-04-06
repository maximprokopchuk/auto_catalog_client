import config from "../config/config";

export interface StorehouseItem {
  component_id: number;
  id: number;
  storehouse_id: number;
  count: number;
}

export interface AutoComponent {
  id: number;
  car_model_id: number;
  name: string;
  parent_id: number;
}

export const getTopLevelComponentsRequest: (
  carModelId: number,
) => Promise<AutoComponent[]> = (carModelId) =>
  fetch(`${config.api_url}/components/?car_model_id=${carModelId}`)
    .then((response) => response.json())
    .then((response) => response.result);

export const getChildComponentsRequest: (
  parentComponentId: number,
) => Promise<AutoComponent[]> = (parentComponentId) =>
  fetch(
    `${config.api_url}/components/?parent_component_id=${parentComponentId}`,
  )
    .then((response) => response.json())
    .then((response) => response.result);

export const createComponentForCarModelRequest: ({
  carModelId,
  name,
}: {
  carModelId: number;
  name: string;
}) => Promise<AutoComponent[]> = ({ carModelId, name }) =>
  fetch(`${config.api_url}/components/`, {
    method: "POST",
    body: JSON.stringify({ name, car_model_id: carModelId }),
  })
    .then((response) => response.json())
    .then((response) => response.result);

export const createComponentForParentComponentRequest: ({
  parentComponentId,
  name,
}: {
  parentComponentId: number;
  name: string;
}) => Promise<AutoComponent[]> = ({ parentComponentId, name }) =>
  fetch(`${config.api_url}/components/`, {
    method: "POST",
    body: JSON.stringify({ name, parent_component_id: parentComponentId }),
  })
    .then((response) => response.json())
    .then((response) => response.result);

export const updateComponentRequest: ({
  componentId,
  name,
}: {
  componentId: number;
  name: string;
}) => Promise<AutoComponent> = ({ componentId, name }) =>
  fetch(`${config.api_url}/components/${componentId}/`, {
    method: "PATCH",
    body: JSON.stringify({ name }),
  })
    .then((response) => response.json())
    .then((response) => response.result);

export const createStorehouseItemRequest: ({
  cityId,
  componentId,
  count,
}: {
  cityId: number;
  componentId: number;
  count: number;
}) => Promise<AutoComponent[]> = ({ cityId, componentId, count }) =>
  fetch(`${config.api_url}/items/`, {
    method: "POST",
    body: JSON.stringify({ city_id: cityId, component_id: componentId, count }),
  })
    .then((response) => response.json())
    .then((response) => response.result);

export const getStorehouseItemsRequest: (
  cityId: number,
  componentsIds: number[],
) => Promise<StorehouseItem[]> = (cityId, componentsIds) =>
  fetch(
    `${config.api_url}/items/?city_id=${cityId}&components_ids=${componentsIds.join(",")}`,
  )
    .then((response) => response.json())
    .then((response) => response.result);


    export const deleteStorehouseItemRequest: (id: number) => Promise<Response> = (id) =>
      fetch(`${config.api_url}/items/${id}/`, {
        method: "DELETE",
      });

export const updateStorehouseITemRequest: ({
  itemId,
  count,
}: {
  itemId: number;
  count: number;
}) => Promise<StorehouseItem> = ({ itemId, count }) =>
  fetch(`${config.api_url}/items/${itemId}/`, {
    method: "PATCH",
    body: JSON.stringify({ count }),
  })
    .then((response) => response.json())
    .then((response) => response.result);