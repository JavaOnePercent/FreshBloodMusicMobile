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

export const playPlayer = () => dispatch => {
    dispatch({type: PLAYER_PLAY_MUSIC});
};

export const pausePlayer = () => dispatch => {
    dispatch({type: PLAYER_PAUSE_MUSIC});
};

export const releasePlayer = (audio) => dispatch => {
    dispatch({type: PLAYER_RELEASE_MUSIC, payload: audio});
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

export const deleteTrackPrevious = () => dispatch => {
    dispatch({type: PLAYER_DELETE_PREVIOUS});
};

export const createPreviousRandom = (tracks) => dispatch => {
    dispatch({type: PLAYER_CREATE_PREVIOUS_RANDOM, payload: tracks});
};

export const addTrackPreviousRandom = (track) => dispatch => {
    dispatch({type: PLAYER_ADD_TRACK_PREVIOUS_RANDOM, payload: track});
};

export const deleteTrackPreviousRandom = () => dispatch => {
    dispatch({type: PLAYER_DELETE_PREVIOUS_RANDOM});
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

export const createQueueRandom = (tracks) => dispatch => {
    dispatch({type: PLAYER_CREATE_QUEUE_RANDOM, payload: tracks});
};

export const addTrackQueueRandom = (track) => dispatch => {
    dispatch({type: PLAYER_ADD_TRACK_QUEUE_RANDOM, payload: track});
};

export const addEditionQueueRandom = (edition) => dispatch => {
    dispatch({type: PLAYER_ADD_EDITION_QUEUE_RANDOM, payload: edition});
};

export const addBeginQueueRandom = (track) => dispatch => {
    dispatch({type: PLAYER_ADD_BEGIN_QUEUE_RANDOM, payload: track});
};
export const changeOrderQueueRandom = (tracks) => dispatch => {
    dispatch({type: PLAYER_CHANGE_QUEUE_RANDOM, payload: tracks});
};

export const deleteTrackQueueRandom = () => dispatch => {
    dispatch({type: PLAYER_DELETE_QUEUE_RANDOM});
};

export const removeTrackQueueRandom = (track) => dispatch => {
    dispatch({type: PLAYER_REMOVE_QUEUE_RANDOM, payload: track});
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