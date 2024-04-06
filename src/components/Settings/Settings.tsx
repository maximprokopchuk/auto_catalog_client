import { useAppSelector } from "../../app/hooks";
import {
  selectCarModelId,
  selectCityId,
  selectComponentId,
  selectStorehouseItemId,
} from "../../app/slices/uiSlice";
import StorehouseItemSettings from "../StorehouseItemSettings/StorehouseItemSettings";
import StorehouseSettings from "../StorehouseSettings/StorehouseSettings";

const Settings = () => {
  const cityId = useAppSelector(selectCityId);
  const carModelId = useAppSelector(selectCarModelId);
  const componentId = useAppSelector(selectComponentId);
  const storehouseItemId = useAppSelector(selectStorehouseItemId);
  if (cityId && carModelId) {
    if (storehouseItemId && componentId) {
      return <StorehouseItemSettings />;
    } else {
      return <StorehouseSettings />;
    }
  }
  return null;
};

export default Settings;
