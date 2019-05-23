import axios from 'axios';
import { ADDRESS_SERVER } from '../../components/constants/constants';
import {
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_FAIL,
    FETCH_PERFORMER_SUCCESS,
    FETCH_PERFORMER_FAIL,
    FETCH_ALBUMS_SUCCESS,
    FETCH_ALBUMS_FAIL,
} from '../actions/types';

export const createCurrentProfile = (id) => async dispatch => {
    dispatch({type: FETCH_PROFILE_SUCCESS, payload: id});
};

export const getPerformer = (id) => async dispatch => {
    axios.get(ADDRESS_SERVER + '/api/performers/' + id)
        .then(function (response) {
            let performer = response.data;
            performer.image_per = ADDRESS_SERVER + performer.image_per
            dispatch({type: FETCH_PERFORMER_SUCCESS, payload: performer});
        })
        .catch(function (error) {
        });
};

export const getAlbumsPerformer = (id) => async dispatch => {
    axios.get(ADDRESS_SERVER + '/api/albums', {
        params: {
            performer: id,
        }
    }).then(function (response) {
            let albums = response.data;
            for(let i = 0; i < albums.length; i++)
            {
                albums[i].image_per = ADDRESS_SERVER + albums[i].image_per
                albums[i].image_alb = ADDRESS_SERVER + albums[i].image_alb
            }
            dispatch({type: FETCH_ALBUMS_SUCCESS, payload: albums});
        })
        .catch(function (error) {
        });
};