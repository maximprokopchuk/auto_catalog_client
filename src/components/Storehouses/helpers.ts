import { CarModel, City, Country } from "../../api/storehousesApi";
import { TreeNode } from "primereact/treenode/treenode";

export type StorehouseNodeType =
  | "country"
  | "city"
  | "car_model"
  | "country_input"
  | "city_input";

export interface StorehouseNode extends TreeNode {
  type: StorehouseNodeType;
  parentId?: number;
}

const getCarModelsLeafs: (
  carModels: CarModel[],
  cityId: number,
) => StorehouseNode[] = (carModels, cityId) =>
  carModels?.map(({ id, name }) => ({
    id: id.toString(),
    key: id,
    label: name,
    parentId: cityId,
    type: "car_model",
  })) || [];
const getCitiesLeafs: (
  citiesByCountries: Record<number, City[]>,
  carModels: CarModel[],
  countryId: number,
) => StorehouseNode[] = (citiesByCountries, carModels, countryId: number) =>
  citiesByCountries[countryId]?.map(({ id, name }) => ({
    id: id.toString(),
    key: id,
    label: name,
    type: "city",
    parentId: countryId,
    children: getCarModelsLeafs(carModels, id),
    leaf: false,
  })) || [];
const getCountriesLeafs: (
  countries: Country[],
  citiesByCountries: Record<number, City[]>,
  carModels: CarModel[],
) => StorehouseNode[] = (countries, citiesByCountries, carModels) =>
  countries?.map(({ id, name }) => ({
    id: id.toString(),
    key: id,
    label: name,
    leaf: false,
    type: "country",
    children: [
      ...getCitiesLeafs(citiesByCountries, carModels, id),
      ...[
        {
          key: 0,
          id: "0",
          type: "city_input",
          label: "",
          parentId: id,
        },
      ],
    ],
  })) || [];

export const getTree: (
  countries: Country[],
  citiesByCountries: Record<number, City[]>,
  carModels: CarModel[],
) => StorehouseNode[] = (countries, citiesByCountries, carModels) => [
  ...getCountriesLeafs(countries, citiesByCountries, carModels),
  ...[
    {
      key: 0,
      id: "0",
      type: "country_input" as StorehouseNodeType,
      label: "",
    },
  ],
];
