import { createAppSlice } from "../createAppSlice";
import {
  StorehouseItem,
  getTopLevelComponentsRequest,
  getChildComponentsRequest,
  getStorehouseItemsRequest,
  AutoComponent,
  createComponentForCarModelRequest,
  createStorehouseItemRequest,
  createComponentForParentComponentRequest,
  deleteStorehouseItemRequest,
  updateComponentRequest,
  updateStorehouseITemRequest,
} from "../../api/storehouseItemsApi";

export interface StorehouseItemsSlice {
  componentsByParentId: Record<number, AutoComponent[]>;
  componentsByCarModelId: Record<number, AutoComponent[]>;
  storehouseItemByCityComponentId: Record<
    number,
    Record<number, StorehouseItem>
  >;
  componentById: Record<number, AutoComponent>;
  storehouseItemById: Record<number, StorehouseItem>;
  isLoading: boolean;
}

const initialState: StorehouseItemsSlice = {
  componentsByParentId: {},
  componentsByCarModelId: {},
  storehouseItemByCityComponentId: {},
  componentById: {},
  storehouseItemById: {},
  isLoading: false,
};

export const storehousComponentsSlice = createAppSlice({
  name: "storehouseItems",
  initialState,
  reducers: (create) => ({
    fetchTopLevelData: create.asyncThunk(
      async ({
        cityId,
        carModelId,
      }: {
        cityId: number;
        carModelId: number;
      }) => {
        const componentsResponse =
          await getTopLevelComponentsRequest(carModelId);
        const componentsIds = componentsResponse.map(
          (component) => component.id,
        );
        let storehouseItems: StorehouseItem[] = [];
        try {
          storehouseItems = await getStorehouseItemsRequest(
            cityId,
            componentsIds,
          );
        } catch (err) {
          console.log(err);
        }
        return {
          componentsResponse,
          storehouseItems,
        };
      },
      {
        pending: (state) => {
          state.isLoading = true;
        },
        fulfilled: (state, action) => {
          const cityId = action.meta.arg.cityId;
          state.isLoading = false;
          state.componentsByCarModelId[action.meta.arg.carModelId] =
            action.payload.componentsResponse;
          if (!state.storehouseItemByCityComponentId[cityId]) {
            state.storehouseItemByCityComponentId[cityId] = {};
          }
          action.payload.storehouseItems.forEach((item) => {
            state.storehouseItemByCityComponentId[cityId][item.component_id] =
              item;

            state.storehouseItemById[item.id] = item;
          });
          action.payload.componentsResponse.forEach((compoennt) => {
            state.componentById[compoennt.id] = compoennt;
          });
        },
        rejected: (state, action) => {
          state.isLoading = false;
          state.storehouseItemByCityComponentId[action.meta.arg.cityId] = [];
        },
      },
    ),
    fetchChildData: create.asyncThunk(
      async ({
        cityId,
        parentComponentId,
      }: {
        cityId: number;
        parentComponentId: number;
      }) => {
        const componentsResponse =
          await getChildComponentsRequest(parentComponentId);
        const componentsIds = componentsResponse.map(
          (component) => component.id,
        );

        let storehouseItems: StorehouseItem[] = [];
        try {
          storehouseItems = await getStorehouseItemsRequest(
            cityId,
            componentsIds,
          );
        } catch (err) {
          console.log(err);
        }
        return {
          componentsResponse,
          storehouseItems,
        };
      },
      {
        pending: (state) => {
          state.isLoading = true;
        },
        fulfilled: (state, action) => {
          const cityId = action.meta.arg.cityId;
          const parentId = action.meta.arg.parentComponentId;
          state.isLoading = false;
          state.componentsByParentId[parentId] =
            action.payload.componentsResponse;
          if (!state.storehouseItemByCityComponentId[cityId]) {
            state.storehouseItemByCityComponentId[cityId] = {};
          }
          action.payload.storehouseItems.forEach((item) => {
            state.storehouseItemByCityComponentId[cityId][item.component_id] =
              item;
            state.storehouseItemById[item.id] = item;
          });
          action.payload.componentsResponse.forEach((component) => {
            state.componentById[component.id] = component;
          });
        },
        rejected: (state) => {
          state.isLoading = false;
        },
      },
    ),
    createComponentForCarModel: create.asyncThunk(
      async (params: { name: string; carModelId: number }) => {
        await createComponentForCarModelRequest(params);
        const response = await getTopLevelComponentsRequest(params.carModelId);
        return response;
      },
      {
        pending: (state) => {
          state.isLoading = true;
        },
        fulfilled: (state, action) => {
          const components = action.payload || [];
          state.isLoading = false;
          state.componentsByCarModelId[action.meta.arg.carModelId] = components;
            components.forEach((component) => {
              state.componentById[component.id] = component;
            });
        },
        rejected: (state) => {
          state.isLoading = false;
        },
      },
    ),
    createComponentForParentComponent: create.asyncThunk(
      async (params: { name: string; parentComponentId: number }) => {
        await createComponentForParentComponentRequest(params);
        const response = await getChildComponentsRequest(
          params.parentComponentId,
        );
        return response;
      },
      {
        pending: (state) => {
          state.isLoading = true;
        },
        fulfilled: (state, action) => {
          state.isLoading = false;
          const components = action.payload || [];
          state.componentsByParentId[action.meta.arg.parentComponentId] =
            components;
          components.forEach((component) => {
            state.componentById[component.id] = component;
          });
        },
        rejected: (state) => {
          state.isLoading = false;
        },
      },
    ),
    updateComponent: create.asyncThunk(
      async (params: { name: string; componentId: number }) => {
        const response = await updateComponentRequest(params);
        return response;
      },
      {
        pending: (state) => {
          state.isLoading = true;
        },
        fulfilled: (state, action) => {
          state.isLoading = false;
          const component = action.payload;
          if (component.parent_id) {
            state.componentsByParentId[component.parent_id] =
              state.componentsByParentId[component.parent_id].filter(
                (c) => c.id != component.id,
              );
            state.componentsByParentId[component.parent_id].push(component);
          } else if (component.car_model_id) {
            state.componentsByCarModelId[component.car_model_id] =
              state.componentsByCarModelId[component.car_model_id].filter(
                (c) => c.id != component.id,
              );
            state.componentsByCarModelId[component.car_model_id].push(
              component,
            );
          }
          state.componentById[component.id] = component;
        },
        rejected: (state) => {
          state.isLoading = false;
        },
      },
    ),
    deleteStorehouseItem: create.asyncThunk(
      async ({
        id,
      }: {
        id: number;
        cityId: number;
        parentComponentId: number;
        carModelId: number;
        componentId: number;
      }) => {
        await deleteStorehouseItemRequest(id);
      },
      {
        pending: (state) => {
          state.isLoading = true;
        },
        fulfilled: (state, action) => {
          function deleteChildsFromState(parentId: number) {
            const components = state.componentsByParentId[parentId] || [];
            components.forEach((component) => {
              delete state.storehouseItemByCityComponentId[cityId][
                component.id
              ];
              deleteChildsFromState(component.id);
            });
          }
          state.isLoading = false;
          const cityId = action.meta.arg.cityId;
          const componentId = action.meta.arg.componentId;
          const itemId = action.meta.arg.id;
          delete state.storehouseItemByCityComponentId[cityId][componentId];
          delete state.storehouseItemById[itemId];
          deleteChildsFromState(componentId);
        },
        rejected: (state) => {
          state.isLoading = false;
        },
      },
    ),
    createStorehouseItem: create.asyncThunk(
      async (params: {
        componentId: number;
        cityId: number;
        count: number;
      }) => {
        await createStorehouseItemRequest(params);
        const response = await getStorehouseItemsRequest(params.cityId, [
          params.componentId,
        ]);
        return response;
      },
      {
        pending: (state) => {
          state.isLoading = true;
        },
        fulfilled: (state, action) => {
          const cityId = action.meta.arg.cityId;
          const componentId = action.meta.arg.componentId;
          if (!action.payload.length) {
            throw new Error();
          }
          const item = action.payload[0];
          state.isLoading = false;
          if (!state.storehouseItemByCityComponentId[cityId]) {
            state.storehouseItemByCityComponentId[cityId] = {};
          }
          state.storehouseItemByCityComponentId[cityId][componentId] = item;
          state.storehouseItemById[item.id] = item;
        },
        rejected: (state) => {
          state.isLoading = false;
        },
      },
    ),
    updateStorehouseItem: create.asyncThunk(
      async (params: { count: number; itemId: number; cityId: number }) => {
        const response = await updateStorehouseITemRequest(params);
        return response;
      },
      {
        pending: (state) => {
          state.isLoading = true;
        },
        fulfilled: (state, action) => {
          state.isLoading = false;
          const item = action.payload;
          const cityId = action.meta.arg.cityId;
          state.storehouseItemById[item.id] = item;
          state.storehouseItemByCityComponentId[cityId][item.component_id] =
            item;
        },
        rejected: (state) => {
          state.isLoading = false;
        },
      },
    ),
  }),
  selectors: {
    selectComponentsByParentId: (state) => state.componentsByParentId,
    selectComponentsByCarModelId: (state) => state.componentsByCarModelId,
    selectComponentById: (state) => state.componentById,
    selectStorehouseItemById: (state) => state.storehouseItemById,
    selectItemsByCityAndComponentId: (state) =>
      state.storehouseItemByCityComponentId,
    selectIsLoading: (state) => state.isLoading,
  },
});

export const {
  fetchTopLevelData,
  fetchChildData,
  createComponentForCarModel,
  createComponentForParentComponent,
  createStorehouseItem,
  deleteStorehouseItem,
  updateComponent,
  updateStorehouseItem,
} = storehousComponentsSlice.actions;
export const {
  selectComponentsByParentId,
  selectComponentsByCarModelId,
  selectItemsByCityAndComponentId,
  selectComponentById,
  selectStorehouseItemById,
  selectIsLoading,
} = storehousComponentsSlice.selectors;
