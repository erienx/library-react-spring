import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInput from "./FormInput";
import ButtonSubmit from "./ui/ButtonSubmit";
import FormError from "./ui/FormError";

import BookIcon from "../assets/form/book.svg?react";
import NumberIcon from "../assets/form/numbers.svg?react";
import AuthorIcon from "../assets/form/author.svg?react";
import CalendarIcon from "../assets/form/calendar.svg?react";
import PublisherIcon from "../assets/form/publisher.svg?react";
import CategoryIcon from "../assets/form/category.svg?react";
import CopyIcon from "../assets/form/copy.svg?react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AutocompleteInput from "./AutocompleteInput";
import { AutocompleteProvider } from "./providers/AutocompleteProvider";


const schema = z.object({
    title: z.string().min(1, "Title is required"),
    publicationYear: z.string().regex(/^\d{4}$/, "Enter a valid year (YYYY)"),
    pages: z.string().regex(/^\d+$/, "Pages must be a number"),
    author: z.string().min(1, "Author is required"),
    publisher: z.string().min(1, "Publisher is required"),
    category: z.string().min(1, "Category is required"),
    copyCount: z.string().regex(/^\d+$/, "Copy count must be a number"),
});

type FormFields = z.infer<typeof schema>;

const AddBookForm = () => {
    const navigate = useNavigate();
    const [categoryValue, setCategoryValue] = useState("");
    const [publisherValue, setPublisherValue] = useState("");
    const [authorValue, setAuthorValue] = useState("");

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
            author: "Andrzej Sapkowski",
            // category: "Fantasy",
            pages: "632",
            copyCount: "3",
            publicationYear: "1994",
            publisher: "Supernova",
        },
        resolver: zodResolver(schema),
    });
    const categories = ["Fantasy", "Sci-Fi", "History", "Biography"];
    const authors = ["Andrzej Sapkowski", "J. K. Rowling", "Robert Greene"];
    const publishers = ["Supernova", "Fonopolis", "Penguin Books"];



    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            const transformed = {
                ...data,
                publicationYear: parseInt(data.publicationYear),
                pages: parseInt(data.pages),
                copyCount: parseInt(data.copyCount),
                category: categoryValue,
            };

            await mockUpload(transformed);

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

            <ButtonSubmit isSubmitting={isSubmitting} btnText="Add Book" />
            <FormError error={errors.root} />
        </form>
    );
};

export default AddBookForm;

async function mockUpload(data: any) {
    return new Promise((resolve) => {
        console.log("Uploading book: ", data);
        setTimeout(resolve, 1000);
    });
}
