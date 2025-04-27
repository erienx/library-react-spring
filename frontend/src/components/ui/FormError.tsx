
type FormType = {
    error?: { message?: string };
  };

const FormError = ({ error }: FormType) => {
    return (
        error && <div className="text-red-400 font-semi-bold" >{error.message}</div>
    )
}

export default FormError