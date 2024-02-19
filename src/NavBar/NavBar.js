import { useEffect, useState } from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./NavBarElements";
import { useNavigate } from "react-router-dom";
 
const Navbar = () => {
    const navigate = useNavigate();
    const [buttonText, setButtonText] = useState('Sign In');

    const onClickSignIn = () => {
        localStorage.removeItem('user');
        setButtonText('Sign In');
    }

    useEffect(() => {
        const token = localStorage.getItem('user');
        if(!token) {
            setButtonText('Sign In');
            navigate("/Login");
          
        } else {
            setButtonText('Log Out');
        }
    });

    return (
        <>
        <Nav>
            <Bars /> 
            <NavMenu>
                <NavLink to="/Home" >
                    Home
                </NavLink>
                <NavLink to="/shedule">
                    Schedule
                </NavLink>                    
            </NavMenu>
            <NavBtn>
                <NavBtnLink onClick={onClickSignIn} to="/Login">
                    {buttonText}
                </NavBtnLink>
            </NavBtn>
        </Nav>
        </>
    );
};
 
export default Navbar;