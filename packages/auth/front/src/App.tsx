import * as React from 'react';
import Buttons from './Buttons';
import WebAuthn from './WebAuthn';
import { User } from '@novalucem/common';
import { getCurrentAccount } from './AccountManager';

export default function App(props: any) {

   let [state, setState] = React.useState("buttons");

   let [account, setAccount] = React.useState(getCurrentAccount);

   let setCurrentAccount = (nacc: User) => {
      localStorage.setItem('auth_account', nacc.user_id.toString());
      setAccount(nacc);
   }

   return (
      <div className="app">
         <div className="center">
            {state == "buttons" && <Buttons webauth={() => { setState('webauthn') }}></Buttons>}
            {state == "webauthn" && <WebAuthn user={account} closeFn={() => { setState('buttons') }}></WebAuthn>}
         </div>
      </div>
   );
}