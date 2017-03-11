import axios from 'axios';
import { browserHistory } from 'react-router';
import {AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE} from '../actions/types';

const ROOT_URL = 'http://localhost:3090';

export const signinUser = ({email, password}) => {
    return dispatch => {
        axios.post(`${ROOT_URL}/signin`,{ email, password })
            .then(response => {
                dispatch({type: AUTH_USER});
                localStorage.setItem('token', response.data.token);
                browserHistory.push('/feature');
            })
            .catch(() => {
                dispatch(authError('Bad email or password'));
            });
    };
};

export const signupUser = ({email, password}) => {
    return (dispatch) => {
        axios.post(`${ROOT_URL}/signup`, { email, password })
            .then(response => {
                console.log(response.data);
                dispatch({type: AUTH_USER});
                localStorage.setItem('token', response.data.token);
                browserHistory.push('/feature');
            })
            .catch(response => {
            dispatch(authError(response.response.data.error));
        });

    }
};

export const authError = (error) => {
  return {
      type: AUTH_ERROR,
      payload: error
  }
};

export const signoutUser = () => {
    localStorage.removeItem('token');

    return {
        type: UNAUTH_USER
    }
};

export const fetchMessage = () =>{
    return (dispatch) => {
        axios.get(`${ROOT_URL}`,{
            headers: { authorization: localStorage.getItem('token') }
        })
            .then(response => {
                console.log(response);
               dispatch({type: FETCH_MESSAGE, payload: response.data.hi});
            });
    }
};