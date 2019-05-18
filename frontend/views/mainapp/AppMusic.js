import React from 'react';
import {Dimensions, StyleSheet, Text, ToastAndroid, View, ScrollView} from 'react-native';
import {Navigations} from "../../components/navigations/Navigations";
import store from "../../redux/store";
import {connect, Provider} from "react-redux";

import MiniPlayer from "../../components/player/MiniPlayer";
import FullPlayer from "../../components/player/FullPlayer";

import Sound from 'react-native-sound';
import {
    playPlayer, pausePlayer, addTrackPrevious, addTrackPreviousRandom, addBeginQueue, addBeginQueueRandom, addCurrent,
    deleteTrackPrevious, deleteTrackPreviousRandom, deleteTrackQueue, deleteTrackQueueRandom, createCommonMusic,
    createRandomMusic, createPrevious, createPreviousRandom, createQueueRandom, createQueue, shuffleListTrack
} from "../../redux/actions/player";

class AppMusic extends React.Component {

    constructor(props) {
        super(props);

        Sound.setCategory('Playback', true);

        this.state = {
            isOpenPlayer: false
        }
        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
        this.play = this.play.bind(this)
        this.pause = this.pause.bind(this)
        this.run = this.run.bind(this)
        this.stop = this.stop.bind(this)
        this.prev = this.prev.bind(this)
        this.next = this.next.bind(this)
        this.random = this.random.bind(this)
    }

    componentDidMount()
    {

    }

    componentDidUpdate(prevState)
    {
        if(prevState.isPlay !== this.props.isPlay)
        {
            if(this.props.isPlay === 'play')
            {
                this.play(null);
            }
            else if(this.props.isPlay === 'pause')
            {
                this.pause();
            }
            else
            {
                if(this.sound !== undefined)
                {
                    this.sound.release();
                }
                this.play({audio: this.props.isPlay});
                if(this.props.random)
                {
                    this.props.onAddCurrent(this.props.queueRandom[0]);
                    this.props.onDeleteTrackQueueRandom();
                }
                else
                {
                    this.props.onAddCurrent(this.props.queue[0]);
                    this.props.onDeleteTrackQueue();
                }
            }
        }
    }
    //
    // state = {
    //     tracks: [],
    //     current: {},
    //     queue: []
    // }
    //
    // static getDerivedStateFromProps(nextProps, prevState) {
    //
    //     if(prevState.previous !== nextProps.previous)
    //     {
    //         return {
    //             previous: nextProps.previous
    //         }
    //     }
    //     else if(prevState.current !== nextProps.current)
    //     {
    //         return {
    //             current: nextProps.current
    //         }
    //     }
    //     else if(prevState.queue !== nextProps.queue)
    //     {
    //         return {
    //             queue: nextProps.queue
    //         }
    //     }
    // }

    open()
    {
        this.setState({isOpenPlayer: true});
    }

    close()
    {
        this.setState({isOpenPlayer: false});
    }

    run()
    {
        this.props.onPressPlayButton()
    }

    stop()
    {
        this.props.onPressPauseButton()
    }

