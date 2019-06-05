import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    AsyncStorage,
    ScrollView,
    RefreshControl,
    Dimensions,
    Alert
} from 'react-native';
import { Provider, connect } from 'react-redux';
import store from "../../../redux/store";
import Album from "../../../components/Album";
import {deleteLikeEdition, getUserPlaylists} from "../../../redux/actions/user";
import { getPlaylist, clearPlaylist } from "../../../redux/actions/playlist";
import {ADDRESS_SERVER} from "../../../components/constants/constants";

class MyPlaylists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false
        };
    }

    static navigationOptions = {
        headerStyle: {backgroundColor:'#8d6fb9'},
        headerTintColor:'white',
        title: 'Мои плейлисты'
    };

    state = {
        userPlaylists: [],
    };

    static getDerivedStateFromProps(nextProps, prevState) {

        if(prevState.userPlaylists !== nextProps.userPlaylists)
        {
            return {
                userPlaylists: nextProps.userPlaylists
            }
        }
    }

    componentDidMount()
    {

    }

    _refresh = async() => {
        this.props.onGetUserPlaylists(this.props.auth.id)
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        this._refresh().then(() => {
            this.setState({refreshing: false});
        });
    }

    deletePlaylist(l)
    {
        return (
            Alert.alert('Подтвержение', 'Вы действительно хотите удалить плейлист ' + l.title + '?', [
                {
                    text: 'Да',
                    onPress: () => this.props.onDeleteLikeEdition(l.id)
                },
                {text: 'Нет', style: 'cancel'},
            ], {cancelable: false}
            )
        )
    }

    openPlaylist(id)
    {
        this.props.onClearPlaylist();
        this.props.onGetPlaylist(id);
        this.props.navigation.navigate('Playlist');
    }

    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
                    >
                        <View style={styles.albumContainer}>
                            <View style={styles.performerContainer}>
                                <View style={styles.rowStyle}>
                                    <View style={styles.columnStyle}>
                                        <Album title={'Cоздать плейлист'}
                                               performer={null}
                                               iconAlbum={ADDRESS_SERVER + '/media/albums/0/newPlaylist.png'}
                                               showTracks={() => this.props.navigation.navigate('NewPlaylist')}
                                               width={150} height={150}/>
                                    </View>
                                </View>
                                {this.props.userPlaylists.map((l, i) => (
                                    <View style={styles.rowStyle}>
                                        <View style={styles.columnStyle}>
                                            <Album title={l.title}
                                                   performer={null}
                                                   iconAlbum={l.image}
                                                   showTracks={() => this.openPlaylist(l.id)}
                                                   deletePlaylist={() => this.deletePlaylist(l)}
                                                   width={150}
                                                   height={150}/>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>
                        <View style={styles.bottom}>
                        </View>
                    </ScrollView>
                </View>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    title: {
        padding: 20,
        fontSize: 24,
        color: 'grey'
    },
    albumContainer: {
        flexWrap: 'wrap',
        marginTop: 15,
        marginLeft: Dimensions.get('window').width - 340
    },
    performerContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    rowStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    columnStyle: {
        flexDirection: 'column',
        marginHorizontal: 5
    },
    bottom: {
        height: 65,
        backgroundColor: '#fff'
    }
});

export default connect(
    state => ({auth: state.auth, userPlaylists: state.userPlaylists}),
    dispatch => ({
        onGetUserPlaylists: (id) => {
            dispatch(getUserPlaylists(id));
        },
        onDeleteLikeEdition: (id) => {
            dispatch(deleteLikeEdition(id));
        },
        onGetPlaylist: (id) => {
            dispatch(getPlaylist(id));
        },
        onClearPlaylist: () => {
            dispatch(clearPlaylist());
        },
    })
)(MyPlaylists)