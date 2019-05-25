import {
    FETCH_RADIO_NEXT_SUCCESS,
    FETCH_RADIO_NEXT_FAIL
} from '../actions/types';
import React from 'react';
import {ToastAndroid} from 'react-native';

export function radioNext (state = {}, action) {
    switch(action.type)
    {
        case FETCH_RADIO_NEXT_SUCCESS:
            ToastAndroid.show(FETCH_RADIO_NEXT_SUCCESS, ToastAndroid.SHORT);
            return action.payload;
        case FETCH_RADIO_NEXT_FAIL:
            ToastAndroid.show(FETCH_RADIO_NEXT_FAIL, ToastAndroid.SHORT);
            return state;
        default:
            return state;
    }
}