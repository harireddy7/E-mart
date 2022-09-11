const isUserLoggedIn = () => {
    const _token = localStorage.getItem('__JWT_TOKEN__');
    const _user = JSON.parse(localStorage.getItem('__LUSER__'));
    if (_token && _user) {
        return _user;
    }
    return null;
}

export {
    isUserLoggedIn
}