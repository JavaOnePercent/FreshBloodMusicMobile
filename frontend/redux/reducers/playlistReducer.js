import {
    FETCH_USER_PLAYLIST_SUCCESS,
    FETCH_USER_PLAYLIST_FAIL,
    FETCH_TRACK_PLAYLIST_DELETE,
    FETCH_USER_PLAYLIST_CLEAR,
    FETCH_TRACK_PLAYLIST_LIKE,
    FETCH_TRACK_PLAYLIST_UNLIKE,
    FETCH_LIST_PLAYLIST_SUCCESS,
    FETCH_LIST_PLAYLIST_FAIL,
    FETCH_LIST_PLAYLIST_CLEAR,
    FETCH_ADDED_PLAYLIST_SUCCESS,
    FETCH_ADDED_PLAYLIST_FAIL,
    FETCH_ADDED_PLAYLIST_CLEAR,
    FETCH_ADDED_PLAYLIST_ADD,
    FETCH_ADDED_PLAYLIST_DELETE,
} from '../actions/types';
import React from 'react';
import {ToastAndroid} from 'react-native';

export function customPlaylist (state = {}, action) {
    switch(action.type)
    {
        case FETCH_USER_PLAYLIST_SUCCESS:
            // ToastAndroid.show(FETCH_USER_PLAYLIST_SUCCESS, ToastAndroid.SHORT);
            return action.payload;
        case FETCH_USER_PLAYLIST_FAIL:
            // ToastAndroid.show(FETCH_USER_PLAYLIST_FAIL, ToastAndroid.SHORT);
            return state;
        case FETCH_TRACK_PLAYLIST_DELETE:
            // ToastAndroid.show(FETCH_TRACK_PLAYLIST_DELETE, ToastAndroid.SHORT);
            return {...state, tracks: state.tracks.filter(tracks => tracks.id !== action.payload)}
        case FETCH_USER_PLAYLIST_CLEAR:
            // ToastAndroid.show(FETCH_USER_PLAYLIST_CLEAR, ToastAndroid.SHORT);
            return {};
        case FETCH_TRACK_PLAYLIST_LIKE:
            // ToastAndroid.show(FETCH_TRACK_PLAYLIST_LIKE, ToastAndroid.SHORT);
            return {...state, tracks: state.tracks.map(tracks => {
                    if (tracks.id === action.payload) {
                        return {
                            ...tracks,
                            track: {
                                ...tracks.track,
                                is_liked: true
                            }
                        }
                    }
                    return tracks;
                })}
        case FETCH_TRACK_PLAYLIST_UNLIKE:
            // ToastAndroid.show(FETCH_TRACK_PLAYLIST_UNLIKE, ToastAndroid.SHORT);
            return {...state, tracks: state.tracks.map(tracks => {
                    if (tracks.id === action.payload) {
                        return {
                            ...tracks,
                            track: {
                                ...tracks.track,
                                is_liked: false
                            }
                        }
                    }
                    return tracks;
                })}
        default:
            return state;
    }
}

export function listPlaylist (state = [], action) {
    switch(action.type)
    {
        case FETCH_LIST_PLAYLIST_SUCCESS:
            // ToastAndroid.show(FETCH_LIST_PLAYLIST_SUCCESS, ToastAndroid.SHORT);
            return action.payload;
        case FETCH_LIST_PLAYLIST_FAIL:
            // ToastAndroid.show(FETCH_LIST_PLAYLIST_FAIL, ToastAndroid.SHORT);
            return state;
        case FETCH_LIST_PLAYLIST_CLEAR:
            // ToastAndroid.show(FETCH_LIST_PLAYLIST_CLEAR, ToastAndroid.SHORT);
            return [];
        default:
            return state;
    }
}

export function addedPlaylist (state = [], action) {
    switch(action.type)
    {
        case FETCH_ADDED_PLAYLIST_SUCCESS:
            // ToastAndroid.show(FETCH_ADDED_PLAYLIST_SUCCESS, ToastAndroid.SHORT);
            return action.payload;
        case FETCH_ADDED_PLAYLIST_FAIL:
            // ToastAndroid.show(FETCH_ADDED_PLAYLIST_FAIL, ToastAndroid.SHORT);
            return state;
        case FETCH_ADDED_PLAYLIST_CLEAR:
            // ToastAndroid.show(FETCH_ADDED_PLAYLIST_CLEAR, ToastAndroid.SHORT);
            return [];
        case FETCH_ADDED_PLAYLIST_ADD:
            // ToastAndroid.show(FETCH_ADDED_PLAYLIST_ADD, ToastAndroid.SHORT);
            return [...state, action.payload];
        case FETCH_ADDED_PLAYLIST_DELETE:
            // ToastAndroid.show(FETCH_ADDED_PLAYLIST_DELETE, ToastAndroid.SHORT);
            return state.tracks.filter(({ id }) => id !== action.payload)
        default:
            return state;
    }
}

