import React, { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const Log = (props) => {

    const [signUpModal,setSignUpModal] = useState(props.signup)
    const [signInModal,setSignInModal] = useState(props.singin)   
    
    const handldeModals = (e) => {
        if(e.target.id === 'register') {
            setSignInModal(false)
            setSignUpModal(true)
        } else if (e.target.id==='login'){
            setSignInModal(true)
            setSignUpModal(false)
        }
    }


    return (
        <div className='connection-form'>
            <div className='form-container'>
                <ul>
                    <li onClick={handldeModals} id="register" className={signUpModal? "active-btn" : null}>S'inscrire</li>
                    <li onClick={handldeModals} id='login' className={signInModal? "active-btn" : null}>Se connecter</li>
                    {signUpModal && <SignUpForm/>}
                    {signInModal && <SignInForm/>}
                </ul>
            </div>
        </div>
    )
}

export default Log;
