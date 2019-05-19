import { combineReducers } from 'redux';

import { player, listen, random, repeat, playerLike, previous, current, queue, playlist } from './playerReducer';
import { news, edition } from './newsReducer';

export default combineReducers({
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
    edition
});