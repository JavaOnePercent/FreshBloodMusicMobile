import {
    FETCH_ALBUMS_LIKED_SUCCESS,
    FETCH_ALBUMS_LIKED_FAIL,
} from '../actions/types';
import React from 'react';
import {ToastAndroid} from 'react-native';

export function likedAlbums (state = [], action) {
    switch(action.type)
    {
        case FETCH_ALBUMS_LIKED_SUCCESS:
            // ToastAndroid.show(FETCH_ALBUMS_LIKED_SUCCESS, ToastAndroid.SHORT);
            return action.payload;
        case FETCH_ALBUMS_LIKED_FAIL:
            // ToastAndroid.show(FETCH_ALBUMS_LIKED_FAIL, ToastAndroid.SHORT);
            return state;
        default:
            return state;
    }
}