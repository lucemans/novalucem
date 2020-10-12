import { handleSearch, checkToken } from './UserManager';

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
};
// @ts-ignore
global.localStorage = localStorageMock;

test('Auth Parameters', () => {
    expect(handleSearch('?auth=hey', 'safe')).toBe('safe')
    expect(handleSearch('', 'safe')).toBe('');
});

test('Check Token', () => {
    expect(checkToken('', 'safe')).toBe('safe')
    expect(checkToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDMzOTA0MywibmFtZSI6Ikx1Y2VtYW5zIiwicHJvZmlsZSI6Imh0dHBzOi8vYXZhdGFyczAuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvMTAzMzkwNDM_dj00In0sImlhdCI6MTYwMTY3NTA5MCwiZXhwIjoxNjAxNzYxNDkwLCJpc3MiOiJubC1hdXRoIn0.Pzx2Aq4e7RUpX81SAsQK7rOy86lSufv1efWeQj-PBIY', 'safe')).toBe('')
    expect(checkToken('invalidtokenhere', 'safe')).toBe('safe');
});