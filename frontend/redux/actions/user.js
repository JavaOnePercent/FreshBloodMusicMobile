import axios from 'axios';
import { ADDRESS_SERVER } from '../../components/constants/constants';
import {
    FETCH_USER_PLAYLISTS_SUCCESS,
    FETCH_USER_PLAYLIST_DELETE,
} from '../actions/types';
import {ToastAndroid} from "react-native";

export const getUserPlaylists = (id) => async dispatch => {
    axios.get(ADDRESS_SERVER + '/api/playlists', {
        params: {
            performer: id
        }
    }).then(function (response) {
        let playlists = response.data;
        for(let i = 0; i < playlists.length; i++)
        {
            if(playlists[i].image === null)
            {
                playlists[i].image = ADDRESS_SERVER + '/static/mainapp/images/playlist.png'
            }
            else
            {
                playlists[i].image = ADDRESS_SERVER + playlists[i].image
            }
        }
        dispatch({type: FETCH_USER_PLAYLISTS_SUCCESS, payload: playlists});
    })
        .catch(function (error) {

        });
};

export const createUserPlaylist = (title, image) => async dispatch => {
    let params = new FormData()
    params.append("title", title);
    params.append("image", image);
    axios.post(ADDRESS_SERVER + '/api/playlists', params)
        .then(function (response) {

    })
        .catch(function (error) {

        });
};

export const deleteLikeEdition = (id) => async dispatch => {
    axios.delete(ADDRESS_SERVER + '/api/playlists/' + id)
        .then(function (response) {
            dispatch({type: FETCH_USER_PLAYLIST_DELETE, payload: id});
        })
        .catch(function (error) {
        });
};