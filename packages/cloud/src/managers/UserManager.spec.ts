import { checkToken, handleSearch } from './UserManager';

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
};
// @ts-ignore
global.localStorage = localStorageMock;

test('handleSearch legit', () => {
    expect(handleSearch('?auth=hey', 'safe')).toBe('safe')
    expect(localStorage.setItem).toBeCalledWith('token', 'hey');
});

test('handleSearch empty', () => {
    expect(handleSearch('', 'safe')).toBe('')
})

test('handleToken legit', () => {
    expect(checkToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1lIjoiTkFNRSIsInByb2ZpbGUiOiJwcm9maWxlcGljIn0sImlhdCI6MCwiZXhwIjowLCJpc3MiOiJubC1hdXRoIn0.z344G_zzP6ZfAh-t9tzO2kpYGeMq5IilnCenoFonMDU', 'safe')).toBe('');
});

test('handleToken empty', () => {
    expect(checkToken('', 'safe')).toBe('safe');
});

test('handleToken modified', () => {
    expect(checkToken('notatoken', 'safe')).toBe('safe');
});