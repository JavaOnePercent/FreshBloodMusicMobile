import {
    PLAYER_PLAY_MUSIC,
    PLAYER_PAUSE_MUSIC
} from '../actions/types';

export const pressPlayButton = () => dispatch => {
    dispatch({type: PLAYER_PLAY_MUSIC});
};

export const pressPauseButton = () => dispatch => {
    dispatch({type: PLAYER_PAUSE_MUSIC});
};
