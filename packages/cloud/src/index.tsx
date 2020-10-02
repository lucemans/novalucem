import * as React from 'react';
import { render } from 'react-dom';
import App from './App';
import queryString from 'query-string';
import buildUrl from 'build-url';

console.log('Version: ' + process.env.npm_package_version);

((a) => {
    if (location.search) {
        const res = queryString.parse(location.search);
        if (res['auth']) {
            sessionStorage.setItem('token', res['auth'].toString());
            location.href = (buildUrl(location.protocol + "//" + location.host + location.pathname));
        } else {
            console.error('Gotten unknown search');
        }
    }
    if (!sessionStorage.getItem('token')) {
        location.replace('https://auth.lvk.sh/login?callback=' + location.toString());
    }
    
    // Render root
    var root = document.getElementById("root");
    
    render(<App></App>, root);
})();