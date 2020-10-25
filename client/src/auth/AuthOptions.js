



import React, { useContext } from 'react'
import {useHistory} from 'react-router-dom'
import { MyContext} from '../context/UserContext'
function AuthOptions() {

    const {userData,setUserData} = useContext(MyContext)



    const history = useHistory()

    const register =()=>{
        history.push('/register')
    }

    const login =()=>{
        history.push('/login')
    }

    const logout = () =>{
        setUserData({
            token:undefined,
            user:undefined
        })
        localStorage.setItem("auth-token", "");
    }
    console.log(userData.user)

    return (
        <div>
            <nav className="auth-options">
       {userData.user ? (
                <button onClick={logout}>Log out</button>
      ) : (
        <>
          <button onClick={register}>Register</button>&nbsp;&nbsp;
          <button onClick={login}>Log in</button>
        </>
      )}
    </nav>
        </div>
    )
}

export default AuthOptions


