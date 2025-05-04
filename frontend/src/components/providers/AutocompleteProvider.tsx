import React, { useState } from "react";
import { AutocompleteContext } from "./AutocompleteContext";

export const AutocompleteProvider = ({ children }: { children: React.ReactNode }) => {
    const [activeField, setActiveField] = useState<string | null>(null);
    return (
        <AutocompleteContext.Provider value={{ activeField, setActiveField }}>
            {children}
        </AutocompleteContext.Provider>
    );
};
