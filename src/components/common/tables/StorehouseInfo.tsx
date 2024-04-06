import { InputText } from "primereact/inputtext";
import { Panel } from "primereact/panel";
import classes from "./classes.module.css";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";

interface StorehouseItemInfoProps {
  componentName: string;
  storehouseItemCount: number;
  openUpdateComponentModal: () => void;
  openUpdateItemModal: () => void;
}

const StorehouseItemInfo = ({
  componentName,
  storehouseItemCount,
  openUpdateComponentModal,
  openUpdateItemModal,
}: StorehouseItemInfoProps) => (
  <Panel header="Storehouse Item">
    <table className={classes.infoTable}>
      <tbody>
        <tr>
          <td>Component</td>
          <td>
            <InputText disabled value={componentName}></InputText>
          </td>
          <td>
            <Button onClick={openUpdateComponentModal}>Rename</Button>
          </td>
        </tr>
        <tr>
          <td>Count</td>
          <td>
            <InputNumber disabled value={storehouseItemCount}></InputNumber>
          </td>
          <td>
            <Button onClick={openUpdateItemModal}>Change</Button>
          </td>
        </tr>
      </tbody>
    </table>
  </Panel>
);

export default StorehouseItemInfo;
