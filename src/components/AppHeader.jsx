import React from 'react'
import {NavLink} from 'react-router-dom'

export default function AppHeader() {
  return (
    <header className="app-header flex">
      <h1 className="logo"> Weather </h1> 
     
      <section className="nav-bar flex"> 
        <NavLink to="/"> Home </NavLink>      
        <NavLink to="/favorite"> Favorites </NavLink>
      </section>  
    </header>
  )
}
