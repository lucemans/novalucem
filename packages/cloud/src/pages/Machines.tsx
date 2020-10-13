import * as React from 'react';
import "./Machines.scss";
import { Link } from 'react-router-dom';

const machines = [
    {
        id: '1',
        name: 'NRC #1173',
        host: 'V3X-Email',
        ip: '192.168.1.1',
        datacentre: 'VK3-F2',
        status: 'Alive'
    },
    {
        id: '2',
        name: 'NRC #1173',
        host: 'V3X-Minecraft',
        ip: '192.168.1.73',
        datacentre: 'VK3-F1',
        status: 'Alive'
    },
    {
        id: '3',
        name: 'NRC #1173',
        host: 'V3X-Email',
        ip: '192.168.1.1',
        datacentre: 'VK3-F3',
        status: 'Alive'
    }
];

export default function Machines(props: any) {

    return (
        <div className="machines">
            <div className="back"></div>
            <div className="title">MACHINES</div>
            <div className="list">
                {
                    machines.map((m) => {
                        return (
                            <Link to={'/machines/' + m.id}>
                                <div className="entry">
                                    <div className="item status alive"><div className="dot"></div></div>
                                    <div className="item name big">{m.name}</div>
                                    <div className="item">{m.host}</div>
                                    <div className="item ip">{m.ip}</div>
                                    <div className="item datacentre">{m.datacentre}</div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    );
}

/*
Created: 19:53 Mon 12 October 2020
Location: NovaLucem
*/