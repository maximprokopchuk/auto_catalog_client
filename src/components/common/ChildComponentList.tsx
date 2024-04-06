import { Divider } from "primereact/divider";
import { ListBox } from "primereact/listbox";
import { Panel } from "primereact/panel";
import InputForm from "./InputForm";
import { AutoComponent } from "../../api/storehouseItemsApi";

interface ChildComponentsListProps {
  header: string;
  components: AutoComponent[];
  onSelect: (c: AutoComponent) => void;
  selectedComponent: AutoComponent | null;
  onSubmit: (name: string) => void;
}

function ChildComponentsList({
  header,
  components,
  onSelect,
  selectedComponent,
  onSubmit,
}: ChildComponentsListProps) {
  return (
    <Panel header={header}>
      <ListBox
        dataKey="id"
        onChange={(e) => onSelect(e.value)}
        value={selectedComponent}
        options={components}
        itemTemplate={(item) => item.name}
      />
      <Divider />
      <InputForm
        onSubmit={onSubmit}
        placeholder="New component name"
        buttonText="Add"
      />
    </Panel>
  );
}

export default ChildComponentsList;
