import {
    PLAYER_PLAY_MUSIC,
    PLAYER_PAUSE_MUSIC,
    PLAYER_CREATE_QUEUE,
    PLAYER_ADD_TRACK_QUEUE,
    PLAYER_ADD_EDITION_QUEUE,
    PLAYER_CHANGE_QUEUE,
    PLAYER_DELETE_QUEUE,
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
        case PLAYER_CHANGE_QUEUE:
            ToastAndroid.show(PLAYER_CHANGE_QUEUE, ToastAndroid.SHORT);
            return action.payload;
        case PLAYER_DELETE_QUEUE:
            ToastAndroid.show(PLAYER_DELETE_QUEUE, ToastAndroid.SHORT);
            return state.filter(({ id }) => id !== action.payload);
        default:
            return state;
    }
}