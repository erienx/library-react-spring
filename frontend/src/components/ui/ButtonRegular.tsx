type ButtonRegularProps = {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
}

const ButtonRegular = ({ text, onClick, disabled = false, className = "" }: ButtonRegularProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`bg-accent1 hover:bg-accent1-hover filter saturate-80 px-20 py-3 rounded-lg text-3xl text-white cursor-pointer transition-colors duration-150 w-fit mx-auto ${className}`}
        >
            {text}
        </button>
    );
};


export default ButtonRegular