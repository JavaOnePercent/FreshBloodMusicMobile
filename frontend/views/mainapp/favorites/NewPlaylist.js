import React, { Component } from 'react';
import {View, Text, StyleSheet, ActivityIndicator, AsyncStorage, TextInput, TouchableHighlight} from 'react-native';
import { Provider, connect } from 'react-redux';
import store from "../../../redux/store";
import {Button, Icon, Image} from "react-native-elements";
import ImagePicker from 'react-native-image-picker';
import {getUserPlaylists, createUserPlaylist} from "../../../redux/actions/user";

class NewPlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            photo: null
        }
    }


    static navigationOptions = {
        headerStyle: {backgroundColor:'#8d6fb9'},
        headerTintColor:'white',
        title: 'Новый плейлист'
    };

    componentDidMount()
    {

    }

    selectImage()
    {
        const options = {
            // noData: true
        }
        ImagePicker.launchImageLibrary(options, (response) => {
            if(response.uri)
            {
                this.setState({photo: response});
            }
        });

    }
    createPlaylist()
    {
        if(this.state.title !== '' && this.state.title !== undefined)
        {
            this.props.onCreateUserPlaylist(this.state.title, this.state.photo.data)
            this.props.onGetUserPlaylists(this.props.auth.id)
            this.props.navigation.navigate('MyPlaylists');
        }
    }

    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <View style={styles.playlistContainer}>
                        <View style={styles.rowStyle}>
                            <View style={styles.column}>
                                    {
                                        this.state.photo === null &&
                                        <TouchableHighlight onPress={() => this.selectImage()} underlayColor="#f6f6f6">
                                            <Image
                                                source={require('../../../icons/addPhoto.png')}
                                                style={{width: 100, height: 100, borderRadius: 5}}
                                            />
                                        </TouchableHighlight>
                                    }
                                    {
                                        this.state.photo !== null &&
                                        <TouchableHighlight onPress={() => this.selectImage()} underlayColor="#f6f6f6">
                                            <Image
                                                source={{uri: this.state.photo.uri}}
                                                style={{width: 100, height: 100, borderRadius: 5}}
                                            />
                                        </TouchableHighlight>
                                    }
                            </View>
                        </View>
                        <View style={styles.rowStyle}>
                            <View style={styles.columnStyle}>
                                <TextInput style={styles.numberInput} onChangeText={(title) => this.setState({title})}
                                           value={this.state.title} placeholder={'Название'}/>
                                <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>Введите название и выберите картинку для плейлиста</Text>
                            </View>
                        </View>
                    </View>
                    <Button
                        title={'Cоздать плейлист'}
                        buttonStyle={styles.buttonConfirm}
                        onPress={() => this.createPlaylist()}
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
        marginTop: 20,
        alignItems: 'center',
    },
    numberInput: {
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#8d6fb9',
        color: 'grey',
        backgroundColor : '#FFF',
        padding : 2,
        fontSize: 24,
        width: 200,
        textAlign: 'center',
        marginTop: 15,
        marginLeft: 10,
        height: 50,
    },
    buttonConfirm: {
        width: 175,
        borderRadius: 30,
        marginTop: 20,
        backgroundColor: '#8d6fb9'
    },
    title: {
        marginTop: 15,
        marginLeft: 10,
        width: 200
    },
    titleError: {
        marginTop: 15,
        color: 'red'
    },
    playlistContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    rowStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    columnStyle: {
        flexDirection: 'column',
        paddingTop: 5,
        paddingLeft: 5
    },
    column: {
        flexDirection: 'column',
        marginTop: 20,
        marginLeft: 5
    }
});

export default connect(
    state => ({auth: state.auth}),
    dispatch => ({
        onGetUserPlaylists: (id) => {
            dispatch(getUserPlaylists(id));
        },
        onCreateUserPlaylist: (title, image) => {
            dispatch(createUserPlaylist(title, image));
        }
    })
)(NewPlaylist)