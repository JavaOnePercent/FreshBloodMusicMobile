import React from 'react';
import {Dimensions, StyleSheet, Text, ToastAndroid, View, ScrollView} from 'react-native';
import {Navigations} from "../../components/navigations/Navigations";
import store from "../../redux/store";
import {connect, Provider} from "react-redux";

import MiniPlayer from "../../components/player/MiniPlayer";
import FullPlayer from "../../components/player/FullPlayer";

import Sound from 'react-native-sound';
import {
    playPlayer, pausePlayer, listenPlayer, unlistenPlayer, addTrackPrevious, addBeginPrevious, addBeginQueue,
    addCurrent, deleteTrackPrevious, clearPrevious, deleteTrackQueue, createCommonMusic, createRandomMusic,
    createPrevious, addTrackQueue, createQueue, clearQueue, unrepeatMusic, repeatMusic, repeatOneMusic, shuffleListTrack
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
        this.run = this.run.bind(this)
        this.stop = this.stop.bind(this)
        this.prev = this.prev.bind(this)
        this.next = this.next.bind(this)
        this.random = this.random.bind(this)
        this.repeat = this.repeat.bind(this)
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
                this.props.onAddCurrent(this.props.queue[0]);
                this.props.onDeleteTrackQueue();
                // this.props.onPressPlayButton()

            }
        }
    }

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
        setTimeout(() => {
            if(this.props.listen === true)
            {
                this.props.onPressPauseButton()
                this.props.onUnlistenPlayer()
            }
        }, 1000);
    }

    play(track)
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

        if(track !== null)
        {
            this.sound = new Sound(track.audio, Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    ToastAndroid.show('Error1', ToastAndroid.SHORT);
                } else {
                    this.props.onListenPlayer()
                    this.sound.play((success) => {
                        if (success)
                        {
                            this.props.onUnlistenPlayer()
                            if(this.props.repeat === 'unrepeat' || this.props.repeat === 'repeat')
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
                                else if (this.props.previous.length === 0 && this.props.queue.length === 0)
                                {
                                    if(this.props.repeat === 'repeat')
                                    {
                                        this.sound.release();
                                        this.props.onPressPauseButton();
                                        this.play(this.props.current);
                                        this.props.onPressPlayButton();
                                    }
                                    else
                                    {
                                        this.props.onPressPauseButton();
                                    }
                                }
                                else
                                {
                                    if(this.props.repeat === 'repeat')
                                    {
                                        this.sound.release();
                                        this.play(this.props.previous[0]);
                                        this.props.onAddTrackPrevious(this.props.current)
                                        this.props.onAddCurrent(this.props.previous[0])
                                        this.props.onCreateQueue(this.props.previous.slice(1))
                                        this.props.onClearPrevious()
                                        this.props.onPressPlayButton()
                                    }
                                    else
                                    {
                                        this.props.onPressPauseButton();
                                    }
                                }
                            }
                            else
                            {
                                this.sound.release();
                                this.props.onPressPauseButton();
                                this.play(this.props.current);
                                this.props.onPressPlayButton()
                            }
                        }
                        else {
                            ToastAndroid.show('Error2', ToastAndroid.SHORT);
                        }
                    });
                }
            });
        }
        else
        {
            this.props.onListenPlayer()
            this.sound.play((success) => {
                if (success)
                {
                    if(this.props.repeat === 'unrepeat' || this.props.repeat === 'repeat')
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
                        else if (this.props.previous.length === 0 && this.props.queue.length === 0)
                        {
                            if(this.props.repeat === 'repeat')
                            {
                                this.sound.release();
                                this.props.onPressPauseButton();
                                this.play(this.props.current);
                                this.props.onPressPlayButton();
                            }
                            else
                            {
                                this.props.onPressPauseButton();
                            }
                        }
                        else
                        {
                            if(this.props.repeat === 'repeat')
                            {
                                this.sound.release();
                                this.play(this.props.previous[0]);
                                this.props.onAddTrackPrevious(this.props.current)
                                this.props.onAddCurrent(this.props.previous[0])
                                this.props.onCreateQueue(this.props.previous.slice(1))
                                this.props.onClearPrevious()
                                this.props.onPressPlayButton()
                            }
                            else
                            {
                                this.props.onPressPauseButton();
                            }
                        }
                    }
                    else
                    {
                        this.sound.release();
                        this.props.onPressPauseButton();
                        this.play(this.props.current);
                        this.props.onPressPlayButton()
                    }
                }
                else
                {
                    ToastAndroid.show('Error3', ToastAndroid.SHORT);
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
        this.props.onUnlistenPlayer()
        if(this.props.previous.length > 0)
        {
            this.sound.release();
            this.play(this.props.previous[this.props.previous.length - 1]);
            this.props.onAddBeginQueue(this.props.current)
            this.props.onAddCurrent(this.props.previous[this.props.previous.length - 1])
            this.props.onDeleteTrackPrevious()
            this.props.onPressPlayButton()
        }
        else if(this.props.previous.length === 0 && this.props.queue.length === 0)
        {

        }
        else
        {
            if(this.props.repeat === 'repeat')
            {
                this.sound.release();
                this.play(this.props.queue[this.props.queue.length - 1]);
                this.props.onCreatePrevious(this.props.queue.slice(0, this.props.queue.length - 1))
                this.props.onAddBeginPrevious(this.props.current)
                this.props.onAddCurrent(this.props.queue[this.props.queue.length - 1])
                this.props.onClearQueue()
                this.props.onPressPlayButton()
            }
        }
    }

    next()
    {
        this.props.onUnlistenPlayer()
        if(this.props.queue.length > 0)
        {
            this.sound.release();
            this.play(this.props.queue[0]);
            this.props.onAddTrackPrevious(this.props.current)
            this.props.onAddCurrent(this.props.queue[0])
            this.props.onDeleteTrackQueue()
            this.props.onPressPlayButton()
        }
        else if(this.props.previous.length === 0 && this.props.queue.length === 0)
        {

        }
        else
        {
            if(this.props.repeat === 'repeat')
            {
                this.sound.release();
                this.play(this.props.previous[0]);
                this.props.onCreateQueue(this.props.previous.slice(1))
                this.props.onAddTrackQueue(this.props.current)
                this.props.onAddCurrent(this.props.previous[0])
                this.props.onClearPrevious()
                this.props.onPressPlayButton()
            }
        }
    }

    random()
    {
        if(this.props.random === true)
        {
            this.props.onCreateCommonMusic();
            if(this.props.current.id !== undefined)
            {
                let prev = []
                let queue = []
                let isCurrent = false
                this.props.playlist.map((l, i) => {
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
        else if(this.props.random === false)
        {
            this.props.onCreateRandomMusic();
            if (this.props.current.id !== undefined)
            {
                let playlistRandom = shuffleListTrack(this.props.playlist.slice())
                let prevRandom = []
                let queueRandom = []
                let isCurrent = false
                playlistRandom.map((l, i) => {
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
                this.props.onCreatePrevious(prevRandom)
                this.props.onCreateQueue(queueRandom)
            }
        }
    }

    repeat()
    {
        if(this.props.repeat === 'unrepeat')
        {
            this.props.onRepeatMusic();
        }
        else if(this.props.repeat === 'repeat')
        {
            this.props.onRepeatOneMusic();
        }
        else if(this.props.repeat === 'repeat-one')
        {
            this.props.onUnrepeatMusic();
        }
    }

    render() {

        const { current, queue } = this.props;

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
                                repeatStatus={this.props.repeat}
                                repeat={this.repeat}
                                queue={queue} />
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
    state => ({isPlay: state.player, listen: state.listen, previous: state.previous, current: state.current,
        queue: state.queue, playlist: state.playlist, random: state.random, repeat: state.repeat}),
    dispatch => ({
        onPressPlayButton: () => {
            dispatch(playPlayer());
        },
        onPressPauseButton: () => {
            dispatch(pausePlayer());
        },
        onListenPlayer: () => {
            dispatch(listenPlayer());
        },
        onUnlistenPlayer: () => {
            dispatch(unlistenPlayer());
        },
        onAddTrackPrevious: (track) => {
            dispatch(addTrackPrevious(track));
        },
        onAddBeginPrevious: (track) => {
            dispatch(addBeginPrevious(track));
        },
        onAddBeginQueue: (track) => {
            dispatch(addBeginQueue(track));
        },
        onAddCurrent: (track) => {
            dispatch(addCurrent(track));
        },
        onDeleteTrackPrevious: () => {
            dispatch(deleteTrackPrevious());
        },
        onDeleteTrackQueue: () => {
            dispatch(deleteTrackQueue());
        },
        onClearPrevious: () => {
            dispatch(clearPrevious());
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
        onClearQueue: () => {
            dispatch(clearQueue());
        },
        onUnrepeatMusic: () => {
            dispatch(unrepeatMusic());
        },
        onRepeatMusic: () => {
            dispatch(repeatMusic());
        },
        onRepeatOneMusic: () => {
            dispatch(repeatOneMusic());
        },
        onAddTrackQueue: (track) => {
            dispatch(addTrackQueue(track));
        }
    })
)(AppMusic)