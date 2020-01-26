import React, {useCallback, useContext} from 'react';
import {Redirect, withRouter}from 'react-router';

import app from '../../base';

import {AuthContext} from "../../utils/auth";

import './login-form.css';

const LoginForm = ({ history }) => {
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await app
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                history.push("/");
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    const { currentUser } = useContext(AuthContext);

    if(currentUser){
        return <Redirect to="/"/>
    }

    return(
        <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                        else.
                    </small>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input name="password" type="password" className="form-control" id="exampleInputPassword1"/>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
};

export default withRouter(LoginForm);