import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";

export interface UISlice {
  cityId: number | null;
  carModelId: number | null;
  componentId: number | null;
  storehouseItemId: number | null;
}

const initialState: UISlice = {
  cityId: null,
  carModelId: null,
  componentId: null,
  storehouseItemId: null,
};

export const uiSlice = createAppSlice({
  name: "UI",
  initialState,
  reducers: () => ({
    setCityIdAndCarModelId: (
      state,
      action: PayloadAction<{ cityId: number; carModelId: number }>,
    ) => {
      state.cityId = action.payload.cityId;
      state.carModelId = action.payload.carModelId;
      state.componentId = null;
      state.storehouseItemId = null;
    },
    setComponentIdAndStorehoiseItemId: (
      state,
      action: PayloadAction<{ componentId: number | null; storehouseItemId: number | null }>,
    ) => {
      state.componentId = action.payload.componentId;
      state.storehouseItemId = action.payload.storehouseItemId;
    },
  }),
  selectors: {
    selectCityId: (state) => state.cityId,
    selectCarModelId: (state) => state.carModelId,
    selectComponentId: (state) => state.componentId,
    selectStorehouseItemId: (state) => state.storehouseItemId,
  },
});

export const { setCityIdAndCarModelId, setComponentIdAndStorehoiseItemId } =
  uiSlice.actions;
export const {
  selectCarModelId,
  selectCityId,
  selectComponentId,
  selectStorehouseItemId,
} = uiSlice.selectors;
