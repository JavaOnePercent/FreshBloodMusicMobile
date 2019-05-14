import React, { Component } from 'react';
import {View, Text, StyleSheet, ActivityIndicator, AsyncStorage, RefreshControl, ScrollView} from 'react-native';
import { Provider, connect } from 'react-redux';
import store from "../../../redux/store";
import Edition from "../../../components/Edition";
import {ADDRESS_SERVER} from "../../../components/constants/constants";

class Podcasts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editionArray: [
                {
                    title: 'Trench',
                    iconAlbum: ADDRESS_SERVER + '/media/albums/2/logo.jpg',
                    performer: 'Twenty One Pilots',
                    action: () => alert('Trench')
                },
                {
                    title: 'Хочу летать',
                    iconAlbum: ADDRESS_SERVER + '/media/albums/2/logo.jpg',
                    performer: 'Альянс',
                    action: () => alert('Хочу летать')
                },
                {
                    title: 'Evolve',
                    iconAlbum: ADDRESS_SERVER + '/media/albums/2/logo.jpg',
                    performer: 'Imagine Dragons',
                    action: () => alert('Evolve')
                },
                {
                    title: 'Blurryface',
                    iconAlbum: ADDRESS_SERVER + '/media/albums/2/logo.jpg',
                    performer: 'Twenty One Pilots',
                    action: () => alert('Blurryface')
                },
                {
                    title: 'Original',
                    iconAlbum: ADDRESS_SERVER + '/media/albums/2/logo.jpg',
                    performer: 'Imagine Dragons',
                    action: () => alert('Original')
                }
            ],
            refreshing: false
        }
    }

    static navigationOptions = {
        headerStyle: {backgroundColor:'#8d6fb9'},
        headerTintColor:'white',
        headerBackTitle: null,
        title: 'Чарты'
    };

    _refresh = async() => {
    }

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
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                >
                    <View style={styles.container}>
                        <Edition titleList={'Новые подкасты'} editionArray={this.state.editionArray} />
                        <Edition titleList={'Популярные подкасты'} editionArray={this.state.editionArray} />
                    </View>
                </ScrollView>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 15
    },
});

export default connect()(Podcasts)