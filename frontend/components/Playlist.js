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
import {
    addEditionQueue,
    addTrackQueue,
    likeTrackQueue,
    unlikeTrackQueue,
    playPlayer,
    pausePlayer,
    releasePlayer,
    createPrevious,
    addCurrent,
    likeTrackPrevious,
    unlikeTrackPrevious,
    likeCurrent,
    unlikeCurrent,
    createQueue,
    createCommonMusic,
    createRandomMusic,
    shuffleListTrack,
    createPlaylist,
    addTrackPlaylist,
    likeTrackPlaylist,
    unlikeTrackPlaylist,
    addEditionPlaylist,
    listenPlayer,
    unlistenPlayer,

} from "../redux/actions/player";

import { addLikeEdition, deleteLikeEdition, addLikeTrack, deleteLikeTrack } from "../redux/actions/news";
import { getListPlaylist, getAddedListPlaylist, clearListPlaylist, clearAddedListPlaylist, addTrackAddedPlaylist } from "../redux/actions/playlist";

class Playlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idTrack: 0,
            indexTrack: -1
        }
    }

    static propTypes = {
        hide: PropTypes.func.isRequired,
        idAlbum: PropTypes.number.isRequired,
        album: PropTypes.array.isRequired
    }

    state = {
        album: {},
        listPlaylist: [],
        addedPlaylist: []
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if(prevState.album !== nextProps.album)
        {
            return {
                album: nextProps.album
            }
        }
        if(prevState.listPlaylist !== nextProps.listPlaylist)
        {
            return {
                listPlaylist: nextProps.listPlaylist
            }
        }
        if(prevState.addedPlaylist !== nextProps.addedPlaylist)
        {
            return {
                addedPlaylist: nextProps.addedPlaylist
            }
        }
    }

    onPressLong(i, l)
    {
        this.props.onClearListPlaylist()
        this.props.onClearAddedListPlaylist()
        this.props.onGetListPlaylist(this.props.auth.id)
        this.props.onGetAddedListPlaylist(this.props.auth.id, l.id)
        this.setState({
            idTrack: l.id,
            indexTrack: i

        });
    }

    addPlaylist(edition)
    {
        if(edition.tracks.length === 0)
        {
            return;
        }
        if(this.props.idAlbum > 0)
        {
            if(this.state.idTrack !== 0)
            {
                let tracks = edition.tracks.filter(({ id }) => id === this.state.idTrack)[0]
                this.props.onAddTrackQueue({id: this.state.idTrack, idPerformer: edition.idPerformer, performer: edition.performer, cover: edition.cover,
                    title: tracks.name_trc, audio: tracks.audio_trc, duration: tracks.duration,
                    isLiked: tracks.is_liked})
                this.props.onAddTrackPlaylist({id: this.state.idTrack, idPerformer: edition.idPerformer, performer: edition.performer, cover: edition.cover,
                    title: tracks.name_trc, audio: tracks.audio_trc, duration: tracks.duration,
                    isLiked: tracks.is_liked})
            }
            else
            {
                let playlist = []
                edition.tracks.map((l, i) => (
                    playlist.push({id: l.id, idPerformer: edition.idPerformer, performer: edition.performer, cover: edition.cover,
                        title: l.name_trc, audio: l.audio_trc, duration: l.duration,
                        isLiked: l.is_liked})
                ))
                this.props.onAddEditionQueue(playlist)
                this.props.onAddEditionPlaylist(playlist)
            }
        }
        else if(this.props.idAlbum < 0)
        {
            if(this.state.idTrack !== 0)
            {
                let tracks = edition.tracks.filter(({ id }) => id === this.state.idTrack)[0]
                this.props.onAddTrackQueue({id: this.state.idTrack, idPerformer: tracks.id_per, performer: tracks.name_per, cover: tracks.image_alb,
                    title: tracks.name_trc, audio: tracks.audio_trc, duration: tracks.duration,
                    isLiked: tracks.is_liked})
                this.props.onAddTrackPlaylist({id: this.state.idTrack, idPerformer: tracks.id_per, performer: tracks.name_per, cover: tracks.image_alb,
                    title: tracks.name_trc, audio: tracks.audio_trc, duration: tracks.duration,
                    isLiked: tracks.is_liked})
            }
            else
            {
                let playlist = []
                edition.tracks.map((l, i) => (
                    playlist.push({id: l.id, idPerformer: l.id_per, performer: l.name_per, cover: l.image_alb,
                        title: l.name_trc, audio: l.audio_trc, duration: l.duration,
                        isLiked: l.is_liked})
                ))
                this.props.onAddEditionQueue(playlist)
                this.props.onAddEditionPlaylist(playlist)
            }
        }

    }

    back()
    {
        this.setState({
            idTrack: 0,
            indexTrack: -1
        });
    }

    play(index, edition)
    {
        if(edition.tracks.length === 0)
        {
            return;
        }
        this.props.onCreateCommonMusic();
        if(this.props.idAlbum > 0)
        {
            if(index)
            {
                let prev = []
                let queue = []
                let playlist = []
                edition.tracks.map((l, i) =>
                    {
                        if(i < index)
                        {
                            prev.push({id: l.id, idPerformer: edition.idPerformer, performer: edition.performer, cover: edition.cover,
                                title: l.name_trc, audio: l.audio_trc, duration: l.duration,
                                isLiked: l.is_liked})
                        }
                        else if(i >= index)
                        {
                            queue.push({id: l.id, idPerformer: edition.idPerformer, performer: edition.performer, cover: edition.cover,
                                title: l.name_trc, audio: l.audio_trc, duration: l.duration,
                                isLiked: l.is_liked})
                        }
                        playlist.push({id: l.id, idPerformer: edition.idPerformer, performer: edition.performer, cover: edition.cover,
                            title: l.name_trc, audio: l.audio_trc, duration: l.duration,
                            isLiked: l.is_liked})
                    }
                )
                this.props.onCreatePrevious(prev)
                this.props.onCreateQueue(queue)
                this.props.onCreatePlaylist(playlist)
                this.props.onPressReleasePlayButton(edition.tracks[index].audio_trc);
            }
            else
            {
                let queue = []
                edition.tracks.map((l, i) => (
                    queue.push({id: l.id, idPerformer: edition.idPerformer, performer: edition.performer, cover: edition.cover,
                        title: l.name_trc, audio: l.audio_trc, duration: l.duration,
                        isLiked: l.is_liked})
                ))
                this.props.onCreateQueue(queue)
                this.props.onCreatePlaylist(queue)
                this.props.onPressReleasePlayButton(edition.tracks[0].audio_trc);
            }
        }
        else if(this.props.idAlbum < 0)
        {
            if(index)
            {
                let prev = []
                let queue = []
                let playlist = []
                edition.tracks.map((l, i) =>
                    {
                        if(i < index)
                        {
                            prev.push({id: l.id, idPerformer: l.id_per, performer: l.name_per, cover: l.image_alb,
                                title: l.name_trc, audio: l.audio_trc, duration: l.duration,
                                isLiked: l.is_liked})
                        }
                        else if(i >= index)
                        {
                            queue.push({id: l.id, idPerformer: l.id_per, performer: l.name_per, cover: l.image_alb,
                                title: l.name_trc, audio: l.audio_trc, duration: l.duration,
                                isLiked: l.is_liked})
                        }
                        playlist.push({id: l.id, idPerformer: l.id_per, performer: l.name_per, cover: l.image_alb,
                            title: l.name_trc, audio: l.audio_trc, duration: l.duration,
                            isLiked: l.is_liked})
                    }
                )
                this.props.onCreatePrevious(prev)
                this.props.onCreateQueue(queue)
                this.props.onCreatePlaylist(playlist)
                this.props.onPressReleasePlayButton(edition.tracks[index].audio_trc);
            }
            else
            {
                let queue = []
                edition.tracks.map((l, i) => (
                    queue.push({id: l.id, idPerformer: l.id_per, performer: l.name_per, cover: l.image_alb,
                        title: l.name_trc, audio: l.audio_trc, duration: l.duration,
                        isLiked: l.is_liked})
                ))
                this.props.onCreateQueue(queue)
                this.props.onCreatePlaylist(queue)
                this.props.onPressReleasePlayButton(edition.tracks[0].audio_trc);
            }
        }
    }

    randomPlay(edition)
    {
        if(edition.tracks.length === 0)
        {
            return;
        }
        this.props.onCreateRandomMusic();
        let queue = []
        if(this.props.idAlbum > 0)
        {
            edition.tracks.map((l, i) => (
                queue.push({
                    id: l.id, idPerformer: edition.idPerformer, performer: edition.performer, cover: edition.cover,
                    title: l.name_trc, audio: l.audio_trc, duration: l.duration,
                    isLiked: l.is_liked
                })
            ))
        }
        else if(this.props.idAlbum < 0)
        {
            edition.tracks.map((l, i) => (
                queue.push({id: l.id, idPerformer: l.id_per, performer: l.name_per, cover: l.image_alb,
                    title: l.name_trc, audio: l.audio_trc, duration: l.duration,
                    isLiked: l.is_liked})
            ))
        }
        this.props.onCreatePlaylist(queue);
        let randomQueue = shuffleListTrack(queue.slice());
        this.props.onCreateQueue(randomQueue);
        this.props.onPressReleasePlayButton(randomQueue[0].audio);
    }

    playCurrent()
    {
        this.props.onPressPlayButton();
    }

    pauseCurrent()
    {
        setTimeout(() => {
            if(this.props.listen === true)
            {
                this.props.onPressPauseButton()
                this.props.onUnlistenPlayer()
            }
        }, 1000);
    }

    albumLike(edition)
    {
        if(edition.tracks.length === 0)
        {
            return;
        }
       if(this.props.auth.id !== -1 && this.props.auth.id !== 0)
       {
           this.props.onAddLikeEdition(edition.id)
       }
    }

    albumUnlike(edition)
    {
        if(edition.tracks.length === 0)
        {
            return;
        }
        if(this.props.auth.id !== -1 && this.props.auth.id !== 0)
        {
            this.props.onDeleteLikeEdition(edition.id)
        }
    }

    trackLike()
    {
        if(this.props.auth.id !== -1 && this.props.auth.id !== 0)
        {
            this.props.onAddLikeTrack(this.state.idTrack)
            if(this.props.current !== undefined && this.props.current.id === this.state.idTrack)
            {
                this.props.onLikeCurrent()
            }
            if(this.props.playlist !== undefined)
            {
                this.props.onLikeTrackPlaylist(this.state.idTrack)
            }
            if(this.props.previous !== undefined)
            {
                this.props.onLikeTrackPrevious(this.state.idTrack)
            }
            if(this.props.queue !== undefined)
            {
                this.props.onLikeTrackQueue(this.state.idTrack)
            }
        }
    }

    trackUnlike()
    {
        if(this.props.auth.id !== -1 && this.props.auth.id !== 0)
        {
            this.props.onDeleteLikeTrack(this.state.idTrack)
            if(this.props.current !== undefined && this.props.current.id === this.state.idTrack)
            {
                this.props.onUnlikeCurrent()
            }
            if(this.props.playlist !== undefined)
            {
                this.props.onUnlikeTrackPlaylist(this.state.idTrack)
            }
            if(this.props.previous !== undefined)
            {
                this.props.onUnlikeTrackPrevious(this.state.idTrack)
            }
            if(this.props.queue !== undefined)
            {
                this.props.onUnlikeTrackQueue(this.state.idTrack)
            }
        }
    }

    addTrackCustomPlaylist(idPlaylist, idTrack)
    {
        this.props.onAddTrackAddedPlaylist(idPlaylist, idTrack)
    }

    render() {

        const { hide, idAlbum } = this.props;
        const edition = this.props.album.filter(({ id }) => id === idAlbum)[0]

        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <View style={styles.background}>
                        {
                            edition !== undefined && this.state.idTrack === 0 &&
                            <Image
                                source={{uri: edition.cover}}
                                style={{opacity: 0.6, height: 135, width: 300, resizeMode: 'cover'}}
                                blurRadius={3}
                            />
                        }
                        {
                            edition !== undefined && this.state.idTrack !== 0 && this.props.idAlbum > 0 &&
                            <Image
                                source={{uri: edition.cover}}
                                style={{opacity: 0.6, height: 135, width: 300, resizeMode: 'cover'}}
                                blurRadius={3}
                            />
                        }
                        {
                            edition !== undefined && this.state.idTrack !== 0 && this.props.idAlbum < 0 &&
                            <Image
                                source={{uri: edition.tracks.filter(({ id }) => id === this.state.idTrack)[0].image_alb}}
                                style={{opacity: 0.6, height: 135, width: 300, resizeMode: 'cover'}}
                                blurRadius={3}
                            />
                        }
                    </View>
                    <View style={styles.form}>
                        <View style={styles.close}>
                            <TouchableHighlight style={styles.button} onPress={hide} underlayColor="#f6f6f6">
                                <Icon name="ios-close"
                                      type="ionicon"
                                      size={30}
                                      color={'#000'}
                                />
                            </TouchableHighlight>
                        </View>
                        {
                            this.state.idTrack === 0 &&
                            edition === undefined &&
                            <View style={[styles.indicator, {height: 250}]}>
                                <ActivityIndicator color={'#8d6fb9'}/>
                            </View>
                        }
                        {
                            edition !== undefined &&
                            <View style={{height: 345}}>
                                <View style={styles.listItem}>
                                    <View style={styles.rowStyle}>
                                        {
                                            this.state.idTrack === 0 &&
                                            <Image
                                                source={{uri: edition.cover}}
                                                style={{width: 100, height: 100, borderRadius: 5}}
                                            />
                                        }
                                        {
                                            this.state.idTrack !== 0 && this.props.idAlbum > 0 &&
                                            <Image
                                                source={{uri: edition.cover}}
                                                style={{width: 100, height: 100, borderRadius: 5}}
                                            />
                                        }
                                        {
                                            this.state.idTrack !== 0 && this.props.idAlbum < 0 &&
                                            <Image
                                                source={{uri: edition.tracks.filter(({ id }) => id === this.state.idTrack)[0].image_alb}}
                                                style={{width: 100, height: 100, borderRadius: 5}}
                                            />
                                        }
                                    </View>
                                    <View style={styles.rowStyle}>
                                        {
                                            this.state.idTrack === 0 &&
                                            <View style={styles.columnStyle}>
                                                <Text numberOfLines={2} ellipsizeMode="tail"
                                                      style={styles.titleTrack}>{edition.title}</Text>
                                                <Text numberOfLines={1} ellipsizeMode="tail"
                                                      style={styles.titlePerformer}>{edition.performer}</Text>
                                                <Text numberOfLines={1} ellipsizeMode="tail"
                                                      style={styles.titlePerformer}>{edition.style + ' ' + edition.year}</Text>
                                            </View>
                                        }
                                        {
                                            this.props.idAlbum > 0 && this.state.idTrack !== 0 &&
                                            <View style={styles.columnStyle}>
                                                <Text numberOfLines={2} ellipsizeMode="tail"
                                                      style={styles.titleTrack}>{edition.tracks.filter(({ id }) => id === this.state.idTrack)[0].name_trc}</Text>
                                                <Text numberOfLines={1} ellipsizeMode="tail"
                                                      style={styles.titlePerformer}>{edition.performer}</Text>
                                                <Text numberOfLines={1} ellipsizeMode="tail"
                                                      style={styles.titlePerformer}>{edition.title}</Text>
                                            </View>
                                        }
                                        {
                                            this.props.idAlbum < 0 && this.state.idTrack !== 0 &&
                                            <View style={styles.columnStyle}>
                                                <Text numberOfLines={2} ellipsizeMode="tail"
                                                      style={styles.titleTrack}>{edition.tracks.filter(({ id }) => id === this.state.idTrack)[0].name_trc}</Text>
                                                <Text numberOfLines={1} ellipsizeMode="tail"
                                                      style={styles.titlePerformer}>{edition.tracks.filter(({ id }) => id === this.state.idTrack)[0].name_per}</Text>
                                                <Text numberOfLines={1} ellipsizeMode="tail"
                                                      style={styles.titlePerformer}>{edition.tracks.filter(({ id }) => id === this.state.idTrack)[0].name_alb}</Text>
                                            </View>
                                        }
                                    </View>
                                </View>
                                <View style={styles.buttonPanel}>
                                    {
                                        this.state.idTrack === 0 &&
                                        <View style={styles.buttonRowStyle}>
                                            <TouchableHighlight style={styles.button} onPress={() => this.randomPlay(edition)}
                                                                underlayColor="#fff">
                                                <Icon name="random"
                                                      type="font-awesome"
                                                      size={22}
                                                      color={'#000'}
                                                />
                                            </TouchableHighlight>
                                        </View>
                                    }
                                    {
                                        this.state.idTrack !== 0 &&
                                        <View style={styles.buttonRowStyle}>
                                            <TouchableHighlight style={styles.button} onPress={() => this.back()}
                                                                underlayColor="#fff">
                                                <Icon name="md-arrow-back"
                                                      type="ionicon"
                                                      size={24}
                                                      color={'#000'}
                                                />
                                            </TouchableHighlight>
                                        </View>
                                    }
                                    {
                                        this.state.idTrack === 0 &&
                                        <View style={styles.buttonRowStyle}>
                                            <TouchableHighlight style={styles.button} onPress={() => this.play(null, edition)}
                                                                underlayColor="#fff">
                                                <Icon name="ios-play"
                                                      type="ionicon"
                                                      size={30}
                                                      color={'#000'}
                                                />
                                            </TouchableHighlight>
                                        </View>
                                    }
                                    {
                                        this.state.idTrack !== 0 && this.state.idTrack !== this.props.current.id &&
                                        <View style={styles.buttonRowStyle}>
                                            <TouchableHighlight style={styles.button}
                                                                onPress={() => this.play(this.state.indexTrack, edition)}
                                                                underlayColor="#fff">
                                                <Icon name="ios-play"
                                                      type="ionicon"
                                                      size={30}
                                                      color={'#000'}
                                                />
                                            </TouchableHighlight>
                                        </View>
                                    }
                                    {
                                        this.state.idTrack !== 0 && this.state.idTrack === this.props.current.id && this.props.isPlay === 'pause' &&
                                        <View style={styles.buttonRowStyle}>
                                            <TouchableHighlight style={styles.button} onPress={() => this.playCurrent()}
                                                                underlayColor="#fff">
                                                <Icon name="ios-play"
                                                      type="ionicon"
                                                      size={30}
                                                      color={'#000'}
                                                />
                                            </TouchableHighlight>
                                        </View>
                                    }
                                    {
                                        this.state.idTrack !== 0 && this.state.idTrack === this.props.current.id && this.props.isPlay !== 'pause' &&
                                        <View style={styles.buttonRowStyle}>
                                            <TouchableHighlight style={styles.button} onPress={() => this.pauseCurrent()}
                                                                underlayColor="#fff">
                                                <Icon name="ios-pause"
                                                      type="ionicon"
                                                      size={30}
                                                      color={'#000'}
                                                />
                                            </TouchableHighlight>
                                        </View>
                                    }
                                    {this.state.idTrack === 0 && edition.isLiked === false &&
                                    <View style={styles.buttonRowStyle}>
                                        <TouchableHighlight style={styles.button} onPress={() => this.albumLike(edition)}
                                                            underlayColor="#fff">
                                            <Icon name="ios-heart-empty"
                                                  type="ionicon"
                                                  size={26}
                                                  color={'#000'}
                                            />
                                        </TouchableHighlight>
                                    </View>
                                    }
                                    {this.state.idTrack === 0 && edition.isLiked === true &&
                                    <View style={styles.buttonRowStyle}>
                                        <TouchableHighlight style={styles.button} onPress={() => this.albumUnlike(edition)}
                                                            underlayColor="#fff">
                                            <Icon name="ios-heart"
                                                  type="ionicon"
                                                  size={26}
                                                  color={'#8d6fb9'}
                                            />
                                        </TouchableHighlight>
                                    </View>
                                    }
                                    {this.state.idTrack !== 0 && edition.tracks.filter(({ id }) => id === this.state.idTrack)[0].is_liked === false &&
                                    <View style={styles.buttonRowStyle}>
                                        <TouchableHighlight style={styles.button} onPress={() => this.trackLike()} underlayColor="#fff">
                                            <Icon name="ios-heart-empty"
                                                  type="ionicon"
                                                  size={26}
                                                  color={'#000'}
                                            />
                                        </TouchableHighlight>
                                    </View>
                                    }
                                    {this.state.idTrack !== 0 && edition.tracks.filter(({ id }) => id === this.state.idTrack)[0].is_liked === true &&
                                    <View style={styles.buttonRowStyle}>
                                        <TouchableHighlight style={styles.button} onPress={() => this.trackUnlike()} underlayColor="#fff">
                                            <Icon name="ios-heart"
                                                  type="ionicon"
                                                  size={26}
                                                  color={'#8d6fb9'}
                                            />
                                        </TouchableHighlight>
                                    </View>
                                    }
                                    <View style={styles.buttonRowStyle}>
                                        <TouchableHighlight style={styles.button} onPress={this.addPlaylist.bind(this, edition)}
                                                            underlayColor="#fff">
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
                                        this.state.idTrack === 0 &&
                                        edition.tracks.map((l, i) => (
                                            <View>
                                                {
                                                    this.props.current.id === l.id && this.props.isPlay === 'pause' &&
                                                    <TouchableHighlight onPress={() => this.playCurrent()}
                                                                        onLongPress={this.onPressLong.bind(this, i, l)}
                                                                        style={{height: 40, justifyContent: 'center'}}
                                                                        underlayColor="#fff">
                                                        <View style={styles.listTrack}>
                                                            <View style={styles.rowIconOrNumberStyle}>
                                                                <Icon name="ios-play"
                                                                      type="ionicon"
                                                                      size={16}
                                                                      color={'#000'}
                                                                />
                                                            </View>
                                                            <View style={styles.rowStyle}>
                                                                <Text style={styles.textName}>{l.name_trc}</Text>
                                                            </View>
                                                        </View>
                                                    </TouchableHighlight>
                                                }
                                                {
                                                    this.props.current.id === l.id && this.props.isPlay !== 'pause' &&
                                                    <TouchableHighlight onPress={() => this.pauseCurrent()}
                                                                        onLongPress={this.onPressLong.bind(this, i, l)}
                                                                        style={{height: 40, justifyContent: 'center'}}
                                                                        underlayColor="#fff">
                                                        <View style={styles.listTrack}>
                                                            <View style={styles.rowIconOrNumberStyle}>
                                                                <Icon name="ios-pause"
                                                                      type="ionicon"
                                                                      size={16}
                                                                      color={'#000'}
                                                                />
                                                            </View>
                                                            <View style={styles.rowStyle}>
                                                                <Text style={styles.textName}>{l.name_trc}</Text>
                                                            </View>
                                                        </View>
                                                    </TouchableHighlight>
                                                }
                                                {
                                                    this.props.current.id !== l.id &&
                                                    <TouchableHighlight onPress={() => this.play(i, edition)}
                                                                        onLongPress={this.onPressLong.bind(this, i, l)}
                                                                        style={{height: 40, justifyContent: 'center'}}
                                                                        underlayColor="#fff">
                                                        <View style={styles.listTrack}>
                                                            <View style={styles.rowIconOrNumberStyle}>
                                                                <Text style={styles.textNumber}>{i + 1}</Text>
                                                            </View>
                                                            <View style={styles.rowStyle}>
                                                                <Text style={styles.textName}>{l.name_trc}</Text>
                                                            </View>
                                                        </View>
                                                    </TouchableHighlight>
                                                }
                                            </View>
                                        ))
                                    }
                                    {
                                        this.state.idTrack !== 0 &&
                                        <View>
                                            {
                                                this.props.listPlaylist.map((l, i) => (
                                                    <View>
                                                        {
                                                            this.props.addedPlaylist.includes(l.id) &&
                                                                <View style={styles.listTrack}>
                                                                    <View style={styles.rowPlaylistStyle}>
                                                                        <Text style={styles.textName}>{l.title}</Text>
                                                                    </View>
                                                                    <View style={styles.rowIconOrNumberStyle}>
                                                                        <Icon name="ios-checkmark"
                                                                              type="ionicon"
                                                                              size={36}
                                                                              color={'#000'}
                                                                        />
                                                                    </View>
                                                                </View>
                                                        }
                                                        {
                                                            !this.props.addedPlaylist.includes(l.id) &&
                                                            <TouchableHighlight
                                                                onPress={this.addTrackCustomPlaylist.bind(this, l.id, this.state.idTrack)}
                                                                underlayColor="#fff">
                                                                <View style={styles.listTrack}>
                                                                    <View style={styles.rowPlaylistStyle}>
                                                                        <Text style={styles.textName}>{l.title}</Text>
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
                                                        }
                                                    </View>
                                                            ))
                                                        }
                                            {/*<TouchableHighlight onPress={() => {*/}
                                            {/*    ToastAndroid.show(edition.tracks.filter(({ id }) => id === this.state.idTrack)[0].name_trc, ToastAndroid.SHORT)*/}
                                            {/*}} underlayColor="#fff">*/}
                                            {/*    <View style={styles.listTrack}>*/}
                                            {/*        <View style={styles.rowPlaylistStyle}>*/}
                                            {/*            <Text style={styles.textName}>Плейлист Я - Вова</Text>*/}
                                            {/*        </View>*/}
                                            {/*        <View style={styles.rowIconOrNumberStyle}>*/}
                                            {/*            <Icon name="ios-checkmark"*/}
                                            {/*                  type="ionicon"*/}
                                            {/*                  size={36}*/}
                                            {/*                  color={'#000'}*/}
                                            {/*            />*/}
                                            {/*        </View>*/}
                                            {/*    </View>*/}
                                            {/*</TouchableHighlight>*/}
                                            {/*<TouchableHighlight onPress={() => {*/}
                                            {/*    ToastAndroid.show(edition.tracks.filter(({ id }) => id === this.state.idTrack)[0].name_trc, ToastAndroid.SHORT)*/}
                                            {/*}} underlayColor="#fff">*/}
                                            {/*    <View style={styles.listTrack}>*/}
                                            {/*        <View style={styles.rowPlaylistStyle}>*/}
                                            {/*            <Text style={styles.textName}>Очень плохая музыка</Text>*/}
                                            {/*        </View>*/}
                                            {/*        <View style={styles.rowIconOrNumberStyle}>*/}
                                            {/*            <Icon name="ios-add"*/}
                                            {/*                  type="ionicon"*/}
                                            {/*                  size={30}*/}
                                            {/*                  color={'#000'}*/}
                                            {/*            />*/}
                                            {/*        </View>*/}
                                            {/*    </View>*/}
                                            {/*</TouchableHighlight>*/}
                                            {/*<TouchableHighlight onPress={() => {*/}
                                            {/*    ToastAndroid.show(edition.tracks.filter(({ id }) => id === this.state.idTrack)[0].name_trc, ToastAndroid.SHORT)*/}
                                            {/*}} underlayColor="#fff">*/}
                                            {/*    <View style={styles.listTrack}>*/}
                                            {/*        <View style={styles.rowPlaylistStyle}>*/}
                                            {/*            <Text style={styles.textName}>Плейлист Илюхи</Text>*/}
                                            {/*        </View>*/}
                                            {/*        <View style={styles.rowIconOrNumberStyle}>*/}
                                            {/*            <Icon name="ios-add"*/}
                                            {/*                  type="ionicon"*/}
                                            {/*                  size={30}*/}
                                            {/*                  color={'#000'}*/}
                                            {/*            />*/}
                                            {/*        </View>*/}
                                            {/*    </View>*/}
                                            {/*</TouchableHighlight>*/}
                                        </View>
                                    }
                                </ScrollView>
                                <View style={{marginBottom: 5, height: 40, justifyContent: 'center'}}>
                                    {
                                        this.state.idTrack !== 0 &&
                                        <View>
                                            <Text style={styles.text}>{edition.tracks.filter(({ id }) => id === this.state.idTrack)[0].numplays_trc + ' прослушиваний'}</Text>
                                            <Text
                                                style={styles.text}>{edition.tracks.filter(({ id }) => id === this.state.idTrack)[0].rating_trc + ' пользователям понравилось'}</Text>
                                        </View>
                                    }
                                    {
                                        this.state.idTrack === 0 && edition.id > 0 &&
                                        <View>
                                            <Text style={styles.text}>{edition.likes + ' пользователям понравилось'}</Text>
                                        </View>
                                    }
                                </View>
                            </View>
                        }
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
        width: 150
    },
    titlePerformer: {
        fontSize: 15,
        color: '#000',
        width: 150
    },
    textNumber: {
        fontSize: 16,
        color: 'grey'
    },
    textName: {
        fontSize: 16,
        color: '#000',
        marginLeft: 20,
        width: 225
    },
    text: {
        fontSize: 13,
        color: 'grey',
        marginLeft: 20
    },
    indicator: {
        marginTop: 150
    }
});

