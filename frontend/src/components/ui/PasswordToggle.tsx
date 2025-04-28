import EyeClosed from "../../assets/eye-closed-icon.svg?react";
import EyeOpen from "../../assets/eye-open-icon.svg?react";
type ToggleType = {
    show: boolean;
    toggle: () => void;
}

const PasswordToggle = ({ show, toggle }: ToggleType) => {
    return (
        <button
            type="button"
            onClick={toggle}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-blue-600"
            tabIndex={-1}>
            {show ? <EyeClosed color="white" fontSize={18} /> : <EyeOpen color="white" fontSize={18} />}
        </button>
    )
}

export default PasswordToggle