import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { TreeNode } from "primereact/treenode/treenode";
import {
  fetchTopLevelStorehouseItems,
  selectItemsByParentId,
  selectIsLoading,
  fetchChildStorehouseItems,
} from "./storehouseItemsSlice";
import { Tree, TreeEventNodeEvent } from "primereact/tree";
import { selectCarModelId, selectCityId } from "../../app/uiSlice";
import { StorehouseItem } from "./storehouseItemsApi";

interface StorehouseItemTreeNode extends TreeNode {
  componentId: number
  parentComponentId: number
  storehouseItemId: number
}

const StorehouseItems = () => {
  const dispatch = useAppDispatch();
  const cityId = useAppSelector(selectCityId)
  const carModelId = useAppSelector(selectCarModelId)
  const itemsByParentId = useAppSelector(selectItemsByParentId);
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    if (carModelId && cityId) {
      dispatch(fetchTopLevelStorehouseItems({ carModelId, cityId }));
    }
  }, [cityId, carModelId]);

  const topLevelItems = itemsByParentId[0] || [];

  const getChildren: (items: StorehouseItem[]) => StorehouseItemTreeNode[] = (items = []) => items.map(item => ({
    id: `${item.component_id}-${item.storehouse_item_id}`,
    key: `${item.component_id}-${item.storehouse_item_id}`,
    label: item.component_name,
    children: getChildren(itemsByParentId[item.component_id]) || [],
    storehouseItemId: item.storehouse_item_id,
    componentId: item.component_id,
    parentComponentId: item.parent_component_id,
    leaf: false
  }))

  const tree =
    topLevelItems?.map((item) => ({
      id: `${item.component_id}-${item.storehouse_item_id}`,
      key: `${item.component_id}-${item.storehouse_item_id}`,
      componentId: item.component_id,
      storehouseItemId: item.storehouse_item_id,
      label: item.component_name,
      parentComponentId: item.parent_component_id,
      leaf: false,
      children: getChildren(itemsByParentId[item.component_id])
    })) || [];

  const onExpand = (e: TreeEventNodeEvent) => {
    dispatch(fetchChildStorehouseItems({
      cityId: cityId as number,
      parentComponentId: (e.node as any).componentId as number
    }))
  }

  return (
    <Tree
      header={<h3>Components</h3>}
      value={tree}
      className="w-full md:w-30rem"
      // onSelect={onSelect}
      onExpand={onExpand}
      loading={isLoading}
      selectionMode="single"
      // nodeTemplate={nodeTemplate}
    />
  );
};

export default StorehouseItems;
