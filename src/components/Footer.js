import React from 'react'

export default function Footer() {

    const partners = [
        { name: 'Polygon.io', url: 'https://polygon.io/' },
        { name: 'Sapling: Grow your Money', url: 'https://awesome-sapling.web.app/' },
        { name: 'Awesome Inc', url: 'https://www.awesomeinc.org/' },
        { name: 'Reece Walter\'s Blog', url: 'https://'}
    ]

    return (
        <nav className="navbar navbar-expand-lg fixed-bottom navbar-light bg-light rounded">
            <div className="container-fluid">
                <div className="navbar-collapse justify-content-center" id="navbarText">
                    <ul className="navbar-nav">
                        {partners.map(el => {
                            return (
                                <li className="nav-item">
                                    <a className="nav-link" href={el.url}>  {el.name} </a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
