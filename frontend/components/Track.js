import {Dimensions, StyleSheet, Text, ToastAndroid, TouchableHighlight, View} from "react-native";
import {Icon, Image} from "react-native-elements";
import React, { Component } from 'react';
import PropTypes from "prop-types";

class Track extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        data: PropTypes.object.isRequired
    }

    render() {
        const {data} = this.props;

        return (
            <View style={styles.listItem}>
                <View style={styles.rowStyle}>
                    <View style={styles.iconAlbum}>
                        <Image
                            source={{uri: data.cover}}
                            style={{width: 50, height: 50, borderRadius: 3}}
                        />
                    </View>
                </View>
                <View style={styles.rowStyle}>
                    <View style={{
                        flexDirection: 'column',
                        width: Dimensions.get('window').width - 150,
                        marginLeft: 10,
                        marginTop: 12
                    }}>
                        <Text style={styles.titleTrack}>{data.title}</Text>
                        <Text style={styles.titlePerformer}>{data.performer}</Text>
                    </View>
                </View>
                <View style={styles.rowStyle}>
                    <TouchableHighlight style={styles.button} onPress={() => {
                        ToastAndroid.show('Success', ToastAndroid.SHORT)
                    }} underlayColor="#fff">
                        <Icon name="md-more"
                              type="ionicon"
                              size={28}
                              color={'#000'}
                        />
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listItem: {
        paddingLeft: 20,
        height: 65,
        width: Dimensions.get('window').width - 20,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    rowStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    iconAlbum: {
        marginTop: 7.5
    },
    titleTrack: {
        fontSize: 16,
        color: '#000'
    },
    titlePerformer: {
        fontSize: 13,
        color: 'grey'
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default Track;