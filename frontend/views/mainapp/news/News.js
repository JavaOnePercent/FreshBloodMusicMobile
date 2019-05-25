import React, { Component } from 'react';
import {View, Text, Platform, StyleSheet, ActivityIndicator, AsyncStorage, ScrollView, RefreshControl, Dimensions, Alert, Button, ToastAndroid} from 'react-native';
import { Provider, connect } from 'react-redux';
import store from "../../../redux/store";
import Post from "../../../components/Post";

import Playlist from "../../../components/Playlist";
import {getNews, getEdition, clearEdition} from "../../../redux/actions/news";
import {getLogin} from "../../../redux/actions/auth";
import {createCurrentProfile, getAlbumsPerformer, getPerformer} from "../../../redux/actions/performer";
import {getPerformers} from "../../../redux/actions/charts";
import { createQueueTrend } from "../../../redux/actions/player";
import { getNextTrack } from "../../../redux/actions/radio";

class News extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            refreshing: false,
            showTable: false,
            indexTable: -1,

        }
    }

    static navigationOptions = {
        headerStyle: {backgroundColor:'#8d6fb9'},
        headerTintColor:'white',
        headerBackTitle: null,
        title: 'Новости'
    };

    updateSearch = search => {
        this.setState({ search });
    };

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

    _refresh = async() => {
        this.props.onGetNews('new')
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        this._refresh().then(() => {
            this.setState({refreshing: false});
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

    hideAlbum(id)
    {
        this.isScrolled.setNativeProps({scrollEnabled: true});
        this.refs['freshIndicator']._nativeRef.setNativeProps({
            enabled: true
        });
        this.props.onClearEdition(id)
        this.setState({
            indexTable: -1,
            showTable: false
        });
    }

    componentDidMount()
    {
        this.props.onGetLogin()
        this.props.onGetNews('new')
        this.props.onGetPerformers()
        this.props.onCreateQueueTrend()
        this.props.onGetNextTrack()
    }

    componentWillUnmount(){

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
                    {
                        this.props.news.map((l, i) => (
                            <Post performer={l.name_per}
                                  datetime={l.date_alb}
                                  iconPerformer={l.image_per}
                                  description={l.about_alb}
                                  genre={l.genre}
                                  style={l.style}
                                  years={l.date_alb.substring(7, 11)}
                                  iconAlbum={l.image_alb}
                                  title={l.name_alb}
                                  showPerformer={() => this.performer(l.per_id)}
                                  showTracks={() => this._renderCancel(i, l.id.toString())}
                            />
                            ))
                    }
                    <View style={styles.bottom}>
                    </View>
                    </ScrollView>
                    <View style={styles.table}>
                        {this.state.indexTable !== -1 && this.edition(this.props.news[this.state.indexTable])}
                    </View>
                </View>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f6f6',
        zIndex: 0
    },
    table: {
        zIndex: 1,
        position: 'absolute',
        transform: [
            {translateX: Dimensions.get('window').width / 2 - 150},
            {translateY: Dimensions.get('window').height / 2 - 300}]
    },
    bottom: {
        height: 50,
        backgroundColor: '#f6f6f6'
    }
});

export default connect(
    state => ({news: state.news, edition: state.edition}),
    dispatch => ({
        onGetNews: (sort) => {
            dispatch(getNews(sort));
        },
        onGetEdition: (id) => {
            dispatch(getEdition(id));
        },
        onGetLogin: () => {
            dispatch(getLogin());
        },
        onClearEdition: (id) => {
            dispatch(clearEdition(id));
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
        onGetPerformers: () => {
            dispatch(getPerformers());
        },
        onCreateQueueTrend: () => {
            dispatch(createQueueTrend());
        },
        onGetNextTrack: () => {
            dispatch(getNextTrack());
        }
    })
)(News)