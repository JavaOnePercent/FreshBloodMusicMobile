import axios from 'axios';
import { ADDRESS_SERVER } from '../../components/constants/constants';
import {
    FETCH_PERFORMERS_SUCCESS
} from '../actions/types';
import {ToastAndroid} from "react-native";

export const getPerformers = () => async dispatch => {
    axios.get(ADDRESS_SERVER + '/api/performers', {
        params: {
            limit: 20
        }
    }).then(function (response) {
        let performers = response.data;
        for(let i = 0; i < performers.length; i++)
        {
            performers[i].image_per = ADDRESS_SERVER + performers[i].image_per
        }
        dispatch({type: FETCH_PERFORMERS_SUCCESS, payload: performers});
    })
        .catch(function (error) {

        });
};