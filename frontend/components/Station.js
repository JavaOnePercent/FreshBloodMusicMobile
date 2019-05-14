import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableHighlight, RefreshControl, ScrollView} from 'react-native';
import {Image, ListItem} from 'react-native-elements';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
// import store from "../../../redux/store";

import Album from "./Album";

class Station extends Component {
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
                <ScrollView>
                    <Text style={styles.title}>{titleList}</Text>
                    {editionArray.map((l, i) => (
                        <View style={styles.albumContainer}>
                            <View style={styles.performerContainer}>
                                <View style={styles.rowStyle}>
                                    <View style={styles.columnStyle}>
                                        <Album title={l.title} iconAlbum={l.iconAlbum} performer={l.performer} showTracks={l.action} width={150} height={150}/>
                                    </View>
                                </View>
                                <View style={styles.rowStyle}>
                                    <View style={styles.columnStyle}>
                                        <Album title={l.title} iconAlbum={l.iconAlbum} performer={l.performer} showTracks={l.action} width={150} height={150}/>
                                    </View>
                                </View>
                            </View>
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
    },
    title: {
        paddingTop: 15,
        paddingLeft: 15,
        fontSize: 24,
        color: 'grey'
    },
    albumContainer: {
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    performerContainer: {
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

export default Station;
// export default connect()(Station)