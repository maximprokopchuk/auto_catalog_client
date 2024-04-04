import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "./createAppSlice";

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
  reducers: (create) => ({
    setSelectedCityIdAndCarModelId: (
      state,
      action: PayloadAction<{ cityId: number; carModelId: number }>,
    ) => {
      state.cityId = action.payload.cityId;
      state.carModelId = action.payload.carModelId;
      state.componentId = null;
      state.storehouseItemId = null;
    },
  }),
  selectors: {
    selectCityId: (state) => state.cityId,
    selectCarModelId: (state) => state.carModelId,
  },
});

export const { setSelectedCityIdAndCarModelId: setCityIdAndCarModelId } =
  uiSlice.actions;
export const { selectCarModelId, selectCityId } = uiSlice.selectors;
