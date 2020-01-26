import React from 'react';

import FavoritesList from '../favorites-list';
import AccountStatusBar from '../account-status-bar';

const FavoritesPage = () =>{
    return <div>
        <AccountStatusBar/>
        <FavoritesList/>
    </div>
};

export default FavoritesPage;