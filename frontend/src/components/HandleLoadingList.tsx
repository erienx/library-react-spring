import Spinner from "./ui/Spinner";
import DummyLoadingCards from "./ui/DummyLoadingCards";

type HandleLoadingListProps = {
  isLoading: boolean;
  errorMsg?: string;
  items: never[];
  searchInp?: string;
  itemType?: string;
  children: React.ReactNode;
};

export const HandleLoadingList = ({ isLoading, errorMsg, items, searchInp, itemType = 'items', children, }: HandleLoadingListProps) => {
  if (isLoading) {
    return (
      <>
        <DummyLoadingCards />
        <Spinner />
      </>
    );
  }

  if (errorMsg) {
    return (
      <div className="flex justify-center items-center">
        <h3 className="text-3xl text-red-500">{errorMsg}</h3>
      </div>
    );
  }

  if (searchInp && items.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <h3 className="text-3xl text-white">No {itemType} found</h3>
      </div>
    );
  }

  return <>{children}</>;
};
