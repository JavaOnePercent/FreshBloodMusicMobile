import {
    FETCH_NEWS_SUCCESS,
    FETCH_NEWS_FAIL,
    EDITION_INFO_CLEAR,
    FETCH_EDITION_SUCCESS,
    FETCH_EDITION_FAIL,
    EDITION_ADD_LIKE,
    EDITION_DELETE_LIKE,
    TRACK_ADD_LIKE,
    TRACK_DELETE_LIKE,
    TRACK_INCREMENT_LISTENING
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
        case FETCH_EDITION_SUCCESS:
            if(state.length === 0 || !state)
            {
                ToastAndroid.show(FETCH_EDITION_SUCCESS, ToastAndroid.SHORT);
                return [ action.payload ];
            }
            else
            {
                return [ ...state, action.payload];
            }
        case FETCH_EDITION_FAIL:
            ToastAndroid.show(FETCH_EDITION_FAIL, ToastAndroid.SHORT);
            return state;
        case EDITION_INFO_CLEAR:
            ToastAndroid.show(EDITION_INFO_CLEAR, ToastAndroid.SHORT);
            return state.filter(({ id }) => id !== action.payload);
        case EDITION_ADD_LIKE:
            ToastAndroid.show(EDITION_ADD_LIKE, ToastAndroid.SHORT);
            return state.map((album, index) => {
                if (album.id === action.payload) {
                    // Return a new object
                    return {
                        ...album,
                        isLiked: true,
                        likes: album.likes + 1
                    }
                }
                return album;
            })
        case EDITION_DELETE_LIKE:
            ToastAndroid.show(EDITION_DELETE_LIKE, ToastAndroid.SHORT);
            return state.map((album, index) => {
                if (album.id === action.payload) {
                    // Return a new object
                    return {
                        ...album,
                        isLiked: false,
                        likes: album.likes - 1
                    }
                }
                return album;
            })
        case TRACK_ADD_LIKE:
            ToastAndroid.show(TRACK_ADD_LIKE, ToastAndroid.SHORT);
            return state.map((album, index) => {
                return {
                    ...album,
                    tracks: album.tracks.map((track, number) => {
                        if (track.id === action.payload)
                        {
                            return {
                                ...track,
                                is_liked: true,
                                rating_trc: track.rating_trc + 1
                            }
                        }
                        return track;
                    })
                }
            })
        case TRACK_DELETE_LIKE:
            ToastAndroid.show(TRACK_DELETE_LIKE, ToastAndroid.SHORT);
            return state.map((album, index) => {
                return {
                    ...album,
                    tracks: album.tracks.map((track, number) => {
                        if (track.id === action.payload)
                        {
                            return {
                                ...track,
                                is_liked: false,
                                rating_trc: track.rating_trc - 1
                            }
                        }
                        return track;
                    })
                }
            })
        case TRACK_INCREMENT_LISTENING:
            ToastAndroid.show(TRACK_INCREMENT_LISTENING, ToastAndroid.SHORT);
            return state.map((album, index) => {
                return {
                    ...album,
                    tracks: album.tracks.map((track, number) => {
                        if (track.id === action.payload)
                        {
                            return {
                                ...track,
                                numplays_trc: track.numplays_trc + 1
                            }
                        }
                        return track;
                    })
                }
            })
        default:
            return state;
    }
}