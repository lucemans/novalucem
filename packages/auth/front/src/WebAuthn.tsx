import * as React from 'react';

export default function WebAuthn({ closeFn }) {

    React.useEffect(() => {
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
            setTimeout(() => {
                closeFn();
            }, 250);
        });
    }, [0]);

    return (
        <div className="card">
            <p>Please follow the instructions on your screen</p>
            <p>If you are experiencing problems, try again or click <a href={"/user/" + location.search}>here</a></p>
        </div>
    );
}

/*
Created: 16:06 Tue 13 October 2020
Location: NovaLucem
*/