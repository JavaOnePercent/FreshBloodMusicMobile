import React, { Component } from 'react';
import {View, Text, Platform, StyleSheet, ActivityIndicator, AsyncStorage, ScrollView, RefreshControl, Dimensions, Alert, Button, ToastAndroid} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Provider, connect } from 'react-redux';
import store from "../../../redux/store";
import Post from "../../../components/Post";

import Playlist from "../../../components/Playlist";
import {getNews, getEdition, clearEdition} from "../../../redux/actions/news";

class News extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            refreshing: false,
            showTable: false,
            indexTable: -1,

        }
        this.hideAlbum = this.hideAlbum.bind(this)
    }

    static navigationOptions = {
        headerStyle: {backgroundColor:'#8d6fb9'},
        headerTintColor:'white',
        headerBackTitle: null,
        title: 'Последние'
    };

    updateSearch = search => {
        this.setState({ search });
    };

    performer()
    {
        console.log('Twenty One Pilots')
    }

    edition(l)
    {
        this.isScrolled.setNativeProps({scrollEnabled: false});
        return(
            <Playlist
                iconAlbum={l.image_alb}
                nameAlbum={l.name_alb}
                namePerformer={l.name_per}
                style={l.style}
                year={l.date_alb.substring(0, 4)}
                listens={l.numplays_alb}
                likes={l.rating_alb}
                hide={this.hideAlbum}
                tracks={this.props.edition}
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
        this.props.onGetEdition(id)
        this.setState({
            indexTable: i,
            showTable: true
        });
    }

    hideAlbum()
    {
        this.isScrolled.setNativeProps({scrollEnabled: true});
        this.props.onClearEdition()
        this.setState({
            indexTable: -1
        });
    }

    componentDidMount()
    {
        this.props.onGetNews('new')
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
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
                        ref={component => this.isScrolled = component}
                    >
                    {Platform.OS === 'android' &&
                    <SearchBar
                        platform="android"
                        placeholder="Поиск групп, музыки, подкастов..."
                        onChangeText={this.updateSearch}
                        inputContainerStyle={{backgroundColor: '#fff'}}
                        value={this.state.search}
                        lightTheme={true}
                        round={true}
                        onCancel={this.kekis}
                    />}
                    {Platform.OS === 'ios' &&
                    <SearchBar
                        platform="ios"
                        placeholder="Поиск групп, музыки, подкастов..."
                        onChangeText={this.updateSearch}
                        inputContainerStyle={{backgroundColor: '#fff'}}
                        value={this.state.search}
                        lightTheme={true}
                        round={true}
                        cancelButtonProps={{color: '#8d6fb9'}}
                        onCancel={this.kekis}
                    />}
                    {
                        this.props.news.map((l, i) => (
                            <Post performer={l.name_per}
                                  datetime={l.date_alb}
                                  iconPerformer={l.image_per}
                                  description={l.about_alb}
                                  genre={l.genre}
                                  style={l.style}
                                  years={l.date_alb.substring(0, 4)}
                                  iconAlbum={l.image_alb}
                                  title={l.name_alb}
                                  showPerformer={this.performer}
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
        onClearEdition: () => {
            dispatch(clearEdition());
        }
    })
)(News)