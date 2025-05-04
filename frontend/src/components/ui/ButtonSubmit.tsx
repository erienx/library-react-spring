import Spinner from "../ui/Spinner"
type SubmitType = {
    isSubmitting: boolean
    btnText?: string;
}

const ButtonSubmit = ({ isSubmitting, btnText }: SubmitType) => {
    return (
        <button disabled={isSubmitting} type="submit" className={`${isSubmitting ? "bg-slate-500" : "bg-accent1 hover:bg-accent1-hover"} p-3 rounded-xl text-white cursor-pointer transition-colors duration-150 filter saturate-80`}>
            {isSubmitting ?
                <Spinner /> :
                (btnText ? btnText : "Submit")}</button>
    )
}

export default ButtonSubmit