import {Dimensions, StyleSheet, Text, ToastAndroid, TouchableHighlight, View} from "react-native";
import {Icon, Image} from "react-native-elements";
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { removeTrackQueue, removeTrackPlaylist } from "../redux/actions/player";
import {connect} from "react-redux";

class Queue extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        data: PropTypes.object.isRequired
    }

    deleteTrack(id)
    {
        this.props.onRemoveTrackQueue(id)
        this.props.onRemoveTrackPlaylist(id)
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
                        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.titleTrack}>{data.title}</Text>
                        <Text style={styles.titlePerformer}>{data.performer}</Text>
                    </View>
                </View>
                <View style={styles.rowStyle}>
                    <TouchableHighlight style={styles.button} onPress={() => this.deleteTrack(data.id)} underlayColor="#fff">
                        <Icon name="md-remove-circle"
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
        marginTop: 15
    },
});

export default connect(
    state => ({isPlay: state.player}),
    dispatch => ({
        onRemoveTrackQueue: (id) => {
            dispatch(removeTrackQueue(id));
        },
        onRemoveTrackPlaylist: (id) => {
            dispatch(removeTrackPlaylist(id));
        }
    })
)(Queue)