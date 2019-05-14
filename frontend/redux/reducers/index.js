import { combineReducers } from 'redux';

import { player } from './playerReducer';
import { news, edition } from './newsReducer';

export default combineReducers({
    player,
    news,
    edition
});