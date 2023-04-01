import React from 'react';
import {NavLink} from 'react-router-dom'

const LeftNav = () => {
    return (
        <div className='left-nav-container'>
            <div className='icons'>
                <div className='icons-bis'>
                    <NavLink to='/' exact activeclassname="active-left-nav">
                        <img src='./img/icons/home.svg' alt='home'/>
                    </NavLink>
                    <br/>
                    <NavLink to='/trending' exact activeclassname="active-left-nav">
                        <img src='./img/icons/rocket.svg' alt='home'/>
                    </NavLink>
                    <br/>
                    <NavLink exact to='/profil' activeclassname="active-left-nav">
                        <img src='./img/icons/user.svg' alt='home'/>
                    </NavLink>
                    <br/>
                </div>
            </div>
        </div>
    );
};

export default LeftNav;