import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from '../../pages/Home'
import Profil from '../../pages/Profil'
import Trending from '../../pages/Trending'
import Navbar from '../Navbar'

const index = () => {
    return (
        <Router> 
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/profil" element={<Profil/>}></Route>
                <Route path="/trending" element={<Trending/>}></Route>
            </Routes>
        </Router>
    )
}

export default index;
