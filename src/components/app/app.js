import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import AppHeader from '../app-header';

import {ContactsPage, FavoritesPage, LoginPage} from "../pages";

import PrivateRoute from '../../routes/private-route';

import {AuthProvider} from "../../utils/auth";

import "./app.css";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <AppHeader/>
                <div>
                    <PrivateRoute exact path="/favorites" component={FavoritesPage}/>
                    <PrivateRoute exact path="/" component={ContactsPage}/>
                    <Route exact path="/login" component={LoginPage}/>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;