import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    AsyncStorage,
    ScrollView,
    RefreshControl,
    Dimensions
} from 'react-native';
import { Provider, connect } from 'react-redux';
import store from "../../../redux/store";
import Album from "../../../components/Album";
import Playlist from "../../../components/Playlist";
import {clearEdition, getEdition} from "../../../redux/actions/news";
import {getLikedAlbums} from "../../../redux/actions/albums";

class LikedAlbums extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            indexTable: -1,
            showTable: false
        }
    }

    static navigationOptions = {
        headerStyle: {backgroundColor:'#8d6fb9'},
        headerTintColor: 'white',
        title: 'Понравившиеся издания'
    };

    state = {
        likedAlbums: [],
    };

    static getDerivedStateFromProps(nextProps, prevState) {

        if(prevState.likedAlbums !== nextProps.likedAlbums)
        {
            return {
                likedAlbums: nextProps.likedAlbums
            }
        }
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
        this.props.onGetLikedAlbums(this.props.auth.id);
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

    _refresh = async() => {
        this.props.onGetLikedAlbums(this.props.auth.id);
    };

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
                        <View style={styles.albumContainer}>
                            <View style={styles.performerContainer}>
                                {this.props.likedAlbums.map((l, i) => (
                                    <View style={styles.rowStyle}>
                                        <View style={styles.columnStyle}>
                                            <Album title={l.title} performer={l.name_per} iconAlbum={l.image} showTracks={l.action} showTracks={() => this._renderCancel(i, l.id.toString())} width={150} height={150}/>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>
                        <View style={styles.bottom}>
                        </View>
                    </ScrollView>
                    <View style={styles.table}>
                        {this.state.indexTable !== -1 && this.edition(this.props.likedAlbums[this.state.indexTable])}
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
        zIndex: 0
    },
    table: {
        zIndex: 1,
        position: 'absolute',
        transform: [
            {translateX: Dimensions.get('window').width / 2 - 150},
            {translateY: Dimensions.get('window').height / 2 - 300}]
    },
    albumContainer: {
        flexWrap: 'wrap',
        marginLeft: Dimensions.get('window').width - 340,
        marginTop: 15
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
    },
});

export default connect(
    state => ({auth: state.auth, likedAlbums: state.likedAlbums, edition: state.edition}),
    dispatch => ({
        onGetEdition: (id) => {
            dispatch(getEdition(id));
        },
        onClearEdition: (id) => {
            dispatch(clearEdition(id));
        },
        onGetLikedAlbums: (id) => {
            dispatch(getLikedAlbums(id));
        },
    })
)(LikedAlbums)