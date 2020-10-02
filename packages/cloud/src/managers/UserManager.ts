import queryString from 'query-string';
import buildUrl from 'build-url';
import JWT from 'jsonwebtoken';

export function shouldRender(): boolean {
    return true;
}

export function handleSearch(query: string, safe: string): string {
    const res = queryString.parse(query);
    if (res['auth']) {
        localStorage.setItem('token', res['auth'].toString());
        return safe;
    }
    return '';
}

export function checkToken(token: string, safe: string): string {
    try {
        if (!token)
            return safe;
        if (JWT.decode(token))
            return '';
    } catch (e) {
        console.error(e);
        return safe;
    }
}