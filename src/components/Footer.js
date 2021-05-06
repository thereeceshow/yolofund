import React from 'react'

export default function Footer() {

    const partners = [
        { name: 'Polygon.io', url: 'https://polygon.io/', text: 'Proivder of our Real Time Data on the Stock Market' },
        { name: 'Sapling: Grow your Money', url: 'https://awesome-sapling.web.app/', text: 'Set Goals to Save, Take Charge of your Finances Today' },
        { name: 'Awesome Inc.', url: 'https://www.awesomeinc.org/', text: 'The Best Web Deb Bootcamp this Side of Mars' },
        { name: 'Reece\'s Blog', url: 'https://reecewalter.com', text: 'Check Out my Other Projects' },
        { name: 'Why? Record Co.', url: 'https://whyrecord.com/', text: 'Local Record Label with the Best New EDM.' },
        { name: 'Lex Design Co.', url: 'https://lexingtondesignco.com', text: 'For all your Graphic Design Needs' }
    ]


    return (
        
        <nav className="navbar navbar-expand-lg navbar-light bg-light rounded mt-5" id="footer">
            <div className="container-fluid">
                <div className="navbar-collapse justify-content-center" id="navbarText">
                    <ul className="navbar-nav">
                        {partners.map(el => {
                            return (
                                <li className="nav-item">
                                    <a className="nav-link" href={el.url}>  {el.name} </a> {el.text}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </nav>
        
    )
}
