import React from 'react';
import { logOut } from '../service/userService';
function Logout(props) {
    logOut();
    window.location="/";

    return (
        <div>
            logout
        </div>
    );
}

export default Logout;