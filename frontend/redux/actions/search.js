import axios from 'axios';
import { ADDRESS_SERVER } from '../../components/constants/constants';
import {
    FETCH_SEARCH_SUCCESS,
    FETCH_SEARCH_CLEAR,
} from '../actions/types';
import {ToastAndroid} from "react-native";

export const getResultSearch = (query) => async dispatch => {
    axios.get(ADDRESS_SERVER + '/api/search', {
        params: {
            query: query,
        }
    }).then(function (response) {
        let search = response.data;
        for(let i = 0; i < search.results.length; i++)
        {
            search.results[i].image = ADDRESS_SERVER + '/media/' + search.results[i].image
            if(search.results[i].type === 'track')
            {
                search.results[i].audio = ADDRESS_SERVER + '/media/' + search.results[i].audio
            }
        }
        dispatch({type: FETCH_SEARCH_SUCCESS, payload: search});
    })
        .catch(function (error) {

        });
};

export const clearResultSearch = () => dispatch => {
    dispatch({type: FETCH_SEARCH_CLEAR});
};

