import {
    FETCH_USER_PLAYLISTS_SUCCESS,
    FETCH_USER_PLAYLISTS_FAIL,
    FETCH_USER_PLAYLIST_DELETE,
} from '../actions/types';
import React from 'react';
import {ToastAndroid} from 'react-native';

export function userPlaylists (state = [], action) {
    switch(action.type)
    {
        case FETCH_USER_PLAYLISTS_SUCCESS:
            // ToastAndroid.show(FETCH_USER_PLAYLISTS_SUCCESS, ToastAndroid.SHORT);
            return action.payload;
        case FETCH_USER_PLAYLISTS_FAIL:
            // ToastAndroid.show(FETCH_USER_PLAYLISTS_FAIL, ToastAndroid.SHORT);
            return state;
        case FETCH_USER_PLAYLIST_DELETE:
            // ToastAndroid.show(FETCH_USER_PLAYLIST_DELETE, ToastAndroid.SHORT);
            return state.filter(({ id }) => id !== action.payload);
        default:
            return state;
    }
}