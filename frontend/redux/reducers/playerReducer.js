import {
    PLAYER_PLAY_MUSIC,
    PLAYER_PAUSE_MUSIC,
    PLAYER_RELEASE_MUSIC,
    PLAYER_COMMON_MUSIC,
    PLAYER_RANDOM_MUSIC,
    PLAYER_UNREPEAT_MUSIC,
    PLAYER_REPEAT_MUSIC,
    PLAYER_REPEAT_ONE_MUSIC,
    PLAYER_LIKE_MUSIC,
    PLAYER_UNLIKE_MUSIC,
    PLAYER_CREATE_PREVIOUS,
    PLAYER_ADD_TRACK_PREVIOUS,
    PLAYER_DELETE_PREVIOUS,
    PLAYER_CREATE_PREVIOUS_RANDOM,
    PLAYER_ADD_TRACK_PREVIOUS_RANDOM,
    PLAYER_DELETE_PREVIOUS_RANDOM,
    PLAYER_ADD_CURRENT_TRACK,
    PLAYER_CREATE_QUEUE,
    PLAYER_ADD_TRACK_QUEUE,
    PLAYER_ADD_EDITION_QUEUE,
    PLAYER_ADD_BEGIN_QUEUE,
    PLAYER_CHANGE_QUEUE,
    PLAYER_DELETE_QUEUE,
    PLAYER_REMOVE_QUEUE,
    PLAYER_CREATE_QUEUE_RANDOM,
    PLAYER_ADD_EDITION_QUEUE_RANDOM,
    PLAYER_ADD_TRACK_QUEUE_RANDOM,
    PLAYER_ADD_BEGIN_QUEUE_RANDOM,
    PLAYER_CHANGE_QUEUE_RANDOM,
    PLAYER_DELETE_QUEUE_RANDOM,
    PLAYER_REMOVE_QUEUE_RANDOM
} from '../actions/types';
import React from 'react';
import {ToastAndroid} from 'react-native';

export function player (state = 'pause', action) {
    switch(action.type)
    {
        case PLAYER_PLAY_MUSIC:
            ToastAndroid.show(PLAYER_PLAY_MUSIC, ToastAndroid.SHORT);
            return 'play';
        case PLAYER_PAUSE_MUSIC:
            ToastAndroid.show(PLAYER_PAUSE_MUSIC, ToastAndroid.SHORT);
            return 'pause';
        case PLAYER_RELEASE_MUSIC:
            ToastAndroid.show(PLAYER_RELEASE_MUSIC, ToastAndroid.SHORT);
            return action.payload;
        default:
            return state;
    }
}

export function random (state = false, action) {
    switch(action.type)
    {
        case PLAYER_COMMON_MUSIC:
            ToastAndroid.show(PLAYER_COMMON_MUSIC, ToastAndroid.SHORT);
            return false;
        case PLAYER_RANDOM_MUSIC:
            ToastAndroid.show(PLAYER_RANDOM_MUSIC, ToastAndroid.SHORT);
            return true;
        default:
            return state;
    }
}

export function repeat (state = 'unrepeat', action) {
    switch(action.type)
    {
        case PLAYER_UNREPEAT_MUSIC:
            ToastAndroid.show(PLAYER_UNREPEAT_MUSIC, ToastAndroid.SHORT);
            return 'unrepeat';
        case PLAYER_REPEAT_MUSIC:
            ToastAndroid.show(PLAYER_REPEAT_MUSIC, ToastAndroid.SHORT);
            return 'repeat';
        case PLAYER_REPEAT_ONE_MUSIC:
            ToastAndroid.show(PLAYER_REPEAT_ONE_MUSIC, ToastAndroid.SHORT);
            return 'repeat-one';
        default:
            return state;
    }
}

export function playerLike (state = false, action) {
    switch(action.type)
    {
        case PLAYER_UNLIKE_MUSIC:
            ToastAndroid.show(PLAYER_UNLIKE_MUSIC, ToastAndroid.SHORT);
            return false;
        case PLAYER_LIKE_MUSIC:
            ToastAndroid.show(PLAYER_LIKE_MUSIC, ToastAndroid.SHORT);
            return true;
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
            return state.slice(0, state.length - 1);
        default:
            return state;
    }
}

export function previousRandom (state = [], action) {
    switch(action.type)
    {
        case PLAYER_CREATE_PREVIOUS_RANDOM:
            ToastAndroid.show(PLAYER_CREATE_PREVIOUS_RANDOM, ToastAndroid.SHORT);
            return action.payload;
        case PLAYER_ADD_TRACK_PREVIOUS_RANDOM:
            ToastAndroid.show(PLAYER_ADD_TRACK_PREVIOUS_RANDOM, ToastAndroid.SHORT);
            return [...state, action.payload];
        case PLAYER_DELETE_PREVIOUS_RANDOM:
            ToastAndroid.show(PLAYER_DELETE_PREVIOUS_RANDOM, ToastAndroid.SHORT);
            return state.slice(0, state.length - 1);
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

export function queueRandom (state = [], action) {
    switch(action.type)
    {
        case PLAYER_CREATE_QUEUE_RANDOM:
            ToastAndroid.show(PLAYER_CREATE_QUEUE_RANDOM, ToastAndroid.SHORT);
            return action.payload;
        case PLAYER_ADD_TRACK_QUEUE_RANDOM:
            ToastAndroid.show(PLAYER_ADD_TRACK_QUEUE_RANDOM, ToastAndroid.SHORT);
            return [...state, action.payload];
        case PLAYER_ADD_EDITION_QUEUE_RANDOM:
            ToastAndroid.show(PLAYER_ADD_EDITION_QUEUE_RANDOM, ToastAndroid.SHORT);
            if(state.length === 0 || !state)
            {
                return action.payload;
            }
            else
            {
                return [...state.concat(action.payload)];
            }
        case PLAYER_ADD_BEGIN_QUEUE_RANDOM:
            ToastAndroid.show(PLAYER_ADD_BEGIN_QUEUE_RANDOM, ToastAndroid.SHORT);
            return [action.payload, ...state];
        case PLAYER_CHANGE_QUEUE_RANDOM:
            ToastAndroid.show(PLAYER_CHANGE_QUEUE_RANDOM, ToastAndroid.SHORT);
            return action.payload;
        case PLAYER_DELETE_QUEUE_RANDOM:
            ToastAndroid.show(PLAYER_DELETE_QUEUE_RANDOM, ToastAndroid.SHORT);
            return state.slice(1);
        case PLAYER_REMOVE_QUEUE_RANDOM:
            ToastAndroid.show(PLAYER_REMOVE_QUEUE_RANDOM, ToastAndroid.SHORT);
            return state.filter(({ id }) => id !== action.payload);
        default:
            return state;
    }
}