import axios from 'axios';
import { ADDRESS_SERVER } from '../../components/constants/constants';
import {
    FETCH_RADIO_NEXT_SUCCESS
} from '../actions/types';
import {ToastAndroid} from "react-native";

export const getNextTrack = () => async dispatch => {
    axios.get(ADDRESS_SERVER + '/api/tracks/next',
    ).then(function (response) {
        let data = response.data;
        data.audio_trc = ADDRESS_SERVER + data.audio_trc
        data.image_alb = ADDRESS_SERVER + data.image_alb

        let track = {id: data.id, idPerformer: data.id_per, performer: data.name_per, cover: data.image_alb,
            title: data.name_trc, audio: data.audio_trc, duration: data.duration,
            isLiked: data.is_liked}
        dispatch({type: FETCH_RADIO_NEXT_SUCCESS, payload: track});
    })
        .catch(function (error) {

        });
};