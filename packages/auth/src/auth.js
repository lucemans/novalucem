window.lauth = () => {
    let p = {
        challenge: Uint8Array.from("RANDOM", c => c.charCodeAt(0)),
        rp: {
            name: "LVK.SH",
            id: "lvk.sh",
        },
        user: {
            id: Uint8Array.from("USERID", c => c.charCodeAt(0)),
            name: "luc@lucemans.nl",
            displayName: "Luc",
        },
        pubKeyCredParams: [{alg: -7, type: "public-key"}],
        authenticatorSelection: {
            authenticatorAttachment: "cross-platform",
        },
        timeout: 60000,
        attestation: "direct"
    }
    let credential = await navigator.credentials.create({publicKey: p})
    console.log(credential);    
}