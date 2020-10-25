import React, { useState,useContext } from 'react'
import {MyContext} from '../context/UserContext'
import { useHistory } from "react-router-dom";
import Axios from "axios";
import ErrorNotice from '../misc/ErrorNotice';

function Login() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    
    const {setUserData}= useContext(MyContext)


    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        try {
          const loginUser = { email, password };
          const loginRes = await Axios.post(
            "/users/login",
            loginUser
          );
          setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user,
          });
          localStorage.setItem("auth-token", loginRes.data.token);
          history.push("/");
        } catch (err) {
          err.response.data.msg && setError(err.response.data.msg);
        }
      };

    return (
        <>
                  <div className="page">
                       <h2>Log in</h2>
                            {error && (
                                <ErrorNotice message={error} clearError={() => setError(undefined)} />
                            )}
                                <form className="form" onSubmit={submit}>
                                    <label htmlFor="login-email">Email</label>
                                    <input
                                    id="login-email"
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    />

                                    <label htmlFor="login-password">Password</label>
                                    <input
                                    id="login-password"
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    />

                                    <input type="submit" value="Log in" />
                                </form>
                      </div>
        </>
    )
}

export default Login