import React from 'react';
import {Dimensions, StyleSheet, Text, ToastAndroid, View, ScrollView} from 'react-native';
import {Navigations} from "../../components/navigations/Navigations";
import store from "../../redux/store";
import {connect, Provider} from "react-redux";

import MiniPlayer from "../../components/player/MiniPlayer";
import FullPlayer from "../../components/player/FullPlayer";

import Sound from 'react-native-sound';
import {playPlayer, pausePlayer, addTrackPrevious, addBeginQueue, addCurrent, deleteTrackPrevious, deleteTrackQueue} from "../../redux/actions/player";
import PropTypes from "prop-types";

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
            else if(this.props.isPlay !== '')
            {
                if(this.sound !== undefined)
                {
                    this.sound.release();
                }
                this.play({audio: this.props.isPlay});
                this.props.onAddCurrent(this.props.queue[0]);
                this.props.onDeleteTrackQueue();
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
                    ToastAndroid.show('Error', ToastAndroid.SHORT);
                } else {
                    this.sound.play((success) => {
                        if (success)
                        {
                            if(this.props.queue.length > 0)
                            {
                                ToastAndroid.show('Success', ToastAndroid.SHORT);
                                this.sound.release();
                                this.play(this.props.queue[0]);
                                this.props.onAddTrackPrevious(this.props.current)
                                this.props.onAddCurrent(this.props.queue[0])
                                this.props.onDeleteTrackQueue()
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
                    if(this.props.queue.length > 0)
                    {
                        ToastAndroid.show('Success', ToastAndroid.SHORT);
                        this.sound.release();
                        this.play(this.props.queue[0]);
                        this.props.onAddTrackPrevious(this.props.current)
                        this.props.onAddCurrent(this.props.queue[0])
                        this.props.onDeleteTrackQueue()
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

    next()
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
                                playlist={queue}/>
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
    state => ({isPlay: state.player, previous: state.previous, current: state.current, queue: state.queue}),
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
        }
    })
)(AppMusic)