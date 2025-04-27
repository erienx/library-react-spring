// import ProfileIcon from "../assets/profile-icon.svg?react"
import { Link, useNavigate } from "react-router-dom"
import CartIcon from "../assets/cart-icon.svg?react"
import { useAuth } from "./providers/AuthProvider";
import { useHasAccess } from "../hooks/useHasAccess";
// import SearchIcon from "../assets/search-icon.svg?react"

const UpperHeader = () => {
    const {currentUser, handleLogout} = useAuth();
    const isAdmin = useHasAccess(['admin']);
    const navigate = useNavigate();

    const logoutAndRedirect = async ( ) =>{
        await handleLogout();
        navigate('/');
    }

    return (
        <>
            <header className="flex flex-col sm:flex-row justify-end items-center px-4 sm:px-14 py-3 flex-wrap gap-y-12 sm:gap-y-8 ">
                <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-8 lg:gap-12">
                {isAdmin && (<Link to='/admin'>Admin stuff</Link>)}
                    {currentUser ? (
                        <>
                            <span className="regular-text">Welcome, <span className="font-semibold">{currentUser.firstName + " " + currentUser.lastName}</span></span>
                            <button onClick={logoutAndRedirect} className="regular-text cursor-pointer">Sign Out</button>
                        </>
                    ):
                    (
                        <>
                            <Link to='register' className="regular-text">Register</Link>
                            <Link to='login' className="regular-text">Sign in</Link>
                        </>
                    )}
                    {/* <div className="flex items-center gap-2">
                        <ProfileIcon />
                        <span className="regular-text">My Profile</span>
                    </div> */}


                    <Link to='cart' className="flex items-center gap-2">
                        <CartIcon color="white"/>
                        <span className="regular-text">Items</span>
                    </Link>

                    {/* <div className="flex items-center gap-2">
                        <span className="regular-text">$0.00</span>
                        <SearchIcon />
                    </div> */}
                </div>

            </header >
        </>
    )
}

export default UpperHeader