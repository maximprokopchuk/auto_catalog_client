import { createAppSlice } from "../../app/createAppSlice";
import {
  StorehouseItem,
  getChildStorhouseItemsRequest,
  getTopLevelStorhouseItemsRequest,
} from "./storehouseItemsApi";

export interface StorehouseItemsSlice {
  componentsByParentId: Record<number, StorehouseItem[]>;
  isLoading: boolean;
}

const initialState: StorehouseItemsSlice = {
  componentsByParentId: {},
  isLoading: false,
};

export const storehousComponentsSlice = createAppSlice({
  name: "storehouseItems",
  initialState,
  reducers: (create) => ({
    fetchTopLevelStorehouseItems: create.asyncThunk(
      async ({
        cityId,
        carModelId,
      }: {
        cityId: number;
        carModelId: number;
      }) => {
        const response = await getTopLevelStorhouseItemsRequest(
          cityId,
          carModelId,
        );
        return response;
      },
      {
        pending: (state) => {
          state.isLoading = true;
        },
        fulfilled: (state, action) => {
          state.isLoading = false;
          state.componentsByParentId[0] = action.payload;
        },
        rejected: (state) => {
          state.isLoading = false;
          state.componentsByParentId[0] = []
        },
      },
    ),
  fetchChildStorehouseItems: create.asyncThunk(
    async ({
      cityId,
      parentComponentId,
    }: {
      cityId: number;
      parentComponentId: number;
    }) => {
      const response = await getChildStorhouseItemsRequest(
        cityId,
        parentComponentId,
      );
      return response;
    },
    {
      pending: (state) => {
        state.isLoading = true;
      },
      fulfilled: (state, action) => {
        state.isLoading = false;
        state.componentsByParentId[action.meta.arg.parentComponentId] = action.payload;
      },
      rejected: (state) => {
        state.isLoading = false;
      },
    },
  ),
}),
  selectors: {
    selectItemsByParentId: (state) => state.componentsByParentId,
    selectIsLoading: (state) => state.isLoading,
  },
});

export const { fetchTopLevelStorehouseItems, fetchChildStorehouseItems } = storehousComponentsSlice.actions;
export const { selectItemsByParentId, selectIsLoading } =
  storehousComponentsSlice.selectors;
