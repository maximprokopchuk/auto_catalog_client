import { Panel } from "primereact/panel";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectCarModelId,
  selectCityId,
  selectComponentId,
  selectStorehouseItemId,
  setComponentIdAndStorehoiseItemId,
} from "../../app/slices/uiSlice";
import {
  selectCarModelById,
  selectCityById,
} from "../../app/slices/storehouseSlice";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import OnEnterInput from "../OnEnterInput";
import {
  createComponentForParentComponent,
  createStorehouseItem,
  deleteStorehouseItem,
  selectComponentById,
  selectComponentsByParentId,
  selectItemsByCityAndComponentId,
  selectStorehouseItemById,
  updateComponent,
  updateStorehouseItem,
} from "../../app/slices/storehouseItemsSlice";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { AutoComponent } from "../../api/storehouseItemsApi";
import { Divider } from "primereact/divider";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import OnEnterNumberInput from "../OnEnterNumberInput";
import classes from "./classes.module.css";

const StorehouseItemSettings = () => {
  const cityId = useAppSelector(selectCityId);
  const carModelId = useAppSelector(selectCarModelId);
  const componentId = useAppSelector(selectComponentId);
  const storehouseItemId = useAppSelector(selectStorehouseItemId);
  const citiesById = useAppSelector(selectCityById);
  const carModelsById = useAppSelector(selectCarModelById);
  const componentsById = useAppSelector(selectComponentById);
  const storehouseItemsById = useAppSelector(selectStorehouseItemById);
  const componentsByParentId = useAppSelector(selectComponentsByParentId);
  const existingItemsByCityAndComponent = useAppSelector(
    selectItemsByCityAndComponentId,
  );
  const [isUpdateComponentModalOpen, setIsUpdateComponentModalOpen] =
    useState(false);
  const openUpdateComponentModal = () => setIsUpdateComponentModalOpen(true);
  const closeUpdateComponentModal = () => setIsUpdateComponentModalOpen(false);
  const [isUpdateItemModalOpen, setIsUpdateItemModalOpen] = useState(false);
  const openUpdateItemModal = () => setIsUpdateItemModalOpen(true);
  const closeUpdateItemModal = () => setIsUpdateItemModalOpen(false);
  const dispatch = useAppDispatch();
  const [selectedComponent, selectComponent] = useState<AutoComponent | null>(
    null,
  );
  const [count, setCount] = useState<number | null>(null);
  if (!cityId || !carModelId || !componentId || !storehouseItemId) {
    return null;
  }
  const components = componentsByParentId[componentId] || [];
  const existingItemsForComponent =
    existingItemsByCityAndComponent[cityId] || {};
  const componentIdsForExistingItems = new Set(
    Object.keys(existingItemsForComponent).map((key) => parseInt(key)),
  );
  const componentForNewItems = components.filter(
    (c) => !componentIdsForExistingItems.has(c.id),
  );

  const onCreateNewComponent = (name: string) =>
    dispatch(
      createComponentForParentComponent({
        name,
        parentComponentId: componentId,
      }),
    );
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

  const onDelete = () => {
    dispatch(
      deleteStorehouseItem({
        id: storehouseItemId,
        cityId,
        parentComponentId: component.parent_id,
        carModelId: carModelId,
        componentId: component.id,
      }),
    );
    dispatch(
      setComponentIdAndStorehoiseItemId({
        componentId: null,
        storehouseItemId: null,
      }),
    );
  };

  const carModel = carModelsById[carModelId];
  const city = citiesById[cityId];
  const component = componentsById[componentId];
  const storehouseItem = storehouseItemsById[storehouseItemId];

  const onRenameComponent = (name: string) => {
    dispatch(updateComponent({ componentId: component.id, name }));
    closeUpdateComponentModal();
  };

  const onUpdateCount = (count: number) => {
    dispatch(
      updateStorehouseItem({ itemId: storehouseItem.id, count, cityId }),
    );
    closeUpdateItemModal();
  };

  return (
    <>
      <Dialog
        header={`Rename ${component.name}`}
        visible={isUpdateComponentModalOpen}
        onHide={closeUpdateComponentModal}
      >
        <OnEnterInput
          defaultValue={component.name}
          onSubmit={onRenameComponent}
        />
      </Dialog>

      <Dialog
        header={`Set new ${component.name} count`}
        visible={isUpdateItemModalOpen}
        onHide={closeUpdateItemModal}
      >
        <OnEnterNumberInput
          defaultValue={storehouseItem.count}
          onSubmit={onUpdateCount}
        />
      </Dialog>
      <Panel header="Storehouse">
        <table className={classes.infoTable}>
          <tbody>
            <tr>
              <td>City</td>
              <td>
                <InputText
                  name="cityName"
                  disabled
                  value={city.name}
                ></InputText>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>Car model</td>
              <td>
                <InputText disabled value={carModel.name}></InputText>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>Component</td>
              <td>
                <InputText disabled value={component.name}></InputText>
              </td>
              <td>
                <Button onClick={openUpdateComponentModal}>Rename</Button>
              </td>
            </tr>
            <tr>
              <td>Count</td>
              <td>
                <InputNumber
                  disabled
                  value={storehouseItem.count}
                ></InputNumber>
              </td>
              <td>
                <Button onClick={openUpdateItemModal}>Change</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </Panel>
      <Panel
        header={`Add "${component.name}" child items to ${city.name} storehouse`}
      >
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
      <Panel header={`Add "${component.name}" components`}>
        <OnEnterInput
          onSubmit={onCreateNewComponent}
          placeholder="New component name"
        />
      </Panel>
      <Panel header={`Delete "${component.name}" storehouse item`}>
        <Button onClick={onDelete}>Delete</Button>
      </Panel>
    </>
  );
};

export default StorehouseItemSettings;
