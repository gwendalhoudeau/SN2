import React, { useContext } from 'react'
import {UidContext} from "../components/AppContext"
import { useSelector } from 'react-redux'
import LeftNav from '../components/LeftNav'
import { isEmpty } from '../components/Utils'
import Card from '../components/Post/Card'
import Trend from '../components/Trend'
import FriendsHint from '../components/Profil/FriendsHint'

const Trending = () => {
    const uid = useContext(UidContext)
    const trendList = useSelector((state) => state.trending)
    return (
        <div className='trending-page'>
            <LeftNav/>
            <div className='main'>
                <ul>
                    {!isEmpty(trendList[0]) && trendList.map((post)=> <Card post={post} key={post._id}/>)}
                </ul>
            </div>
            <div className='right-side'>
                <div className='right-side-container'>
                    <Trend/>
                    {uid && <FriendsHint/>}
                </div>
            </div>
        </div>
    )
}

export default Trending;
