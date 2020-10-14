import { User } from '@novalucem/common';
import * as React from 'react';
import Accounts from './Accounts';

export default function WebAuthn(props: { closeFn, user: User }) {

    let [account, setAccount] = React.useState(props.user);

    React.useEffect(() => {
        if (account) {
            let p: PublicKeyCredentialCreationOptions = {
                challenge: Uint8Array.from("RANDOM", c => c.charCodeAt(0)),
                rp: {
                    name: "LVK.SH",
                    id: location.host.includes('localhost') ? "localhost" : "lvk.sh",
                },
                user: {
                    id: Uint8Array.from("USERID", c => c.charCodeAt(0)),
                    name: "luc@lucemans.nl",
                    displayName: "Luc",
                },
                pubKeyCredParams: [{ alg: -7, type: "public-key" }],
                authenticatorSelection: {
                    authenticatorAttachment: "cross-platform",
                },
                timeout: 60000,
                attestation: "direct"
            }
            navigator.credentials.get({ publicKey: p }).then((a) => {
                console.log(a);
            }).catch((e) => {
                // console.error(e);
                // setTimeout(() => {
                //     props.closeFn();
                // }, 250);
            });
        }
    }, [0, account]);

    let [usernameBuff, setUsernameBuff] = React.useState('');

    if (!!!account)
        return (
            <Accounts updateAccount={setAccount}></Accounts>
        );

    return (
        <div className="card">
            <p>Hello there <b>{account.username}</b></p>
            <p>Try <a href="#" onClick={(e) => {e.preventDefault(); setAccount(null);}}>another account</a></p>
            <p>Please follow the instructions on your screen</p>
            <p>Try another way of <a href={"/user/" + location.search}>authentication</a></p>
        </div>
    );
}

/*
Created: 16:06 Tue 13 October 2020
Location: NovaLucem
*/