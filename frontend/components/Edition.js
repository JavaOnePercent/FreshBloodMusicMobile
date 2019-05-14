import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableHighlight, RefreshControl, ScrollView} from 'react-native';
import {Image, ListItem} from 'react-native-elements';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
// import store from "../../../redux/store";

import Album from "./Album";

class Edition extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        titleList: PropTypes.string.isRequired,
        editionArray: PropTypes.array.isRequired,
    }

    componentDidMount()
    {

    }

    render() {

        const { titleList, editionArray } = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>{titleList}</Text>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {editionArray.map((l, i) => (
                        <View style={styles.albumContainer}>
                            <Album title={l.title} iconAlbum={l.iconAlbum} performer={l.performer} showTracks={l.action} width={150} height={150}/>
                        </View>
                    ))
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginBottom: 10
    },
    title: {
        paddingLeft: 15,
        fontSize: 24,
        color: 'grey'
    },
    albumContainer: {
        flexWrap: 'wrap',
        alignItems: 'center',
        margin: 10
    }
});

export default Edition;
// export default connect()(Edition)