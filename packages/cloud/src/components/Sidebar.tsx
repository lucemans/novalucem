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

function NavEntry({ url, match, children }) {
    const route = useLocation();
    return (
        <Link to={url}>
            <div className={"entry" + (route.pathname.match(match) ? " active" : "")}>
                {children}
            </div>
        </Link>)
}

export default function Sidebar() {

    const f = useLocation();

    return (
        <div className="sidebar">
            <div className="entry spacer"></div>
            <NavEntry url="/" match="^/$">
                <div className="icon">
                    <svg id="server" viewBox="0 0 23 18"><path d="M0 0v18h23V0H0zm2 7.4h18.9v3.2H2V7.4zm18.9 8.5H2v-3.2h18.9v3.2zM2 5.3V2.1h18.9v3.2H2z"></path><path d="M17.6 2.7c-.5 0-1 .4-1 1 0 .5.4 1 1 1 .5 0 1-.4 1-1 0-.5-.4-1-1-1zM17.6 8c-.5 0-1 .4-1 1 0 .5.4 1 1 1 .5 0 1-.4 1-1 0-.5-.4-1-1-1zM17.6 15.3c.5 0 1-.4 1-1 0-.5-.4-1-1-1-.5 0-1 .4-1 1s.5 1 1 1z"></path></svg>
                </div>
                <div className="txt">Control Panel</div>
            </NavEntry>
            <NavEntry url="/machines" match="^/machines">
                <div className="icon">
                    <svg id="server" viewBox="0 0 23 18"><path d="M0 0v18h23V0H0zm2 7.4h18.9v3.2H2V7.4zm18.9 8.5H2v-3.2h18.9v3.2zM2 5.3V2.1h18.9v3.2H2z"></path><path d="M17.6 2.7c-.5 0-1 .4-1 1 0 .5.4 1 1 1 .5 0 1-.4 1-1 0-.5-.4-1-1-1zM17.6 8c-.5 0-1 .4-1 1 0 .5.4 1 1 1 .5 0 1-.4 1-1 0-.5-.4-1-1-1zM17.6 15.3c.5 0 1-.4 1-1 0-.5-.4-1-1-1-.5 0-1 .4-1 1s.5 1 1 1z"></path></svg>
                </div>
                <div className="txt">Machines</div>
            </NavEntry>
            <NavEntry url="/apps" match="^/apps/?">
                <div className="icon">
                <svg id="block" viewBox="0 0 22 24.2"><path d="M11,0L0,4.4v15.4l11,4.4l11-4.4V4.4L11,0z M18.3,5.1L11,8L3.7,5.1L11,2.2L18.3,5.1z M2,6.6l8,3.2v11.8l-8-3.2V6.6z M12,21.6V9.8l8-3.2v11.8L12,21.6z"></path></svg>
                </div>
                <div className="txt">Applications</div>
            </NavEntry>
            <NavEntry url="/storage" match="^/storage/?">
                <div className="icon">
                <svg id="block" viewBox="0 0 22 24.2"><path d="M11,0L0,4.4v15.4l11,4.4l11-4.4V4.4L11,0z M18.3,5.1L11,8L3.7,5.1L11,2.2L18.3,5.1z M2,6.6l8,3.2v11.8l-8-3.2V6.6z M12,21.6V9.8l8-3.2v11.8L12,21.6z"></path></svg>
                </div>
                <div className="txt">Storage</div>
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