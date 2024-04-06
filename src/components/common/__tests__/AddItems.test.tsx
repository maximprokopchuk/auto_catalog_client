import { render, screen } from '@testing-library/react';
import AddItems from "../AddItems"
import { AutoComponent } from "../../../api/storehouseItemsApi"

describe("AddItems", () => {
    const onAdd = vi.fn()
    const onSelect = vi.fn()
    const changeCount = vi.fn()
    const component: AutoComponent = {
        id: 2,
        car_model_id: 2,
        name: "Engine",
        parent_id: 1,
    }
    beforeEach(() => {
        render(<AddItems header="Some header" count={1} components={[component]} selectedComponent={null} onAdd={onAdd} onSelect={onSelect} changeCount={changeCount} />)
    })
    it("should render component", () => {
        expect(screen.getByText('Some header')).toBeInTheDocument();
    })
})