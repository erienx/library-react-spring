import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon } from '@radix-ui/react-icons';

type BaseSelectOption = {
  label: string;
  value: string;
};

type BaseSelectProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options: BaseSelectOption[];
};

const BaseSelect = ({ value, onChange, placeholder, options }: BaseSelectProps) => {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger
        className="cursor-pointer inline-flex items-center justify-between rounded-md px-4 py-2 bg-bg-lighter text-white text-sm font-medium shadow-md hover:bg-bg hover:text-accent1 transition"
        aria-label={placeholder ?? "Select option"}
      >
        <Select.Value placeholder={placeholder ?? "Select option"} />
        <Select.Icon>
          <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Content className="z-50 bg-bg-lighter text-white rounded-md shadow-lg overflow-hidden border border-bg">
        <Select.Viewport className="p-1">
          {options.map(({ label, value }) => (
            <Select.Item
              key={value}
              value={value}
              className="hover:bg-bg-lighter2 text-sm px-4 py-2 rounded cursor-pointer outline-none select-none"
            >
              <Select.ItemText>{label}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  );
};

export default BaseSelect;
