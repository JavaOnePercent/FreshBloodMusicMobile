import axios from 'axios';
import { ADDRESS_SERVER } from '../../components/constants/constants';
import {
    FETCH_ALBUMS_LIKED_SUCCESS,
} from '../actions/types';
import {ToastAndroid} from "react-native";

export const getLikedAlbums = (id) => async dispatch => {
    axios.get(ADDRESS_SERVER + '/api/album_likes', {
        params: {
            performer: id,
        }
    }).then(function (response) {
        let albums = response.data;
        for(let i = 0; i < albums.length; i++)
        {
            albums[i].image = ADDRESS_SERVER + albums[i].image
        }
        dispatch({type: FETCH_ALBUMS_LIKED_SUCCESS, payload: albums});
    })
        .catch(function (error) {

        });
};