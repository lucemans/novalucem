import * as React from 'react';
import { Link } from 'react-router-dom';

// Me has discovered the next generation of destructuring
export default function Machine({ match: { params: { id } } }) {



    return (
        <>
            <Link to="/machines">
                <div className="back">{"←"}</div>
            </Link>
            <div className="title">MACHINE {id}</div>
        </>
    );
}

/*
Created: 23:30 Mon 12 October 2020
Location: NovaLucem
*/