    play(track)
    {
        if(this.props.random)
        {
            if(this.props.queueRandom.length !== 0 && track === null && this.sound === undefined)
            {
                track = this.props.queueRandom[0]
                this.props.onAddCurrent(track)
                this.props.onDeleteTrackQueueRandom()
            }
            else if(this.props.queueRandom.length === 0 && track === null && this.sound === undefined)
            {
                ToastAndroid.show('Найди сначала музыку для плеера', ToastAndroid.SHORT);

            }
        }
        else
        {
            if(this.props.queue.length !== 0 && track === null && this.sound === undefined)
            {
                track = this.props.queue[0]
                this.props.onAddCurrent(track)
                this.props.onDeleteTrackQueue()
            }
            else if(this.props.queue.length === 0 && track === null && this.sound === undefined)
            {
                ToastAndroid.show('Найди сначала музыку для плеера', ToastAndroid.SHORT);

            }
        }
        if(track !== null)
        {
            this.sound = new Sound(track.audio, Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    ToastAndroid.show('Error', ToastAndroid.SHORT);
                } else {
                    this.sound.play((success) => {
                        if (success)
                        {
                            if(this.props.random)
                            {
                                if(this.props.queueRandom.length > 0)
                                {
                                    this.sound.release();
                                    this.play(this.props.queueRandom[0]);
                                    this.props.onAddTrackPreviousRandom(this.props.current)
                                    this.props.onAddCurrent(this.props.queueRandom[0])
                                    this.props.onDeleteTrackQueueRandom()
                                    this.props.onPressPlayButton()
                                }
                            }
                            else
                            {
                                if(this.props.queue.length > 0)
                                {
                                    this.sound.release();
                                    this.play(this.props.queue[0]);
                                    this.props.onAddTrackPrevious(this.props.current)
                                    this.props.onAddCurrent(this.props.queue[0])
                                    this.props.onDeleteTrackQueue()
                                    this.props.onPressPlayButton()
                                }
                            }
                        }
                        else {
                            ToastAndroid.show('Error', ToastAndroid.SHORT);
                        }
                    });
                }
            });
        }
        else
        {
            this.sound.play((success) => {
                if (success) {
                    if(this.props.random)
                    {
                        if(this.props.queueRandom.length > 0)
                        {
                            this.sound.release();
                            this.play(this.props.queueRandom[0]);
                            this.props.onAddTrackPreviousRandom(this.props.current)
                            this.props.onAddCurrent(this.props.queueRandom[0])
                            this.props.onDeleteTrackQueueRandom()
                            this.props.onPressPlayButton()
                        }
                    }
                    else
                    {
                        if(this.props.queue.length > 0)
                        {
                            this.sound.release();
                            this.play(this.props.queue[0]);
                            this.props.onAddTrackPrevious(this.props.current)
                            this.props.onAddCurrent(this.props.queue[0])
                            this.props.onDeleteTrackQueue()
                            this.props.onPressPlayButton()
                        }
                    }
                } else {
                    ToastAndroid.show('Error', ToastAndroid.SHORT);
                }
            });
        }
    }

    pause()
    {
        this.sound.pause();
    }

    prev()
    {
        if(this.props.random)
        {
            if(this.props.previousRandom.length > 0)
            {
                this.sound.release();
                this.play(this.props.previousRandom[this.props.previousRandom.length - 1]);
                this.props.onAddBeginQueueRandom(this.props.current)
                this.props.onAddCurrent(this.props.previousRandom[this.props.previousRandom.length - 1])
                this.props.onDeleteTrackPreviousRandom()
                this.props.onPressPlayButton()
            }
        }
        else
        {
            if(this.props.previous.length > 0)
            {
                this.sound.release();
                this.play(this.props.previous[this.props.previous.length - 1]);
                this.props.onAddBeginQueue(this.props.current)
                this.props.onAddCurrent(this.props.previous[this.props.previous.length - 1])
                this.props.onDeleteTrackPrevious()
                this.props.onPressPlayButton()
            }
        }
    }

    next()
    {
        if(this.props.random)
        {
            if(this.props.queueRandom.length > 0)
            {
                this.sound.release();
                this.play(this.props.queueRandom[0]);
                this.props.onAddTrackPreviousRandom(this.props.current)
                this.props.onAddCurrent(this.props.queueRandom[0])
                this.props.onDeleteTrackQueueRandom()
                this.props.onPressPlayButton()
            }
        }
        else
        {
            if(this.props.queue.length > 0)
            {
                this.sound.release();
                this.play(this.props.queue[0]);
                this.props.onAddTrackPrevious(this.props.current)
                this.props.onAddCurrent(this.props.queue[0])
                this.props.onDeleteTrackQueue()
                this.props.onPressPlayButton()
            }
        }
    }

    random()
    {
        if(this.props.random)
        {
            this.props.onCreateCommonMusic();
            if(this.props.current.id !== undefined)
            {
                let trackList = this.props.queue
                let prev = []
                let queue = []
                let isCurrent = false
                trackList.map((l, i) => {
                    if (l.id === this.props.current.id && !isCurrent)
                    {
                        isCurrent = true
                    }
                    if (!isCurrent && l.id !== this.props.current.id)
                    {
                        prev.push(l)
                    }
                    else if (isCurrent && l.id !== this.props.current.id)
                    {
                        queue.push(l)
                    }
                })
                this.props.onCreatePrevious(prev)
                this.props.onCreateQueue(queue)
            }
        }
        else {
            this.props.onCreateRandomMusic();
            if (this.props.current.id !== undefined)
            {
                let list = this.props.previous.concat(this.props.current, this.props.queue)
                let trackList = this.props.previous.concat(this.props.current, this.props.queue)
                this.props.onCreateQueue(list)
                let trackListRandom = shuffleListTrack(trackList);
                let prevRandom = []
                let queueRandom = []
                let isCurrent = false
                trackListRandom.map((l, i) => {
                    if (l.id === this.props.current.id && !isCurrent)
                    {
                        isCurrent = true
                    }
                    if (!isCurrent && l.id !== this.props.current.id)
                    {
                        prevRandom.push(l)
                    }
                    else if (isCurrent && l.id !== this.props.current.id)
                    {
                        queueRandom.push(l)
                    }
                })
                // this.props.onCreateQueue(trackList)
                this.props.onCreatePreviousRandom(prevRandom)
                this.props.onCreateQueueRandom(queueRandom)

                // let randomPrevious = shuffleListTrack(this.props.previous);
                // let randomQueue = shuffleListTrack(this.props.queue);
                // this.props.onCreatePreviousRandom(randomPrevious);
                // this.props.onCreateQueueRandom(randomQueue);
            }
        }
    }


    render() {

        const { current, queue, queueRandom } = this.props;

        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <Navigations />
                    <View style={styles.smallPlayer}>
                        <MiniPlayer
                            iconAlbum={current.cover}
                            nameTrack={current.title}
                            playTrack={this.run}
                            pauseTrack={this.stop}
                            openPlayer={this.open}
                            nextTrack={this.next}
                            isPlay={this.props.isPlay}/>
                    </View>
                    {this.state.isOpenPlayer === true &&
                        <View style={styles.fullPlayer}>
                            <FullPlayer
                                iconAlbum={current.cover}
                                namePerformer={current.performer}
                                nameTrack={current.title}
                                playTrack={this.run}
                                pauseTrack={this.stop}
                                closePlayer={this.close}
                                prevTrack={this.prev}
                                nextTrack={this.next}
                                sound={this.sound}
                                isPlay={this.props.isPlay}
                                isRandom={this.props.random}
                                random={this.random}
                                queue={queue}
                                queueRandom={queueRandom}/>
                        </View>
                    }
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 0
    },
    smallPlayer: {
        marginTop: Dimensions.get('window').height - 139,
        zIndex: 1,
        position: 'absolute'
    },
    fullPlayer: {
        zIndex: 2,
        position: 'absolute'
    }
});

