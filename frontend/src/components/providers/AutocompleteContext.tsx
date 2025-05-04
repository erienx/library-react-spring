import { createContext, useContext } from "react";

export type AutoCompleteContextProps = {
    activeField: string | null;
    setActiveField: (field: string | null) => void;
};

export const AutocompleteContext = createContext<AutoCompleteContextProps | null>(null);

export const useAutocompleteContext = () => {
    const context = useContext(AutocompleteContext);
    if (!context) {
        throw new Error("useAutocompleteContext must be used within AutocompleteProvider");
    }
    return context;
};
