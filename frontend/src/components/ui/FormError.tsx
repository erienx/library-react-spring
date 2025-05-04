
type FormType = {
    error?: { message?: string };
};

const FormError = ({ error }: FormType) => {
    return (
        error && <div className="text-red-400 text-sm mt-1" >{error.message}</div>
    )
}

export default FormError