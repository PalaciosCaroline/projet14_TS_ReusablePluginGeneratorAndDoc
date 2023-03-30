import React from "react";
import { NavLink } from 'react-router-dom'
import logoHRnet from './../assets/logoHRnet_bg.png'

export default function Home() {

  return (
    <main className='box_home'>
        <img src={logoHRnet} alt="" className="logoHome"/>
        <h1>HRnet</h1><br/>
        <nav className='box_navHome'>
          <NavLink to="/newemployee" className="linkNewEmployee">Add a new employee</NavLink>
          <NavLink to="/listemployees" className="linkNewEmployee linkListEmployee">View the employees's list</NavLink>
        </nav>
    </main>
  )
}
