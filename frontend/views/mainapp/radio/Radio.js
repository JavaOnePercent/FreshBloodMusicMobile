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
import {getWithoutGenreNextTrack, getNextTrack, setCurrentRadio} from "../../../redux/actions/radio";
import {createRadioMusic, createQueue, releasePlayer} from "../../../redux/actions/player";

class Radio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editionArray: [
                {
                    title: 'Всё и сразу',
                    iconAlbum: ADDRESS_SERVER + "/media/albums/0/0.png",
                    action: () => this.playRadio()
                },
                {
                    title: 'Поп',
                    iconAlbum: ADDRESS_SERVER + "/media/albums/0/1.png",
                    action: () => this.playRadio(1)
                },
                {
                    title: 'Рок',
                    iconAlbum: ADDRESS_SERVER + "/media/albums/0/2.png",
                    action: () => this.playRadio(2)
                },
                {
                    title: 'Метал',
                    iconAlbum: ADDRESS_SERVER + "/media/albums/0/3.png",
                    action: () => this.playRadio(3)
                },
                {
                    title: 'Альтернатива',
                    iconAlbum: ADDRESS_SERVER + "/media/albums/0/4.png",
                    action: () => this.playRadio(4)
                },
                {
                    title: 'Электроника',
                    iconAlbum: ADDRESS_SERVER + "/media/albums/0/5.png",
                    action: () => this.playRadio(5)
                },
                {
                    title: 'Хип-хоп',
                    iconAlbum: ADDRESS_SERVER + "/media/albums/0/6.png",
                    action: () => this.playRadio(6)
                },
                {
                    title: 'R&B',
                    iconAlbum: ADDRESS_SERVER + "/media/albums/0/7.png",
                    action: () => this.playRadio(7)
                },
                {
                    title: 'Dance',
                    iconAlbum: ADDRESS_SERVER + "/media/albums/0/8.png",
                    action: () => this.playRadio(8)
                },
                {
                    title: 'Регги',
                    iconAlbum: ADDRESS_SERVER + "/media/albums/0/9.png",
                    action: () => this.playRadio(9)
                },
                {
                    title: 'Джаз',
                    iconAlbum: ADDRESS_SERVER + "/media/albums/0/10.png",
                    action: () => this.playRadio(10)
                },
                {
                    title: 'Блюз',
                    iconAlbum: ADDRESS_SERVER + "/media/albums/0/11.png",
                    action: () => this.playRadio(11)
                },
                {
                    title: 'Инди',
                    iconAlbum: ADDRESS_SERVER + "/media/albums/0/12.png",
                    action: () => this.playRadio(12)
                },
                {
                    title: 'Панк',
                    iconAlbum: ADDRESS_SERVER + "/media/albums/0/13.png",
                    action: () => this.playRadio(13)
                },
                {
                    title: 'Ска',
                    iconAlbum: ADDRESS_SERVER + "/media/albums/0/14.png",
                    action: () => this.playRadio(14)
                },
                {
                    title: 'Кантри',
                    iconAlbum: ADDRESS_SERVER + "/media/albums/0/15.png",
                    action: () => this.playRadio(15)
                },
                {
                    title: 'Классика',
                    iconAlbum: ADDRESS_SERVER + "/media/albums/0/16.png",
                    action: () => this.playRadio(16)
                },
                {
                    title: 'Шансон',
                    iconAlbum: ADDRESS_SERVER + "/media/albums/0/17.png",
                    action: () => this.playRadio(17)
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

    playRadio(id)
    {
        if(id === undefined)
        {
            this.props.onCreateRadioMusic();
            this.props.onCreateQueue([this.props.radioNext[0]]);
            this.props.onGetWithoutGenreNextTrack();
            this.props.onSetCurrentRadio(0);
            this.props.onPressReleasePlayButton(this.props.radioNext[0].audio);
        }
        else
        {
            this.props.onCreateRadioMusic();
            this.props.onCreateQueue([this.props.radioNext[id]]);
            this.props.onSetCurrentRadio(id);
            this.props.onGetNextTrack(id);
            this.props.onPressReleasePlayButton(this.props.radioNext[id].audio);
        }
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
        onGetNextTrack: (id) => {
            dispatch(getNextTrack(id));
        },
        onGetWithoutGenreNextTrack: () => {
            dispatch(getWithoutGenreNextTrack());
        },
        onSetCurrentRadio: (id) => {
            dispatch(setCurrentRadio(id));
        },
        onCreateRadioMusic: () => {
            dispatch(createRadioMusic());
        },
    })
)(Radio)