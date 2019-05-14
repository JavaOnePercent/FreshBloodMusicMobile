import {
    FETCH_NEWS_SUCCESS,
    FETCH_NEWS_FAIL,
    FETCH_EDITION_CLEAR,
    FETCH_EDITION_SUCCESS,
    FETCH_EDITION_FAIL
} from '../actions/types';
import React from 'react';
import {ToastAndroid} from 'react-native';

export function news (state = [], action) {
    switch(action.type)
    {
        case FETCH_NEWS_SUCCESS:
            ToastAndroid.show(FETCH_NEWS_SUCCESS, ToastAndroid.SHORT);
            return action.payload;
        case FETCH_NEWS_FAIL:
            ToastAndroid.show(FETCH_NEWS_FAIL, ToastAndroid.SHORT);
            return state;
        default:
            return state;
    }
}

export function edition (state = [], action) {
    switch(action.type)
    {
        case FETCH_EDITION_CLEAR:
            ToastAndroid.show(FETCH_EDITION_CLEAR, ToastAndroid.SHORT);
            return [];
        case FETCH_EDITION_SUCCESS:
            ToastAndroid.show(FETCH_EDITION_SUCCESS, ToastAndroid.SHORT);
            return action.payload;
        case FETCH_EDITION_FAIL:
            ToastAndroid.show(FETCH_EDITION_FAIL, ToastAndroid.SHORT);
            return state;
        default:
            return state;
    }
}