import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableHighlight, RefreshControl, ScrollView, Dimensions} from 'react-native';
import {Image, ListItem} from 'react-native-elements/src/index';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import Icon from "react-native-vector-icons/Ionicons";
import { PlayerAction } from "../../redux/actions/player";
// import store from "../../../redux/store";

class MiniPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.play = this.play.bind(this)
        this.pause = this.pause.bind(this)
    }

    static propTypes = {
        iconAlbum: PropTypes.string.isRequired,
        namePerformer: PropTypes.string.isRequired,
        nameTrack: PropTypes.string.isRequired,
        playTrack: PropTypes.func.isRequired,
        pauseTrack: PropTypes.func.isRequired,
        openPlayer: PropTypes.func.isRequired,
        isPlay: PropTypes.bool.isRequired,
    }

    componentDidMount()
    {

    }

    play()
    {
        this.props.playTrack()
    }

    pause()
    {
        this.props.pauseTrack()
    }

    render() {

        const { iconAlbum, namePerformer, nameTrack, openPlayer } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.background}>
                </View>
                <TouchableHighlight onPress={openPlayer} underlayColor="#fff">
                    <View style={styles.playerContainer}>
                        <View style={styles.rowStyle}>
                            <View style={styles.iconAlbum}>
                                <Image
                                    source={{uri: iconAlbum}}
                                    style={{width: 50, height: 50, borderRadius: 3}}
                                />
                            </View>
                        </View>
                        <View style={styles.rowStyle}>
                            <View style={styles.nameTrack}>
                                <Text style={styles.title}>{nameTrack}</Text>
                            </View>
                        </View>
                        <View style={styles.rowStyle}>
                            <View style={styles.play}>
                                {this.props.isPlay === false &&
                                    <TouchableHighlight style={styles.button} onPress={this.play} underlayColor="#fff">
                                        <Icon name="ios-play"
                                              size={30}
                                              color={'#000'}
                                        />
                                    </TouchableHighlight>
                                }
                                {this.props.isPlay === true &&
                                    <TouchableHighlight style={styles.button} onPress={this.pause} underlayColor="#fff">
                                        <Icon name="ios-pause"
                                              size={30}
                                              color={'#000'}
                                        />
                                    </TouchableHighlight>
                                }
                            </View>
                        </View>
                        <View style={styles.rowStyle}>
                            <View style={styles.next}>
                                <TouchableHighlight style={styles.button} onPress={this.play} underlayColor="#fff">
                                    <Icon name="ios-fastforward"
                                          size={30}
                                          color={'#000'}
                                    />
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
    },
    container:{
        // transform: [
        //     {translateX: 0},
        //     {translateY: Dimensions.get('window').height - 139}],
        flex: 1

    },
    background: {
        backgroundColor: '#f6f6f6',
        opacity: 0.95,
        height: 65,
        width: Dimensions.get('window').width,
        position: 'absolute'
    },
    playerContainer: {
        paddingLeft: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        position: 'relative'
    },
    rowStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    iconAlbum: {
        marginTop: 7.5
    },
    nameTrack: {
        flexDirection: 'column',
        marginLeft: 20,
        marginTop: 22.5,
        width: Dimensions.get('window').width - 210
    },
    play: {
        flexDirection: 'column',
        marginTop: 7.5
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        // backgroundColor: '#a21',
        alignItems: 'center',
        justifyContent: 'center'
    },
    next: {
        flexDirection: 'column',
        marginTop: 7.5,
        marginRight: 10,
        marginLeft: 5
    }
});

export default MiniPlayer;
//
// export default connect(
//     state => ({codeMessage: state.codeMessage, accountData: state.accountData}),
//     dispatch => ({
//         onSendMessage: (number) => {
//             dispatch(sendMessage(number));
//         },
//         onСlearData: () => {
//             dispatch(clearData());
//         }
//     })
// )(NumberInput)


// const mapStateToProps = (state) => ({
//     isPlay: state.player
// })
// export default connect((mapStateToProps), {
//     onPressPlayButton: PlayerAction.pressPlayButton,
//     onPressPauseButton: PlayerAction.pressPauseButton
// })(MiniPlayer)
//
// export default connect()(MiniPlayer)