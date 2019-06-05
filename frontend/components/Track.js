import {Alert, Dimensions, StyleSheet, Text, ToastAndroid, TouchableHighlight, View} from "react-native";
import {Icon, Image} from "react-native-elements";
import React, { Component } from 'react';
import PropTypes from "prop-types";
import {removeTrackQueue, removeTrackPlaylist} from "../redux/actions/player";
import {connect} from "react-redux";
import {deleteTrackFromPlaylist, likeTrackFromPlaylist, unlikeTrackFromPlaylist} from "../redux/actions/playlist";
import { deleteLikeTrack } from "../redux/actions/tracks";

class Track extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        id: PropTypes.number.isRequired,
        idTrack: PropTypes.number.isRequired,
        cover: PropTypes.string.isRequired,
        audio: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        isLiked: PropTypes.bool.isRequired,
        idPlaylist: PropTypes.number.isRequired,
        performer: PropTypes.string.isRequired,
        play: PropTypes.func.isRequired,
        isLikedPlaylist: PropTypes.bool.isRequired
    }

    deleteTrack()
    {
        return (
            Alert.alert('Подтвержение', 'Вы действительно хотите удалить композицию ' + this.props.title + ' из текущего плейлиста?', [
                    {
                        text: 'Да',
                        onPress: () => this.props.onDeleteTrackFromPlaylist(this.props.idPlaylist, this.props.id, this.props.idTrack)
                    },
                    {text: 'Нет', style: 'cancel'},
                ], {cancelable: false}
            )
        )
    }

    likeTrack()
    {
        this.props.onLikeTrackFromPlaylist(this.props.id, this.props.idTrack)
    }

    unlikeTrack()
    {
        this.props.onUnlikeTrackFromPlaylist(this.props.id, this.props.idTrack)
    }

    unlikeLikedTrack()
    {
        return (
            Alert.alert('Подтвержение', 'Вы действительно хотите удалить композицию ' + this.props.title + ' из понравившихся композиций?', [
                    {
                        text: 'Да',
                        onPress: () => this.props.onDeleteLikeTrack(this.props.idTrack)
                    },
                    {text: 'Нет', style: 'cancel'},
                ], {cancelable: false}
            )
        )
    }
    render() {
        const {id, play, cover, audio, title, isLiked, idPlaylist, performer, isLikedPlaylist} = this.props
        return (
            <TouchableHighlight onPress={play} underlayColor="#fff">
            <View style={styles.listItem}>
                <View style={styles.rowStyle}>
                    <View style={styles.iconAlbum}>
                        <Image
                            source={{uri: cover}}
                            style={{width: 50, height: 50, borderRadius: 3}}
                        />
                    </View>
                </View>
                <View style={styles.rowStyle}>
                    <View style={{
                        flexDirection: 'column',
                        width: Dimensions.get('window').width - 200,
                        marginLeft: 10,
                        marginTop: 12
                    }}>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.titleTrack}>{title}</Text>
                        <Text style={styles.titlePerformer}>{performer}</Text>
                    </View>
                    {
                        isLikedPlaylist === false && isLiked === true &&
                        <View style={styles.rowStyle}>
                            <TouchableHighlight style={styles.button} onPress={() => this.unlikeTrack()} underlayColor="#fff">
                                <Icon name="ios-heart"
                                      type="ionicon"
                                      size={28}
                                      color={'#8d6fb9'}
                                />
                            </TouchableHighlight>
                        </View>
                    }
                    {
                        isLikedPlaylist === false && isLiked === false &&
                        <View style={styles.rowStyle}>
                            <TouchableHighlight style={styles.button} onPress={() => this.likeTrack()} underlayColor="#fff">
                                <Icon name="ios-heart-empty"
                                      type="ionicon"
                                      size={28}
                                      color={'#000'}
                                />
                            </TouchableHighlight>
                        </View>
                    }
                    {   isLikedPlaylist === false &&
                        <View style={styles.rowStyle}>
                            <TouchableHighlight style={styles.button} onPress={() => this.deleteTrack()} underlayColor="#fff">
                                <Icon name="md-trash"
                                      type="ionicon"
                                      size={28}
                                      color={'#000'}
                                />
                            </TouchableHighlight>
                        </View>
                    }
                    {
                        isLikedPlaylist === true &&
                        <View style={styles.rowStyle}>
                            <TouchableHighlight style={styles.buttonLikedTrack} onPress={() => this.unlikeLikedTrack(id)} underlayColor="#fff">
                                <Icon name="ios-heart"
                                      type="ionicon"
                                      size={28}
                                      color={'#8d6fb9'}
                                />
                            </TouchableHighlight>
                        </View>
                    }
                </View>
            </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    listItem: {
        paddingLeft: 20,
        height: 65,
        width: Dimensions.get('window').width - 20,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    rowStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    iconAlbum: {
        marginTop: 7.5
    },
    titleTrack: {
        fontSize: 16,
        color: '#000'
    },
    titlePerformer: {
        fontSize: 13,
        color: 'grey'
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginTop: 15
    },
    buttonLikedTrack: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginTop: 15,
        marginLeft: 50
    }
});

export default connect(
    state => ({isPlay: state.player}),
    dispatch => ({
        onRemoveTrackQueue: (id) => {
            dispatch(removeTrackQueue(id));
        },
        onRemoveTrackPlaylist: (id) => {
            dispatch(removeTrackPlaylist(id));
        },
        onDeleteTrackFromPlaylist: (idPlaylist, id, idTrack) => {
            dispatch(deleteTrackFromPlaylist(idPlaylist, id, idTrack));
        },
        onLikeTrackFromPlaylist: (id, idTrack) => {
            dispatch(likeTrackFromPlaylist(id, idTrack));
        },
        onUnlikeTrackFromPlaylist: (id, idTrack) => {
            dispatch(unlikeTrackFromPlaylist(id, idTrack));
        },
        onDeleteLikeTrack: (id) => {
            dispatch(deleteLikeTrack(id));
        },
    })
)(Track)