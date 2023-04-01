import React, { useContext, useState } from 'react'
import { UidContext } from '../components/AppContext';
import LeftNav from '../components/LeftNav';
import NewPostForm from '../components/Post/NewPostForm';
import Thread from '../components/Thread';
import Log from '../components/log'
import Trend from '../components/Trend';
import FriendsHint from '../components/Profil/FriendsHint';

const Home = () => {
    const uid = useContext(UidContext)
    

    return (
        <div className='home'>
            <LeftNav/>
            <div className='main'>
                <div className='home-header'>
                    {uid ? <NewPostForm/> : <Log signIn={true} singUp={false}/>}
                </div>
                <Thread/>
            </div>
            <div className='right-side'>
                <div className='right-side-container'>
                    <div className='wrapper'>
                        <Trend/>
                        {uid && <FriendsHint/>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
