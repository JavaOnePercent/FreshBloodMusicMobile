import axios from 'axios';
import { ADDRESS_SERVER } from '../../components/constants/constants';
import {
    EDITION_INFO_CLEAR,
    FETCH_NEWS_SUCCESS,
    FETCH_EDITION_SUCCESS,
    EDITION_ADD_LIKE,
    EDITION_DELETE_LIKE,
    TRACK_ADD_LIKE,
    TRACK_DELETE_LIKE,
    TRACK_INCREMENT_LISTENING
} from '../actions/types';
import {ToastAndroid} from "react-native";

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
            news[i].date_alb = news[i].date_alb.substring(8, 10) + ' ' + newFormatMonth(news[i].date_alb.substring(5, 7))  + ' ' + news[i].date_alb.substring(0, 4) + ' ' + news[i].date_alb.substring(11, 16);
        }
        dispatch({type: FETCH_NEWS_SUCCESS, payload: news});
    })
        .catch(function (error) {

        });
};

export const getEdition = (id) => async dispatch => {
    axios.get(ADDRESS_SERVER + '/api/albums/' + id
    ).then(function (response) {
        let data = response.data;
        data.image_alb = ADDRESS_SERVER + data.image_alb
        data.date_alb = data.date_alb.substring(0, 4)
        for(let i = 0; i < data.tracks.length; i++)
        {
            data.tracks[i].audio_trc = ADDRESS_SERVER +  data.tracks[i].audio_trc
        }
        let edition = {id: data.id, title: data.name_alb, cover: data.image_alb, idPerformer: data.per_id,
            performer: data.name_per, style: data.style, year: data.date_alb, likes: data.rating_alb, isLiked: data.is_liked,
            tracks: data.tracks}
        dispatch({type: FETCH_EDITION_SUCCESS, payload: edition });
    })
        .catch(function (error) {

        });
};

export const clearEdition = (id) => async dispatch => {
    dispatch({type: EDITION_INFO_CLEAR, payload: id});
};

export const addLikeEdition = (id) => async dispatch => {
    axios.post(ADDRESS_SERVER + '/api/album_likes',  {}, {
        params: {
            album: id,
        }})
        .then(function (response) {
            ToastAndroid.show('Вам понравилось', ToastAndroid.SHORT);
            dispatch({type: EDITION_ADD_LIKE, payload: id});

        })
        .catch(function (error) {
        });
};


export const deleteLikeEdition = (id) => async dispatch => {
    axios.delete(ADDRESS_SERVER + '/api/album_likes',  {
        params: {
            album: id,
        }})
        .then(function (response) {
            ToastAndroid.show('Вам больше не нравится', ToastAndroid.SHORT);
            dispatch({type: EDITION_DELETE_LIKE, payload: id});
        })
        .catch(function (error) {
        });
};

export const addLikeTrack = (id) => async dispatch => {
    axios.put(ADDRESS_SERVER + '/api/likes',  {}, {
        params: {
            track_id: id,
        }})
        .then(function (response) {
            ToastAndroid.show('Вам понравилось', ToastAndroid.SHORT);
            dispatch({type: TRACK_ADD_LIKE, payload: id});

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
            dispatch({type: TRACK_DELETE_LIKE, payload: id});
        })
        .catch(function (error) {
        });
};

export const incrementListening = (id) => async dispatch => {
    axios.get(ADDRESS_SERVER + '/api/tracks/' + id
    ).then(function (response) {
        dispatch({type: TRACK_INCREMENT_LISTENING, payload: id});
    })
        .catch(function (error) {

        });
};

function newFormatMonth(month)
{
    let newFormatMonth = ''
    if(month === '01')
    {
        newFormatMonth = 'янв'
    }
    else if(month === '02')
    {
        newFormatMonth = 'фев'
    }
    else if(month === '03')
    {
        newFormatMonth = 'мар'
    }
    else if(month === '04')
    {
        newFormatMonth = 'апр'
    }
    else if(month === '05')
    {
        newFormatMonth = 'мая'
    }
    else if(month === '06')
    {
        newFormatMonth = 'июн'
    }
    else if(month === '07')
    {
        newFormatMonth = 'июл'
    }
    else if(month === '08')
    {
        newFormatMonth = 'авг'
    }
    else if(month === '09')
    {
        newFormatMonth = 'сен'
    }
    else if(month === '10')
    {
        newFormatMonth = 'окт'
    }
    else if(month === '11')
    {
        newFormatMonth = 'ноя'
    }
    else if(month === '12')
    {
        newFormatMonth = 'дек'
    }
    return newFormatMonth;
}