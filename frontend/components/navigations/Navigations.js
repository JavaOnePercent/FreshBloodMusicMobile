import React from 'react';
import {StyleSheet, View, Text, TouchableHighlight, Dimensions} from 'react-native';
import {connect, Provider} from 'react-redux';
// import { Badge } from 'react-native-elements';

import { createAppContainer, createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';

import store from "../../redux/store";
import { Icon } from 'react-native-elements';

import Loading from "../../views/loading/Loading";

import News from "../../views/mainapp/news/News";

import Charts from "../../views/mainapp/charts/Charts";

import Favorites from "../../views/mainapp/favorites/Favorites";
import Authorization from "../../views/mainapp/favorites/Authorization";
import Liked from "../../views/mainapp/favorites/Liked";
import Recommendations from "../../views/mainapp/favorites/Recommendations";
import MyPlaylists from "../../views/mainapp/favorites/MyPlaylists";
import Notifications from "../../views/mainapp/favorites/Notifications";

import Podcasts from "../../views/mainapp/podcasts/Podcasts";

import Radio from "../../views/mainapp/radio/Radio";

import Profile from "../../views/mainapp/Profile";

const TabNewsStack = createStackNavigator(
    {
        Main: { screen: News },
    }
);

const TabChartsStack = createStackNavigator(
    {
        Charts: { screen: Charts },
    }
);

const TabFavoritesStack = createStackNavigator(
    {
        Favorites: { screen: Favorites },
        Authorization: { screen: Authorization },
        Liked: { screen: Liked },
        Recommendations: { screen: Recommendations },
        MyPlaylists: { screen: MyPlaylists },
        Notifications: { screen: Notifications },

    }
);

const TabPodcastsStack = createStackNavigator(
    {
        Podcasts: { screen: Podcasts },
        Profile: {screen: Profile},
    }
);

const TabRadioStack = createStackNavigator(
    {
        Radio: { screen: Radio },
    }
);

const MainAppStack = createBottomTabNavigator({
        News: { screen: TabNewsStack,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: 'Новости',
                tabBarIcon: ({tintColor}) => (
                    <View>
                        <Icon name="newspaper-o"
                              type="font-awesome"
                              size={24}
                              color={tintColor}
                        />
                        {/*<Badge*/}
                        {/*    value="3"*/}
                        {/*    status="success"*/}
                        {/*    containerStyle={{ position: 'absolute', top: -4, right: -4 }}*/}
                        {/*/>*/}
                    </View>
                ),
            })},
        Charts: { screen: TabChartsStack,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: 'Чарты',
                tabBarIcon: ({tintColor}) => (
                    <View>
                        <Icon name="trophy"
                              type="font-awesome"
                              size={24}
                              color={tintColor}
                        />
                        {/*<Badge*/}
                        {/*    value="2"*/}
                        {/*    status="success"*/}
                        {/*    containerStyle={{ position: 'absolute', top: -4, right: -4 }}*/}
                        {/*/>*/}
                    </View>


                ),
            })},
        Favorites: { screen: TabFavoritesStack,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: 'Моя музыка',
                tabBarIcon: ({tintColor}) => (
                    <Icon name="heart"
                          type="font-awesome"
                          size={24}
                          color={tintColor}
                    />
                ),
            })},
        Radio: { screen: TabRadioStack,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: 'Радио',
                tabBarIcon: ({tintColor}) => (
                    <Icon name="ios-megaphone"
                          type="ionicon"
                          size={30}
                          color={tintColor}
                    />
                ),
            })},
        Podcasts: { screen: TabPodcastsStack,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: 'Поиск',
                tabBarIcon: ({tintColor}) => (
                    <View>
                        <Icon name="ios-search"
                              type="ionicon"
                              size={30}
                              color={tintColor}
                        />
                        {/*<Badge*/}
                        {/*    value="2"*/}
                        {/*    status="success"*/}
                        {/*    containerStyle={{ position: 'absolute', top: -4, right: -4 }}*/}
                        {/*/>*/}
                    </View>
                ),
            })},
    },
    {
        initialRouteName: 'News',
        tabBarOptions: {
            activeTintColor: "#ffb52b",
            inactiveTintColor: "#8d8e93",
            activeBackgroundColor: "#ffffff",
            inactiveBackgroundColor: "#ffffff",
        }
    },
);

const MainNavigation = createAppContainer(createSwitchNavigator({
        Loading: {screen: Loading},
        MainApp: MainAppStack,
    },
    {
        initialRouteName: 'MainApp',
    }
));


export class Navigations extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <MainNavigation />
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    table: {
        zIndex: 2,
        position: 'absolute',
        transform: [
            {translateX: Dimensions.get('window').width / 2 - 150},
            {translateY: Dimensions.get('window').height / 2 - 300}]
    }
});

export default connect(
)(Navigations);
