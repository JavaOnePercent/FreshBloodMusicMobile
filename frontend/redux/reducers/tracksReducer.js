import {
    FETCH_TRACKS_LIKED_SUCCESS,
    FETCH_TRACKS_LIKED_FAIL,
    FETCH_TRACKS_LIKED_CLEAR,
    FETCH_TRACKS_LIKED_UNLIKE
} from '../actions/types';
import React from 'react';
import {ToastAndroid} from 'react-native';

export function likedTracks (state = [], action) {
    switch(action.type)
    {
        case FETCH_TRACKS_LIKED_SUCCESS:
            // ToastAndroid.show(FETCH_TRACKS_LIKED_SUCCESS, ToastAndroid.SHORT);
            return action.payload;
        case FETCH_TRACKS_LIKED_FAIL:
            // ToastAndroid.show(FETCH_TRACKS_LIKED_FAIL, ToastAndroid.SHORT);
            return state;
        case FETCH_TRACKS_LIKED_UNLIKE:
            // ToastAndroid.show(FETCH_TRACKS_LIKED_UNLIKE, ToastAndroid.SHORT);
            return state.filter(({ trc_id }) => trc_id !== action.payload);
        case FETCH_TRACKS_LIKED_CLEAR:
            // ToastAndroid.show(FETCH_TRACKS_LIKED_CLEAR, ToastAndroid.SHORT);
            return [];
        default:
            return state;
    }
}