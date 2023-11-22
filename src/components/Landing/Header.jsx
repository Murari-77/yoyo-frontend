import { useNavigate } from "react-router-dom"
import Button from "../common-components/Button"
import Logo from '../../assets/images/logo.png';
import { useContext } from "react";
import { UserContext } from "../../App";

const Header = () => {
    const { user, setUser } = useContext(UserContext)

    const navigate = useNavigate();

    const onLogout = () => {
        setUser({
            loggedIn: false,
            userDetails: null,
        })
        navigate('/login')
    }
    return (
        <header className="bg-white shadow-lg">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
                <img
                    src={Logo}
                    alt="Logo"
                    className="h-8 mr-4"
                />
            </div>
            {/* Buttons - Hotel Login and Customer Login */}
            <div className="flex items-center space-x-4">
                {user?.loggedIn ?
                    <div className="flex items-center gap-[12px]">
                        <div>{user.userDetails.fullName || user.userDetails.hotelName}</div>
                        <Button onClick={() => onLogout()} text="Logout"/>
                    </div> :
                        <Button onClick={() => navigate('/login')} text="Login"/>
                }
            </div>
            </div>
        </header>
    )
}

export default Header;