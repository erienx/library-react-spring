import Spinner from "../../assets/Spinner.tsx"
type SubmitType = {
    isSubmitting: boolean
    btnText?: string;
}

const ButtonSubmit = ({ isSubmitting, btnText }: SubmitType) => {
    return (
        <button disabled={isSubmitting} type="submit" className={`${isSubmitting ? "bg-slate-500" : "bg-accent1 hover:bg-accent1-hover"} p-3 rounded-xl text-white cursor-pointer transition-colors duration-150 filter saturate-80`}>
            {isSubmitting ?
                <div className="flex flex-row items-center justify-center gap-x-2"><Spinner
                    width="w-6"
                    height="h-6"
                    color="text-white"
                    darkColor="dark:grey-800"
                    fill="fill-grey-800"
                /> Loading...</div> :
                (btnText ? btnText : "Submit")}</button>
    )
}

export default ButtonSubmit