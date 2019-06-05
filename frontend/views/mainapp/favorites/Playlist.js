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
import {getPlaylist} from "../../../redux/actions/playlist";

class Playlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false
        }
    }

    static navigationOptions = {
        headerStyle: {backgroundColor:'#8d6fb9'},
        headerTintColor: 'white',
        title: 'Плейлист'
    };

    state = {
        customPlaylist: {},
    };

    static getDerivedStateFromProps(nextProps, prevState) {

        if(prevState.customPlaylist !== nextProps.customPlaylist)
        {
            return {
                customPlaylist: nextProps.customPlaylist
            }
        }

    }

    play(index)
    {
        if(this.props.customPlaylist.tracks.length === 0)
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
                this.props.customPlaylist.tracks.map((l, i) =>
                    {
                        if(i < index)
                        {
                            prev.push({id: l.track.id, idPerformer: l.track.id_per, performer: l.track.name_per, cover: l.track.image_alb,
                                title: l.track.name_trc, audio: l.track.audio_trc, duration: l.track.duration,
                                isLiked: l.track.is_liked})
                        }
                        else if(i >= index)
                        {
                            queue.push({id: l.track.id, idPerformer: l.track.id_per, performer: l.track.name_per, cover: l.track.image_alb,
                                title: l.track.name_trc, audio: l.track.audio_trc, duration: l.track.duration,
                                isLiked: l.track.is_liked})
                        }
                        playlist.push({id: l.track.id, idPerformer: l.track.id_per, performer: l.track.name_per, cover: l.track.image_alb,
                            title: l.track.name_trc, audio: l.track.audio_trc, duration: l.track.duration,
                            isLiked: l.track.is_liked})
                    }
                )
                this.props.onCreatePrevious(prev)
                this.props.onCreateQueue(queue)
                this.props.onCreatePlaylist(playlist)
                this.props.onPressReleasePlayButton(this.props.customPlaylist.tracks[index].track.audio_trc);
            }
            else
            {
                let queue = []
                this.props.customPlaylist.tracks.map((l, i) => (
                    queue.push({id: l.track.id, idPerformer: l.track.id_per, performer: l.track.name_per, cover: l.track.image_alb,
                        title: l.track.name_trc, audio: l.track.audio_trc, duration: l.track.duration,
                        isLiked: l.track.is_liked})
                ))
                this.props.onCreateQueue(queue)
                this.props.onCreatePlaylist(queue)
                this.props.onPressReleasePlayButton(this.props.customPlaylist.tracks[0].track.audio_trc);
            }
        }
    }

    randomPlay()
    {
        if(this.props.customPlaylist.tracks.length === 0)
        {
            return;
        }
        this.props.onCreateRandomMusic();
        let queue = []

        this.props.customPlaylist.tracks.map((l, i) => (
            queue.push({id: l.track.id, idPerformer: l.track.id_per, performer: l.track.name_per, cover: l.track.image_alb,
                title: l.track.name_trc, audio: l.track.audio_trc, duration: l.track.duration,
                isLiked: l.track.is_liked})
        ))

        this.props.onCreatePlaylist(queue);
        let randomQueue = shuffleListTrack(queue.slice());
        this.props.onCreateQueue(randomQueue);
        this.props.onPressReleasePlayButton(randomQueue[0].audio);
    }

    _refresh = async() => {
        this.props.onGetPlaylist(this.props.auth.id)
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
                                <View style={styles.columnStyle}>
                                    <Image
                                        source={{uri: this.props.customPlaylist.image}}
                                        style={{width: 100, height: 100, borderRadius: 5}}
                                    />
                                </View>
                            </View>
                            <View style={styles.rowStyle}>
                                <View style={styles.columnStyle}>
                                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.titlePlaylist}>{this.props.customPlaylist.title}</Text>
                                    <Text>{this.props.customPlaylist.name_per}</Text>
                                    {
                                        this.props.customPlaylist.tracks !== undefined &&
                                        <Text>{this.props.customPlaylist.tracks.length + ' композ.'}</Text>
                                    }
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
                            this.props.customPlaylist.tracks !== undefined &&
                            this.props.customPlaylist.tracks.map((l, i) => (
                                <Track id={l.id}
                                       idTrack={l.track.id}
                                       cover={l.track.image_alb}
                                       audio={l.track.audio_trc}
                                       title={l.track.name_trc}
                                       isLiked={l.track.is_liked}
                                       performer={l.track.name_per}
                                       idPlaylist={this.props.customPlaylist.id}
                                       isLikedPlaylist={false}
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
        marginTop: 20,
        alignItems: 'center',
    },
    playlistContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 15
    },
    rowStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    columnStyle: {
        flexDirection: 'column',
        paddingLeft: 10,
        marginTop: 15,
        marginLeft: 5
    },
    titlePlaylist: {
        fontSize: 20,
        color: '#000',
        width: Dimensions.get('window').width - 150
    },
    button: {
        width: 75,
        height: 30,
        borderRadius: 30,
        marginTop: 5,
        marginRight: 15,
        backgroundColor: '#8d6fb9'
    },
    bottom: {
        height: 65,
        backgroundColor: '#fff'
    },
});

export default connect(
    state => ({auth: state.auth, customPlaylist: state.customPlaylist}),
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
        onGetPlaylist: (id) => {
            dispatch(getPlaylist(id));
        },
    })
)(Playlist)