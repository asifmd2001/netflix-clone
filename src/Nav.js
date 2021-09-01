import React, { useEffect, useState } from 'react'
import logo from './logo.png'
import './Nav.css';

function Nav() {
    const [show, handleshow] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.screenY > 100) {
                handleshow(true);
            } else handleshow(false);

        });
        return () => {
            window.removeEventListener("scroll");
        };
    }, []);


    return (
        <div className={`nav ${show && "nav_black"}`}>
            <img className="nav__logo" src={logo} alt="Trailflix Logo" />
            <div className="nav__search">
                <input type="text" />
                <button>Search</button>
            </div>
        </div>
    )
}
export default Nav
