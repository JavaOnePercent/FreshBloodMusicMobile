import React, { Component } from 'react';
import {View, Text, StyleSheet, ActivityIndicator, AsyncStorage, TextInput} from 'react-native';
import {Button} from 'react-native-elements';
import { Provider, connect } from 'react-redux';
import store from "../../../redux/store";

class Authorization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
        }
    }

    componentDidMount()
    {

    }

    static navigationOptions = {
        headerStyle: {backgroundColor:'#8d6fb9'},
        headerTintColor:'white',
        headerBackTitle: null,
        title: 'Авторизация'
    };

    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <TextInput style={styles.numberInput} onChangeText={(login) => this.setState({login})}
                               value={this.state.login} placeholder={'Логин'}/>
                    <TextInput style={styles.numberInput} onChangeText={(password) => this.setState({password})}
                               value={this.state.password} placeholder={'Пароль'} secureTextEntry={true}/>
                    <Text style={styles.title}>Введите логин и пароль</Text>
                    <Text style={styles.title}>Если у вас не аккаунта, зарегистрируйтесь на</Text>
                    <Text>www.boysband.ru</Text>
                    <Button
                    title={'Войти'}
                    buttonStyle={styles.buttonConfirm}
                    onPress={() => this.props.navigation.navigate('Favorites')}
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
    }
});

export default connect()(Authorization)