import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { TreeNode } from "primereact/treenode/treenode";
import {
  fetchTopLevelData,
  selectComponentsByParentId,
  selectItemsByCityAndComponentId,
  selectIsLoading,
  fetchChildData,
  selectComponentsByCarModelId,
} from "../../app/slices/storehouseItemsSlice";
import { Tree, TreeEventNodeEvent } from "primereact/tree";
import {
  selectCarModelId,
  selectCityId,
  setComponentIdAndStorehoiseItemId,
} from "../../app/slices/uiSlice";
import { AutoComponent } from "../../api/storehouseItemsApi";
import { Panel } from "primereact/panel";

interface StorehouseItemTreeNode extends TreeNode {
  parentComponentId: number;
  storehouseItemId: number;
}

const StorehouseItems = () => {
  const dispatch = useAppDispatch();
  const cityId = useAppSelector(selectCityId);
  const carModelId = useAppSelector(selectCarModelId);
  const itemsByCityAndComponentId = useAppSelector(
    selectItemsByCityAndComponentId,
  );
  const componentsByParentId = useAppSelector(selectComponentsByParentId);
  const componentsByCarModelId = useAppSelector(selectComponentsByCarModelId);
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    if (carModelId && cityId) {
      dispatch(fetchTopLevelData({ carModelId, cityId }));
    }
  }, [cityId, carModelId]);

  if (!cityId || !carModelId) {
    return null;
  }

  const itemsByComponentId = itemsByCityAndComponentId[cityId] || {};
  const topLevelComponents = componentsByCarModelId[carModelId] || [];

  const getChildren: (items: AutoComponent[]) => StorehouseItemTreeNode[] = (
    components = [],
  ) => {
    const result: StorehouseItemTreeNode[] = [];
    components.forEach((component) => {
      const storehouseItem = itemsByComponentId[component.id];
      if (!storehouseItem) {
        return;
      }
      result.push({
        id: component.id.toString(),
        key: component.id,
        storehouseItemId: storehouseItem.id,
        label: component.name,
        parentComponentId: 0,
        leaf: false,
        children: getChildren(componentsByParentId[component.id]),
      });
    });

    return result;
  };

  const tree: StorehouseItemTreeNode[] = [];
  topLevelComponents?.forEach((component) => {
    const storehouseItem = itemsByComponentId[component.id];
    if (!storehouseItem) {
      return;
    }
    tree.push({
      id: component.id.toString(),
      key: component.id,
      storehouseItemId: storehouseItem.id,
      label: component.name,
      parentComponentId: 0,
      leaf: false,
      children: getChildren(componentsByParentId[component.id]),
    });
  });

  const onExpand = (e: TreeEventNodeEvent) => {
    const sNode = e.node as StorehouseItemTreeNode;
    dispatch(
      fetchChildData({
        cityId: cityId as number,
        parentComponentId: sNode.key as number,
      }),
    );
  };
  const onSelect = (e: TreeEventNodeEvent) => {
    const sNode = e.node as StorehouseItemTreeNode;
    dispatch(
      setComponentIdAndStorehoiseItemId({
        componentId: sNode.key as number,
        storehouseItemId: sNode.storehouseItemId,
      }),
    );
    dispatch(
      fetchChildData({
        cityId: cityId as number,
        parentComponentId: sNode.key as number,
      }),
    );
  };

  return (
    <Panel header="Components">
      <Tree
        value={tree}
        className="w-full md:w-30rem"
        onSelect={onSelect}
        onExpand={onExpand}
        loading={isLoading}
        selectionMode="single"
      />
    </Panel>
  );
};

export default StorehouseItems;
