import * as React from 'react';
import Version from './Version';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams, useLocation
} from "react-router-dom";

function NavEntry(props: { url: string, exact: boolean, match: string, children: any }) {
    const route = useLocation();
    return (
        <Link to={props.url}>
            <div className={"entry" + (route.pathname.match(props.match) ? " active" : "")}>
                {props.children}
            </div>
        </Link>)
}

export default function Sidebar(props: any) {

    const f = useLocation();
    console.log(f);

    return (
        <div className="sidebar">
            <NavEntry url="/" exact={true} match="^/$">
                Control Panel
            </NavEntry>
            <NavEntry url="/machines" exact={true} match="^/machines$">
                Machines
            </NavEntry>
            <NavEntry url="/apps" exact={true} match="^/apps$">
                Applications
            </NavEntry>
            <div className="bottom">
                <Version></Version>
            </div>
        </div>
    );
}

/*
Created: 15:59 Mon 12 October 2020
Location: NovaLucem
*/