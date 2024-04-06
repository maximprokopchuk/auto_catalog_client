import { render, screen } from '@testing-library/react';
import AddItems from "../AddItems"
import { AutoComponent } from "../../../api/storehouseItemsApi"
import ChildComponentsList from '../ChildComponentList';

describe("ChildComponentsList", () => {
    const onAdd = vi.fn()
    const onSelect = vi.fn()
    const onSubmit = vi.fn()
    const component: AutoComponent = {
        id: 2,
        car_model_id: 2,
        name: "Engine",
        parent_id: 1,
    }
    beforeEach(() => {
        render(<ChildComponentsList header="Some header" components={[component]} selectedComponent={null} onSubmit={onAdd} onSelect={onSelect} />)
    })
    it("should render component with a list", () => {
        expect(screen.getByText('Engine')).toBeInTheDocument();
    })
})