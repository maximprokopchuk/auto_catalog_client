import "./storehousesApi";
import { Tree } from "primereact/tree";
import { TreeNode } from "primereact/treenode/treenode";
import { TreeEventNodeEvent } from "primereact/tree/tree";
import { MouseEvent, useEffect, useState } from "react";
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
  deleteCarModel,
  createCarModel,
} from "./storehouseSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import NewEntityInput from "../../components/NewEntityInput";
import { StorehouseNode, getTree } from "./helpers";

const Storehouses = () => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectCountries);
  const citiesByCountries = useAppSelector(selectCitiesByCountries);
  const carModels = useAppSelector(selectCarModels);

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
      alert(sNode.key + " " + sNode.parentId);
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
        break;
      case "city":
        dispatch(
          deleteCity({
            id: sNode.key as number,
            countryId: sNode.parentId as number,
          }),
        );
        break;
      case "car_model":
        dispatch(deleteCarModel(sNode.key as number));
    }
  };
  const nodeTemplate = (node: TreeNode) => {
    const sNode = node as StorehouseNode;
    if (sNode.type === "country_input") {
      return (
        <NewEntityInput
          placeholder="Add new country"
          onSubmit={async (name) => dispatch(createCountry(name))}
        />
      );
    }
    if (sNode.type === "city_input") {
      const countryId = sNode.parentId as number;
      return (
        <NewEntityInput
          placeholder="Add new city"
          onSubmit={(name) =>
            dispatch(
              createCity({
                name,
                countryId,
              }),
            )
          }
        />
      );
    }
    if (sNode.type === "car_model_input") {
      return (
        <NewEntityInput
          placeholder="Add new car model"
          onSubmit={(name) => dispatch(createCarModel(name))}
        />
      );
    }
    return (
      <div className={classes.leaf}>
        {node.label}
        <button onClick={(e) => onDelete(sNode, e)}>
          <i className="pi pi-trash" />
        </button>
      </div>
    );
  };
  return (
    <Tree
      value={tree}
      className="w-full md:w-30rem"
      onSelect={onSelect}
      onExpand={onExpand}
      loading={false}
      selectionMode="single"
      nodeTemplate={nodeTemplate}
    />
  );
};

export default Storehouses;
