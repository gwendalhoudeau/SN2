import React, { useEffect, useState } from 'react'
import Routes2 from "./components/Routes2"
import { UidContext } from './components/AppContext'
import axios from 'axios'
import { useDispatch } from "react-redux"
import { getUser } from './actions/user.actions'

const App = () => {
  const [uid, setUid] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchToken = async () => {
      console.log(`${process.env.REACT_APP_API_URL}testurl`)
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true
      })
        .then((res) => {
          setUid(res.data)
        }) 
        .catch((err) => console.log("no token"))
    }
    fetchToken()

    if(uid) dispatch(getUser(uid))
  }, [uid,dispatch])

  return (
    <UidContext.Provider value={uid}>
      <Routes2 />
    </UidContext.Provider>

  );
}

export default App;
