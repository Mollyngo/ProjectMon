const ACCESS_TOKEN = 'token';

export const storeToken = (token) => {
    localStorage.setItem(ACCESS_TOKEN, token);
}
export const getToken = () => {
    return localStorage.getItem(ACCESS_TOKEN);
}
export const removeToken = () => {
    localStorage.removeItem(ACCESS_TOKEN);
}