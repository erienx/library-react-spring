import BaseSelect from './BaseSelect';

type SelectPageSizeProps = {
    size: number;
    handleSizeChange: (value: number) => void;
};

const pageSizeOptions = [
    { value: '8', label: '8' },
    { value: '16', label: '16' },
    { value: '32', label: '32' },
];

const SelectPageSize = ({ size, handleSizeChange }: SelectPageSizeProps) => {
    return (
        <BaseSelect value={size.toString()} onChange={(val) => handleSizeChange(Number(val))} placeholder="Page size" options={pageSizeOptions} />
    );
};

export default SelectPageSize;