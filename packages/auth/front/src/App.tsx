import * as React from 'react';
import Buttons from './Buttons';
import WebAuthn from './WebAuthn';

export default function App(props: any) {

   let [state, setState] = React.useState("buttons");

   return (
      <div className="app">
         <div className="center">
            {state == "buttons" && <Buttons webauth={() => {setState('webauthn')}}></Buttons>}
            {state == "webauthn" && <WebAuthn closeFn={() => {setState('buttons')}}></WebAuthn>}
         </div>
      </div>
   );
}