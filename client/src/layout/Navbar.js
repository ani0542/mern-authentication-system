




  
import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../auth/AuthOptions";


export default function Navbar() {
  return (
    <header id="header">
      <Link to="/">
        <h1 className="title">MERN auth template</h1>
      </Link>
     <AuthOptions/>
    </header>
  );
}