import axios from 'axios';
import { ADDRESS_SERVER } from '../../components/constants/constants';
import {
    FETCH_EDITION_CLEAR,
    FETCH_NEWS_SUCCESS,
    FETCH_EDITION_SUCCESS
} from '../actions/types';

export const getNews = (sort) => async dispatch => {
    axios.get(ADDRESS_SERVER + '/api/albums', {
        params: {
            sort: sort,
        }
    }).then(function (response) {
        let news = response.data;
        for(let i = 0; i < news.length; i++)
        {
            news[i].image_per = ADDRESS_SERVER + news[i].image_per
            news[i].image_alb = ADDRESS_SERVER + news[i].image_alb
        }
        dispatch({type: FETCH_NEWS_SUCCESS, payload: news});
    })
        .catch(function (error) {

        });
};

export const getEdition = (id) => async dispatch => {
    axios.get(ADDRESS_SERVER + '/api/albums/' + id
    ).then(function (response) {
        let edition = response.data.tracks;
        // edition.image_alb = ADDRESS_SERVER + edition.image_alb
        for(let i = 0; i < edition.length; i++)
        {
            edition[i].audio_trc = ADDRESS_SERVER +  edition[i].audio_trc
        }
        dispatch({type: FETCH_EDITION_SUCCESS, payload: edition});
    })
        .catch(function (error) {

        });
};

export const clearEdition = () => async dispatch => {
    dispatch({type: FETCH_EDITION_CLEAR});
};
