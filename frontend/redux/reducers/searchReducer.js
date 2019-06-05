import {
    FETCH_SEARCH_SUCCESS,
    FETCH_SEARCH_FAIL,
    FETCH_SEARCH_CLEAR,
} from '../actions/types';
import React from 'react';
import {ToastAndroid} from 'react-native';

export function search (state = [], action) {
    switch(action.type)
    {
        case FETCH_SEARCH_SUCCESS:
            // ToastAndroid.show(FETCH_SEARCH_SUCCESS, ToastAndroid.SHORT);
            return action.payload;
        case FETCH_SEARCH_FAIL:
            // ToastAndroid.show(FETCH_SEARCH_FAIL, ToastAndroid.SHORT);
            return state;
        case FETCH_SEARCH_CLEAR:
            // ToastAndroid.show(FETCH_SEARCH_CLEAR, ToastAndroid.SHORT);
            return [];
        default:
            return state;
    }
}