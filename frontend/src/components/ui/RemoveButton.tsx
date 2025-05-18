interface RemoveButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    loading: boolean;
}

const RemoveButton: React.FC<RemoveButtonProps> = ({ onClick, loading }) => {
    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onClick(e);
            }}
            disabled={loading}
            className="cursor-pointer px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg text-sm font-semibold shadow filter saturate-80"
        >
            {loading ? "Removing..." : "Remove"}
        </button>
    );
};

export default RemoveButton;
