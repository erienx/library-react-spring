import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon } from '@radix-ui/react-icons';

type SelectSortProps = {
    sortBy: string;
    handleSortChange: (value: string) => void;
};

const SelectSort = ({ sortBy, handleSortChange }: SelectSortProps) => {
    return (
        <Select.Root value={sortBy} onValueChange={handleSortChange}>
            <Select.Trigger
                className="cursor-pointer inline-flex items-center justify-between rounded-md px-4 py-2 bg-bg-lighter text-white text-sm font-medium shadow-md hover:bg-bg hover:text-accent1 transition"
                aria-label="Sort Books"
            >
                <Select.Value placeholder="Sort by" />
                <Select.Icon>
                    <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Select.Icon>
            </Select.Trigger>

            <Select.Content className="z-50 bg-bg-lighter text-white rounded-md shadow-lg overflow-hidden border border-bg">
                <Select.Viewport className="p-1">
                    <SelectItem value="rating,desc">Highest Rated</SelectItem>
                    <SelectItem value="rating,asc">Lowest Rated</SelectItem>
                    <SelectItem value="rentedCount,asc">Lowest Rented Count</SelectItem>
                    <SelectItem value="rentedCount,desc">Highest Rented Count</SelectItem>
                    <SelectItem value="addedDate,desc">Newest Added</SelectItem>
                </Select.Viewport>
            </Select.Content>
        </Select.Root>
    );
};

const SelectItem = ({ value, children }: { value: string; children: React.ReactNode }) => (
    <Select.Item
        value={value}
        className="hover:bg-bg-lighter2 text-sm px-4 py-2 rounded cursor-pointer outline-none select-none"
    >
        <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
);

export default SelectSort;
