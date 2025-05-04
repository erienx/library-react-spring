import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';

const AdminSelect = () => {
    const navigate = useNavigate();

    const handleSelect = (value: string) => {
        navigate(value);
    };

    return (
        <Select.Root onValueChange={handleSelect}>
            <Select.Trigger
                className="cursor-pointer inline-flex items-center justify-between rounded-md px-4 py-2 bg-bg-lighter text-white text-sm font-medium shadow-md hover:bg-bg hover:text-accent1 transition"
                aria-label="Admin">
                <Select.Value placeholder="Admin Actions" />
                <Select.Icon>
                    <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Select.Icon>
            </Select.Trigger>

            <Select.Content className="z-50 bg-bg-lighter text-white rounded-md shadow-lg overflow-hidden border border-bg">
                <Select.Viewport className="p-1">
                    <Select.Item
                        value="/admin/add-book"
                        className="hover:bg-bg-lighter2 text-sm px-4 py-2 rounded cursor-pointer">
                        <Select.ItemText>Add New Book</Select.ItemText>
                    </Select.Item>

                    <Select.Item
                        value="/admin/manage-rentals"
                        className="hover:bg-bg-lighter2 text-sm px-4 py-2 rounded cursor-pointer">
                        <Select.ItemText>Manage Rentals</Select.ItemText>
                    </Select.Item>
                </Select.Viewport>
            </Select.Content>
        </Select.Root>
    );
};

export default AdminSelect;
