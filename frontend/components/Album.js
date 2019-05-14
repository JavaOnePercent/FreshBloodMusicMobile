import React, { Component } from 'react';
import {View, Text, StyleSheet, Button, TouchableHighlight} from 'react-native';
import { Icon, Image } from 'react-native-elements';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
// import store from "../../../redux/store";

class Album extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        performer: PropTypes.string.isRequired,
        showTracks: PropTypes.func.isRequired,
        iconAlbum: PropTypes.string.isRequired
    }


    componentDidMount()
    {

    }

    render() {
        const { title, performer, showTracks, iconAlbum, width, height } = this.props;
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={showTracks} underlayColor="#fff">
                    <Image
                        source={ {uri: iconAlbum} }
                        style={{ width: width, height: height, borderRadius: 5 }}
                    />
                </TouchableHighlight>
                <Text style={styles.titleAlbum}>{title}</Text>
                <Text style={styles.titlePerformer}>{performer}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    titleAlbum: {
        fontSize: 17,
        marginTop: 5
    },
    titlePerformer: {
        fontSize: 17,
        color: 'grey'
    },
});

export default Album;
// export default connect()(Album)