import React, { useContext } from 'react'
import Log from '../components/log'
import { UidContext } from '../components/AppContext'
import UpdateProfil from '../components/Profil/UpdateProfil'
import LeftNav from '../components/LeftNav'

const Profil = () => {
    const uid = useContext(UidContext)
    return (
        <div className='profil-page'>
            {uid ? (<UpdateProfil/>) : ( 
                
                <div className='log-container'>
                    <LeftNav/>                    
                    <Log signin={false} singup={true} />
                    <div className='image-container'>
                        <img src="./img/log.svg" alt="img-log"/>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Profil;
