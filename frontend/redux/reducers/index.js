import { combineReducers } from 'redux';

import { player, queue } from './playerReducer';
import { news, edition } from './newsReducer';

export default combineReducers({
    player,
    queue,
    news,
    edition
});