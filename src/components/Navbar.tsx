import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar: React.FC = () => (
  <div className="navbar-fixed">
    <nav>
      <div className="nav-wrapper pink lighten-1 px1">
        <img className="responsive-img" alt="Logo" src="images/logo-square.svg" style={{ height: '100%' }} ></img>
        <NavLink to="/" className="brand-logo">
          &nbsp;hello CoViD-19
      </NavLink>
        <a href="/" data-target="mobile-sidebar" className="sidenav-trigger right"><i className="material-icons">menu</i></a>
        <ul id="nav-mobile" className="right">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/cohort">Cohort</NavLink>
          </li>
          <li>
            <NavLink to="/bycountry">By Country</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </div>
    </nav>
    <ul className="sidenav right" id="mobile-sidebar">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/bycountry">By Country</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
    </ul>
  </div>
)
