import * as React from 'react';
import { Link } from 'react-router-dom';

export default function Applications(props: any) {

    return (
        <div className="applications">
            <Link to="/machines">
                <div className="back"></div>
            </Link>
            <div className="title">APPLICATIONS</div>
            <div className="list">
                <div className="entry">Content</div>
                <div className="entry"></div>
                <div className="entry"></div>
                <div className="entry"></div>
                <div className="entry"></div>
                <div className="entry"></div>
                <div className="entry"></div>
                <div className="entry"></div>
                <div className="entry"></div>
                <div className="entry"></div>
            </div>
        </div>
    );
}

/*
Created: 19:53 Mon 12 October 2020
Location: NovaLucem
*/