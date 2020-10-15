import { User } from "@novalucem/common";

//d
export const setCurrentAccount = (account: User) => {
    localStorage.setItem('auth_account', account.user_id.toString());
    const accounts = getAccounts();
    accounts[account.user_id] = account;
    setAccounts(accounts);
    localStorage.setItem('auth_accounts', JSON.stringify(accounts));
}

export const getAccounts = (): { [key: string]: User} => {
    if (!!!localStorage.getItem('auth_accounts')) {
        return {};
    }
    return JSON.parse(localStorage.getItem('auth_accounts'));
};

export const setAccounts = (accounts: { [key: string]: User}) => {
    localStorage.setItem('auth_accounts', JSON.stringify(accounts));
}

export function getCurrentAccount(): User {
    if (!!!localStorage.getItem('auth_account'))
        return null;

    if (!!!localStorage.getItem('auth_accounts'))
        return null;

    try {
        let accounts: {[key: string]: User} = JSON.parse(localStorage.getItem('auth_accounts'));

        return accounts[localStorage.getItem('auth_account').toString()];
    } catch (e) {

    }
    return null;
}