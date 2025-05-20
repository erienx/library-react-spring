import { useTranslation } from 'react-i18next'
import { SearchBooksTemplate } from './SearchBooksTemplate'

const SearchBooksPublisher = () => {
    const {t} = useTranslation();
    return (
        <SearchBooksTemplate queryType='publisher' placeholder={t('searchPublisher')} emptySearchMessage={t('emptySearchMessagePublisher')} />
    )
}

export default SearchBooksPublisher