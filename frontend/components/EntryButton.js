import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {Image, ListItem} from 'react-native-elements';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
// import store from "../../../redux/store";

class EntryButton extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        nameUser: PropTypes.string.isRequired,
        iconUser: PropTypes.string.isRequired,
        action: PropTypes.func.isRequired,
    }

    componentDidMount()
    {

    }

    render() {

        const { nameUser, iconUser, action } = this.props;

        return (


            <View style={styles.container}>
                <TouchableHighlight onPress={action} underlayColor="#fff">
                    <View style={styles.performerContainer}>
                        <View style={styles.rowStyle}>
                            <Image
                                source={{uri: iconUser}}
                                style={{ width: 50, height: 50, borderRadius: 50/2 }}
                            />
                        </View>
                        <View style={styles.rowStyle}>
                            <View style={styles.columnStyle}>
                                <Text style={styles.title}>{nameUser === undefined && 'Вход'}{nameUser && nameUser}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginBottom: 10,
        paddingBottom: 25,
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        color: 'gray'
    },
    performerContainer: {
        paddingLeft: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    rowStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    columnStyle: {
        flexDirection: 'column',
        padding: 10,
    }
});

export default EntryButton;
// export default connect()(EntryButton)