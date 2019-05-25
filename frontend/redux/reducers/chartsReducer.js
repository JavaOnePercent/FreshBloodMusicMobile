import {
    FETCH_PERFORMERS_SUCCESS,
    FETCH_PERFORMERS_FAIL
} from '../actions/types';
import React from 'react';
import {ToastAndroid} from 'react-native';

export function chartPerformers (state = [], action) {
    switch(action.type)
    {
        case FETCH_PERFORMERS_SUCCESS:
            ToastAndroid.show(FETCH_PERFORMERS_SUCCESS, ToastAndroid.SHORT);
            return action.payload;
        case FETCH_PERFORMERS_FAIL:
            ToastAndroid.show(FETCH_PERFORMERS_FAIL, ToastAndroid.SHORT);
            return state;
        default:
            return state;
    }
}