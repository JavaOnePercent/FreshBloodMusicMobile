import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    AsyncStorage,
    RefreshControl,
    ScrollView,
    Dimensions
} from 'react-native';
import { Provider, connect } from 'react-redux';
import store from "../../../redux/store";
import {ADDRESS_SERVER} from "../../../components/constants/constants";
import {clearEdition, getTrends} from "../../../redux/actions/news";
import {getPerformers} from "../../../redux/actions/charts";
import Album from "../../../components/Album";
import {createCurrentProfile, getAlbumsPerformer, getPerformer} from "../../../redux/actions/performer";
import Playlist from "../../../components/Playlist";

class Charts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editionArray: [
                {
                    id: -1,
                    title: 'В тренде',
                    iconAlbum: ADDRESS_SERVER + "/media/albums/-1/trend.png",
                    action: () => this._renderCancel(0, 3)
                },
                {
                    id: -2,
                    title: 'Топ недели',
                    iconAlbum: ADDRESS_SERVER + "/media/albums/-2/week.png",
                    action: () => this._renderCancel(1, 7)
                },
                {
                    id: -3,
                    title: 'Топ месяца',
                    iconAlbum: ADDRESS_SERVER + "/media/albums/-3/month.png",
                    action: () => this._renderCancel(2, 31)
                }
            ],
            refreshing: false,
            indexTable: -1,
            showTable: false,
        }
    }

    static navigationOptions = {
        headerStyle: {backgroundColor:'#8d6fb9'},
        headerTintColor:'white',
        headerBackTitle: null,
        title: 'Чарты'
    };

    _refresh = async() => {
        this.props.onGetPerformers()
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        this._refresh().then(() => {
            this.setState({refreshing: false});
        });
    }

    componentDidMount()
    {

    }

    performer(id)
    {
        if(!this.state.showTable)
        {
            this.props.onGetPerformer(id);
            this.props.onGetAlbumsPerformer(id);
            this.props.onCreateCurrentProfile(id);
            this.props.navigation.navigate('Profile')
        }
    }

    edition(l)
    {
        this.isScrolled.setNativeProps({scrollEnabled: false});
        this.isScrolledHorizontalChart.setNativeProps({scrollEnabled: false});
        this.isScrolledHorizontalBest.setNativeProps({scrollEnabled: false});
        this.refs['freshIndicator']._nativeRef.setNativeProps({
            enabled: false
        });
        return(
            <Playlist
                hide={() => this.hideAlbum(l.id)}
                idAlbum={l.id}
                album={this.props.edition}
            />
        )
    }

    _renderCancel(i, id) {
        if(!this.state.showTable)
        {
            this.props.onGetTrends(id)
            this.setState({
                indexTable: i,
                showTable: true
            });
        }
    }

    hideAlbum(id)
    {
        this.isScrolled.setNativeProps({scrollEnabled: true});
        this.isScrolledHorizontalChart.setNativeProps({scrollEnabled: true});
        this.isScrolledHorizontalBest.setNativeProps({scrollEnabled: true});
        this.refs['freshIndicator']._nativeRef.setNativeProps({
            enabled: true
        });
        this.props.onClearEdition(id)
        this.setState({
            indexTable: -1,
            showTable: false
        });
    }

    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                ref='freshIndicator'
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
                        ref={component => this.isScrolled = component}
                    >
                        <Text style={styles.title}>Чарты</Text>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            ref={component => this.isScrolledHorizontalChart = component}
                        >
                            {this.state.editionArray.map((l, i) => (
                                <View style={styles.albumContainer}>
                                    <Album title={l.title} performer={null} iconAlbum={l.iconAlbum} showTracks={l.action} width={150} height={150}/>
                                </View>
                            ))
                            }
                        </ScrollView>
                        <Text style={styles.title}>Лучшие исполнители</Text>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            ref={component => this.isScrolledHorizontalBest = component}
                        >
                            {this.props.chartPerformers.map((l, i) => (
                                <View style={styles.albumContainer}>
                                    <Album title={l.name_per} performer={null} iconAlbum={l.image_per} showTracks={() => this.performer(l.id)} width={150} height={150}/>
                                </View>
                            ))
                            }
                        </ScrollView>
                        <View style={styles.table}>
                            {this.state.indexTable !== -1 && this.edition(this.state.editionArray[this.state.indexTable])}
                        </View>
                    </ScrollView>
                    <View style={styles.bottom}>
                    </View>
                </View>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 15,
        zIndex: 0
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
    },
    table: {
        zIndex: 1,
        position: 'absolute',
        transform: [
            {translateX: Dimensions.get('window').width / 2 - 150},
            {translateY: Dimensions.get('window').height / 2 - 300}]
    },
    bottom: {
        height: 50,
        backgroundColor: '#f6f6f6'
    }
});

export default connect(
    state => ({edition: state.edition, chartPerformers: state.chartPerformers}),
    dispatch => ({
        onGetPerformers: () => {
            dispatch(getPerformers());
        },
        onGetTrends: (interval) => {
            dispatch(getTrends(interval));
        },
        onCreateCurrentProfile: (id) => {
            dispatch(createCurrentProfile(id));
        },
        onGetPerformer: (id) => {
            dispatch(getPerformer(id));
        },
        onGetAlbumsPerformer: (id) => {
            dispatch(getAlbumsPerformer(id));
        },
        onClearEdition: (id) => {
            dispatch(clearEdition(id));
        },
    })
)(Charts)