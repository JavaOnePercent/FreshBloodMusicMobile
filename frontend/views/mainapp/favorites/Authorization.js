import React, { Component } from 'react';
import {View, Text, StyleSheet, ActivityIndicator, AsyncStorage, TextInput} from 'react-native';
import {Button} from 'react-native-elements';
import { Provider, connect } from 'react-redux';
import store from "../../../redux/store";
import { login } from "../../../redux/actions/auth";

class Authorization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        }
    }

    componentDidMount()
    {

    }

    componentDidUpdate(prevState)
    {
        if(prevState.auth !== this.props.auth)
        {
            this.success()
        }
    }


    static navigationOptions = {
        headerStyle: {backgroundColor:'#8d6fb9'},
        headerTintColor:'white',
        headerBackTitle: null,
        title: 'Авторизация'
    };

    entry()
    {
        this.props.onLogin(this.state.login, this.state.password)
    }

    success() {
        if (this.props.auth.id !== 0)
        {
            this.props.navigation.navigate('Favorites')
        }
    }

    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <TextInput style={styles.numberInput} onChangeText={(login) => this.setState({login})}
                               value={this.state.login} placeholder={'Логин'}/>
                    <TextInput style={styles.numberInput} onChangeText={(password) => this.setState({password})}
                               value={this.state.password} placeholder={'Пароль'} secureTextEntry={true}/>
                    {
                        this.props.auth.id === -1 &&
                        <Text style={styles.title}>Введите логин и пароль</Text>
                    }
                    {
                        this.props.auth.id === 0 &&
                        <Text style={styles.titleError}>Неправильный логин или пароль</Text>
                    }
                    <Text style={styles.title}>Если у вас не аккаунта, зарегистрируйтесь на</Text>
                    <Text>www.boysband.ru</Text>
                    <Button
                    title={'Войти'}
                    buttonStyle={styles.buttonConfirm}
                    onPress={() => this.entry()}
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
        width: 250,
        textAlign: 'center',
        margin: 10,
        height: 50,
    },
    buttonConfirm: {
        width: 175,
        borderRadius: 30,
        marginTop: 15,
        backgroundColor: '#8d6fb9'
    },
    title: {
        marginTop: 15,
    },
    titleError: {
        marginTop: 15,
        color: 'red'
    }
});

export default connect(
    state => ({auth: state.auth}),
    dispatch => ({
        onLogin: (username, password) => {
            dispatch(login(username, password));
        }
    })
)(Authorization)