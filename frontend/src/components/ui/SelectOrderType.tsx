import { useTranslation } from 'react-i18next';
import BaseSelect from './BaseSelect';

type SelectOrderTypeProps = {
    orderType: string;
    handleOrderTypeChannge: (value: string) => void;
};


const SelectOrderType = ({ orderType, handleOrderTypeChannge }: SelectOrderTypeProps) => {
    const { t } = useTranslation();
    const orderTypeOptions = [
        { value: 'pending', label: t('pending') },
        { value: 'rented', label: t('rented') },
        { value: 'completed', label: t('completed') },
    ];
    return (
        <BaseSelect value={orderType} onChange={handleOrderTypeChannge} placeholder={t('orderType')} options={orderTypeOptions} />
    );
};



export default SelectOrderType