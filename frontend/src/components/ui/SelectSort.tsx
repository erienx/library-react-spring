import BaseSelect from './BaseSelect';

type SelectSortProps = {
    sortBy: string;
    handleSortChange: (value: string) => void;
};

const sortOptions = [
    { value: 'rating,desc', label: 'Highest Rated' },
    { value: 'rating,asc', label: 'Lowest Rated' },
    { value: 'rentedCount,desc', label: 'Highest Rented Count' },
    { value: 'rentedCount,asc', label: 'Lowest Rented Count' },
    { value: 'addedDate,desc', label: 'Newest Added' },
];

const SelectSort = ({ sortBy, handleSortChange }: SelectSortProps) => {
    return (
        <BaseSelect value={sortBy} onChange={handleSortChange} placeholder="Sort by" options={sortOptions} />
    );
};

export default SelectSort;
