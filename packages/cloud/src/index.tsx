import * as React from 'react';
import { render } from 'react-dom';
import App from './App';
import { checkToken, handleSearch } from './managers/UserManager';

console.log('Version: ' + process.env.npm_package_version);

(() => {
    
    // Handle ?= search headers
    let a = handleSearch(location.search, location.protocol + "//" + location.host + location.pathname)
    a.length > 0 && location.replace(a)

    // Handle Redirecting if the user isnt logged in
    let b = checkToken(localStorage.getItem('token'), 'https://auth.lvk.sh/login?callback=' + location.toString())
    b.length > 0 && [localStorage.clear(), location.replace(b)]
    
    // Render root
    var root = document.getElementById("root")
    render(<App></App>, root)
})();