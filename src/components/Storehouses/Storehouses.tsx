import "../../api/storehousesApi";
import { Tree } from "primereact/tree";
import { TreeNode } from "primereact/treenode/treenode";
import { TreeEventNodeEvent } from "primereact/tree/tree";
import { MouseEvent, useEffect } from "react";
import classes from "./classes.module.css";
import {
  fetchCities,
  fetchCountries,
  selectCitiesByCountries,
  selectCountries,
  fetchCarModels,
  selectCarModels,
  createCountry,
  createCity,
  deleteCountry,
  deleteCity,
  selectIsLoading,
} from "../../app/slices/storehouseSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import InputForm from "../common/InputForm";
import { StorehouseNode, getTree } from "./helpers";
import { setCityIdAndCarModelId } from "../../app/slices/uiSlice";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";

const Storehouses = () => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectCountries);
  const citiesByCountries = useAppSelector(selectCitiesByCountries);
  const carModels = useAppSelector(selectCarModels);
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(fetchCarModels());
  }, []);
  const tree: StorehouseNode[] = getTree(
    countries,
    citiesByCountries,
    carModels,
  );
  const onExpand = (e: TreeEventNodeEvent) => {
    const sNode = e.node as StorehouseNode;
    const countryId = e.node.key as number;
    if (sNode.type === "country") {
      dispatch(fetchCities(countryId));
    }
  };
  const onSelect = (e: TreeEventNodeEvent) => {
    const sNode = e.node as StorehouseNode;
    if (sNode.type === "car_model") {
      const carModelId = sNode.key as number;
      const cityId = sNode.parentId as number;
      dispatch(setCityIdAndCarModelId({ carModelId, cityId }));
    }
  };
  const onDelete = (
    sNode: StorehouseNode,
    e: MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    switch (sNode.type) {
      case "country":
        dispatch(deleteCountry(sNode.key as number));
        dispatch(
          setCityIdAndCarModelId({
            cityId: null,
            carModelId: null
          })
        )
        break;
      case "city":
        dispatch(
          deleteCity({
            id: sNode.key as number,
            countryId: sNode.parentId as number,
          }),
        );
        dispatch(
          setCityIdAndCarModelId({
            cityId: null,
            carModelId: null
          })
        )
        break;
    }
  };
  const nodeTemplate = (node: TreeNode) => {
    const sNode = node as StorehouseNode;
    if (sNode.type === "country_input") {
      return (
        <InputForm
          placeholder="New country"
          onSubmit={(name) => dispatch(createCountry(name))}
          buttonText="Add"
        />
      );
    }
    if (sNode.type === "city_input") {
      const countryId = sNode.parentId as number;
      return (
        <InputForm
          placeholder="New city"
          onSubmit={(name) =>
            dispatch(
              createCity({
                name,
                countryId,
              }),
            )
          }
          buttonText="Add"
        />
      );
    }
    if (sNode.type === "car_model") {
      return node.label;
    }
    return (
      <div className={classes.leaf}>
        {node.label}
        <Button size="small" onClick={(e) => onDelete(sNode, e)}>
          <i className="pi pi-trash" />
        </Button>
      </div>
    );
  };
  return (
    <Panel header="Storehouses">
      <Tree
        value={tree}
        className="w-full md:w-30rem"
        onSelect={onSelect}
        onExpand={onExpand}
        loading={isLoading}
        selectionMode="single"
        nodeTemplate={nodeTemplate}
      />
    </Panel>
  );
};

export default Storehouses;
