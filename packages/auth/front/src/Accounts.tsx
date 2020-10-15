import * as React from 'react';
import { getAccounts, getCurrentAccount, setCurrentAccount } from './AccountManager';

export default function Accounts({ updateAccount, account }) {

    let [usernameBuff, setUsernameBuff] = React.useState('');
    let [oldUsernameBuff, setOldUsernameBuff] = React.useState('');
    let [addNew, setAddNew] = React.useState(getCurrentAccount() == null ? 1 : 0);
    let [accounts, setAccounts] = React.useState(getAccounts());
    console.log(accounts);
    const currentAccount = getCurrentAccount();

    React.useEffect(() => {
        (async () => {
            if (addNew == 2) {
                console.log('f');
                const acc = await (await fetch('/add-account?username=' + usernameBuff.toLowerCase())).text();
                console.log(acc);
                if (acc == "null") {
                    setAddNew(3);
                    setOldUsernameBuff(usernameBuff);
                    return;
                }
                const acc2 = JSON.parse(acc);
                setAddNew(0);
                setCurrentAccount(acc2);
                updateAccount(acc2);
                setAccounts(getAccounts());
                // const acc = { avatar: "", github_id: 0, user_id: "aaaa", username: usernameBuff };
                // setCurrentAccount(acc);
                // updateAccount(acc);
                // console.log('g');
            }
        }
        )();
    }, [addNew]);

    if (addNew == 1 || addNew == 3)
        return (
            <div className="card">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    setAddNew(2);
                }}>
                    {addNew == 3 && <div className="exists"><b>{oldUsernameBuff}</b> doesnt exist.</div>}
                    <input type="text" name="Username" id="" defaultValue={usernameBuff} value={usernameBuff} autoFocus={true} onChange={(e) => { setUsernameBuff(e.target.value.toLowerCase()) }} placeholder="Username" />
                    <button type="submit" className="btn">Go!</button>
                    <p>Try another way of <a href={"/user/" + location.search}>authentication</a></p>
                </form>
            </div>
        );

    if (addNew == 2)
        return (
            <div className="card">
                Processing...
            </div>
        )

    return (
        <div className="card">
            <div className="title">Choose an Account</div>
            <div className="accounts">
                {
                    Object.keys(accounts).map((key) => {
                        return (
                            <div className={["account", (key == account.user_id) ? 'active' : ''].join(' ').trim()} onClick={() => { setCurrentAccount(accounts[key]); updateAccount(accounts[key]) }}>
                                <div className="icon">
                                    <img src={accounts[key].avatar} alt="" />
                                </div>
                                <div className="name"><div className="top">{accounts[key].username}</div><div className="bot">#{accounts[key].user_id}</div></div>
                            </div>
                        );
                    })
                }
                <div className="account" onClick={() => { setAddNew(1) }}>
                    <div className="icon">
                        +
                    </div>
                    <div className="name">
                        Add new Account
                    </div>
                </div>
            </div>
        </div>
    )
}

/*
Created: 17:44 Tue 13 October 2020
Location: NovaLucem
*/