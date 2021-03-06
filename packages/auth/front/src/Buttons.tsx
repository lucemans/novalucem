import * as React from 'react';

export default function Buttons({webauth}) {

    return (
        <div className="card">
            {/* {username && (<div>Logging you in as <b>{username}</b></div>)}
            {username && (<p>Is this <a onClick={() => {changeUsername('')}}>not you</a></p>)} */}

            <div className="loginMethod">Choose your login method</div>
            <div className="btns">
                <div className="button github" onClick={() => {
                    window.location.replace('/github-login' + location.search);
                }}>
                    <div className="icon">
                        <img src="https://icon-library.com/images/github-icon-white/github-icon-white-6.jpg" alt="" />
                    </div>
                    <div className="text">Login with Github</div>
                </div>
                <div className="button webauthn" onClick={() => {
                    webauth();
                }}>
                    <div className="icon">
                        <svg x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512">
                            <path d="M232.969,377.5l-33.938-33.938L315.828,226.75c42.438,22.875,96.25,16.875,132.125-18.938  c43.688-43.75,43.688-114.688,0-158.375c-43.75-43.75-114.688-43.75-158.438,0c-35.813,35.813-41.781,89.688-18.922,132.063  l-229.953,230c-12.453,12.438-12.453,32.813,0,45.25c12.438,12.438,32.813,12.438,45.25,0l33.938,33.938  c6.25,6.25,16.375,6.25,22.625,0l22.625-22.625c6.266-6.25,6.266-16.375,0-22.625L131.141,411.5l22.625-22.688l33.953,34  c6.25,6.25,16.375,6.25,22.625,0l22.625-22.625C239.219,393.875,239.219,383.813,232.969,377.5z M334.766,94.688  c18.75-18.75,49.188-18.75,67.938,0c18.688,18.688,18.688,49.188,0,67.875c-18.75,18.688-49.188,18.688-67.938,0  C316.078,143.875,316.078,113.375,334.766,94.688z" />
                        </svg>
                    </div>
                    <div className="text">Login with Webauthn</div>
                </div>
            </div>
        </div>);
}

/*
Created: 16:07 Tue 13 October 2020
Location: NovaLucem
*/