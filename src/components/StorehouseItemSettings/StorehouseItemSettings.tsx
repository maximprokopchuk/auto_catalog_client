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
import { Button } from "primereact/button";
import InputForm from "../common/InputForm";
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
import { useState } from "react";
import { AutoComponent } from "../../api/storehouseItemsApi";
import { Dialog } from "primereact/dialog";
import InputNumberForm from "../common/InputNumberForm";
import ChildComponentsList from "../common/ChildComponentList";
import AddItems from "../common/AddItems";
import StorehouseItemInfo from "../common/tables/StorehouseInfo";
import StorehouseInfo from "../common/tables/StorehouseItemInfo";

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
        <InputForm
          defaultValue={component.name}
          onSubmit={onRenameComponent}
          buttonText="Rename"
        />
      </Dialog>

      <Dialog
        header={`Set new ${component.name} count`}
        visible={isUpdateItemModalOpen}
        onHide={closeUpdateItemModal}
      >
        <InputNumberForm
          defaultValue={storehouseItem.count}
          onSubmit={onUpdateCount}
          min={1}
          buttonText="Change"
        />
      </Dialog>
      <StorehouseInfo carModelName={carModel.name} cityName={city.name} />
      <StorehouseItemInfo
        componentName={component.name}
        storehouseItemCount={storehouseItem.count}
        openUpdateComponentModal={openUpdateComponentModal}
        openUpdateItemModal={openUpdateItemModal}
      />
      <ChildComponentsList
        header={`Available "${component.name}"  child components`}
        components={componentForNewItems}
        selectedComponent={selectedComponent}
        onSelect={selectComponent}
        onSubmit={onCreateNewComponent}
      />
      <AddItems
        header={`Add "${component.name}" child items to ${city.name} storehouse`}
        components={componentForNewItems}
        selectedComponent={selectedComponent}
        count={count}
        changeCount={setCount}
        onAdd={onAddStorehouseItem}
        onSelect={selectComponent}
      />
      <Panel header={`Delete "${component.name}" storehouse item`}>
        <Button onClick={onDelete}>Delete</Button>
      </Panel>
    </>
  );
};

export default StorehouseItemSettings;
