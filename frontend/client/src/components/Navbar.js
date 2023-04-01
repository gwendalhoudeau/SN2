import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./log/Logout";

const Navbar = () => {
    const uid = useContext(UidContext)

    const userData = useSelector((state) => state.user)

    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink exact to="/">
                        <div className="logo">
                            <img src="./img/icon.png" alt="icon"/>
                            <h3>Racoont</h3>
                        </div>
                    </NavLink>
                </div>
                {uid ? (
                    <ul>
                        <li className="welcome">
                            <NavLink exact to="/profil">
                                <h5>bienvenue {userData.pseudo}</h5>
                            </NavLink>
                        </li>
                        <Logout/>
                    </ul>
                ) : (
                    <ul>
                        <li>
                            <NavLink exact to ="/profil">
                                <img src="./img/icons/login.svg" alt="login"/>
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    )
}

export default Navbar;