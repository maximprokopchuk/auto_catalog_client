import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Panel } from "primereact/panel";
import { useState } from "react";
import classes from "./classes.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  createCarModel,
  deleteCarModel,
  selectCarModels,
} from "../../app/slices/storehouseSlice";
import { ListBox } from "primereact/listbox";
import { CarModel } from "../../api/storehousesApi";
import { Divider } from "primereact/divider";
import InputForm from "../common/InputForm";

const CarModels = () => {
  const [isModalOpen, setIsModelOpen] = useState(false);
  const openModal = () => setIsModelOpen(true);
  const closeModal = () => setIsModelOpen(false);
  const carModels = useAppSelector(selectCarModels);
  const dispatch = useAppDispatch();
  const [selectedCarModel, selectCarModel] = useState<CarModel | null>();
  const onDelete = () => {
    if (!selectedCarModel?.id) {
      return;
    }
    dispatch(deleteCarModel(selectedCarModel?.id));
  };

  return (
    <>
      <Dialog
        visible={isModalOpen}
        className={classes.modal}
        header="Manage car models"
        onHide={closeModal}
      >
        <ListBox
          dataKey="id"
          onChange={(e) => selectCarModel(e.value)}
          value={selectedCarModel}
          options={carModels}
          itemTemplate={(item) => item.name}
        />
        <Divider />
        <Button disabled={!selectedCarModel} onClick={onDelete}>
          Delete
        </Button>
        <Divider />
        <InputForm
          placeholder="Add new car model"
          onSubmit={(name) => dispatch(createCarModel(name))}
          buttonText="Add"
        />
      </Dialog>
      <Panel header="Car models">
        <Button onClick={openModal}>Manage car models</Button>
      </Panel>
    </>
  );
};

export default CarModels;
