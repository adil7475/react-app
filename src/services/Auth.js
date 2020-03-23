let setToken = ({ access_token, expires_in }) => {
    if(access_token && expires_in){
        localStorage.setItem('token', access_token);
        localStorage.setItem('expiry', expires_in);
    }
}

let getToken = () => {
    let token = localStorage.getItem('token');
    const expiry = localStorage.getItem('expiry');
    if(token && expiry ){
        return token;
    }else{
        return null;
    }
}

let isAuthenticated = () => {
    if(getToken()){
        return true;
    }else{
        return false;
    }
}

let destroyToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiry');

    return true;
}

export default {
    setToken: setToken,
    getToken: getToken,
    isAuthenticated: isAuthenticated,
    destroyToken: destroyToken
}