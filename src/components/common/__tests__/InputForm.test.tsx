import { render, screen } from '@testing-library/react';
import AddItems from "../AddItems"
import { AutoComponent } from "../../../api/storehouseItemsApi"
import ChildComponentsList from '../ChildComponentList';
import InputForm from '../InputForm';

describe("InputForm", () => {
    const onSubmit = vi.fn()
    beforeEach(() => {
        render(<InputForm placeholder="Some placeholder" onSubmit={onSubmit}  buttonText="Submit"/>)
    })
    it("should render component with a list", () => {
        expect(screen.getByText('Submit')).toBeInTheDocument();
    })
})