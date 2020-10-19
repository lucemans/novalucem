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
            {/* <div className="entry spacer"></div> */}
            {/* <NavEntry url="/" match="^/$">
                <div className="icon">
                    <svg id="server" viewBox="0 0 23 18"><path d="M0 0v18h23V0H0zm2 7.4h18.9v3.2H2V7.4zm18.9 8.5H2v-3.2h18.9v3.2zM2 5.3V2.1h18.9v3.2H2z"></path><path d="M17.6 2.7c-.5 0-1 .4-1 1 0 .5.4 1 1 1 .5 0 1-.4 1-1 0-.5-.4-1-1-1zM17.6 8c-.5 0-1 .4-1 1 0 .5.4 1 1 1 .5 0 1-.4 1-1 0-.5-.4-1-1-1zM17.6 15.3c.5 0 1-.4 1-1 0-.5-.4-1-1-1-.5 0-1 .4-1 1s.5 1 1 1z"></path></svg>
                </div>
                <div className="txt">Control Panel</div>
            </NavEntry> */}
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
                <img src="data:image/png;base64,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" alt=""/>
                {/* <svg id="block" viewBox="0 0 22 24.2"><path d="M11,0L0,4.4v15.4l11,4.4l11-4.4V4.4L11,0z M18.3,5.1L11,8L3.7,5.1L11,2.2L18.3,5.1z M2,6.6l8,3.2v11.8l-8-3.2V6.6z M12,21.6V9.8l8-3.2v11.8L12,21.6z"></path></svg> */}
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