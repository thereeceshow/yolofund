import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'

export default function Footer() {

    let history = useHistory();

    const partners = [
        { name: 'Polygon.io', url: 'https://polygon.io/', text: 'Provider of our Real Time Data on the Stock Market' },
        { name: 'Sapling: Grow your Money', url: 'https://awesome-sapling.web.app/', text: 'Set Goals to Save, Take Charge of your Finances Today' },
        { name: 'Awesome Inc.', url: 'https://www.awesomeinc.org/', text: 'The Best Web Deb Bootcamp this Side of Mars' },
        { name: 'Reece\'s Blog', url: 'https://reecewalter.com', text: 'Check Out my Other Projects' },
        { name: 'Why? Record Co.', url: 'https://whyrecord.com/', text: 'Local Record Label with the Best New EDM.' },
        { name: 'Lex Design Co.', url: 'https://lexingtondesignco.com', text: 'For all your Graphic Design Needs' }
    ]


    return (
        
        <nav className="navbar navbar-expand-lg navbar-light bg-light rounded" id="footer">
            <div className="container-fluid">
                <div className="navbar-collapse justify-content-center" id="navbarText">
                    <ul className="navbar-nav">
                        {partners.map((el, index) => {
                            return (
                                <li key={index} className="nav-item mx-5">
                                    <NavLink className="nav-link" to={el.url}><strong>{el.name}</strong></NavLink>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </nav>
        
    )
}
