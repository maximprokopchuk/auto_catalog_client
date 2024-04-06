import { Panel } from "primereact/panel";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCarModelId, selectCityId } from "../../app/slices/uiSlice";
import {
  selectCarModelById,
  selectCityById,
} from "../../app/slices/storehouseSlice";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import InputForm from "../common/InputForm";
import {
  createComponentForCarModel,
  createStorehouseItem,
  selectComponentsByCarModelId,
  selectItemsByCityAndComponentId,
} from "../../app/slices/storehouseItemsSlice";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { AutoComponent } from "../../api/storehouseItemsApi";
import { Divider } from "primereact/divider";
import { InputNumber } from "primereact/inputnumber";
import ChildComponentsList from "../common/ChildComponentList";
import AddItems from "../common/AddItems";
import StorehouseInfo from "../common/tables/StorehouseItemInfo";

const StorehouseSettings = () => {
  const cityId = useAppSelector(selectCityId);
  const carModelId = useAppSelector(selectCarModelId);
  const citiesById = useAppSelector(selectCityById);
  const carModelsById = useAppSelector(selectCarModelById);
  const componentsByCarModel = useAppSelector(selectComponentsByCarModelId);
  const existingItemsByCityAndComponent = useAppSelector(
    selectItemsByCityAndComponentId,
  );
  const dispatch = useAppDispatch();
  const [selectedComponent, selectComponent] = useState<AutoComponent | null>(
    null,
  );
  const [count, setCount] = useState<number | null>(null);
  if (!cityId || !carModelId) {
    return null;
  }
  const components = componentsByCarModel[carModelId] || [];
  const existingItemsForComponent =
    existingItemsByCityAndComponent[cityId] || {};
  const componentIdsForExistingItems = new Set(
    Object.keys(existingItemsForComponent).map((key) => parseInt(key)),
  );
  const componentForNewItems = components.filter(
    (c) => !componentIdsForExistingItems.has(c.id),
  );

  const onCreateNewComponent = (name: string) =>
    dispatch(createComponentForCarModel({ name, carModelId }));
  const onAddStorehouseItem = () => {
    if (!count || !selectedComponent) {
      return;
    }
    dispatch(
      createStorehouseItem({
        cityId,
        componentId: selectedComponent.id,
        count,
      }),
    );
    setCount(null);
    selectComponent(null);
  };

  const carModel = carModelsById[carModelId];
  const city = citiesById[cityId];

  return (
    <>
      <StorehouseInfo carModelName={carModel.name} cityName={city.name} />
      <ChildComponentsList
        header={`Available "${carModel.name}" components`}
        components={componentForNewItems}
        selectedComponent={selectedComponent}
        onSelect={selectComponent}
        onSubmit={onCreateNewComponent}

      />

      <AddItems
        header={`Add "${carModel.name}" items to ${city.name} storehouse`}
        components={componentForNewItems}
        selectedComponent={selectedComponent}
        count={count}
        changeCount={setCount}
        onAdd={onAddStorehouseItem}
        onSelect={selectComponent}
      />
      <Panel header={`Add "${carModel.name}" components`}>
        <InputForm
          onSubmit={onCreateNewComponent}
          placeholder="New component name"
          buttonText="Add"
        />
      </Panel>
    </>
  );
};

export default StorehouseSettings;
