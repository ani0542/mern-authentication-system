



import React, { useEffect, useState } from 'react'
import Axios from "axios";
export const MyContext = React.createContext(null);
function UserContext(props) {
    const [userData,setUserData] = useState({
        token:undefined,
        user:undefined
    })

    useEffect(()=>{
                       const checkLoggedIn = async ()=>{
                        let token = localStorage.getItem("auth-token");
                        if (token === null) {
                            localStorage.setItem("auth-token", "");
                            token = "";
                          }

                          const tokenRes = await Axios.post(
                            "/users/tokenIsValid",
                            null,
                            { headers: { "x-auth-token": token } }
                          );

                          console.log(tokenRes.data)



                          if (tokenRes.data) {
                            const userRes = await Axios.get("/users", {
                              headers: { "x-auth-token": token },
                            });
                            // console.log(userRes)
                            setUserData({
                                token:token,
                                user: userRes.data,
                              });
                            }

                       }

                       checkLoggedIn ()
    },[])
    return (
        <>
            <MyContext.Provider value={{userData,setUserData}}>
                       {props.children} 
            </MyContext.Provider>
        </>
    )
}

export default UserContext
