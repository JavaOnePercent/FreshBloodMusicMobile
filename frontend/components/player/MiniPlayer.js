import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableHighlight, RefreshControl, ScrollView, Dimensions} from 'react-native';
import {Image, ListItem} from 'react-native-elements/src/index';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { PlayerAction } from "../../redux/actions/player";
import store from "../../redux/store";

class MiniPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.play = this.play.bind(this)
        this.pause = this.pause.bind(this)
    }

    static propTypes = {
        iconAlbum: PropTypes.string.isRequired,
        nameTrack: PropTypes.string.isRequired,
        playTrack: PropTypes.func.isRequired,
        pauseTrack: PropTypes.func.isRequired,
        nextTrack: PropTypes.func.isRequired,
        openPlayer: PropTypes.func.isRequired,
        isPlay: PropTypes.string.isRequired,
    }

    componentDidMount()
    {

    }

    play()
    {
        this.props.playTrack()
    }

    pause()
    {
        this.props.pauseTrack()
    }

    render() {

        const { iconAlbum, nameTrack, nextTrack, openPlayer } = this.props;
        return (
                <Provider store={store}>
                    <View style={styles.container}>
                        <View style={styles.background}>
                        </View>
                        <TouchableHighlight onPress={openPlayer} underlayColor="#fff">
                            <View style={styles.playerContainer}>
                                <View style={styles.rowStyle}>
                                    <View style={styles.iconAlbum}>
                                        {
                                            nameTrack &&
                                            <Image
                                                source={{uri: iconAlbum}}
                                                style={{width: 50, height: 50, borderRadius: 3}}
                                            />
                                        }
                                        {
                                            !nameTrack &&
                                            <Image
                                                source={require('../../icons/default-cover.png')}
                                                style={{width: 50, height: 50}}
                                            />

                                        }
                                    </View>
                                </View>
                                <View style={styles.rowStyle}>
                                    <View style={styles.nameTrack}>
                                        {
                                            nameTrack &&
                                            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>{nameTrack}</Text>
                                        }
                                        {
                                            !nameTrack &&
                                            <Text style={styles.title}>{'Не исполняется'}</Text>
                                        }
                                    </View>
                                </View>
                                <View style={styles.rowStyle}>
                                    <View style={styles.play}>
                                        {(this.props.isPlay === 'pause' || this.props.isPlay === '') &&
                                            <TouchableHighlight style={styles.button} onPress={this.play} underlayColor="#fff">
                                                <Icon name="ios-play"
                                                      type="ionicon"
                                                      size={30}
                                                      color={'#000'}
                                                />
                                            </TouchableHighlight>
                                        }
                                        {(this.props.isPlay !== 'pause' && this.props.isPlay !== '') &&
                                            <TouchableHighlight style={styles.button} onPress={this.pause} underlayColor="#fff">
                                                <Icon name="ios-pause"
                                                      type="ionicon"
                                                      size={30}
                                                      color={'#000'}
                                                />
                                            </TouchableHighlight>
                                        }
                                    </View>
                                </View>
                                <View style={styles.rowStyle}>
                                    <View style={styles.next}>
                                        <TouchableHighlight style={styles.button} onPress={nextTrack} underlayColor="#fff">
                                            <Icon name="ios-fastforward"
                                                  type="ionicon"
                                                  size={30}
                                                  color={'#000'}
                                            />
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </View>
                        </TouchableHighlight>
                    </View>
                </Provider>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        width: Dimensions.get('window').width - 210
    },
    container:{
        // transform: [
        //     {translateX: 0},
        //     {translateY: Dimensions.get('window').height - 139}],
        flex: 1

    },
    background: {
        backgroundColor: '#f6f6f6',
        opacity: 0.95,
        height: 65,
        width: Dimensions.get('window').width,
        position: 'absolute'
    },
    playerContainer: {
        paddingLeft: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        position: 'relative'
    },
    rowStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    iconAlbum: {
        marginTop: 7.5
    },
    nameTrack: {
        flexDirection: 'column',
        marginLeft: 20,
        marginTop: 22.5,
        width: Dimensions.get('window').width - 210
    },
    play: {
        flexDirection: 'column',
        marginTop: 7.5
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        // backgroundColor: '#a21',
        alignItems: 'center',
        justifyContent: 'center'
    },
    next: {
        flexDirection: 'column',
        marginTop: 7.5,
        marginRight: 10,
        marginLeft: 5
    }
});

export default MiniPlayer;