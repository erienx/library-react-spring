import Spinner from "./ui/Spinner";

type HandleLoadingSingleItemProps = {
    isLoading: boolean;
    errorMsg?: string;
    notFoundCondition?: boolean;
    notFoundMessage?: string;
    children: React.ReactNode;
};

export const HandleLoadingSingleItem = ({
    isLoading,
    errorMsg,
    notFoundCondition,
    notFoundMessage,
    children,
}: HandleLoadingSingleItemProps) => {
    if (isLoading) return <Spinner />;

    if (errorMsg)
        return (
            <div className="flex justify-center items-center">
                <h3 className="text-3xl text-red-500">{errorMsg}</h3>
            </div>
        );

    if (notFoundCondition)
        return (
            <div className="flex justify-center items-center">
                <h3 className="text-3xl text-white">{notFoundMessage}</h3>
            </div>
        );

    return <>{children}</>;
};
