import {
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_FAIL,
    FETCH_PERFORMER_SUCCESS,
    FETCH_PERFORMER_FAIL,
    FETCH_ALBUMS_SUCCESS,
    FETCH_ALBUMS_FAIL,
} from '../actions/types';
import React from 'react';
import {ToastAndroid} from 'react-native';

export function currentProfile (state = -1, action) {
    switch(action.type)
    {
        case FETCH_PROFILE_SUCCESS:
            ToastAndroid.show(FETCH_PROFILE_SUCCESS, ToastAndroid.SHORT);
            return action.payload;
        case FETCH_PROFILE_FAIL:
            ToastAndroid.show(FETCH_PROFILE_FAIL, ToastAndroid.SHORT);
            return state;
        default:
            return state;
    }
}

export function performer (state = {}, action) {
    switch(action.type)
    {
        case FETCH_PERFORMER_SUCCESS:
            ToastAndroid.show(FETCH_PERFORMER_SUCCESS, ToastAndroid.SHORT);
            return action.payload;
        case FETCH_PERFORMER_FAIL:
            ToastAndroid.show(FETCH_PERFORMER_FAIL, ToastAndroid.SHORT);
            return state;
        default:
            return state;
    }
}

export function albums (state = [], action) {
    switch(action.type)
    {
        case FETCH_ALBUMS_SUCCESS:
            ToastAndroid.show(FETCH_ALBUMS_SUCCESS, ToastAndroid.SHORT);
            return action.payload;
        case FETCH_ALBUMS_FAIL:
            ToastAndroid.show(FETCH_ALBUMS_FAIL, ToastAndroid.SHORT);
            return state;
        default:
            return state;
    }
}