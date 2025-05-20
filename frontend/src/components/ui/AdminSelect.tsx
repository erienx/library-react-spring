import { useNavigate, useLocation } from 'react-router-dom';
import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const ADMIN_ROUTES = [
    "/admin/add-book",
    "/admin/manage-rentals",
];

const AdminSelect = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {t} = useTranslation();

    const selectedValue = useMemo(() => {
        return ADMIN_ROUTES.includes(location.pathname) ? location.pathname : "";
    }, [location.pathname]);

    const handleSelect = (value: string) => {
        navigate(value);
    };

    return (
        <Select.Root value={selectedValue} onValueChange={handleSelect}>
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
                    <Select.Item value={ADMIN_ROUTES[0]} className="hover:bg-bg-lighter2 text-sm px-4 py-2 rounded cursor-pointer">
                        <Select.ItemText>{t('addNewBook')}</Select.ItemText>
                    </Select.Item>

                    <Select.Item value={ADMIN_ROUTES[1]} className="hover:bg-bg-lighter2 text-sm px-4 py-2 rounded cursor-pointer">
                        <Select.ItemText>{t('manageRentals')}</Select.ItemText>
                    </Select.Item>
                </Select.Viewport>
            </Select.Content>
        </Select.Root>
    );
};

export default AdminSelect;
