import {
    AUTH_LOGIN_USER_SUCCESS,
    AUTH_LOGIN_USER_FAIL,
    AUTH_LOGIN_USER_GET,
    AUTH_LOGOUT_USER
} from '../actions/types';
import React from 'react';
import {ToastAndroid} from 'react-native';

export function auth (state = {id: -1, name: ''}, action) {
    switch(action.type)
    {
        case AUTH_LOGIN_USER_SUCCESS:
            // ToastAndroid.show(AUTH_LOGIN_USER_SUCCESS, ToastAndroid.SHORT);
            return action.payload;
        case AUTH_LOGIN_USER_FAIL:
            // ToastAndroid.show(AUTH_LOGIN_USER_FAIL, ToastAndroid.SHORT);
            return {id: 0, name: ''};
        case AUTH_LOGIN_USER_GET:
            // ToastAndroid.show(AUTH_LOGIN_USER_GET, ToastAndroid.SHORT);
            return action.payload;
        case AUTH_LOGOUT_USER:
            // ToastAndroid.show(AUTH_LOGOUT_USER, ToastAndroid.SHORT);
            return {id: -1, name: ''};
        default:
            return state;
    }
}