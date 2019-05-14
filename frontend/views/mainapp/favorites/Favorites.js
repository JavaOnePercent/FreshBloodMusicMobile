import React, { Component } from 'react';
import {View, Text, StyleSheet, ActivityIndicator, AsyncStorage} from 'react-native';
import { Provider, connect } from 'react-redux';
import store from "../../../redux/store";

import EntryButton from "../../../components/EntryButton";
import {ADDRESS_SERVER} from "../../../components/constants/constants";

class Favorites extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        headerStyle: {backgroundColor:'#8d6fb9'},
        headerTintColor:'white',
        headerBackTitle: null,
        title: 'Избранное'
    };

    componentDidMount()
    {

    }

    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <EntryButton iconUser={ADDRESS_SERVER + '/media/performers/1/logo.jpg'}
                                 action={() => this.props.navigation.navigate('Authorization')}
                    />
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
});

export default connect()(Favorites)