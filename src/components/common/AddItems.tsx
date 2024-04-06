import { Button } from "primereact/button"
import { Divider } from "primereact/divider"
import { Dropdown } from "primereact/dropdown"
import { InputNumber } from "primereact/inputnumber"
import { Panel } from "primereact/panel"
import { AutoComponent } from "../../api/storehouseItemsApi"

interface AddItemsProps {
    header: string;
    components: AutoComponent[]
    selectedComponent: AutoComponent | null
    onSelect: (c: AutoComponent) => void
    count: number | null
    changeCount: (c: number | null) => void
    onAdd: () => void
}

const AddItems = ({
    header,
    components,
    selectedComponent,
    onSelect,
    count,
    changeCount,
    onAdd
}: AddItemsProps) => {
return (
    <Panel
    header={header}
  >
    <div className="p-inputgroup">
      <Dropdown
        placeholder="Select component name"
        options={components}
        optionLabel="name"
        value={selectedComponent}
        onChange={(e) => onSelect(e.value)}
      />
    </div>
    <div className="p-inputgroup">
      <InputNumber
        value={count}
        onChange={(e) => changeCount(e.value)}
        placeholder="Count"
      ></InputNumber>
    </div>
    <Divider />
    <Button
      disabled={!count || count < 1 || !selectedComponent}
      onClick={onAdd}
    >
      Add
    </Button>
  </Panel>
)
}


export default AddItems