import BaseSelect from './BaseSelect';

type SelectOrderTypeProps = {
    orderType: string;
    handleOrderTypeChannge: (value: string) => void;
};

const orderTypeOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'rented', label: 'Rented' },
    { value: 'completed', label: 'Completed' },
];

const SelectOrderType = ({ orderType, handleOrderTypeChannge }: SelectOrderTypeProps) => {
    return (
        <BaseSelect value={orderType} onChange={handleOrderTypeChannge} placeholder="Order Type" options={orderTypeOptions} />
    );
};



export default SelectOrderType