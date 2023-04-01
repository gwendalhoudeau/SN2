import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from '../Utils';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FollowHandler from './FollowHandler';

const FriendsHint = () => {
    const [isloading,setIsLoading] = useState(true)
    const [playOnce, setPlayOnce] = useState(true)
    const [friendsHint,setFriendsHint] = useState([])
    const userData = useSelector((state) => state.user)
    const usersData = useSelector((state) => state.users)

    

    useEffect(() =>{
        const notFriendList = () => {
            let array = []
            usersData.map((user) => {
                if(user._id !== userData._id && !user.followers.includes(userData._id))
                    return array.push(user._id)
            })
            if(window.innerHeight>780) array.length=5
            else if(window.innerHeight>720) array.length=4
            else if(window.innerHeight>615) array.length=2
            else if(window.innerHeight>540) array.length=1
            else array.length=0
            setFriendsHint(array.sort(()=>0.5-Math.random()))
        }

        if(playOnce && !isEmpty(usersData[0]) && !isEmpty(userData._id)) {
            notFriendList()
            setIsLoading(false)
            setPlayOnce(false)
        }
    },[userData,usersData,playOnce])

    return (
        <div className='get-friends-container'>
            <h4>Suggestions</h4>
            {isloading ? (
                <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
                <ul>
                    {friendsHint && friendsHint.map((user) => {
                        for(let i=0;i<usersData.length;i++){
                            if(user===usersData[i]._id){
                                return (
                                    <li className='user-hint'>
                                        <img src={usersData[i].picture} alt="user-pic"/>
                                        <p>{usersData[i].pseudo}</p>
                                        <FollowHandler idToFollow={usersData[i]._id} type={"suggestion"}/>
                                    </li>
                                )
                            }
                        }
                    })}
                </ul>
            )}
        </div>
    );
};

export default FriendsHint;