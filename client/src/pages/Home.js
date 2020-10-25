


// import React, { useEffect,useContext } from 'react'

// import { useHistory } from "react-router-dom";
// import { MyContext} from '../context/UserContext'


// function Home() {

//   const { userData } = useContext(MyContext);
//   const history = useHistory()
//   useEffect(()=>{
//        if(!userData.user)   history.push('/login')
       
        
       
//   },[userData])
//   return  <div className="page">    home    </div>
   
        
   
  
// }

// export default Home



import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext} from '../context/UserContext'

export default function Home() {
  const { userData } = useContext(MyContext);

  return (
    <div className="page">
      {userData.user ? (
        <h1>Welcome {userData.user.displayName}</h1>
      ) : (
        <>
          <h2>You are not logged in</h2>
          <Link to="/login">Log in</Link>
        </>
      )}
    </div>
  );
}