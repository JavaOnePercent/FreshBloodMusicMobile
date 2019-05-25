import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    AsyncStorage,
    RefreshControl,
    ScrollView,
    Dimensions,
    ToastAndroid
} from 'react-native';
import { Provider, connect } from 'react-redux';
import store from "../../../redux/store";
import {ADDRESS_SERVER} from "../../../components/constants/constants";
import Album from "../../../components/Album";
import {getNextTrack} from "../../../redux/actions/radio";
import {createQueue, releasePlayer} from "../../../redux/actions/player";

class Radio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editionArray: [
                {
                    title: 'Всё и сразу',
                    iconAlbum: ADDRESS_SERVER + "/media/albums/0/radio.png",
                    action: () => this.playRadio()
                }
            ],
            refreshing: false,
        }
    }

    static navigationOptions = {
        headerStyle: {backgroundColor:'#8d6fb9'},
        headerTintColor:'white',
        headerBackTitle: null,
        title: 'Радио'
    };

    componentDidMount()
    {

    }

    _refresh = async() => {

    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        this._refresh().then(() => {
            this.setState({refreshing: false});
        });
    }

    playRadio()
    {
        this.props.onPressReleasePlayButton(this.props.radioNext.audio);
        this.props.onCreateQueue([this.props.radioNext]);
        this.props.onGetNextTrack();
    }

    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
                    >
                        <Text style={styles.title}>Радиостанции</Text>
                        <View style={styles.albumContainer}>
                            <View style={styles.performerContainer}>
                                {this.state.editionArray.map((l, i) => (
                                    <View style={styles.rowStyle}>
                                        <View style={styles.columnStyle}>
                                            <Album title={l.title} performer={null} iconAlbum={l.iconAlbum} showTracks={l.action} width={150} height={150}/>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>
                        <View style={styles.bottom}>
                        </View>
                    </ScrollView>
                </View>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    title: {
        padding: 20,
        fontSize: 24,
        color: 'grey'
    },
    albumContainer: {
        flexWrap: 'wrap',
        marginLeft: Dimensions.get('window').width - 340
    },
    performerContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    rowStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    columnStyle: {
        flexDirection: 'column',
        marginHorizontal: 5
    },
    bottom: {
        height: 65,
        backgroundColor: '#fff'
    }
});

export default connect(
    state => ({radioNext: state.radioNext, edition: state.edition}),
    dispatch => ({
        onPressReleasePlayButton: (audio) => {
            dispatch(releasePlayer(audio));
        },
        onCreateQueue: (tracks) => {
            dispatch(createQueue(tracks));
        },
        onGetNextTrack: () => {
            dispatch(getNextTrack());
        }
    })
)(Radio)