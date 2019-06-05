import {
    FETCH_ALL_RADIO_NEXT_SUCCESS,
    FETCH_RADIO_NEXT_SUCCESS,
    FETCH_RADIO_NEXT_FAIL,
    RADIO_CURRENT_ID
} from '../actions/types';
import React from 'react';
import {ToastAndroid} from 'react-native';

export function radioNext (state = {}, action) {
    switch(action.type)
    {
        case FETCH_ALL_RADIO_NEXT_SUCCESS:
            // ToastAndroid.show(FETCH_ALL_RADIO_NEXT_SUCCESS, ToastAndroid.SHORT);
            return action.payload;
        case FETCH_RADIO_NEXT_SUCCESS:
            // ToastAndroid.show(FETCH_RADIO_NEXT_SUCCESS, ToastAndroid.SHORT);
            let genre = action.payload.genre;
            let next = {id: action.payload.id, idPerformer: action.payload.idPerformer, performer: action.payload.performer,
                cover: action.payload.cover, title: action.payload.title, audio: action.payload.audio,
                duration: action.payload.duration, isLiked: action.payload.isLiked}
            return {...state, [genre]: next};
        case FETCH_RADIO_NEXT_FAIL:
            // ToastAndroid.show(FETCH_RADIO_NEXT_FAIL, ToastAndroid.SHORT);
            return state;
        default:
            return state;
    }
}

export function radioCurrent (state = 0, action) {
    switch(action.type)
    {
        case RADIO_CURRENT_ID:
            // ToastAndroid.show(RADIO_CURRENT_ID, ToastAndroid.SHORT);
            return action.payload;
        default:
            return state;
    }
}