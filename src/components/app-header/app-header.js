import React from 'react';
import {Link} from 'react-router-dom';

import './app-header.css';


const AppHeader = () => {
    return(
        <header className="app-header">
            <Link className="font" to="/">
                <div className="logo">Contact Manager</div>
            </Link>
    <div className="menu">

                <Link className="font" to="/">
                    <div >Contacts</div>
                </Link>

                <Link className="font" to="/favorites">
                    <div >Favorites</div>
                </Link>

    </div>

        </header>
    )
};

export default AppHeader;