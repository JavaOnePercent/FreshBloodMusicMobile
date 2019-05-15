import {
    PLAYER_PLAY_MUSIC,
    PLAYER_PAUSE_MUSIC,
    PLAYER_CREATE_QUEUE,
    PLAYER_ADD_TRACK_QUEUE,
    PLAYER_ADD_EDITION_QUEUE,
    PLAYER_CHANGE_QUEUE,
    PLAYER_DELETE_QUEUE
} from '../actions/types';

export const playPlayer = () => dispatch => {
    dispatch({type: PLAYER_PLAY_MUSIC});
};

export const pausePlayer = () => dispatch => {
    dispatch({type: PLAYER_PAUSE_MUSIC});
};

export const createQueue = (tracks) => dispatch => {
    dispatch({type: PLAYER_CREATE_QUEUE, payload: tracks});
};

export const addTrackQueue = (track) => dispatch => {
    dispatch({type: PLAYER_ADD_TRACK_QUEUE, payload: track});
};

export const addEditionQueue = (edition) => dispatch => {
    dispatch({type: PLAYER_ADD_EDITION_QUEUE, payload: edition});
};

export const changeOrderQueue = (tracks) => dispatch => {
    dispatch({type: PLAYER_CHANGE_QUEUE, payload: tracks});
};

export const deleteTrackQueue = (track) => dispatch => {
    dispatch({type: PLAYER_DELETE_QUEUE, payload: track});
};