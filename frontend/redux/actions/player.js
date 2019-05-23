import {
    PLAYER_PLAY_MUSIC,
    PLAYER_PAUSE_MUSIC,
    PLAYER_RELEASE_MUSIC,
    PLAYER_LISTEN_MUSIC,
    PLAYER_UNLISTEN_MUSIC,
    PLAYER_COMMON_MUSIC,
    PLAYER_RANDOM_MUSIC,
    PLAYER_UNREPEAT_MUSIC,
    PLAYER_REPEAT_MUSIC,
    PLAYER_REPEAT_ONE_MUSIC,
    PLAYER_LIKE_MUSIC,
    PLAYER_UNLIKE_MUSIC,
    PLAYER_CREATE_PREVIOUS,
    PLAYER_ADD_TRACK_PREVIOUS,
    PLAYER_LIKE_TRACK_PREVIOUS,
    PLAYER_UNLIKE_TRACK_PREVIOUS,
    PLAYER_ADD_BEGIN_PREVIOUS,
    PLAYER_DELETE_PREVIOUS,
    PLAYER_CLEAR_PREVIOUS,
    PLAYER_ADD_CURRENT_TRACK,
    PLAYER_LIKE_CURRENT_TRACK,
    PLAYER_UNLIKE_CURRENT_TRACK,
    PLAYER_CREATE_QUEUE,
    PLAYER_ADD_TRACK_QUEUE,
    PLAYER_LIKE_TRACK_QUEUE,
    PLAYER_UNLIKE_TRACK_QUEUE,
    PLAYER_ADD_EDITION_QUEUE,
    PLAYER_ADD_BEGIN_QUEUE,
    PLAYER_CHANGE_QUEUE,
    PLAYER_DELETE_QUEUE,
    PLAYER_REMOVE_QUEUE,
    PLAYER_CLEAR_QUEUE,
    PLAYER_CREATE_PLAYLIST,
    PLAYER_ADD_EDITION_PLAYLIST,
    PLAYER_ADD_TRACK_PLAYLIST,
    PLAYER_LIKE_TRACK_PLAYLIST,
    PLAYER_UNLIKE_TRACK_PLAYLIST,
    PLAYER_REMOVE_PLAYLIST,
    PLAYER_CLEAR_PLAYLIST, FETCH_EDITION_SUCCESS
} from '../actions/types';
import axios from "axios";
import {ADDRESS_SERVER} from "../../components/constants/constants";

export const playPlayer = () => dispatch => {
    dispatch({type: PLAYER_PLAY_MUSIC});
};

export const pausePlayer = () => dispatch => {
    dispatch({type: PLAYER_PAUSE_MUSIC});
};

export const releasePlayer = (audio) => dispatch => {
    dispatch({type: PLAYER_RELEASE_MUSIC, payload: audio});
};

export const listenPlayer = () => dispatch => {
    dispatch({type: PLAYER_LISTEN_MUSIC});
};

export const unlistenPlayer = () => dispatch => {
    dispatch({type: PLAYER_UNLISTEN_MUSIC});
};

export const createCommonMusic = () => dispatch => {
    dispatch({type: PLAYER_COMMON_MUSIC});
};

export const createRandomMusic = () => dispatch => {
    dispatch({type: PLAYER_RANDOM_MUSIC});
};

export const unrepeatMusic = () => dispatch => {
    dispatch({type: PLAYER_UNREPEAT_MUSIC});
};

export const repeatMusic = () => dispatch => {
    dispatch({type: PLAYER_REPEAT_MUSIC});
};

export const repeatOneMusic = () => dispatch => {
    dispatch({type: PLAYER_REPEAT_ONE_MUSIC});
};

export const unlikeMusic = () => dispatch => {
    dispatch({type: PLAYER_UNLIKE_MUSIC});
};

export const likeMusic = () => dispatch => {
    dispatch({type: PLAYER_LIKE_MUSIC});
};

export const createPrevious = (tracks) => dispatch => {
    dispatch({type: PLAYER_CREATE_PREVIOUS, payload: tracks});
};

export const addTrackPrevious = (track) => dispatch => {
    dispatch({type: PLAYER_ADD_TRACK_PREVIOUS, payload: track});
};

export const likeTrackPrevious = (id) => dispatch => {
    dispatch({type: PLAYER_LIKE_TRACK_PREVIOUS, payload: id});
};

export const unlikeTrackPrevious = (id) => dispatch => {
    dispatch({type: PLAYER_UNLIKE_TRACK_PREVIOUS, payload: id});
};

export const addBeginPrevious = (track) => dispatch => {
    dispatch({type: PLAYER_ADD_BEGIN_PREVIOUS, payload: track});
}

export const deleteTrackPrevious = () => dispatch => {
    dispatch({type: PLAYER_DELETE_PREVIOUS});
};

export const clearPrevious = () => dispatch => {
    dispatch({type: PLAYER_CLEAR_PREVIOUS});
};

export const addCurrent = (track) => dispatch => {
    dispatch({type: PLAYER_ADD_CURRENT_TRACK, payload: track});
};

export const likeCurrent = () => dispatch => {
    dispatch({type: PLAYER_LIKE_CURRENT_TRACK});
};

export const unlikeCurrent = () => dispatch => {
    dispatch({type: PLAYER_UNLIKE_CURRENT_TRACK});
};

export const createQueue = (tracks) => dispatch => {
    dispatch({type: PLAYER_CREATE_QUEUE, payload: tracks});
};

export const addTrackQueue = (track) => dispatch => {
    dispatch({type: PLAYER_ADD_TRACK_QUEUE, payload: track});
};

export const likeTrackQueue = (id) => dispatch => {
    dispatch({type: PLAYER_LIKE_TRACK_QUEUE, payload: id});
};

export const unlikeTrackQueue = (id) => dispatch => {
    dispatch({type: PLAYER_UNLIKE_TRACK_QUEUE, payload: id});
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

export const clearQueue = () => dispatch => {
    dispatch({type: PLAYER_CLEAR_QUEUE});
};

export const createPlaylist = (tracks) => dispatch => {
    dispatch({type: PLAYER_CREATE_PLAYLIST, payload: tracks});
};

export const addTrackPlaylist = (track) => dispatch => {
    dispatch({type: PLAYER_ADD_TRACK_PLAYLIST, payload: track});
};

export const likeTrackPlaylist = (id) => dispatch => {
    dispatch({type: PLAYER_LIKE_TRACK_PLAYLIST, payload: id});
};

export const unlikeTrackPlaylist = (id) => dispatch => {
    dispatch({type: PLAYER_UNLIKE_TRACK_PLAYLIST, payload: id});
};

export const addEditionPlaylist = (edition) => dispatch => {
    dispatch({type: PLAYER_ADD_EDITION_PLAYLIST, payload: edition});
};

export const removeTrackPlaylist = (track) => dispatch => {
    dispatch({type: PLAYER_REMOVE_PLAYLIST, payload: track});
};

export const clearTrackPlaylist = () => dispatch => {
    dispatch({type: PLAYER_CLEAR_PLAYLIST});
};
export const shuffleListTrack = (listTrack) => {
    let ctr = listTrack.length, temp, index;

    while (ctr > 0)
    {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = listTrack[ctr];
        listTrack[ctr] = listTrack[index];
        listTrack[index] = temp;
    }
    return listTrack;
}