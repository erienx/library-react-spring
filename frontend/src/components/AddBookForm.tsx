import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import useFetchItems from "../hooks/api/useFetchItems";
import uploadCoverFile from "../hooks/api/uploadCoverFile";
import uploadBook from "../hooks/api/uploadBook";

import AutocompleteInput from "./AutocompleteInput";
import { AutocompleteProvider } from "./providers/AutocompleteProvider";
import FormInput from "./FormInput";
import ButtonSubmit from "./ui/ButtonSubmit";
import FormError from "./ui/FormError";
import useFormDefinition from "../hooks/api/useFormDefinition";
import { iconMap } from "../util/iconMap";


const AddBookForm = () => {
    const navigate = useNavigate();
    const { fields, loading, schema } = useFormDefinition("book");

    const { items: categories } = useFetchItems({ endpointType: "categories" });
    const { items: authors } = useFetchItems({ endpointType: "authors" });
    const { items: publishers } = useFetchItems({ endpointType: "publishers" });

    const [file, setFile] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const getSuggestions = (name: string) => {
        switch (name) {
            case "category": return categories;
            case "author": return authors;
            case "publisher": return publishers;
            default: return [];
        }
    };

    const onSubmit = async (data: any) => {
        try {
            console.log(data);
            const transformed: Record<string, any> = {};

            for (const field of fields) {
                const value = data[field.name];

                if (field.type === "number") {
                    transformed[field.name] = parseFloat(value);
                } else if (field.type === "file") {
                    transformed[field.name] = file ? await uploadCoverFile(file) : "";
                } else {
                    transformed[field.name] = value;
                }
            }

            await uploadBook(transformed);

            setFile(null);
            reset();
            navigate("/");
        } catch {
            setError("root", { message: "Failed to add book." });
        }
    };

    if (loading) return <div>Loading form...</div>;

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-3 rounded-2xl min-w-[280px] xs:min-w-[400px] text-blue"
        >

            <AutocompleteProvider>
                {fields.map((field) => {
                    const val = watch(field.name);
                    const Icon = iconMap[field.icon] || (() => null);

                    if (field.type === "autocomplete") {
                        const suggestions = getSuggestions(field.name)

                        return (
                            <AutocompleteInput
                                key={field.name}
                                placeholder={field.label}
                                register={register(field.name)}
                                value={val}
                                setValue={(v: string) => setValue(field.name, v)}
                                error={errors[field.name]}
                                suggestions={suggestions}
                                Icon={Icon}
                            />
                        );
                    }

                    if (field.type === "file") {
                        return (
                            <div className="relative group" key={field.name}>
                                <div className="relative flex items-center">
                                    <Icon
                                        className={clsx(
                                            "absolute left-3 w-5 h-5 transition-colors z-10 pointer-events-none",
                                            file ? "text-accent1" : "text-slate-300 group-hover:text-white"
                                        )}
                                    />

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const f = e.target.files?.[0];
                                            if (f) setFile(f);
                                        }}
                                        className={clsx(
                                            "pl-10 pr-4 py-2 w-full rounded-md bg-bg text-white text-sm file:hidden border transition-colors cursor-pointer",
                                            file ? "border-accent1" : "border-slate-300 "
                                        )}
                                    />
                                    <span className="absolute right-3 text-xs text-slate-400 pointer-events-none">.jpg, .png</span>
                                </div>
                            </div>
                        );
                    }

                    return (
                        <FormInput
                            key={field.name}
                            type={field.type}
                            placeholder={field.label}
                            register={register(field.name)}
                            value={val}
                            error={errors[field.name]}
                            Icon={Icon}
                        />
                    );
                })}
            </AutocompleteProvider>

            <ButtonSubmit isSubmitting={isSubmitting} btnText="Add Book" />
            <FormError error={errors.root} />
        </form>
    );
};

export default AddBookForm;

