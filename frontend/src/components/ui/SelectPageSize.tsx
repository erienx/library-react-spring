import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon } from '@radix-ui/react-icons';

type SelectPageSizeProps = {
  size: number;
  handleSizeChange: (value: number) => void;
};

const SelectPageSize = ({ size, handleSizeChange }: SelectPageSizeProps) => {
  return (
    <Select.Root value={size.toString()} onValueChange={(val) => handleSizeChange(Number(val))}>
      <Select.Trigger
        className="cursor-pointer inline-flex items-center justify-between rounded-md px-4 py-2 bg-bg-lighter text-white text-sm font-medium shadow-md hover:bg-bg hover:text-accent1 transition"
        aria-label="Items per page"
      >
        <Select.Value placeholder="Page Size" />
        <Select.Icon>
          <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Content className="z-50 bg-bg-lighter text-white rounded-md shadow-lg overflow-hidden border border-bg">
        <Select.Viewport className="p-1">
          {[8, 16, 32].map((n) => (
            <Select.Item
              key={n}
              value={n.toString()}
              className="hover:bg-bg-lighter2 text-sm px-4 py-2 rounded cursor-pointer outline-none select-none"
            >
              <Select.ItemText>{n} per page</Select.ItemText>
            </Select.Item>
          ))}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  );
};

export default SelectPageSize;
