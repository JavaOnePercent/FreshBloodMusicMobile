import axios from 'axios';
import { ADDRESS_SERVER } from '../../components/constants/constants';
import {
    AUTH_LOGIN_USER_SUCCESS,
    AUTH_LOGIN_USER_FAIL,
    AUTH_LOGIN_USER_GET,
    AUTH_LOGOUT_USER
} from '../actions/types';

export const login = (username, password) => async dispatch => {
    let params = new FormData()
    params.append("username", username);
    params.append("password", password);
    axios.post(ADDRESS_SERVER + '/api/login',  params)
        .then(function (response) {
            let id = response.data.per_id;
            let username = response.data.username;
            dispatch({type: AUTH_LOGIN_USER_SUCCESS, payload: {id: id, name: username}});
        })
        .catch(function (error) {
            dispatch({type: AUTH_LOGIN_USER_FAIL});
        });
};

export const getLogin = () => async dispatch => {
    axios.get(ADDRESS_SERVER + '/api/login')
        .then(function (response) {
            let id = response.data.per_id;
            let username = response.data.username;
            dispatch({type: AUTH_LOGIN_USER_GET, payload: {id: id, name: username}});
        })
        .catch(function (error){

        });
};

export const logout = () => async dispatch => {
    axios.get(ADDRESS_SERVER + '/api/logout'
    ).then(function (response) {
        dispatch({type: AUTH_LOGOUT_USER});
    })
        .catch(function (error) {

        });
};