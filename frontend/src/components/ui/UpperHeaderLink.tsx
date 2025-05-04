import { FC, SVGProps } from "react";
import { Link } from "react-router-dom";

type UpperHeaderLinkProps = {
    Icon?: FC<SVGProps<SVGSVGElement>>;
    to: string;
    text: string;
};

const UpperHeaderLink = ({ to, text, Icon }: UpperHeaderLinkProps) => {
    return (
        <Link to={to}
            className="flex items-center gap-2 px-4 py-2 bg-bg-lighter text-white text-sm font-medium rounded-md shadow-md hover:bg-bg hover:text-accent1 transition"
        >
            {Icon && <Icon width={20} height={20} />}
            {text}
        </Link>
    )
}

export default UpperHeaderLink