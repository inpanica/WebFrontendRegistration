import axios from 'axios';
import { setUser } from '../reducers/userReducer';

export const registration = async (email, name, password) => {
    try{
        const response = await axios.post('http://85.192.41.43/auth/users/', {
        email: email,
        username: name,
        password: password
    });
        return response;
    }
    catch(e){
        console.log(e);
        return e.response;
    }
}

export const createJwt = async (username, password) => {
    try{
        const response = await axios.post('http://85.192.41.43/auth/jwt/create/', {
        username: username,
        password: password
    });
        localStorage.setItem('refresh', response.data.refresh)
        localStorage.setItem('access', response.data.access)
        return response;
    }

    catch (e){
        return e.response;
    }
}

export const authorization = () => {
    return async dispatch => {
        try {
                const response = await axios.get(`http://85.192.41.43/auth/users/me/`,
                {headers:
                    {Authorization: `jwt ${localStorage.getItem('access')}`}
                }
                )
                return response
            } 
        catch (e) {
            return e.response;
        }
    }
}

export const refreshJwt = async () => {
    try{
        const response = await axios.post('http://85.192.41.43/auth/jwt/refresh/', {
        refresh: localStorage.getItem('refresh')
    });

    localStorage.setItem('access', response.data.access)
    localStorage.setItem('refresh', localStorage.getItem('refresh'))
    return 'OK'
    }

    catch (e){
        return e.response
    }

}
