import React from 'react';
import {Dimensions, StyleSheet, Text, ToastAndroid, View, ScrollView} from 'react-native';
import {Navigations} from "../../components/navigations/Navigations";
import store from "../../redux/store";
import {connect, Provider} from "react-redux";

import MiniPlayer from "../../components/player/MiniPlayer";
import FullPlayer from "../../components/player/FullPlayer";

import Sound from 'react-native-sound';
import {pressPlayButton, pressPauseButton} from "../../redux/actions/player";
import PropTypes from "prop-types";
import {ADDRESS_SERVER} from "../../components/constants/constants";

class AppMusic extends React.Component {

    constructor(props) {
        super(props);

        Sound.setCategory('Playback', true);

        this.state = {
            isOpenPlayer: false
        }
        this.open = this.open.bind(this)
        this.play = this.play.bind(this)
        this.pause = this.pause.bind(this)
        this.close = this.close.bind(this)
    }

    componentDidMount()
    {

    }

    open()
    {
        this.setState({isOpenPlayer: true});
    }

    close()
    {
        this.setState({isOpenPlayer: false});
    }

    play()
    {
        this.props.onPressPlayButton()
        if(this.sound === undefined)
        {

            this.sound = new Sound(ADDRESS_SERVER + '/media/albums/2/1.mp3', Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    ToastAndroid.show('Error', ToastAndroid.SHORT);
                } else {
                    this.sound.play((success) => {
                        if (success)
                        {
                            ToastAndroid.show('Success', ToastAndroid.SHORT);
                        }
                        else
                        {
                            ToastAndroid.show('Error', ToastAndroid.SHORT);
                        }
                    });
                }
            });
        }
        else
        {
            this.sound.play((success) => {
                if (success) {
                    ToastAndroid.show('Success', ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show('Error', ToastAndroid.SHORT);
                }
            });
        }

    }

    pause()
    {
        this.props.onPressPauseButton()
        this.sound.pause();
    }

    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <Navigations />
                    <View style={styles.smallPlayer}>
                        <MiniPlayer
                            iconAlbum={ADDRESS_SERVER + '/media/albums/2/logo.jpg'}
                            namePerformer={'Twenty One Pilots'}
                            nameTrack={'Stressed Out'}
                            playTrack={this.play}
                            pauseTrack={this.pause}
                            openPlayer={this.open}
                            isPlay={this.props.isPlay}/>
                    </View>
                    {this.state.isOpenPlayer === true &&
                        <View style={styles.fullPlayer}>
                            {/*<ScrollView showsVerticalScrollIndicator={false} horizontal={false}>*/}
                                <FullPlayer
                                iconAlbum={ADDRESS_SERVER + '/media/albums/2/logo.jpg'}
                                namePerformer={'Twenty One Pilots'}
                                nameTrack={'Stressed Out'}
                                playTrack={this.play}
                                pauseTrack={this.pause}
                                sound={this.sound}
                                closePlayer={this.close}
                                isPlay={this.props.isPlay}/>
                            {/*</ScrollView>*/}
                        </View>
                    }
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 0
    },
    smallPlayer: {
        marginTop: Dimensions.get('window').height - 139,
        zIndex: 1,
        position: 'absolute'
    },
    fullPlayer: {
        zIndex: 2,
        position: 'absolute'
    }
});

export default connect(
    state => ({isPlay: state.player}),
    dispatch => ({
        onPressPlayButton: () => {
            dispatch(pressPlayButton());
        },
        onPressPauseButton: () => {
            dispatch(pressPauseButton());
        }
    })
)(AppMusic)