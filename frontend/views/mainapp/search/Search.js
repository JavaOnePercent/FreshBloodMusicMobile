import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    AsyncStorage,
    RefreshControl,
    ScrollView,
    Platform, Dimensions
} from 'react-native';
import { Provider, connect } from 'react-redux';
import store from "../../../redux/store";
import {SearchBar} from "react-native-elements";
import {getResultSearch, clearResultSearch} from "../../../redux/actions/search";
import Album from "../../../components/Album";
import {createCurrentProfile, getAlbumsPerformer, getPerformer} from "../../../redux/actions/performer";
import {createCommonMusic, createPlaylist, createQueue, releasePlayer} from "../../../redux/actions/player";
import {clearEdition, getEdition} from "../../../redux/actions/news";
import Playlist from "../../../components/Playlist";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            indexTable: -1,
            showTable: false,
        }
    }

    static navigationOptions = {
        headerStyle: {backgroundColor:'#8d6fb9'},
        headerTintColor:'white',
        headerBackTitle: null,
        title: 'Поиск'
    };

    state = {
        search: {},
    };

    static getDerivedStateFromProps(nextProps, prevState) {

        if(prevState.search !== nextProps.search)
        {
            return {
                search: nextProps.search
            }
        }

    }

    updateSearch = query => {
        if(query === '')
        {
            this.props.onClearResultSearch()
        }
        else
        {
            this.props.onGetResultSearch(query)
        }
        this.setState({ query });
    };

    componentDidMount()
    {

    }

    performer(id)
    {
        if(!this.state.showTable)
        {
            this.props.onGetPerformer(id);
            this.props.onGetAlbumsPerformer(id);
            this.props.onCreateCurrentProfile(id);
            this.props.navigation.navigate('Profile')
        }
    }

    edition(l)
    {
        this.isScrolled.setNativeProps({scrollEnabled: false});
        this.isScrolledHorizontalAlb.setNativeProps({scrollEnabled: false});
        this.isScrolledHorizontalPer.setNativeProps({scrollEnabled: false});
        this.isScrolledHorizontalTrc.setNativeProps({scrollEnabled: false});
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
        this.isScrolledHorizontalAlb.setNativeProps({scrollEnabled: true});
        this.isScrolledHorizontalPer.setNativeProps({scrollEnabled: true});
        this.isScrolledHorizontalTrc.setNativeProps({scrollEnabled: true});
        this.props.onClearEdition(id);
        this.setState({
            indexTable: -1,
            showTable: false
        });
    }

    track(l)
    {
        let track = [{id: l.id, idPerformer: l.per_id, performer: l.performer, cover: l.image,
            title: l.name, audio: l.audio, duration: l.duration,
            isLiked: l.is_liked}]
        this.props.onCreateCommonMusic();
        this.props.onCreateQueue(track)
        this.props.onCreatePlaylist(track)
        this.props.onPressReleasePlayButton(l.audio);
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



    render() {
        return (
            <Provider store={store}>
                <ScrollView
                    ref={component => this.isScrolled = component}
                >
                    <View style={styles.container}>
                        {Platform.OS === 'android' &&
                        <SearchBar
                            platform="android"
                            placeholder="Поиск групп, изданий, треков..."
                            onChangeText={this.updateSearch}
                            inputContainerStyle={{backgroundColor: '#fff'}}
                            value={this.state.query}
                            lightTheme={true}
                            round={true}
                            // onCancel={this.kekis}
                        />}
                        {Platform.OS === 'ios' &&
                        <SearchBar
                            platform="ios"
                            placeholder="Поиск групп, изданий, треков..."
                            onChangeText={this.updateSearch}
                            inputContainerStyle={{backgroundColor: '#fff'}}
                            value={this.state.query}
                            lightTheme={true}
                            round={true}
                            cancelButtonProps={{color: '#8d6fb9'}}
                            // onCancel={this.kekis}
                        />}
                        {
                            this.props.search.results !== undefined &&
                            this.props.search.results.filter(({ type }) => type === 'track').length > 0 &&
                            <Text style={styles.title}>Композиции</Text>
                        }
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            ref={component => this.isScrolledHorizontalTrc = component}
                        >
                            {
                                this.props.search.results !== undefined &&
                                this.props.search.results.filter(({ type }) => type === 'track').map((l, i) => (
                                    <View style={styles.albumContainer}>
                                        <Album title={l.name} performer={l.performer} iconAlbum={l.image} deletePlaylist={null} showTracks={() => this.track(l)} width={150} height={150}/>
                                    </View>
                                ))
                            }
                        </ScrollView>
                        {
                            this.props.search.results !== undefined &&
                            this.props.search.results.filter(({ type }) => type === 'album').length > 0 &&
                                <Text style={styles.title}>Издания</Text>
                        }
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            ref={component => this.isScrolledHorizontalAlb = component}
                        >
                            {
                                this.props.search.results !== undefined &&
                                this.props.search.results.filter(({ type }) => type === 'album').map((l, i) => (
                                    <View style={styles.albumContainer}>
                                        <Album title={l.name} performer={null} iconAlbum={l.image} deletePlaylist={null} showTracks={() => this._renderCancel(i, l.id.toString())} width={150} height={150}/>
                                    </View>
                                ))
                            }
                        </ScrollView>
                        {
                            this.props.search.results !== undefined &&
                            this.props.search.results.filter(({ type }) => type === 'performer').length > 0 &&
                            <Text style={styles.title}>Исполнители</Text>
                        }
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            ref={component => this.isScrolledHorizontalPer = component}
                        >
                            {
                                this.props.search.results !== undefined &&
                                this.props.search.results.filter(({ type }) => type === 'performer').map((l, i) => (
                                    <View style={styles.albumContainer}>
                                        <Album title={l.name} performer={null} iconAlbum={l.image} deletePlaylist={null} showTracks={() => this.performer(l.id)} width={150} height={150}/>
                                    </View>
                            ))
                            }
                        </ScrollView>
                    </View>
                    <View style={styles.bottom}>
                    </View>
                </ScrollView>
                <View style={styles.table}>
                    {this.state.indexTable !== -1 && this.edition(this.props.search.results.filter(({ type }) => type === 'album')[this.state.indexTable])}
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
        alignItems: 'center',
        margin: 10
    },
    title: {
        paddingLeft: 15,
        fontSize: 24,
        color: 'grey'
    },
    bottom: {
        height: 65,
        opacity: 0,
        backgroundColor: '#fff'
    },
});

export default connect(
    state => ({search: state.search, edition: state.edition}),
    dispatch => ({
        onGetResultSearch: (query) => {
            dispatch(getResultSearch(query));
        },
        onClearResultSearch: () => {
            dispatch(clearResultSearch());
        },
        onGetPerformer: (id) => {
            dispatch(getPerformer(id));
        },
        onGetAlbumsPerformer: (id) => {
            dispatch(getAlbumsPerformer(id));
        },
        onCreateCurrentProfile: (id) => {
            dispatch(createCurrentProfile(id));
        },
        onCreateCommonMusic: () => {
            dispatch(createCommonMusic());
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
        onGetEdition: (id) => {
            dispatch(getEdition(id));
        },
        onClearEdition: (id) => {
            dispatch(clearEdition(id));
        },
    })
)(Search)