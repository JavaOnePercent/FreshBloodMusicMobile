import {
    PLAYER_PLAY_MUSIC,
    PLAYER_PAUSE_MUSIC,
    PLAYER_CREATE_PREVIOUS,
    PLAYER_ADD_TRACK_PREVIOUS,
    PLAYER_DELETE_PREVIOUS,
    PLAYER_ADD_CURRENT_TRACK,
    PLAYER_CREATE_QUEUE,
    PLAYER_ADD_TRACK_QUEUE,
    PLAYER_ADD_EDITION_QUEUE,
    PLAYER_ADD_BEGIN_QUEUE,
    PLAYER_CHANGE_QUEUE,
    PLAYER_DELETE_QUEUE,
    PLAYER_REMOVE_QUEUE,
} from '../actions/types';
import React from 'react';
import {ToastAndroid} from 'react-native';

export function player (state = false, action) {
    switch(action.type)
    {
        case PLAYER_PLAY_MUSIC:
            ToastAndroid.show(PLAYER_PLAY_MUSIC, ToastAndroid.SHORT);
            return true;
        case PLAYER_PAUSE_MUSIC:
            ToastAndroid.show(PLAYER_PAUSE_MUSIC, ToastAndroid.SHORT);
            return false;
        default:
            return state;
    }
}

export function previous (state = [], action) {
    switch(action.type)
    {
        case PLAYER_CREATE_PREVIOUS:
            ToastAndroid.show(PLAYER_CREATE_PREVIOUS, ToastAndroid.SHORT);
            return action.payload;
        case PLAYER_ADD_TRACK_PREVIOUS:
            ToastAndroid.show(PLAYER_ADD_TRACK_PREVIOUS, ToastAndroid.SHORT);
            return [...state, action.payload];
        case PLAYER_DELETE_PREVIOUS:
            ToastAndroid.show(PLAYER_DELETE_PREVIOUS, ToastAndroid.SHORT);
            return state.slice(state.length);
        default:
            return state;
    }
}

export function current (state = {}, action) {
    switch(action.type)
    {
        case PLAYER_ADD_CURRENT_TRACK:
            ToastAndroid.show(PLAYER_ADD_CURRENT_TRACK, ToastAndroid.SHORT);
            return action.payload;
        default:
            return state;
    }
}

export function queue (state = [], action) {
    switch(action.type)
    {
        case PLAYER_CREATE_QUEUE:
            ToastAndroid.show(PLAYER_CREATE_QUEUE, ToastAndroid.SHORT);
            return action.payload;
        case PLAYER_ADD_TRACK_QUEUE:
            ToastAndroid.show(PLAYER_ADD_TRACK_QUEUE, ToastAndroid.SHORT);
            return [...state, action.payload];
        case PLAYER_ADD_EDITION_QUEUE:
            ToastAndroid.show(PLAYER_ADD_EDITION_QUEUE, ToastAndroid.SHORT);
            if(state.length === 0 || !state)
            {
                return action.payload;
            }
            else
            {
                return [...state.concat(action.payload)];
            }
        case PLAYER_ADD_BEGIN_QUEUE:
            ToastAndroid.show(PLAYER_ADD_BEGIN_QUEUE, ToastAndroid.SHORT);
            return [action.payload, ...state];
        case PLAYER_CHANGE_QUEUE:
            ToastAndroid.show(PLAYER_CHANGE_QUEUE, ToastAndroid.SHORT);
            return action.payload;
        case PLAYER_DELETE_QUEUE:
            ToastAndroid.show(PLAYER_DELETE_QUEUE, ToastAndroid.SHORT);
            return state.slice(1);
        case PLAYER_REMOVE_QUEUE:
            ToastAndroid.show(PLAYER_REMOVE_QUEUE, ToastAndroid.SHORT);
            return state.filter(({ id }) => id !== action.payload);
        default:
            return state;
    }
}