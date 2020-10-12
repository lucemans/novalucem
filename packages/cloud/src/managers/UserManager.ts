import queryString from 'query-string';
import buildUrl from 'build-url';
import JWT from 'jsonwebtoken';

export function handleSearch(query: string, safe: string): string {
    const res = queryString.parse(query);
    if (res['auth']) {
        localStorage.setItem('token', res['auth'].toString());
        return safe;
    }
    return '';
}

export function checkToken(token: string, safe: string): string {
    if (!token)
        return safe;
    if (JWT.decode(token))
        return '';
    return safe;
}