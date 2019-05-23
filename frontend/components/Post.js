import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {Image, ListItem} from 'react-native-elements';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
// import store from "../../../redux/store";

import Album from "./Album";

class Post extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        performer: PropTypes.string.isRequired,
        datetime: PropTypes.string.isRequired,
        iconPerformer: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        style: PropTypes.string.isRequired,
        years: PropTypes.string.isRequired,
        iconAlbum: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        showPerformer: PropTypes.func.isRequired,
        showTracks: PropTypes.func.isRequired
    }

    componentDidMount()
    {

    }

    render() {

        const { performer, datetime, iconPerformer, description, genre, style, years, iconAlbum, title, showPerformer, showTracks } = this.props;

        return (


            <View style={styles.container}>
                <TouchableHighlight onPress={showPerformer} underlayColor="#fff">
                    <View style={styles.performerContainer}>
                        <View style={styles.rowStyle}>
                            <Image
                                source={ {uri: iconPerformer} }
                                style={{ width: 50, height: 50, borderRadius: 50/2 }}
                            />
                        </View>
                        <View style={styles.rowStyle}>
                            <View style={styles.columnStyle}>
                                <Text style={styles.title}>{performer}</Text>
                                <Text style={styles.time}>{datetime}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
                <Text style={styles.header}>{title}</Text>
                <Text style={styles.header}>{genre + ' / ' + style + ' (' + years + ')'}</Text>
                <Text style={styles.description}>{description}</Text>
                <View style={styles.albumContainer}>
                    <Album title={title} iconAlbum={iconAlbum} performer={performer} showTracks={showTracks} width={200} height={200}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginBottom: 10,
        paddingBottom: 25
    },
    title: {
        fontSize: 16,
        color: '#8d6fb9'
    },
    time: {
        fontSize: 15,
        color: 'grey'
    },
    header: {
        fontSize: 16,
        paddingLeft: 15,
        color: '#000'
    },
    description: {
        padding: 15,
        fontSize: 16,
        color: '#000'
    },
    performerContainer: {
        padding: 15,
        flexDirection: 'row',
        flexWrap: 'wrap'
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
    },
    albumContainer: {
        flexWrap: 'wrap',
        alignItems: 'center',
        height: 250
    }
});

export default Post;
// export default connect()(Post)