import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    RefreshControl,
    ScrollView,
    Dimensions,
    ToastAndroid,
    ActivityIndicator
} from 'react-native';
import {Icon, Image, ListItem} from 'react-native-elements';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import {clearEdition} from "../redux/actions/news";
import store from "../redux/store";

class Playlist extends Component {
    constructor(props) {
        super(props);
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

    componentDidMount()
    {
        if(this.interval){
            clearInterval(this.interval);
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if(prevState.tracks !== nextProps.tracks)
        {
            return {
                tracks: nextProps.tracks
            }
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
                            style={{opacity: 0.7, height: 135, width: 300, resizeMode: 'cover'}}
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
                                <View style={styles.columnStyle}>
                                    <Text style={styles.titleTrack}>{nameAlbum}</Text>
                                    <Text style={styles.titlePerformer}>{namePerformer}</Text>
                                    <Text style={styles.titlePerformer}>{style  + ' (' + year + ')'}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.buttonPanel}>
                            <View style={styles.buttonRowStyle}>
                                <TouchableHighlight style={styles.button} underlayColor="#fff" >
                                    <Icon name="ios-play"
                                          type="ionicon"
                                          size={30}
                                          color={'#000'}
                                    />
                                </TouchableHighlight>
                            </View>
                            <View style={styles.buttonRowStyle}>
                                <TouchableHighlight style={styles.button} underlayColor="#fff" >
                                    <Icon name="random"
                                          type="font-awesome"
                                          size={22}
                                          color={'#000'}
                                    />
                                </TouchableHighlight>
                            </View>
                            <View style={styles.buttonRowStyle}>
                                <TouchableHighlight style={styles.button} underlayColor="#fff" >
                                    <Icon name="playlist-plus"
                                          type="material-community"
                                          size={30}
                                          color={'#000'}
                                    />
                                </TouchableHighlight>
                            </View>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {/*<View style={{height: 160}}>*/}
                                {
                                    this.props.tracks.length !== 0 &&
                                    this.props.tracks.map((l, i) => (
                                        <TouchableHighlight onPress={() => {ToastAndroid.show(l.audio_trc, ToastAndroid.SHORT)}} style={{height: 40, justifyContent: 'center'}} underlayColor="#fff">
                                            <View style={styles.listTrack}>
                                                <View style={styles.rowStyle}>
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
                                    this.props.tracks.length === 0 &&
                                    <View style={styles.indicator}>
                                        <ActivityIndicator color={'#8d6fb9'}/>
                                    </View>
                                }

                            {/*</View>*/}
                        </ScrollView>
                        <View style={{marginBottom: 5}}>
                            <Text style={styles.text}>{listens + ' прослушиваний'}</Text>
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
        flexDirection: 'row'
    },
    rowStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    buttonRowStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 20
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
        color: 'grey'
    },
    textNumber: {
        fontSize: 16,
        color: 'grey',
        marginLeft: 20
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

export default connect()(Playlist)