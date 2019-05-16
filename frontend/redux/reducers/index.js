import { combineReducers } from 'redux';

import { player, previous, current, queue } from './playerReducer';
import { news, edition } from './newsReducer';

export default combineReducers({
    player,
    previous,
    current,
    queue,
    news,
    edition
});