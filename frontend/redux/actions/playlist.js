import axios from 'axios';
import { ADDRESS_SERVER } from '../../components/constants/constants';
import {
    FETCH_USER_PLAYLIST_SUCCESS,
    FETCH_TRACK_PLAYLIST_DELETE,
    FETCH_USER_PLAYLIST_CLEAR,
    FETCH_TRACK_PLAYLIST_LIKE,
    FETCH_TRACK_PLAYLIST_UNLIKE,
    FETCH_LIST_PLAYLIST_SUCCESS,
    FETCH_LIST_PLAYLIST_CLEAR,
    FETCH_ADD_PLAYLIST_TRACK,
    FETCH_ADDED_PLAYLIST_SUCCESS,
    FETCH_ADDED_PLAYLIST_CLEAR,
    FETCH_ADDED_PLAYLIST_ADD,
    FETCH_ADDED_PLAYLIST_DELETE,
} from '../actions/types';
import {ToastAndroid} from "react-native";

export const getPlaylist = (id) => async dispatch => {
    axios.get(ADDRESS_SERVER + '/api/playlists/' + id).then(function (response) {
        let playlist = response.data;
        if(playlist.image === null)
        {
            playlist.image = ADDRESS_SERVER + '/static/mainapp/images/playlist.png'
        }
        else
        {
            playlist.image = ADDRESS_SERVER + playlist.image
        }
        for(let i = 0; i < playlist.tracks.length; i++)
        {
            playlist.tracks[i].track.image_alb = ADDRESS_SERVER + playlist.tracks[i].track.image_alb
            playlist.tracks[i].track.audio_trc = ADDRESS_SERVER + playlist.tracks[i].track.audio_trc
        }
        dispatch({type: FETCH_USER_PLAYLIST_SUCCESS, payload: playlist});
    })
        .catch(function (error) {

        });
};

export const deleteTrackFromPlaylist = (idPlaylist, id, idTrack) => async dispatch => {
    axios.delete(ADDRESS_SERVER + '/api/playlist_tracks', {
        params: {
            playlist: idPlaylist,
            track: idTrack
        }
    })
        .then(function (response) {
            dispatch({type: FETCH_TRACK_PLAYLIST_DELETE, payload: id});
        })
        .catch(function (error) {
        });
};

export const clearPlaylist = () => dispatch => {
    dispatch({type: FETCH_USER_PLAYLIST_CLEAR});
};

export const likeTrackFromPlaylist = (id, idTrack) => async dispatch => {
    axios.put(ADDRESS_SERVER + '/api/likes',  {}, {
        params: {
            track_id: idTrack,
        }})
        .then(function (response) {
            ToastAndroid.show('Вам понравилось', ToastAndroid.SHORT);
            dispatch({type: FETCH_TRACK_PLAYLIST_LIKE, payload: id});

        })
        .catch(function (error) {
        });
};

export const unlikeTrackFromPlaylist = (id, idTrack) => async dispatch => {
    axios.delete(ADDRESS_SERVER + '/api/likes',  {
        params: {
            track_id: idTrack,
        }})
        .then(function (response) {
            ToastAndroid.show('Вам больше не нравится', ToastAndroid.SHORT);
            dispatch({type: FETCH_TRACK_PLAYLIST_UNLIKE, payload: id});
        })
        .catch(function (error) {
        });
};

export const getListPlaylist = (id) => async dispatch => {
    axios.get(ADDRESS_SERVER + '/api/playlists',  {
        params: {
            performer: id,
        }})
        .then(function (response) {
            let listPlaylist = response.data;
            dispatch({type: FETCH_LIST_PLAYLIST_SUCCESS, payload: listPlaylist});
        })
        .catch(function (error) {
        });
};

export const clearListPlaylist = () => dispatch => {
    dispatch({type: FETCH_LIST_PLAYLIST_CLEAR});
};

export const getAddedListPlaylist = (idPerformer, idTrack) => async dispatch => {
    axios.get(ADDRESS_SERVER + '/api/playlists',  {
        params: {
            performer: idPerformer,
            track: idTrack
        }})
        .then(function (response) {
            let addedTrackPlaylist = response.data;
            let playlist = []
            for(let i = 0; i < addedTrackPlaylist.length; i++)
            {
                playlist.push(addedTrackPlaylist[i].id);
            }
            dispatch({type: FETCH_ADDED_PLAYLIST_SUCCESS, payload: playlist});
        })
        .catch(function (error) {
        });
};


export const addTrackAddedPlaylist = (idPlaylist, idTrack) => async dispatch => {
    axios.post(ADDRESS_SERVER + '/api/playlist_tracks', null, {
        params: {
            playlist: idPlaylist,
            track: idTrack
        }})
        .then(function (response) {
            dispatch({type: FETCH_ADDED_PLAYLIST_ADD, payload: idPlaylist});
        })
        .catch(function (error) {

        });
};

export const clearAddedListPlaylist = () => dispatch => {
    dispatch({type: FETCH_ADDED_PLAYLIST_CLEAR});
};



