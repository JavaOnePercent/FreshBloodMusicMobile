import React, { Component } from 'react';
import {View, Text, StyleSheet, ActivityIndicator, AsyncStorage, TouchableHighlight, Dimensions} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import { Provider, connect } from 'react-redux';
import store from "../../../redux/store";

import EntryButton from "../../../components/EntryButton";
import {ADDRESS_SERVER} from "../../../components/constants/constants";
import { logout } from "../../../redux/actions/auth";
import { createCurrentProfile, getPerformer, getAlbumsPerformer } from "../../../redux/actions/performer";
import { getUserPlaylists } from "../../../redux/actions/user";
import { getLikedAlbums } from "../../../redux/actions/albums";
import { getLikedTracks, clearLikedTrack } from "../../../redux/actions/tracks";

class Favorites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [
                {
                    title: 'Страница исполнителя',
                    action: () => this.profilePage()
                },
                {
                    title: 'Понравившиеся композиции',
                    action: () => this.likedTracks()
                },
                {
                    title: 'Понравившиеся издания',
                    action: () => this.likedAlbums()
                },
                {
                    title: 'Мои плейлисты',
                    action: () => this.myPlaylists()
                },
                {
                    title: 'Выйти',
                    action: () => this.logout()
                }
            ]
        };
    }

    static navigationOptions = {
        headerStyle: {backgroundColor:'#8d6fb9'},
        headerTintColor: 'white',
        headerBackTitle: null,
        title: 'Моя музыка'
    };

    componentDidMount()
    {

    }

    profilePage()
    {
        this.props.onGetPerformer(this.props.auth.id);
        this.props.onGetAlbumsPerformer(this.props.auth.id);
        this.props.onCreateCurrentProfile(this.props.auth.id);
        this.props.navigation.navigate('Profile')
    }

    myPlaylists()
    {
        this.props.onGetUserPlaylists(this.props.auth.id)
        this.props.navigation.navigate('MyPlaylists')
    }

    likedAlbums()
    {
        this.props.onGetLikedAlbums(this.props.auth.id)
        this.props.navigation.navigate('LikedAlbums')
    }

    likedTracks()
    {
        this.props.onClearLikedTrack()
        this.props.onGetLikedTracks(this.props.auth.id)
        this.props.navigation.navigate('LikedTracks')
    }

    logout()
    {
        this.props.onLogout()
    }

    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    {
                        this.props.auth.name === '' &&
                        <EntryButton
                            action={() => this.props.navigation.navigate('Authorization')}
                        />
                    }
                    {
                        this.props.auth.name !== '' &&
                            <View>
                                <EntryButton iconUser={ADDRESS_SERVER + '/media/performers/' + this.props.auth.id + '/logo.jpg'}
                                            nameUser={this.props.auth.name}
                                />
                                <View style={{marginTop: 75}}>
                                {
                                    this.state.dataSource.map((l, i) => (
                                        <TouchableHighlight onPress={() => l.action()}
                                                            style={{height: 65, justifyContent: 'center', width: Dimensions.get('window').width}}
                                                            underlayColor="#f6f6f6">
                                            <View style={styles.listTrack}>
                                                <View style={styles.rowStyle}>
                                                    <Text style={styles.textName}>{l.title}</Text>
                                                </View>
                                                <View style={styles.rowIconStyle}>
                                                    <Icon name="ios-arrow-forward"
                                                          type="ionicon"
                                                          size={24}
                                                          color='gray'
                                                    />
                                                </View>
                                            </View>
                                        </TouchableHighlight>
                                    ))
                                }
                                </View>
                            </View>
                    }
                </View>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listTrack: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        height: 65,
        marginLeft: 20
    },
    rowStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rowIconStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        width: 30
    },
    textName: {
        fontSize: 16,
        color: '#000',
        marginLeft: 20,
        width: Dimensions.get('window').width - 100
    },
});

export default connect(
    state => ({auth: state.auth}),
    dispatch => ({
        onLogout: () => {
            dispatch(logout());
        },
        onCreateCurrentProfile: (id) => {
            dispatch(createCurrentProfile(id));
        },
        onGetPerformer: (id) => {
            dispatch(getPerformer(id));
        },
        onGetAlbumsPerformer: (id) => {
            dispatch(getAlbumsPerformer(id));
        },
        onGetUserPlaylists: (id) => {
            dispatch(getUserPlaylists(id));
        },
        onGetLikedAlbums: (id) => {
            dispatch(getLikedAlbums(id));
        },
        onGetLikedTracks: (id) => {
            dispatch(getLikedTracks(id));
        },
        onClearLikedTrack: () => {
            dispatch(clearLikedTrack());
        },
    })
)(Favorites)