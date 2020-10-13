import * as React from 'react';
import { Route } from 'react-router-dom';

export default function LRoute({ children, path, title, exact }) {

    return (
        <Route exact={exact} path={path}>
            {(()=>{document.title = "VKCloud | " + title})()}
            {children}
        </Route>
    );
}

LRoute.defaultProps = {
    exact: false
}

/*
Created: 20:07 Mon 12 October 2020
Location: NovaLucem
*/