export default connect(
    state => ({isPlay: state.player, previous: state.previous, previousRandom: state.previousRandom,
        current: state.current, queue: state.queue, queueRandom: state.queueRandom, random: state.random}),
    dispatch => ({
        onPressPlayButton: () => {
            dispatch(playPlayer());
        },
        onPressPauseButton: () => {
            dispatch(pausePlayer());
        },
        onAddTrackPrevious: (track) => {
            dispatch(addTrackPrevious(track));
        },
        onAddTrackPreviousRandom: (track) => {
            dispatch(addTrackPreviousRandom(track));
        },
        onAddBeginQueue: (track) => {
            dispatch(addBeginQueue(track));
        },
        onAddBeginQueueRandom: (track) => {
            dispatch(addBeginQueueRandom(track));
        },
        onAddCurrent: (track) => {
            dispatch(addCurrent(track));
        },
        onDeleteTrackPrevious: () => {
            dispatch(deleteTrackPrevious());
        },
        onDeleteTrackPreviousRandom: () => {
            dispatch(deleteTrackPreviousRandom());
        },
        onDeleteTrackQueue: () => {
            dispatch(deleteTrackQueue());
        },
        onDeleteTrackQueueRandom: () => {
            dispatch(deleteTrackQueueRandom());
        },
        onCreateCommonMusic: () => {
            dispatch(createCommonMusic());
        },
        onCreateRandomMusic: () => {
            dispatch(createRandomMusic());
        },
        onCreatePrevious: (tracks) => {
            dispatch(createPrevious(tracks));
        },
        onCreateQueue: (tracks) => {
            dispatch(createQueue(tracks));
        },
        onCreatePreviousRandom: (tracks) => {
            dispatch(createPreviousRandom(tracks));
        },
        onCreateQueueRandom: (tracks) => {
            dispatch(createQueueRandom(tracks));
        }
    })
)(AppMusic)