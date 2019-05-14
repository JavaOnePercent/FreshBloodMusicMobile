import React, { Component } from 'react';
import {View, Text, StyleSheet, ActivityIndicator, AsyncStorage} from 'react-native';
import { Provider, connect } from 'react-redux';
import store from "../../../redux/store";

class MyPlaylists extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount()
    {

    }

    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <Text>MyPlaylists</Text>
                </View>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default connect()(MyPlaylists)