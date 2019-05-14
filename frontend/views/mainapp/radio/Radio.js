import React, { Component } from 'react';
import {View, Text, StyleSheet, ActivityIndicator, AsyncStorage, RefreshControl, ScrollView} from 'react-native';
import { Provider, connect } from 'react-redux';
import store from "../../../redux/store";
import Station from "../../../components/Station";
import {ADDRESS_SERVER} from "../../../components/constants/constants";

class Radio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editionArray: [
                {
                    title: 'Всё и сразу',
                    iconAlbum: ADDRESS_SERVER + '/media/albums/2/logo.jpg',
                    action: () => alert('Всё и сразу')
                },
                {
                    title: 'Рок',
                    iconAlbum: ADDRESS_SERVER + '/media/albums/2/logo.jpg',
                    action: () => alert('Рок')
                },
                {
                    title: 'Hip-Hop',
                    iconAlbum: ADDRESS_SERVER + '/media/albums/2/logo.jpg',
                    action: () => alert('Hip-Hop')
                },
                {
                    title: 'Альтернатива',
                    iconAlbum: ADDRESS_SERVER + '/media/albums/2/logo.jpg',
                    action: () => alert('Альтернатива')
                },
                {
                    title: 'Синти-поп',
                    iconAlbum: ADDRESS_SERVER + '/media/albums/2/logo.jpg',
                    action: () => alert('Синти-поп')
                },
                {
                    title: 'Металл',
                    iconAlbum: ADDRESS_SERVER + '/media/albums/2/logo.jpg',
                    action: () => alert('Металл')
                }
            ]
        }
    }

    static navigationOptions = {
        headerStyle: {backgroundColor:'#8d6fb9'},
        headerTintColor:'white',
        headerBackTitle: null,
        title: 'Чарты'
    };

    componentDidMount()
    {

    }

    render() {
        return (
            <Provider store={store}>
                    <View style={styles.container}>
                        <Station titleList={'Радиостанции'} editionArray={this.state.editionArray} />
                    </View>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

export default connect()(Radio)