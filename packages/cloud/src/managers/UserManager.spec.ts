import { handleSearch } from './UserManager';

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
};
// @ts-ignore
global.localStorage = localStorageMock;

test('Do My testing', () => {
    expect(handleSearch('?auth=hey', 'safe')).toBe('safe')
    expect(localStorage.setItem).toBeCalledWith('token', 'hey');
});