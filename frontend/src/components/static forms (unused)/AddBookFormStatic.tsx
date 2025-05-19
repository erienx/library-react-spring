import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInput from "../FormInput";
import ButtonSubmit from "../ui/ButtonSubmit";
import FormError from "../ui/FormError";

import BookIcon from "../assets/form/book.svg?react";
import NumberIcon from "../assets/form/numbers.svg?react";
import AuthorIcon from "../assets/form/author.svg?react";
import CalendarIcon from "../assets/form/calendar.svg?react";
import PublisherIcon from "../assets/form/publisher.svg?react";
import CategoryIcon from "../assets/form/category.svg?react";
import CopyIcon from "../assets/form/copy.svg?react";
import ImageIcon from "../assets/form/image.svg?react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AutocompleteInput from "../AutocompleteInput";
import { AutocompleteProvider } from "../providers/AutocompleteProvider";
import useFetchItems from "../../hooks/api/useFetchItems";
import uploadCoverFile from "../../hooks/api/uploadCoverFile";
import clsx from "clsx";
import uploadBook from "../../hooks/api/uploadBook";


const schema = z.object({
    title: z.string().min(1, "Title is required"),
    publicationYear: z.string().regex(/^\d{4}$/, "Enter a valid year (YYYY)"),
    pages: z.string().regex(/^\d+$/, "Pages must be a number"),
    author: z.string().min(1, "Author is required"),
    publisher: z.string().min(1, "Publisher is required"),
    category: z.string().min(1, "Category is required"),
    copyCount: z.string().regex(/^\d+$/, "Copy count must be a number"),
    pathToCover: z.any().optional(),
});

type FormFields = z.infer<typeof schema>;

const AddBookFormStatic = () => {
    const navigate = useNavigate();
    const [categoryValue, setCategoryValue] = useState("");
    const [publisherValue, setPublisherValue] = useState("");
    const [authorValue, setAuthorValue] = useState("");
    const [coverFile, setCoverFile] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        setError,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        defaultValues: {
            title: "Blood of Elves",
            pages: "632",
            copyCount: "3",
            publicationYear: "1994",
        },
        resolver: zodResolver(schema),
    });
    const { items: categories } = useFetchItems({ endpointType: "categories" });
    const { items: authors } = useFetchItems({ endpointType: "authors" });
    const { items: publishers } = useFetchItems({ endpointType: "publishers" });



    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            let transformed = {
                ...data,
                publicationYear: parseInt(data.publicationYear),
                pages: parseInt(data.pages),
                copyCount: parseInt(data.copyCount),
                category: categoryValue,
                author: authorValue,
                publisher: publisherValue,
                rentedCount: 0,
                rating: 4.0,
            };

            if (coverFile) {
                const coverPath = await uploadCoverFile(coverFile);
                transformed = {
                    ...transformed,
                    pathToCover: coverPath,
                }
            }
            else {
                transformed = {
                    ...transformed,
                    pathToCover: "",
                }
            }



            await uploadBook(transformed);

            setCoverFile(null);
            setAuthorValue("");
            setCategoryValue("");
            setPublisherValue("");
            reset();
            navigate('/');
        } catch {
            setError("root", { message: "Failed to add book." });
        }
    };


    return (
        <form
            className="flex flex-col gap-y-3 rounded-2xl min-w-[280px] xs:min-w-[400px] text-blue"
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormInput
                Icon={BookIcon}
                type="text"
                placeholder="Book title"
                register={register("title")}
                value={watch("title")}
                error={errors.title}
            />
            <FormInput
                Icon={CalendarIcon}
                type="text"
                placeholder="Publication Year"
                register={register("publicationYear")}
                value={watch("publicationYear")}
                error={errors.publicationYear}
            />
            <FormInput
                Icon={NumberIcon}
                type="text"
                placeholder="Pages"
                register={register("pages")}
                value={watch("pages")}
                error={errors.pages}
            />
            <AutocompleteProvider>
                <AutocompleteInput
                    Icon={AuthorIcon}
                    placeholder="Author"
                    register={register("author")}
                    value={authorValue}
                    setValue={setAuthorValue}
                    error={errors.author}
                    suggestions={authors}
                />
                <AutocompleteInput
                    Icon={CategoryIcon}
                    placeholder="Category"
                    register={register("category")}
                    value={categoryValue}
                    setValue={setCategoryValue}
                    error={errors.category}
                    suggestions={categories}
                />
                <AutocompleteInput
                    Icon={PublisherIcon}
                    placeholder="Publisher"
                    register={register("publisher")}
                    value={publisherValue}
                    setValue={setPublisherValue}
                    error={errors.publisher}
                    suggestions={publishers}
                />
            </AutocompleteProvider>

            <FormInput
                Icon={CopyIcon}
                type="text"
                placeholder="Number of copies"
                register={register("copyCount")}
                value={watch("copyCount")}
                error={errors.copyCount}
            />

            <div className="relative group">
                <div className="relative flex items-center">
                    <ImageIcon
                        className={clsx(
                            "absolute left-3 w-5 h-5 transition-colors z-10 pointer-events-none",
                            coverFile ? "text-accent1" : "text-slate-300 group-hover:text-white"
                        )}
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) setCoverFile(file);
                        }}
                        className={clsx(
                            "pl-10 pr-4 py-2 w-full rounded-md bg-bg text-white text-sm file:hidden border transition-colors cursor-pointer",
                            coverFile ? "border-accent1" : "border-slate-300 "
                        )}
                    />

                    <span className="absolute right-3 text-xs text-slate-400 pointer-events-none">.jpg, .png</span>
                </div>
            </div>


            <ButtonSubmit isSubmitting={isSubmitting} btnText="Add Book" />
            <FormError error={errors.root} />
        </form>
    );
};

export default AddBookFormStatic;