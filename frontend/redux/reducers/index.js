import { combineReducers } from 'redux';

import { player, random, repeat, playerLike, previous, current, queue, playlist } from './playerReducer';
import { news, edition } from './newsReducer';

export default combineReducers({
    player,
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