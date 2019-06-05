import axios from 'axios';
import { ADDRESS_SERVER } from '../../components/constants/constants';
import {
    FETCH_TRACKS_LIKED_SUCCESS,
    FETCH_TRACKS_LIKED_CLEAR,
    FETCH_TRACKS_LIKED_UNLIKE
} from '../actions/types';
import {ToastAndroid} from "react-native";

export const getLikedTracks = (id) => async dispatch => {
    axios.get(ADDRESS_SERVER + '/api/likes', {
        params: {
            performer: id,
        }
    }).then(function (response) {
        let tracks = response.data;
        for(let i = 0; i < tracks.length; i++)
        {
            tracks[i].image_alb = ADDRESS_SERVER + tracks[i].image_alb
            tracks[i].audio_trc = ADDRESS_SERVER + tracks[i].audio_trc
        }
        dispatch({type: FETCH_TRACKS_LIKED_SUCCESS, payload: tracks});
    })
        .catch(function (error) {

        });
};

export const deleteLikeTrack = (id) => async dispatch => {
    axios.delete(ADDRESS_SERVER + '/api/likes',  {
        params: {
            track_id: id,
        }})
        .then(function (response) {
            ToastAndroid.show('Вам больше не нравится', ToastAndroid.SHORT);
            dispatch({type: FETCH_TRACKS_LIKED_UNLIKE, payload: id});
        })
        .catch(function (error) {
        });
};

export const clearLikedTrack = () => dispatch => {
    dispatch({type: FETCH_TRACKS_LIKED_CLEAR});
};