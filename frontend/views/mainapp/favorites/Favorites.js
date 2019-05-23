import React, { Component } from 'react';
import {View, Text, StyleSheet, ActivityIndicator, AsyncStorage} from 'react-native';
import { Provider, connect } from 'react-redux';
import store from "../../../redux/store";

import EntryButton from "../../../components/EntryButton";
import {ADDRESS_SERVER} from "../../../components/constants/constants";
import { logout } from "../../../redux/actions/auth";
import { createCurrentProfile, getPerformer, getAlbumsPerformer } from "../../../redux/actions/performer";

class Favorites extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        headerStyle: {backgroundColor:'#8d6fb9'},
        headerTintColor: 'white',
        headerBackTitle: null,
        title: 'Моя музыка'
    };

    componentDidMount()
    {

    }

    profilePage()
    {
        this.props.onGetPerformer(this.props.auth.id);
        this.props.onGetAlbumsPerformer(this.props.auth.id);
        this.props.onCreateCurrentProfile(this.props.auth.id);
        this.props.navigation.navigate('Profile')
    }

    logout()
    {
        this.props.onLogout()
    }

    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    {
                        this.props.auth.name === '' &&
                        <EntryButton
                            action={() => this.props.navigation.navigate('Authorization')}
                        />
                    }
                    {
                        this.props.auth.name !== '' &&
                        <EntryButton iconUser={ADDRESS_SERVER + '/media/performers/' + this.props.auth.id + '/logo.jpg'}
                                     nameUser={this.props.auth.name}
                                     action={() => this.profilePage()}
                                     longAction={() => this.logout()}
                        />
                    }
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

export default connect(
    state => ({auth: state.auth}),
    dispatch => ({
        onLogout: () => {
            dispatch(logout());
        },
        onCreateCurrentProfile: (id) => {
            dispatch(createCurrentProfile(id));
        },
        onGetPerformer: (id) => {
            dispatch(getPerformer(id));
        },
        onGetAlbumsPerformer: (id) => {
            dispatch(getAlbumsPerformer(id));
        }
    })
)(Favorites)