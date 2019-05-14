import React, { Component } from 'react';
import {View, Text, StyleSheet, ActivityIndicator, AsyncStorage} from 'react-native';
import { Provider, connect } from 'react-redux';
import store from "../../redux/store";

class Loading extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount()
    {
        this.interval = setInterval(() => {
            this.loadApp();
        }, 2000);

    }

    componentWillUnmount()
    {
        this.stop();
    }

    stop() {
        clearInterval(this.interval)
    }

    async loadApp()
    {
        this.props.navigation.navigate('MainApp')
    }

    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <Text>Loading</Text>
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

export default connect()(Loading)