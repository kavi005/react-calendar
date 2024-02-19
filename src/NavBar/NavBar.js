import { useContext, useEffect, useState } from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./NavBarElements";
import { useNavigate } from "react-router-dom";
import { UserSessionContext } from "../App";
 
const Navbar = () => {
    const navigate = useNavigate();
    const [buttonText, setButtonText] = useState('Sign In');

    const userContext = useContext(UserSessionContext);

    const onClickSignIn = () => {
        localStorage.removeItem('user');
        setButtonText('Sign In');
    }

    useEffect(() => {
        const token = localStorage.getItem('user');
        if(!token) {
            setButtonText('Sign In');
            navigate("/login");
          
        } else {
            setButtonText('Log Out');
        }
        
    },[userContext]);

    return (
        <>
        <Nav>
            <Bars /> 
            <NavMenu>
                <NavLink to="/" >
                    Home
                </NavLink>
                <NavLink to="/schedule">
                    Schedule
                </NavLink>                    
            </NavMenu>
            <NavBtn>
                <NavBtnLink onClick={onClickSignIn} to="/login">
                    {buttonText}
                </NavBtnLink>
            </NavBtn>
        </Nav>
        </>
    );
};
 
export default Navbar;