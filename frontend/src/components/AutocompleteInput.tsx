import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import clsx from "clsx";
import FormError from "./ui/FormError";
import useInputState from "../hooks/useInputState";
import { useState, useEffect } from "react";
import { useAutocompleteContext } from "./providers/AutocompleteContext";

type AutocompleteInputProps = {
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    placeholder: string;
    register: UseFormRegisterReturn;
    value?: string;
    setValue: (val: string) => void;
    error?: any;
    suggestions: string[];
};

const AutocompleteInput = ({ Icon, placeholder, register, value, setValue, error, suggestions, }: AutocompleteInputProps) => {
    const state = useInputState(value, error);
    const [filtered, setFiltered] = useState<string[]>([]);
    const { activeField, setActiveField } = useAutocompleteContext();
    const fieldId = placeholder.toLowerCase();

    useEffect(() => {
        if (value) {
            const matching = suggestions.filter((item) =>
                item.toLowerCase().includes(value.toLowerCase()));
            setFiltered(matching);
        } else {
            setFiltered([]);
        }
    }, [value, suggestions]);

    const handleSelect = (val: string) => {
        setValue(val);
        setActiveField(null);
    };

    const showDropdown = (activeField === fieldId && filtered.length > 0);

    return (
        <>
            <div className="relative group">
                <Icon
                    className={clsx(
                        "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-150 z-10",
                        {
                            "text-slate-300": state.color === "empty",
                            "text-slate-100": state.color === "empty-focus",
                            "text-accent1-hover": state.color === "filled",
                            "text-accent1": state.color === "filled-focus",
                            "text-red-400": state.color === "error",
                            "text-red-500": state.color === "error-focus",
                        }
                    )}
                />
                <input
                    {...register}
                    type="text"
                    placeholder={placeholder}
                    value={value ?? ""}
                    onChange={(e) => {
                        register.onChange(e);
                        state.onChange(e);
                        setValue(e.target.value);
                    }}
                    onFocus={() => {
                        state.onFocus();
                        setActiveField(fieldId);
                    }}
                    onBlur={() => {
                        state.onBlur();
                        setActiveField(null);
                    }}

                    className={clsx(
                        "pl-10 pr-4 py-2 border rounded-md w-full outline-none transition-colors duration-150 bg-bg text-white shadow-sm",
                        {
                            "border-slate-300": state.color === "empty",
                            "border-slate-100": state.color === "empty-focus",
                            "border-accent1-hover": state.color === "filled",
                            "border-accent1": state.color === "filled-focus",
                            "border-red-400": state.color === "error",
                            "border-red-500": state.color === "error-focus",
                        }
                    )}
                />
                {showDropdown && (
                    <ul className="absolute z-20 w-full mt-1 bg-bg-lighter text-white border border-bg rounded-md shadow-lg max-h-40 overflow-auto">
                        {filtered.map((item) => (
                            <li key={item} onMouseDown={() => handleSelect(item)}
                                className="px-3 py-2 hover:bg-bg cursor-pointer transition">
                                {item}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <FormError error={error} />
        </>
    );
};

export default AutocompleteInput;
