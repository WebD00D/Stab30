import React from 'react'
import Link, { withPrefix } from 'gatsby-link';


export default () => (
  <nav className="nav" role="navigation">
    <div className="nav-wrapper">

      <div className="sponsored-logos">
             <a target="_blank" href="https://www.stabmag.com"><img
                className="log logo-signup--stab--main"
                src={withPrefix('images/stab30RGB.png')}
                alt="Logo"
              /></a>
              <div className="t-mono presented-by">PRESENTED BY </div>

              <a target="_blank" href="https://www.agendashow.com/"><img
                className="log logo-signup--agenda--main"
                src={withPrefix('images/agenda.png')}
                alt="Logo"
              /></a>
              </div>

    </div>


  </nav>
)
