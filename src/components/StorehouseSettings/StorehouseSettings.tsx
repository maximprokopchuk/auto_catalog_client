import { Panel } from "primereact/panel";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCarModelId, selectCityId } from "../../app/slices/uiSlice";
import {
  selectCarModelById,
  selectCityById,
} from "../../app/slices/storehouseSlice";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import OnEnterInput from "../OnEnterInput";
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
      <Panel header="Storehouse">
        <div className="p-inputgroup">
          <InputText disabled value={city.name}></InputText>
        </div>
      </Panel>
      <Panel header={`Add "${carModel.name}" items to ${city.name} storehouse`}>
        <div className="p-inputgroup">
          <Dropdown
            placeholder="Select component name"
            options={componentForNewItems}
            optionLabel="name"
            value={selectedComponent}
            onChange={(e) => selectComponent(e.value)}
          />
        </div>
        <div className="p-inputgroup">
          <InputNumber
            value={count}
            onChange={(e) => setCount(e.value)}
            placeholder="Count"
          ></InputNumber>
        </div>
        <Divider />
        <Button
          disabled={!count || count < 1 || !selectedComponent}
          onClick={onAddStorehouseItem}
        >
          Add
        </Button>
      </Panel>
      <Panel header={`Add "${carModel.name}" components`}>
        <OnEnterInput
          onSubmit={onCreateNewComponent}
          placeholder="New component name"
        />
      </Panel>
    </>
  );
};

export default StorehouseSettings;
