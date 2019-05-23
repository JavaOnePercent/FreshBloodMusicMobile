import { combineReducers } from 'redux';

import { auth } from './authReducer';
import { player, listen, random, repeat, playerLike, previous, current, queue, playlist } from './playerReducer';
import { news, edition } from './newsReducer';
import { currentProfile, performer, albums } from './performerReducer';

export default combineReducers({
    auth,
    player,
    listen,
    random,
    repeat,
    playerLike,
    previous,
    current,
    queue,
    playlist,
    news,
    edition,
    currentProfile,
    performer,
    albums
});