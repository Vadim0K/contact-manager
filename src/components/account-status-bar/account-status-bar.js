import React, {useContext} from 'react';

import './account-status-bar.css';
import app from "../../base";
import {AuthContext} from "../../utils/auth";

const AccountStatusBar = () =>{
    const {currentUser} = useContext(AuthContext);

    return(
        <div className="account-status-bar">

            <span className="account-status-bar-title"><strong>User: </strong> {currentUser.email}</span>
            <button className="btn btn-danger account-status-bar-button" onClick={()=> app.auth().signOut()}>Sign out</button>

        </div>
    )
};

export default AccountStatusBar;