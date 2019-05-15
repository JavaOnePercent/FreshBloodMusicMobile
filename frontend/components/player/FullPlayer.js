import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableHighlight, RefreshControl, ScrollView, Dimensions, Button, Slider, Platform, ToastAndroid} from 'react-native';
import {Image, ListItem} from 'react-native-elements/src/index';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import SystemSetting from 'react-native-system-setting';
import SortableList from 'react-native-sortable-list';
import Swiper from "react-native-swiper";
import store from "../../redux/store";

import Track from '../Track';


class FullPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sliderTrack: false,
            sliderVolume: false,
            playSeconds: 0,
            duration: 0,
            volume: 0.0,
            showDuration: 0,
            buttonRepeat: 'disable',
            buttonRandom: false,
            isLike: false
        }

        this.play = this.play.bind(this)
        this.pause = this.pause.bind(this)
        this.onRandomButton = this.onRandomButton.bind(this)
        this.onRepeatButton = this.onRepeatButton.bind(this)
        this.onLike = this.onLike.bind(this)
    }

    static propTypes = {
        iconAlbum: PropTypes.string.isRequired,
        namePerformer: PropTypes.string.isRequired,
        nameTrack: PropTypes.string.isRequired,
        playTrack: PropTypes.func.isRequired,
        pauseTrack: PropTypes.func.isRequired,
        sound: PropTypes.object.isRequired,
        closePlayer: PropTypes.func.isRequired,
        isPlay: PropTypes.bool.isRequired,
        playlist: PropTypes.array.isRequired
    }

    componentDidMount()
    {
        SystemSetting.getVolume().then((volume)=>{
            this.setState({volume: volume })
        });

        this.timeout = setInterval(() => {
            if(this.props.sound && this.props.sound.isLoaded() && this.props.isPlay && !this.state.sliderTrack)
            {
                this.props.sound.getCurrentTime((seconds, isPlay) => {
                    this.setState({playSeconds: seconds, duration: this.props.sound.getDuration(), showDuration: this.state.duration - this.state.playSeconds });
                })
            }
        }, 500);

        // this.timeout2 = setInterval(() => {
        //     SystemSetting.getVolume().then((volume)=>{
        //         this._changeSliderNativeVol(this.sliderVol, volume)
        //         this.setState({volume: volume })
        //     });
        // }, 1000);
        this.volumeListener = SystemSetting.addVolumeListener((data) => {
            // let Double = Java.type("java.lang.Double");
            // let volume = new Double(value);
            const volume = this.isAndroid ? data['music'] : data.value
                this._changeSliderNativeVol(this.sliderVol, volume)
                this.setState({volume: volume })
        });
    }

    componentWillUnmount(){
        // if(this.props.sound){
        //     this.props.sound.release();
        //     this.props.sound = null;
        // }
        if(this.timeout){
            clearInterval(this.timeout);
        }
        // if(this.timeout2){
        //     clearInterval(this.timeout2);
        // }

        SystemSetting.removeVolumeListener(this.volumeListener)
    }

    _changeSliderNativeVol(slider, value) {
        slider.setNativeProps({
            value: value
        })
    }

    onSliderTrackStart = () => {
        this.setState({sliderTrack: true});
    }
    onSliderTrackEnd = () => {
        this.setState({sliderTrack: false});
    }
    onSliderTrackEditing = value => {
        if(this.props.sound){
            this.props.sound.setCurrentTime(value);
            this.setState({playSeconds: value, showDuration: this.state.duration - value});
        }
    }

    onSliderVolumeStart = () => {
        this.setState({sliderVolume: true});
    }
    onSliderVolumeEnd = () => {
        this.setState({sliderVolume: false});
    }
    onSliderVolumeEditing = value => {

        SystemSetting.setVolume(value, {
            type: 'music',
            playSound: false,
            showUI: false
        })

        this._changeSliderNativeVol(this.sliderVol, value)
        this.setState({volume: value })
    }

    play()
    {
        this.props.playTrack()
    }

    pause()
    {
        this.props.pauseTrack()
    }

    static getAudioTimeString(seconds)
    {
        const m = parseInt(seconds % (60 * 60) / 60);
        const s = parseInt(seconds % 60);

        return (m + ':' + (s < 10 ? '0' + s : s));
    }

    onRandomButton()
    {
        this.setState({buttonRandom: !this.state.buttonRandom});
    }

    onRepeatButton()
    {
        if(this.state.buttonRepeat === 'disable')
        {
            this.setState({buttonRepeat: 'enable'});
        }
        else if(this.state.buttonRepeat === 'enable')
        {
            this.setState({buttonRepeat: 'enable-one'});
        }
        else if(this.state.buttonRepeat === 'enable-one')
        {
            this.setState({buttonRepeat: 'disable'});
        }

    }

    onLike()
    {
        this.setState({isLike: !this.state.isLike});
    }

    _renderRow = ({data, active}) => {
        return <Track data={data} />
    }

    // _renderRow = ({data, active}) => {
    //     return (
    //         <View style={styles.listItem}>
    //             <View style={styles.rowStyle}>
    //                 <View style={styles.iconAlbum}>
    //                     <Image
    //                         source={{uri: data.image}}
    //                         style={{width: 50, height: 50, borderRadius: 3}}
    //                     />
    //                 </View>
    //             </View>
    //             <View style={styles.rowStyle}>
    //                 <View style={{flexDirection: 'column', width: Dimensions.get('window').width - 150, marginLeft: 10, marginTop: 5}}>
    //                     <Text style={styles.titleTrack}>{data.nameTrack}</Text>
    //                     <Text style={styles.titlePerformer}>{data.namePerformer}</Text>
    //                 </View>
    //             </View>
    //             <View style={styles.rowStyle}>
    //                 <TouchableHighlight style={styles.button} onPress={() => {ToastAndroid.show('Success', ToastAndroid.SHORT)}} underlayColor="#fff" >
    //                     <Icon name="md-more"
    //                           type="ionicon"
    //                           size={28}
    //                           color={'#000'}
    //                     />
    //                 </TouchableHighlight>
    //             </View>
    //         </View>
    //     )
    // }

    render() {

        const currentTimeString = FullPlayer.getAudioTimeString(this.state.playSeconds);
        const durationString = FullPlayer.getAudioTimeString(this.state.showDuration);

        const { iconAlbum, namePerformer, nameTrack, closePlayer, playlist } = this.props;
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <TouchableHighlight onPress={closePlayer} style={{alignItems: 'center', width: Dimensions.get('window').width, height: 50, backgroundColor: '#f6f6f6'}} underlayColor="#f6f6f6">
                        <Image
                            source={require('../../icons/arrow-down-grey.png')}
                            style={{marginTop: 15, width: 35, height: 10}}
                        />
                    </TouchableHighlight>
                    <Swiper style={styles.wrapper} horizontal={true} loop={false}
                            dot={<View style={{backgroundColor: '#8d8e93', width: 8, height: 8, borderRadius: 4, marginLeft: 4, marginRight: 4, marginBottom: 20}} />}
                            activeDot={<View style={{backgroundColor: '#8d6fb9', width: 8, height: 8, borderRadius: 4, marginLeft: 4, marginRight: 4, marginBottom: 20}} />}>
                        <View style={styles.slide1}>
                            <View style={styles.bigPlayer}>
                                <View style={styles.imageAlbum}>
                                    <Image
                                        source={{uri: iconAlbum}}
                                        style={{width: 250, height: 250, borderRadius: 7}}
                                    />
                                </View>
                                <Slider
                                    onTouchStart={this.onSliderTrackStart}
                                    onTouchEnd={this.onSliderTrackEnd}
                                    onValueChange={this.onSliderTrackEditing}
                                    value={this.state.playSeconds} maximumValue={this.state.duration} maximumTrackTintColor='#8d8e93' minimumTrackTintColor='#8d6fb9' thumbTintColor='#8d6fb9'
                                    style={{ width: Dimensions.get('window').width - 80, alignSelf:'center', marginHorizontal:Platform.select({ios:5})}}/>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{color:'#8d8e93', marginRight: Dimensions.get('window').width / 2 - 81}}>{currentTimeString}</Text>
                                    <Text style={{color:'#8d8e93', marginLeft: Dimensions.get('window').width / 2 - 83}}>-{durationString}</Text>
                                </View>
                                <Text style={styles.nameTrack}>{nameTrack}</Text>
                                <Text style={styles.namePerformer}>{namePerformer}</Text>
                                <View style={styles.buttonContainer}>
                                    <View style={styles.rowStyle}>
                                        <View style={styles.play}>
                                            {this.state.isLike === false &&
                                            <TouchableHighlight style={styles.button} onPress={this.onLike} underlayColor="#fff">
                                                <Icon name="ios-heart-empty" type="ionicon" size={28} color={'#000'}
                                                />
                                            </TouchableHighlight>
                                            }

                                            {this.state.isLike === true &&
                                            <TouchableHighlight style={styles.button} onPress={this.onLike} underlayColor="#fff">
                                                <Icon name="ios-heart"
                                                      type="ionicon"
                                                      size={28}
                                                      color={'#8d6fb9'}
                                                />
                                            </TouchableHighlight>
                                            }
                                        </View>
                                    </View>

                                    <View style={styles.rowStyle}>
                                        <View style={styles.play}>
                                            <TouchableHighlight style={styles.button} underlayColor="#fff">
                                                <Icon name="ios-rewind"
                                                      type="ionicon"
                                                      size={36}
                                                      color={'#000'}
                                                />
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                    <View style={styles.rowStyle}>
                                        <View style={styles.play}>
                                            {this.props.isPlay === false &&
                                            <TouchableHighlight style={styles.button} onPress={this.play} underlayColor="#fff">
                                                <Icon name="ios-play"
                                                      type="ionicon"
                                                      size={48}
                                                      color={'#000'}
                                                />
                                            </TouchableHighlight>
                                            }
                                            {this.props.isPlay === true &&
                                            <TouchableHighlight style={styles.button} onPress={this.pause} underlayColor="#fff">
                                                <Icon name="ios-pause"
                                                      type="ionicon"
                                                      size={48}
                                                      color={'#000'}
                                                />
                                            </TouchableHighlight>
                                            }
                                        </View>
                                    </View>
                                    <View style={styles.rowStyle}>
                                        <View style={styles.play}>
                                            <TouchableHighlight style={styles.button} underlayColor="#fff">
                                                <Icon name="ios-fastforward"
                                                      type="ionicon"
                                                      size={36}
                                                      color={'#000'}
                                                />
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                    <View style={styles.rowStyle}>
                                        <View style={styles.play}>
                                            <TouchableHighlight style={styles.button} underlayColor="#fff">
                                                <Icon name="ios-more"
                                                      type="ionicon"
                                                      size={28}
                                                      color={'#000'}
                                                />
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                </View>
                                <View style={{marginVertical:15, marginHorizontal:15, flexDirection:'row'}}>
                                    <Icon name="ios-volume-mute"
                                          type="ionicon"
                                          size={20}
                                          color={'#8d8e93'}
                                    />
                                    <Slider
                                        onTouchStart={this.onSliderVolumeStart}
                                        onTouchEnd={this.onSliderVolumeEnd}
                                        onValueChange={this.onSliderVolumeEditing}
                                        value={this.state.volume} maximumValue={1.0} maximumTrackTintColor='#8d8e93' minimumTrackTintColor='#8d6fb9' thumbTintColor='#8d6fb9'
                                        style={{width: Dimensions.get('window').width - 120, alignSelf:'center', marginHorizontal: Platform.select({ios:5})}}
                                        ref={(sliderVol) => this.sliderVol = sliderVol}/>
                                    <Icon name="ios-volume-high"
                                          type="ionicon"
                                          size={20}
                                          color={'#8d8e93'}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.slide2}>
                            <View style={styles.queue}>
                                <Text style={styles.queueText}>Далее</Text>
                                {
                                    this.props.playlist.length !== 0 && this.props.playlist &&
                                    <SortableList
                                        style={styles.list}
                                        contentContainerStyle={styles.queueList}
                                        data={playlist}
                                        showsVerticalScrollIndicator={false}
                                        onPressRow={(key) => {ToastAndroid.show(key, ToastAndroid.SHORT)}}
                                        renderRow={this._renderRow} />
                                }
                            </View>
                        </View>
                    </Swiper>
                    <View style={{position: 'absolute', alignItems: 'center', width: Dimensions.get('window').width, height: 50, transform: [
                            {translateX: 0},
                            {translateY: Dimensions.get('window').height - 75}]}}>
                        <View style={{flexDirection:'row'}}>
                            {this.state.buttonRandom === false &&
                                <View style={{marginRight: Dimensions.get('window').width - 250}}>
                                    <TouchableHighlight style={styles.button} underlayColor="#fff"
                                                        onPress={this.onRandomButton}>
                                        <Icon name="random"
                                              type="font-awesome"
                                              size={15}
                                              color={'#000'}
                                        />
                                    </TouchableHighlight>
                                </View>
                            }
                            {this.state.buttonRandom === true &&
                                <View style={{marginRight: Dimensions.get('window').width - 250}}>
                                    <TouchableHighlight style={styles.button} underlayColor="#fff"
                                                        onPress={this.onRandomButton}>
                                        <Icon name="random"
                                              type="font-awesome"
                                              size={15}
                                              color={'#8d6fb9'}
                                        />
                                    </TouchableHighlight>
                                </View>
                            }
                            {this.state.buttonRepeat === 'disable' &&
                                <View style={{marginLeft: Dimensions.get('window').width - 250}}>
                                    <TouchableHighlight style={styles.button} underlayColor="#fff"
                                                        onPress={this.onRepeatButton}>
                                        <Icon name="repeat"
                                              type="material"
                                              size={20}
                                              color={'#000'}
                                        />
                                    </TouchableHighlight>
                                </View>
                            }
                            {this.state.buttonRepeat === 'enable' &&
                                <View style={{marginLeft: Dimensions.get('window').width - 250}}>
                                    <TouchableHighlight style={styles.button} underlayColor="#fff"
                                                        onPress={this.onRepeatButton}>
                                        <Icon name="repeat"
                                              type="material"
                                              size={20}
                                              color={'#8d6fb9'}
                                        />
                                    </TouchableHighlight>
                                </View>
                            }
                            {this.state.buttonRepeat === 'enable-one' &&
                                <View style={{marginLeft: Dimensions.get('window').width - 250}}>
                                    <TouchableHighlight style={styles.button} underlayColor="#fff"
                                                        onPress={this.onRepeatButton}>
                                        <Icon name="repeat-one"
                                              type="material"
                                              size={20}
                                              color={'#8d6fb9'}
                                        />
                                    </TouchableHighlight>
                                </View>
                            }
                        </View>
                    </View>
                </View>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height

    },
    bigPlayer: {
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 50
    },
    imageAlbum: {
        marginTop: 15,
        marginBottom: 15
    },
    buttonContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    rowStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    play: {
        flexDirection: 'column',
        marginTop: 25,
        marginLeft: 7.5,
        marginRight: 7.5,
        marginBottom: 15
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    namePerformer: {
        color: '#8d6fb9',
        fontSize: 16
    },
    nameTrack: {
        color: '#000',
        fontSize: 24
    },
    queue: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 50
    },
    queueText: {
        marginLeft: 20,
        marginBottom: 25,
        fontSize: 24,
        color: '#000'
    },
    buttonDisableQueue: {
        width: 135,
        height: 45,
        marginHorizontal: 20,
        borderRadius: 30,
        backgroundColor: '#dedee0',
        alignItems: 'center',
        justifyContent: 'center'
    },
    list: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 190
    },
    queueList:
        {
            width: Dimensions.get('window').width,

            ...Platform.select({
                ios: {
                    paddingHorizontal: 30,
                },

                android: {
                    paddingHorizontal: 0,
                }
            })
        },
    listItem: {
        paddingLeft: 20,
        height: 65,
        width: Dimensions.get('window').width - 20,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    slideContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    slide1: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f6f6f6'
    },

    slide2: {
        backgroundColor: '#f6f6f6'
    },
    wrapper: {
        position: 'relative'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    titleTrack: {
        fontSize: 16,
        color: '#000'
    },
    titlePerformer: {
        fontSize: 13,
        color: 'grey'
    },
});

export default connect()(FullPlayer)