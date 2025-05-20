import { useTranslation } from "react-i18next"
import { SearchBooksTemplate } from "./SearchBooksTemplate"

const SearchBooksAuthor = () => {
    const { t } = useTranslation();
    return (
        <SearchBooksTemplate queryType='author' placeholder={t('searchAuthor')} emptySearchMessage={t('emptySearchMessageAuthor')} />
    )
}

export default SearchBooksAuthor