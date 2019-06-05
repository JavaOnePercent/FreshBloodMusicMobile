import { combineReducers } from 'redux';

import { auth } from './authReducer';
import { player, listen, modePlay, repeat, previous, current, queue, playlist } from './playerReducer';
import { news, edition } from './newsReducer';
import { currentProfile, performer, albums } from './performerReducer';
import { chartPerformers } from './chartsReducer';
import { radioNext, radioCurrent } from './radioReducer';
import { userPlaylists } from './userReducer';
import { customPlaylist, listPlaylist, addedPlaylist } from './playlistReducer';
import { likedAlbums } from './albumsReducer';
import { likedTracks } from './tracksReducer';
import { search } from './searchReducer';

export default combineReducers({
    auth,
    player,
    listen,
    modePlay,
    repeat,
    previous,
    current,
    queue,
    playlist,
    news,
    edition,
    currentProfile,
    performer,
    albums,
    chartPerformers,
    radioNext,
    radioCurrent,
    userPlaylists,
    customPlaylist,
    likedAlbums,
    likedTracks,
    listPlaylist,
    addedPlaylist,
    search
});