export default connect(
    state => ({isPlay: state.player, listen: state.listen, current: state.current, auth: state.auth,
        playlist: state.playlist, previous: state.previous, queue: state.queue, listPlaylist: state.listPlaylist,
        addedPlaylist: state.addedPlaylist}),
    dispatch => ({
        onPressPlayButton: () => {
            dispatch(playPlayer());
        },
        onPressPauseButton: () => {
            dispatch(pausePlayer());
        },
        onPressReleasePlayButton: (audio) => {
            dispatch(releasePlayer(audio));
        },
        onListenPlayer: () => {
            dispatch(listenPlayer());
        },
        onUnlistenPlayer: () => {
            dispatch(unlistenPlayer());
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
        onLikeTrackPrevious: (id) => {
            dispatch(likeTrackPrevious(id));
        },
        onUnlikeTrackPrevious: (id) => {
            dispatch(unlikeTrackPrevious(id));
        },
        onAddCurrent: (track) => {
            dispatch(addCurrent(track));
        },
        onLikeCurrent: () => {
            dispatch(likeCurrent());
        },
        onUnlikeCurrent: () => {
            dispatch(unlikeCurrent());
        },
        onCreateQueue: (tracks) => {
            dispatch(createQueue(tracks));
        },
        onLikeTrackQueue: (id) => {
            dispatch(likeTrackQueue(id));
        },
        onUnlikeTrackQueue: (id) => {
            dispatch(unlikeTrackQueue(id));
        },
        onCreatePlaylist: (tracks) => {
            dispatch(createPlaylist(tracks));
        },
        onAddTrackPlaylist: (track) => {
            dispatch(addTrackPlaylist(track));
        },
        onLikeTrackPlaylist: (id) => {
            dispatch(likeTrackPlaylist(id));
        },
        onUnlikeTrackPlaylist: (id) => {
            dispatch(unlikeTrackPlaylist(id));
        },
        onAddEditionPlaylist: (edition) => {
            dispatch(addEditionPlaylist(edition));
        },
        onCreateCommonMusic: () => {
            dispatch(createCommonMusic());
        },
        onCreateRandomMusic: () => {
            dispatch(createRandomMusic());
        },
        onAddLikeEdition: (id) => {
            dispatch(addLikeEdition(id));
        },
        onDeleteLikeEdition: (id) => {
            dispatch(deleteLikeEdition(id));
        },
        onAddLikeTrack: (id) => {
            dispatch(addLikeTrack(id));
        },
        onDeleteLikeTrack: (id) => {
            dispatch(deleteLikeTrack(id));
        },
        onGetListPlaylist: (id) => {
            dispatch(getListPlaylist(id));
        },
        onGetAddedListPlaylist: (idPerformer, idTrack) => {
            dispatch(getAddedListPlaylist(idPerformer, idTrack));
        },
        onClearListPlaylist: () => {
            dispatch(clearListPlaylist());
        },
        onClearAddedListPlaylist: () => {
            dispatch(clearAddedListPlaylist());
        },
        onAddTrackAddedPlaylist: (idPlaylist, idTrack) => {
            dispatch(addTrackAddedPlaylist(idPlaylist, idTrack));
        }
    })
)(Playlist)