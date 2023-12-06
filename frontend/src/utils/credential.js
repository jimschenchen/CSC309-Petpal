import Cookies from 'js-cookie';

export const logUser = (username, userType, token, remember=false) => {
    var attr = {expires: 7};

    var user = {
        username: username, 
        userType: userType, 
        token: token,
        remember: remember
    };
    sessionStorage.setItem('keepUser', true);
    Cookies.set('user', JSON.stringify(user), attr);
}

export const removeUser = () => {
    Cookies.remove('user');
}

export const isLogged = () => {
    return getUser().userType !== 'guest';
}

export const getUser = () => {
    if (Cookies.get('user')) {
        return JSON.parse(Cookies.get('user'));
    }
    else {
        return {userType: 'guest'};
    }   
}