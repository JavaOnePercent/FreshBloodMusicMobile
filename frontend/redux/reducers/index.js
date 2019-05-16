import { combineReducers } from 'redux';

import { player, random, repeat, playerLike, previous, previousRandom, current, queue, queueRandom } from './playerReducer';
import { news, edition } from './newsReducer';

export default combineReducers({
    player,
    random,
    repeat,
    playerLike,
    previous,
    previousRandom,
    current,
    queue,
    queueRandom,
    news,
    edition
});