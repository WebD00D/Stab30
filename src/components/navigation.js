import React from 'react'
import Link, { withPrefix } from 'gatsby-link'

export default () => (
  <nav className="nav" role="navigation">
    <div className="nav-wrapper">
      
      <div className="sponsored-logos">
             <img
                className="log logo-signup--stab--main"
                src={withPrefix('images/stab30.png')}
                alt="Logo"
              />
              <div className="t-mono presented-by">PRESENTED BY </div>
             
              <img
                className="log logo-signup--agenda--main"
                src={withPrefix('images/agenda.png')}
                alt="Logo"
              />
              </div>
      
    </div>

    
  </nav>
)
