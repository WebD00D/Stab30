import React from 'react'
import Link, { withPrefix } from 'gatsby-link'

export default () => (
  <nav className="nav" role="navigation">
    <div className="nav-wrapper">
      <img
        className="logo"
        src={withPrefix('images/stab30.png')}
        alt="Logo"
      />
      <div className="nav-title">
        <div className="t-mono fc-pink f-10 t-upper ls-2 fw-400">
          A Stab x Agenda Joint
        </div>
        <div className="t-mono fc-blue f-18 t-upper ls-2 fw-700">
          30 Under 30
        </div>
      </div>
    </div>

    
  </nav>
)
