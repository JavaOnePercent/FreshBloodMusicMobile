import axios from 'axios';
import { ADDRESS_SERVER } from '../../components/constants/constants';
import {
    FETCH_ALL_RADIO_NEXT_SUCCESS,
    FETCH_RADIO_NEXT_SUCCESS,
    RADIO_CURRENT_ID
} from '../actions/types';
import {ToastAndroid} from "react-native";

export const getAllNextTrack = () => async dispatch => {
    let tracks = {}

    axios.get(ADDRESS_SERVER + '/api/tracks/next').then(function (response) {
        let data = response.data;
        data.audio_trc = ADDRESS_SERVER + data.audio_trc
        data.image_alb = ADDRESS_SERVER + data.image_alb

        tracks[0] = {id: data.id, idPerformer: data.id_per, performer: data.name_per, cover: data.image_alb,
            title: data.name_trc, audio: data.audio_trc, duration: data.duration,
            isLiked: data.is_liked};
    })
        .catch(function (error) {

        });
    for(let i = 1; i < 18; i++)
    {

        axios.get(ADDRESS_SERVER + '/api/tracks/next',
            {
                params: {
                    genre: i,
                }
            }).then(function (response) {
            let data = response.data;
            data.audio_trc = ADDRESS_SERVER + data.audio_trc
            data.image_alb = ADDRESS_SERVER + data.image_alb

            tracks[i] = {id: data.id, idPerformer: data.id_per, performer: data.name_per, cover: data.image_alb,
                title: data.name_trc, audio: data.audio_trc, duration: data.duration,
                isLiked: data.is_liked};
        })
            .catch(function (error) {

            });
    }
    dispatch({type: FETCH_ALL_RADIO_NEXT_SUCCESS, payload: tracks});

};

export const getWithoutGenreNextTrack = () => async dispatch => {
    axios.get(ADDRESS_SERVER + '/api/tracks/next').then(function (response) {
        let data = response.data;
        data.audio_trc = ADDRESS_SERVER + data.audio_trc
        data.image_alb = ADDRESS_SERVER + data.image_alb

        let track = {genre: 0, id: data.id, idPerformer: data.id_per, performer: data.name_per, cover: data.image_alb,
            title: data.name_trc, audio: data.audio_trc, duration: data.duration,
            isLiked: data.is_liked}
        dispatch({type: FETCH_RADIO_NEXT_SUCCESS, payload: track});
    })
        .catch(function (error) {

        });
};

export const getNextTrack = (id) => async dispatch => {
    axios.get(ADDRESS_SERVER + '/api/tracks/next',
        {
            params: {
                genre: id,
            }
        }).then(function (response) {
        let data = response.data;
        data.audio_trc = ADDRESS_SERVER + data.audio_trc
        data.image_alb = ADDRESS_SERVER + data.image_alb

        let track = {genre: id, id: data.id, idPerformer: data.id_per, performer: data.name_per, cover: data.image_alb,
            title: data.name_trc, audio: data.audio_trc, duration: data.duration,
            isLiked: data.is_liked}
        dispatch({type: FETCH_RADIO_NEXT_SUCCESS, payload: track});
    })
        .catch(function (error) {

        });
};

export const setCurrentRadio = (id) => async dispatch => {
    dispatch({type: RADIO_CURRENT_ID, payload: id});
};