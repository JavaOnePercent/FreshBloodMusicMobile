import {
    PLAYER_PLAY_MUSIC,
    PLAYER_PAUSE_MUSIC,
    PLAYER_CREATE_PREVIOUS,
    PLAYER_ADD_TRACK_PREVIOUS,
    PLAYER_DELETE_PREVIOUS,
    PLAYER_ADD_CURRENT_TRACK,
    PLAYER_CREATE_QUEUE,
    PLAYER_ADD_TRACK_QUEUE,
    PLAYER_ADD_EDITION_QUEUE,
    PLAYER_ADD_BEGIN_QUEUE,
    PLAYER_CHANGE_QUEUE,
    PLAYER_DELETE_QUEUE,
    PLAYER_REMOVE_QUEUE,
} from '../actions/types';

export const playPlayer = () => dispatch => {
    dispatch({type: PLAYER_PLAY_MUSIC});
};

export const pausePlayer = () => dispatch => {
    dispatch({type: PLAYER_PAUSE_MUSIC});
};

export const createPrevious = (tracks) => dispatch => {
    dispatch({type: PLAYER_CREATE_PREVIOUS, payload: tracks});
};

export const addTrackPrevious = (track) => dispatch => {
    dispatch({type: PLAYER_ADD_TRACK_PREVIOUS, payload: track});
};

export const deleteTrackPrevious = () => dispatch => {
    dispatch({type: PLAYER_DELETE_PREVIOUS});
};

export const addCurrent = (track) => dispatch => {
    dispatch({type: PLAYER_ADD_CURRENT_TRACK, payload: track});
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

export const addBeginQueue = (track) => dispatch => {
    dispatch({type: PLAYER_ADD_BEGIN_QUEUE, payload: track});
};
export const changeOrderQueue = (tracks) => dispatch => {
    dispatch({type: PLAYER_CHANGE_QUEUE, payload: tracks});
};

export const deleteTrackQueue = () => dispatch => {
    dispatch({type: PLAYER_DELETE_QUEUE});
};

export const removeTrackQueue = (track) => dispatch => {
    dispatch({type: PLAYER_REMOVE_QUEUE, payload: track});
};