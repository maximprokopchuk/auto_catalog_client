import { InputText } from "primereact/inputtext";
import { Panel } from "primereact/panel";
import classes from './classes.module.css'

interface StorehouseInfoProps {
    cityName: string
    carModelName: string
}

const StorehouseInfo = ({
  cityName,
  carModelName
}: StorehouseInfoProps) => (

<Panel header="Storehouse">
    <table className={classes.infoTable}>
      <tbody>
        <tr>
          <td>City</td>
          <td>
            <InputText
              name="cityName"
              disabled
              value={cityName}
            ></InputText>
          </td>
          <td></td>
        </tr>
        <tr>
          <td>Car model</td>
          <td>
            <InputText disabled value={carModelName}></InputText>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </Panel>
)

export default StorehouseInfo