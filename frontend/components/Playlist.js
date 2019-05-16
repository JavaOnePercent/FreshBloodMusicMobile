import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    ScrollView,
    ToastAndroid,
    ActivityIndicator
} from 'react-native';
import {Icon, Image, ListItem} from 'react-native-elements';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import store from "../redux/store";
import {addEditionQueue, addTrackQueue, playPlayer, releasePlayer, createPrevious, addCurrent, createQueue} from "../redux/actions/player";

class Playlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isTrack: false,
            idTrack: -1,
            titleTrack: '',
            audioTrack: '',
            durationTrack: 0,
            isLikedTrack: false

        }

        this.back = this.back.bind(this)
        this.play = this.play.bind(this)
        this.addPlaylist = this.addPlaylist.bind(this)
    }

    static propTypes = {
        iconAlbum: PropTypes.string.isRequired,
        nameAlbum: PropTypes.string.isRequired,
        namePerformer: PropTypes.string.isRequired,
        style: PropTypes.string.isRequired,
        year: PropTypes.string.isRequired,
        listens: PropTypes.number.isRequired,
        likes: PropTypes.number.isRequired,
        hide: PropTypes.func.isRequired,
        tracks: PropTypes.array.isRequired
    }

    state = {
        tracks: []
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if(prevState.tracks !== nextProps.tracks)
        {
            return {
                tracks: nextProps.tracks
            }
        }
    }

    onPressLong(l)
    {
        this.setState({
            isTrack: true,
            idTrack: l.id,
            titleTrack: l.name_trc,
            audioTrack: l.audio_trc,
            durationTrack: l.duration,
            isLikedTrack: l.is_liked

        });
    }

    addPlaylist()
    {
        if(this.state.isTrack)
        {
            this.props.onAddTrackQueue({id: this.state.idTrack, performer: this.props.namePerformer, cover: this.props.iconAlbum,
                title: this.state.titleTrack, audio: this.state.audioTrack, duration: this.state.durationTrack,
                isLiked: this.state.isLikedTrack})
        }
        else
        {
            let edition = []
            this.props.edition.map((l, i) => (
                edition.push({id: l.id, performer: this.props.namePerformer, cover: this.props.iconAlbum,
                    title: l.name_trc, audio: l.audio_trc, duration: l.duration,
                    isLiked: l.is_liked})
            ))
            this.props.onAddEditionQueue(edition)
        }
    }

    back()
    {
        this.setState({
            isTrack: false,
            idTrack: -1,
            titleTrack: '',
            audioTrack: '',
            durationTrack: 0,
            isLikedTrack: false
        });
    }

    play(index)
    {
        if(index)
        {
            let prev = []
            let queue = []
            this.props.edition.map((l, i) =>
                {
                    if(i < index)
                    {
                        prev.push({id: l.id, performer: this.props.namePerformer, cover: this.props.iconAlbum,
                            title: l.name_trc, audio: l.audio_trc, duration: l.duration,
                            isLiked: l.is_liked})
                    }
                    else if(i >= index)
                    {
                        queue.push({id: l.id, performer: this.props.namePerformer, cover: this.props.iconAlbum,
                            title: l.name_trc, audio: l.audio_trc, duration: l.duration,
                            isLiked: l.is_liked})
                    }
                }
            )
            this.props.onCreatePrevious(prev)
            this.props.onCreateQueue(queue)
            this.props.onPressReleasePlayButton(this.props.tracks[index].audio_trc);
        }
        else
        {
            let queue = []
            this.props.edition.map((l, i) => (
                queue.push({id: l.id, performer: this.props.namePerformer, cover: this.props.iconAlbum,
                    title: l.name_trc, audio: l.audio_trc, duration: l.duration,
                    isLiked: l.is_liked})
            ))
            this.props.onCreateQueue(queue)
            this.props.onPressReleasePlayButton(this.props.tracks[0].audio_trc);
        }
    }


    render() {

        const { iconAlbum, nameAlbum, namePerformer, style, year, listens, likes, hide } = this.props;

        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <View style={styles.background}>
                        <Image
                            source={{uri: iconAlbum}}
                            style={{opacity: 0.6, height: 135, width: 300, resizeMode: 'cover'}}
                            blurRadius={3}
                        />
                    </View>
                    <View style={styles.form}>
                        <View style={styles.close}>
                            <TouchableHighlight style={styles.button} onPress={hide} underlayColor="#f6f6f6" >
                                <Icon name="ios-close"
                                      type="ionicon"
                                      size={30}
                                      color={'#000'}
                                />
                            </TouchableHighlight>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.rowStyle}>
                                <Image
                                    source={{uri: iconAlbum}}
                                    style={{width: 100, height: 100, borderRadius: 5}}
                                />
                            </View>
                            <View style={styles.rowStyle}>
                                {
                                    this.state.isTrack === false &&
                                    <View style={styles.columnStyle}>
                                        <Text style={styles.titleTrack}>{nameAlbum}</Text>
                                        <Text style={styles.titlePerformer}>{namePerformer}</Text>
                                        <Text style={styles.titlePerformer}>{style + ' (' + year + ')'}</Text>
                                    </View>
                                }
                                {
                                    this.state.isTrack === true &&
                                    <View style={styles.columnStyle}>
                                        <Text style={styles.titleTrack}>{this.state.titleTrack}</Text>
                                        <Text style={styles.titlePerformer}>{namePerformer}</Text>
                                        <Text style={styles.titlePerformer}>{nameAlbum}</Text>
                                    </View>
                                }
                            </View>
                        </View>
                        <View style={styles.buttonPanel}>
                            {
                                this.state.isTrack === false &&
                                <View style={styles.buttonRowStyle}>
                                    <TouchableHighlight style={styles.button} underlayColor="#fff" >
                                        <Icon name="random"
                                              type="font-awesome"
                                              size={22}
                                              color={'#000'}
                                        />
                                    </TouchableHighlight>
                                </View>
                            }
                            {
                                this.state.isTrack === true &&
                                <View style={styles.buttonRowStyle}>
                                    <TouchableHighlight style={styles.button} onPress={this.back} underlayColor="#fff" >
                                        <Icon name="md-arrow-back"
                                              type="ionicon"
                                              size={24}
                                              color={'#000'}
                                        />
                                    </TouchableHighlight>
                                </View>
                            }
                            <View style={styles.buttonRowStyle}>
                                <TouchableHighlight style={styles.button} onPress={() => this.play(null)} underlayColor="#fff" >
                                    <Icon name="ios-play"
                                          type="ionicon"
                                          size={30}
                                          color={'#000'}
                                    />
                                </TouchableHighlight>
                            </View>
                            <View style={styles.buttonRowStyle}>
                                <TouchableHighlight style={styles.button} underlayColor="#fff" >
                                    <Icon name="ios-heart-empty"
                                          type="ionicon"
                                          size={26}
                                          color={'#000'}
                                    />
                                </TouchableHighlight>
                            </View>
                            <View style={styles.buttonRowStyle}>
                                <TouchableHighlight style={styles.button} onPress={this.addPlaylist} underlayColor="#fff" >
                                    <Icon name="playlist-plus"
                                          type="material-community"
                                          size={30}
                                          color={'#000'}
                                    />
                                </TouchableHighlight>
                            </View>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {
                                this.state.isTrack === false &&
                                this.props.tracks.length !== 0 &&
                                this.props.tracks.map((l, i) => (
                                    <TouchableHighlight onPress={() => this.play(i)} onLongPress={this.onPressLong.bind(this, l)} style={{height: 40, justifyContent: 'center'}} underlayColor="#fff">
                                        <View style={styles.listTrack}>
                                            <View style={styles.rowIconOrNumberStyle}>
                                                <Text style={styles.textNumber}>{l.id}</Text>
                                            </View>
                                            <View style={styles.rowStyle}>
                                                <Text style={styles.textName}>{l.name_trc}</Text>
                                            </View>
                                        </View>
                                    </TouchableHighlight>
                                ))
                            }
                            {
                                this.state.isTrack === false &&
                                this.props.tracks.length === 0 &&
                                <View style={styles.indicator}>
                                    <ActivityIndicator color={'#8d6fb9'}/>
                                </View>
                            }
                            {
                                this.state.isTrack === true &&
                                    <View>
                                        <TouchableHighlight onPress={() => {ToastAndroid.show(this.state.titleTrack, ToastAndroid.SHORT)}} underlayColor="#fff">
                                            <View style={styles.listTrack}>
                                                <View style={styles.rowPlaylistStyle}>
                                                    <Text style={styles.textName}>Разное</Text>
                                                </View>
                                                <View style={styles.rowIconOrNumberStyle}>
                                                    <Icon name="ios-add"
                                                          type="ionicon"
                                                          size={30}
                                                          color={'#000'}
                                                    />
                                                </View>
                                            </View>
                                        </TouchableHighlight>
                                        <TouchableHighlight onPress={() => {ToastAndroid.show(this.state.titleTrack, ToastAndroid.SHORT)}} underlayColor="#fff">
                                            <View style={styles.listTrack}>
                                                <View style={styles.rowPlaylistStyle}>
                                                    <Text style={styles.textName}>Плейлист Я - Вова</Text>
                                                </View>
                                                <View style={styles.rowIconOrNumberStyle}>
                                                    <Icon name="ios-checkmark"
                                                          type="ionicon"
                                                          size={36}
                                                          color={'#000'}
                                                    />
                                                </View>
                                            </View>
                                        </TouchableHighlight>
                                        <TouchableHighlight onPress={() => {ToastAndroid.show(this.state.titleTrack, ToastAndroid.SHORT)}} underlayColor="#fff">
                                            <View style={styles.listTrack}>
                                                <View style={styles.rowPlaylistStyle}>
                                                    <Text style={styles.textName}>Очень плохая музыка</Text>
                                                </View>
                                                <View style={styles.rowIconOrNumberStyle}>
                                                    <Icon name="ios-add"
                                                          type="ionicon"
                                                          size={30}
                                                          color={'#000'}
                                                    />
                                                </View>
                                            </View>
                                        </TouchableHighlight>
                                        <TouchableHighlight onPress={() => {ToastAndroid.show(this.state.titleTrack, ToastAndroid.SHORT)}} underlayColor="#fff">
                                            <View style={styles.listTrack}>
                                                <View style={styles.rowPlaylistStyle}>
                                                    <Text style={styles.textName}>Плейлист Илюхи</Text>
                                                </View>
                                                <View style={styles.rowIconOrNumberStyle}>
                                                    <Icon name="ios-add"
                                                          type="ionicon"
                                                          size={30}
                                                          color={'#000'}
                                                    />
                                                </View>
                                            </View>
                                        </TouchableHighlight>
                                    </View>


                            }
                        </ScrollView>
                        <View style={{marginBottom: 5, height: 40, justifyContent: 'center'}}>
                            {
                                this.state.isTrack === true &&
                                <Text style={styles.text}>{listens + ' прослушиваний'}</Text>
                            }
                            <Text style={styles.text}>{likes + ' пользователям понравилось'}</Text>
                        </View>
                    </View>
                </View>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    form: {
        flex: 1,
        borderWidth: 0.5,
        borderColor: 'grey',
        marginBottom: 10,
        borderRadius: 30,
        height: 400,
        width: 300,
        position: 'relative'
    },
    background: {
        backgroundColor: '#f6f6f6',
        borderRadius: 30,
        height: 400,
        width: 300,
        alignItems: 'center',
        position: 'absolute',
        overflow: 'hidden'
    },
    title: {
        fontSize: 20,
        marginTop: 15
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    close: {
        alignItems: 'flex-end',
        marginLeft: 15
    },
    listItem: {
        marginTop: -30,
        paddingLeft: 20,
        flexWrap: 'wrap',
        flexDirection: 'row'

    },
    buttonPanel: {
        marginTop: 15,
        marginBottom: 5,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    listTrack: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        height: 40,
        marginLeft: 20

    },
    rowStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rowIconOrNumberStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        width: 30
    },
    rowPlaylistStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 220
    },
    buttonRowStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 10
    },
    columnStyle: {
        flexDirection: 'column',
        marginLeft: 10,
        marginTop: 5
    },
    titleTrack: {
        fontSize: 18,
        color: '#000',
        marginBottom: 10
    },
    titlePerformer: {
        fontSize: 15,
        color: '#000'
    },
    textNumber: {
        fontSize: 16,
        color: 'grey'
    },
    textName: {
        fontSize: 16,
        color: '#000',
        marginLeft: 20
    },
    text: {
        fontSize: 13,
        color: 'grey',
        marginLeft: 20
    },
    indicator: {
        marginTop: 60
    }
});

export default connect(
    state => ({isPlay: state.player, edition: state.edition}),
    dispatch => ({
        onPressPlayButton: () => {
            dispatch(playPlayer());
        },
        onPressReleasePlayButton: (audio) => {
            dispatch(releasePlayer(audio));
        },
        onAddTrackQueue: (track) => {
            dispatch(addTrackQueue(track));
        },
        onAddEditionQueue: (edition) => {
            dispatch(addEditionQueue(edition));
        },
        onCreatePrevious: (tracks) => {
            dispatch(createPrevious(tracks));
        },
        onAddCurrent: (track) => {
            dispatch(addCurrent(track));
        },
        onCreateQueue: (tracks) => {
            dispatch(createQueue(tracks));
        }
    })
)(Playlist)