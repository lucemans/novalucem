import * as React from 'react';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import "./dark.scss"
import Machines from './pages/Machines';
import Applications from './pages/Applications';
import LRoute from './components/LRoute';
import Machine from './pages/Machine';
import Dashboard from './pages/Dashboard';

export default function App(props: any) {

   let [dark, setDark] = React.useState(localStorage.getItem('dark') == '1' || false);

   return (
      <div className={['app', dark && 'dark'].join(' ')}>
         <Router>
            <div className="header">
               <div className="left">
                  <div className="logo">
                     VK<span className="sub">Cloud</span>
                  </div>
               </div>
               <div className="right">
                  <div className="toggle" onClick={() => { setDark(!dark); localStorage.setItem('dark', !dark ? '1' : '0') }}>{dark && 'DARK' || 'LIGHT'}</div>
               </div>
            </div>
            <div className="horizontal">
               <Sidebar></Sidebar>
               <div className="content_wrap">
                  <div className="content">
                     <Switch>
                        <LRoute exact={true} path="/" title="Control Panel">
                           <Dashboard></Dashboard>
                        </LRoute>
                        <LRoute exact={true} path="/apps" title="Applications">
                           <Applications></Applications>
                        </LRoute>
                        <LRoute exact={true} path="/machines" title="Machines">
                           <Machines></Machines>
                        </LRoute>
                        <Route path="/machines/:id" component={Machine} />
                        <Route>
                           No Match
                     </Route>
                     </Switch>
                  </div>
               </div>
            </div>
         </Router>
      </div>
   );
}