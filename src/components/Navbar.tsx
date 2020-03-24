import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar: React.FC = () => (
  <nav>
    <div className="nav-wrapper pink darken-1 px1">
      <NavLink to="/" className="brand-logo">
        hello CoViD-19
      </NavLink>
      <ul className="right hide-on-med-and-down">
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
  </nav>
)
