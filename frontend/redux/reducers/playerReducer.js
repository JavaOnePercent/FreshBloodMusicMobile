import {
    PLAYER_PLAY_MUSIC,
    PLAYER_PAUSE_MUSIC
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
            return false;
    }
}