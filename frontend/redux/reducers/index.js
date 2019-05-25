import { combineReducers } from 'redux';

import { auth } from './authReducer';
import { player, listen, random, repeat, previous, current, queue, playlist } from './playerReducer';
import { news, edition } from './newsReducer';
import { currentProfile, performer, albums } from './performerReducer';
import { chartPerformers } from './chartsReducer';
import { radioNext } from './radioReducer';

export default combineReducers({
    auth,
    player,
    listen,
    random,
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
    radioNext
});