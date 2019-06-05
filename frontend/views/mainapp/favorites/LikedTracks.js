import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet, TouchableHighlight, TextInput, Dimensions, RefreshControl, ScrollView
} from 'react-native';
import { Provider, connect } from 'react-redux';
import store from "../../../redux/store";
import Track from "../../../components/Track";
import {Button, Image} from "react-native-elements";
import {
    createCommonMusic,
    createPlaylist,
    createPrevious,
    createQueue,
    createRandomMusic,
    releasePlayer,
    shuffleListTrack
} from "../../../redux/actions/player";
import {getLikedTracks} from "../../../redux/actions/tracks";

class LikedTracks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false
        }
    }

    static navigationOptions = {
        headerStyle: {backgroundColor:'#8d6fb9'},
        headerTintColor: 'white',
        title: 'Понравившиеся композиции'
    };

    state = {
        likedTracks: [],
    };

    static getDerivedStateFromProps(nextProps, prevState) {

        if(prevState.likedTracks !== nextProps.likedTracks)
        {
            return {
                likedTracks: nextProps.likedTracks
            }
        }

    }

    play(index)
    {
        if(this.props.likedTracks.length === 0)
        {
            return;
        }
        else
        {
            this.props.onCreateCommonMusic();
            if(index !== null)
            {
                let prev = []
                let queue = []
                let playlist = []
                this.props.likedTracks.map((l, i) =>
                    {
                        if(i < index)
                        {
                            prev.push({id: l.trc_id, idPerformer: l.per_id, performer: l.name_per, cover: l.image_alb,
                                title: l.name_trc, audio: l.audio_trc, duration: l.duration,
                                isLiked: l.is_liked})
                        }
                        else if(i >= index)
                        {
                            queue.push({id: l.trc_id, idPerformer: l.per_id, performer: l.name_per, cover: l.image_alb,
                                title: l.name_trc, audio: l.audio_trc, duration: l.duration,
                                isLiked: l.is_liked})
                        }
                        playlist.push({id: l.trc_id, idPerformer: l.per_id, performer: l.name_per, cover: l.image_alb,
                            title: l.name_trc, audio: l.audio_trc, duration: l.duration,
                            isLiked: l.is_liked})
                    }
                )
                this.props.onCreatePrevious(prev)
                this.props.onCreateQueue(queue)
                this.props.onCreatePlaylist(playlist)
                this.props.onPressReleasePlayButton(this.props.likedTracks[index].audio_trc);
            }
            else
            {
                let queue = []
                this.props.likedTracks.map((l, i) => (
                    queue.push({id: l.trc_id, idPerformer: l.per_id, performer: l.name_per, cover: l.image_alb,
                        title: l.name_trc, audio: l.audio_trc, duration: l.duration,
                        isLiked: l.is_liked})
                ))
                this.props.onCreateQueue(queue)
                this.props.onCreatePlaylist(queue)
                this.props.onPressReleasePlayButton(this.props.likedTracks[0].audio_trc);
            }
        }
    }

    randomPlay()
    {
        if(this.props.likedTracks.length === 0)
        {
            return;
        }
        this.props.onCreateRandomMusic();
        let queue = []

        this.props.likedTracks.map((l, i) => (
            queue.push({id: l.trc_id, idPerformer: l.per_id, performer: l.name_per, cover: l.image_alb,
                title: l.name_trc, audio: l.audio_trc, duration: l.duration,
                isLiked: l.is_liked})
        ))

        this.props.onCreatePlaylist(queue);
        let randomQueue = shuffleListTrack(queue.slice());
        this.props.onCreateQueue(randomQueue);
        this.props.onPressReleasePlayButton(randomQueue[0].audio);
    }

    _refresh = async() => {
        this.props.onGetLikedTracks(this.props.auth.id)
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        this._refresh().then(() => {
            this.setState({refreshing: false});
        });
    }

    componentDidMount()
    {

    }


    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <View style={styles.playlistContainer}>
                        <View style={styles.rowStyle}>
                            <Button
                                icon={{
                                    name: "ios-play",
                                    type: "ionicon",
                                    size: 22,
                                    color: "white"
                                }}
                                buttonStyle={styles.button}
                                onPress={this.play.bind(this, null)}
                            />
                            <Button
                                icon={{
                                    name:"random",
                                    type: "font-awesome",
                                    size: 18,
                                    color: "white"
                                }}
                                buttonStyle={styles.button}
                                onPress={this.randomPlay.bind(this)}
                            />
                        </View>
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
                    >
                        {
                            this.props.likedTracks.map((l, i) => (
                                <Track idTrack={l.trc_id}
                                       cover={l.image_alb}
                                       audio={l.audio_trc}
                                       title={l.name_trc}
                                       isLiked={l.is_liked}
                                       performer={l.name_per}
                                       idPlaylist={null}
                                       isLikedPlaylist={true}
                                       play={this.play.bind(this, i)}
                                />
                            ))
                        }
                    </ScrollView>
                    <View style={styles.bottom}>
                    </View>
                </View>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 30,
        alignItems: 'center',
    },
    playlistContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 25,
    },
    rowStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    columnStyle: {
        flexDirection: 'column',
    },
    titlePlaylist: {
        fontSize: 20,
        color: '#000',
        width: Dimensions.get('window').width - 150
    },
    button: {
        width: 100,
        height: 40,
        borderRadius: 30,
        marginHorizontal: 35,
        backgroundColor: '#8d6fb9'
    },
    bottom: {
        height: 65,
        backgroundColor: '#fff'
    },
});

export default connect(
    state => ({auth: state.auth, likedTracks: state.likedTracks}),
    dispatch => ({
        onCreateCommonMusic: () => {
            dispatch(createCommonMusic());
        },
        onCreatePrevious: (tracks) => {
            dispatch(createPrevious(tracks));
        },
        onCreateQueue: (tracks) => {
            dispatch(createQueue(tracks));
        },
        onCreatePlaylist: (tracks) => {
            dispatch(createPlaylist(tracks));
        },
        onPressReleasePlayButton: (audio) => {
            dispatch(releasePlayer(audio));
        },
        onCreateRandomMusic: () => {
            dispatch(createRandomMusic());
        },
        onGetLikedTracks: (id) => {
            dispatch(getLikedTracks(id));
        },
    })
)(LikedTracks)