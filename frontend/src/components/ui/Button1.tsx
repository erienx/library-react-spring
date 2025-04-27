type Button1PropsType = {
    onClick: () => void;
    text: string;
}

const Button1 = ({ onClick, text }: Button1PropsType) => {
    return (
        <div className="flex justify-center items-center mt-6 mb-4">
            <button
                onClick={onClick}
                className="px-6 py-3 text-2xl md:text-4xl font-semibold text-white bg-accent1 hover:bg-accent1-hover rounded-md transition-all duration-300 hover:bg-accent1-dark hover:scale-102 shadow-md hover:shadow-lg cursor-pointer">
                {text}</button>
        </div>
    )
}

export default Button1