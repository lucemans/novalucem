import * as React from 'react';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import "./dark.scss"
import Machines from './components/Machines';
import Applications from './components/Applications';

export default function App(props: any) {

   let [dark, setDark] = React.useState(localStorage.getItem('dark') == '1' || false);

   return (
      <div className={['app', dark && 'dark'].join(' ')}>
         <Router>
            <div className="header">
               <div className="left">
                  <div className="logo">
                     <h1>VK</h1>
                  </div>
                  <div className="sub">Cloud</div>
               </div>
               <div className="right">
                  <div className="toggle" onClick={() => { setDark(!dark); localStorage.setItem('dark', !dark ? '1' : '0') }}>{dark && 'DARK' || 'LIGHT'}</div>
               </div>
            </div>
            <div className="horizontal">
               <Sidebar></Sidebar>
               <div className="content">
                  <Switch>
                     <Route exact path="/">
                        Home Page
                     </Route>
                     <Route path="/apps">
                        <Applications></Applications>
                     </Route>
                     <Route path="/machines">
                        <Machines></Machines>
                     </Route>
                     <Route>

                     </Route>
                  </Switch>
               </div>
            </div>
         </Router>
      </div>
   );
}