import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    AsyncStorage,
    RefreshControl,
    ScrollView,
    TouchableHighlight,
    Image,
    ToastAndroid,
    Dimensions
} from 'react-native';
import { Provider, connect } from 'react-redux';
import store from "../../../redux/store";
import Album from "../../../components/Album";
import Playlist from "../../../components/Playlist";

import { getEdition, clearEdition} from "../../../redux/actions/news";
import {getAlbumsPerformer, getPerformer} from "../../../redux/actions/performer";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            indexTable: -1,
            showTable: false,
        };
    }

    static navigationOptions = {
        headerStyle: {backgroundColor:'#8d6fb9'},
        headerTintColor:'white',
        headerBackTitle: null,
        title: 'Профиль'
    };

    _refresh = async() => {
        this.props.onGetPerformer(this.props.currentProfile);
        this.props.onGetAlbumsPerformer(this.props.currentProfile);
    };

    _onRefresh = () => {
        this.setState({refreshing: true});
        this._refresh().then(() => {
            this.setState({refreshing: false});
        });
    };

    componentDidMount()
    {

    }

    edition(l)
    {
        this.isScrolled.setNativeProps({scrollEnabled: false});
        this.refs['freshIndicator']._nativeRef.setNativeProps({
            enabled: false
        });
        return(
            <Playlist
                hide={() => this.hideAlbum(l.id)}
                idAlbum={l.id}
                album={this.props.edition}
            />
        )
    }

    hideAlbum(id)
    {
        this.isScrolled.setNativeProps({scrollEnabled: true});
        this.refs['freshIndicator']._nativeRef.setNativeProps({
            enabled: true
        });
        this.props.onClearEdition(id);
        this.setState({
            indexTable: -1,
            showTable: false
        });
    }

    _renderCancel(i, id) {
        if(!this.state.showTable)
        {
            this.props.onGetEdition(id)
            this.setState({
                indexTable: i,
                showTable: true
            });
        }
    }

    state = {
        performer: {},
        albums: []
    };

    static getDerivedStateFromProps(nextProps, prevState) {

        if(prevState.performer !== nextProps.performer)
        {
            return {
                performer: nextProps.performer
            }
        }
        if(prevState.albums !== nextProps.albums)
        {
            return {
                albums: nextProps.albums
            }
        }
    }

    render() {

        const { performer, albums } = this.props;

        return (
            <Provider store={store}>
                    <View style={styles.container}>
                        {
                            (performer === undefined || albums === undefined) &&
                                <View style={styles.indicator}>
                                    <ActivityIndicator color={'#8d6fb9'}/>
                                </View>
                        }
                        {
                            performer && albums &&
                                <View>
                                    <ScrollView
                                        refreshControl={
                                            <RefreshControl
                                                ref='freshIndicator'
                                                refreshing={this.state.refreshing}
                                                onRefresh={this._onRefresh}
                                            />
                                        }
                                        ref={component => this.isScrolled = component}
                                    >
                                    <View style={styles.background}>
                                        <Image
                                            source={{uri: performer.image_per}}
                                            style={{opacity: 0.6, height: 150, width: Dimensions.get('window').width, resizeMode: 'cover'}}
                                            blurRadius={3}
                                        />
                                    </View>
                                    <View style={styles.header}>
                                        <View style={styles.listItem}>
                                            <View style={styles.rowStyle}>
                                                <View style={styles.columnStyle}>
                                                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                                        <Image
                                                            source={{uri: performer.image_per}}
                                                            style={{width: 100, height: 100, marginTop: 25, borderRadius: 100 / 2}}
                                                        />
                                                        <View style={styles.rating}>
                                                            <Text style={styles.ratingTitle}>{'♫ ' + performer.rating_per}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.rowStyle}>
                                                <View style={styles.columnStyle}>
                                                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.titlePerformer}>{performer.name_per}</Text>
                                                    <Text numberOfLines={5} ellipsizeMode="tail" style={styles.titleDescription}>{performer.about_per}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <Text style={styles.title}>Издания</Text>
                                    <View style={styles.albumContainer}>
                                        <View style={styles.performerContainer}>
                                            {albums.map((l, i, array) => (
                                            <View style={styles.rowStyle}>
                                                <View style={styles.columnStyle}>
                                                    <Album title={array[i].name_alb} performer={null}
                                                           iconAlbum={array[i].image_alb}
                                                           showTracks={() => this._renderCancel(i, array[i].id.toString())}
                                                           width={150} height={150}/>
                                                </View>
                                            </View>
                                                ))}
                                        </View>
                                    </View>
                                    <View style={styles.bottom}>

                                    </View>
                                    </ScrollView>
                                    <View style={styles.table}>
                                        {this.state.indexTable !== -1 && this.edition(albums[this.state.indexTable])}
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
        zIndex: 0
    },
    table: {
        zIndex: 1,
        position: 'absolute',
        transform: [
            {translateX: Dimensions.get('window').width / 2 - 150},
            {translateY: Dimensions.get('window').height / 2 - 300}]
    },
    header: {
        position: 'relative',
        height: 150,
        width: Dimensions.get('window').width
    },
    background: {
        backgroundColor: '#f6f6f6',
        alignItems: 'center',
        position: 'absolute',
        overflow: 'hidden',
        height: 150,
        width: Dimensions.get('window').width
    },
    listItem: {
        paddingLeft: 20,
        flexWrap: 'wrap',
        flexDirection: 'row'

    },
    albumContainer: {
        flexWrap: 'wrap',
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
    titlePerformer: {
        fontSize: 22,
        marginTop: 25,
        color: '#000',
        width: Dimensions.get('window').width - 150
    },
    titleDescription: {
        fontSize: 13,
        marginTop: 10,
        color: '#000',
        width: Dimensions.get('window').width - 150
    },
    rating: {
        height: 25,
        width: 50,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        marginTop: -15,
    },
    ratingTitle: {
        color: '#000'
    },
    indicator: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        padding: 20,
        fontSize: 24,
        color: 'grey'
    },
    bottom: {
        height: 65,
        backgroundColor: '#fff'
    }

});

export default connect(
    state => ({performer: state.performer, albums: state.albums, edition: state.edition, currentProfile: state.currentProfile}),
    dispatch => ({
        onGetEdition: (id) => {
            dispatch(getEdition(id));
        },
        onClearEdition: (id) => {
            dispatch(clearEdition(id));
        },
        onGetPerformer: (id) => {
            dispatch(getPerformer(id));
        },
        onGetAlbumsPerformer: (id) => {
            dispatch(getAlbumsPerformer(id));
        }
    })
)(Profile)