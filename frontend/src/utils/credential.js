import Cookies from 'js-cookie';

export const logUser = (userId, username, userType, token, remember=false) => {
    var attr = {expires: 7};

    var display_name;
    if (username === '') {
        display_name = `${userType}-${userId}`;
    }
    else {
        display_name = username;
    }

    var user = {
        userId: userId,
        username: display_name, 
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