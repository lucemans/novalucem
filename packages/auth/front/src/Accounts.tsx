import * as React from 'react';
import { getAccounts, getCurrentAccount, setCurrentAccount } from './AccountManager';

export default function Accounts({ updateAccount }) {

    let [usernameBuff, setUsernameBuff] = React.useState('');
    let [addNew, setAddNew] = React.useState(getCurrentAccount() == null);
    let [accounts, setAccounts] = React.useState(getAccounts());
    console.log(accounts);

    if (addNew)
        return (
            <div className="card">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    // changeUsername(usernameBuff);
                    console.log('f');
                    const acc = { avatar: "", github_id: 0, user_id: 2, username: usernameBuff };
                    setCurrentAccount(acc);
                    updateAccount(acc);
                    console.log('g');
                }}>
                    <input type="text" name="Username" id="" onChange={(e) => { setUsernameBuff(e.target.value) }} placeholder="Username" />
                    <button type="submit" className="btn">Go!</button>
                </form>
            </div>
        );

    return (
        <div className="card">
            Accounts
            {
                Object.keys(accounts).map((key) => {
                    console.log(key);
                    return (
                        <div className="account" onClick={() => {setCurrentAccount(accounts[key]); updateAccount(accounts[key])}}>{accounts[key].username}</div>
                    );
                })
            }
            <div className="account" onClick={() => {setAddNew(true)}}>Add new Account</div>
        </div>
    )
}

/*
Created: 17:44 Tue 13 October 2020
Location: NovaLucem
*/