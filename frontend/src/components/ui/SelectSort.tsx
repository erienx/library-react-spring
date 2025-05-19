
import { useTranslation } from 'react-i18next';
import BaseSelect from './BaseSelect';

type SelectSortProps = {
    sortBy: string;
    handleSortChange: (value: string) => void;
};


const SelectSort = ({ sortBy, handleSortChange }: SelectSortProps) => {
    const { t } = useTranslation();
    const sortOptions = [
        { value: 'rating,desc', label: t('highestRated') },
        { value: 'rating,asc', label: t('lowestRated') },
        { value: 'rentedCount,desc', label: t('highestRented') },
        { value: 'rentedCount,asc', label: t('loswestRented') },
        { value: 'addedDate,desc', label: t('newestAdded') },
    ];
    return (
        <BaseSelect value={sortBy} onChange={handleSortChange} placeholder="Sort by" options={sortOptions} />
    );
};

export default SelectSort;
