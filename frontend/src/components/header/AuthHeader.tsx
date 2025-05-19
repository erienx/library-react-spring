import HomeButton from "../ui/HomeButton"
import LanguageOptions from "../ui/LanguageOptions"

const AuthHeader = () => {
    return (
        <header className="w-full bg-bg px-4 sm:px-10 py-4">
            <div className="mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
                <HomeButton />
                <LanguageOptions />
            </div>
        </header>
    )
}

export default AuthHeader