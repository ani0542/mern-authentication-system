import React, { useState,useContext } from 'react'
import {MyContext} from '../context/UserContext'
import { useHistory } from "react-router-dom";
import Axios from "axios";
import ErrorNotice from '../misc/ErrorNotice';
function Register() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [displayName, setDisplayName] = useState();
    const [error, setError] = useState();


    const {setUserData}= useContext(MyContext)


    const history = useHistory();


    const handleSubmit= async(e)=>{
        e.preventDefault();
        // console.log(email,password,passwordCheck,displayName)
     try {
        let newUser = { email, password, passwordCheck, displayName };


       

           await Axios.post("/users/register", newUser);


           const loginRes = await Axios.post("/users/login", {
            email,
            password,
          });

        //   console.log(loginRes)

          setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user,
          });

          localStorage.setItem("auth-token", loginRes.data.token);
          history.push("/");
          // history.push('/login')

     } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
     }


    }
    return (
        <>
                <div className="page">
                         <h2>Register</h2>
                         {
                           error && (
                             <ErrorNotice message={error}  clearError={() => setError(undefined)}/>
                           )
                         }
                               <form className="form"  onSubmit={handleSubmit}>

                                   
                                        <label htmlFor="register-display-name">Display name</label>
                                        <input
                                        id="register-display-name"
                                        type="text"
                                         onChange={(e)=>setDisplayName(e.target.value)}
                                        //  value={displayName}
                                        />
                                   <label htmlFor="register-email">Email</label>
                                        <input
                                        id="register-email"
                                        type="email"
                                        onChange={(e)=>setEmail(e.target.value)}
                                        // value={email}
                                        />

                                     <label htmlFor="register-password">Password</label>
                                        <input
                                        id="register-password"
                                        type="password"
                                        onChange={(e)=>setPassword(e.target.value)}
                                        //  value={password}
                                        />
                                        <input
                                        type="password"
                                        placeholder="Verify password"
                                        onChange={(e)=>setPasswordCheck(e.target.value)}
                                        // value={passwordCheck}
                                        />


                                         <input type="submit" value="Register" />
      </form>
                </div>
        </>
    )
}

export default Register




