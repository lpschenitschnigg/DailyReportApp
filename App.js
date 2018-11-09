import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { createStackNavigator} from 'react-navigation';
import Expo from "expo";
import { Root, Icon} from 'native-base';

import * as firebase from 'firebase';
import {Permissions, Notifications} from 'expo';
import 'babel-polyfill';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from "graphql-tag";
import { Font } from 'expo';

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.graph.cool/simple/v1/cjna4ydca59580129beayc2nw"
  }),
  cache: new InMemoryCache()
});

import WelcomeScreen from './screens/WelcomeScreen';
import Detail from './screens/Detail';
import AufgabeErstellen from './screens/AufgabeErstellen'; // yarn add react-native-datepicker --> npm install 
import AufgabeBearbeiten from './screens/AufgabeBearbeiten';
import TabNavigator from './screens/TabNavigator';
import LogScreen from './screens/LogScreen';
import AufgabeErstellenNeu from './screens/AufgabenErstellenNeu';
import ModalScreen from './screens/ModalScreen';

// async function register() {
//   const {status} = await Expo.Permissions.askAsync(
//     Expo.Permissions.NOTIFICATIONS
//   );
//   if (status !== 'granted') {
//     alert('You nedd Permissions');
//     return;
//   }
//   const token = await Expo.Notifications.getExpoPushTokenAsync();
//   console.log(status, token);
//   alert(token);
// }
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
      token: '',
    };
  }
  static token;
  componentDidMount() {
      // this.registerForPushNotificationAsync();
      // if (Platform.OS === 'android') {
      //   Expo.Notifications.createChannelAndroidAsync('tagesmeldung', {
      //     name: 'Tages Meldung',
      //     sound: true,
      //   });
      // }
      // Font.loadAsync({
      //   'siemens_global_roman': require('./assets/fonts/siemens_global_roman.ttf'),
      //   'siemens_global_bold': require('./assets/fonts/siemens_global_bold.ttf'),
      // });
  }
  // registerForPushNotificationAsync = async () => {
  //   const { status: existingStatus } = await Permissions.getAsync(
  //       Permissions.NOTIFICATIONS
  //   );
  //   let finalStatus = existingStatus;
    
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    // if (existingStatus !== 'granted') {
    //     // Android remote notification permissions are granted during the app
    //     // install, so this will only ask on iOS
    //     const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    //     finalStatus = status;
    // }
    
    // // Stop here if the user did not grant permissions
    // if (finalStatus !== 'granted') {
    //     return;
    // }
    
    // // Get the token that uniquely identifies this device
    // token = await Notifications.getExpoPushTokenAsync();
    // this.setState({token: token});
    // console.log(this.state.token);
    //alert(token);
    // let uid = firebase.auth().currentUser.uid;
    // firebase.database().ref("users").child(uid).update({
    //   expoPushToken
    // });
    
// }
  async componentWillMount() {
    // register();
    // this.listener = Expo.Notifications.addListener(this.listen)
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf"),
      'siemens_global_roman': require('./assets/fonts/siemens_global_roman.ttf'),
      'siemens_global_bold': require('./assets/fonts/siemens_global_bold.ttf'),
    });
    this.setState({ isReady: true });
    // function register() {
    //   const {status} = await Expo.Permissions.askAsync(
    //     Expo.Permissions.NOTIFICATIONS
    //   );
    //   if (status !== 'granted') {
    //     alert('You nedd Permissions');
    //     return;
    //   }
    //   const token = await Expo.Notifications.getExpoPushTokenAsync();
    //   console.log(status, token);
    // }
  }
  // componentWillUnmount() {
  //   this.listener && Expo.Notifications.removeListener(this.listen)
  // }
  // listen = ({origin, data}) => {
  //   console.log(origin, data);
  // }
  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    
    return (
      <ApolloProvider client={client}>
          <Root>
            <AppStackNavigator />
          </Root>
        </ApolloProvider>
    );
  }
}
const AppStackNavigator = createStackNavigator({
  WelcomeScreen: {screen: WelcomeScreen},
  // //DrawerNavigator: {screen: DrawerNavigator,
  //   navigationOptions: () => ({
  //     header: null,
  //   }),
  // },
  TabNavigator: {screen: TabNavigator,
    navigationOptions: () => ({
      header: null,
      title: '',
      headerTintColor: '#009999',
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 0,
      },
      //headerRight: <Icon name='md-log-out' style={{height: 28, width: 28, marginRight: 13, color: '#009999', backgroundColor: 'black'}} onPress={() => this.props.navigation.goBack('WelcomeScreen')}></Icon>,
      headerLeft: <View></View>,
      // headerTitleStyle: { //https://github.com/react-navigation/react-navigation/issues/253
      //   flex: 1,
      //   textAlign: 'center',
      //   alignSelf: 'center'
      // },
    }),
  },
  Detail: {screen: Detail,
    navigationOptions: () => ({
      title: 'Detail',
      headerTitleStyle: {
        fontSize: 28,
        lineHeight: 34,
      },
      headerTintColor: '#009999',
      headerStyle: {
        backgroundColor: '#fff',
        height: 75,
        elevation: 0,
      },
      // headerTitleStyle: { //https://github.com/react-navigation/react-navigation/issues/253
      //   flex: 1,
      //   textAlign: 'center',
      //   alignSelf: 'center'
      // },
    }),
  },
  LogScreen: {screen: LogScreen,
    navigationOptions: () => ({
      title: 'Logs',
      headerTitleStyle: {
        fontSize: 28,
        lineHeight: 34,
      },
      headerTintColor: '#009999',
      headerStyle: {
        backgroundColor: '#fff',
        height: 75,
        elevation: 0,
        
      },
      // headerTitleStyle: { //https://github.com/react-navigation/react-navigation/issues/253
      //   flex: 1,
      //   textAlign: 'center',
      //   alignSelf: 'center'
      // },
    }),
  },
  // LogUpdate: {screen: LogUpdate,
  //   navigationOptions: () => ({
  //     title: 'Ticket aktualisieren',
  //     headerTintColor: '#009999',
  //     headerStyle: {
  //       backgroundColor: '#fff',
  //       //height: 56,
  //     },
  //     // headerTitleStyle: { //https://github.com/react-navigation/react-navigation/issues/253
  //     //   flex: 1,
  //     //   textAlign: 'center',
  //     //   alignSelf: 'center'
  //     // },
  //   }),
  // },
  AufgabeErstellen: { screen: AufgabeErstellen,
    navigationOptions: () => ({
      title: 'Erstellen',
      headerTintColor: '#009999',
      headerStyle: {
        backgroundColor: '#fff',
      },
    }),
  },
  AufgabeErstellenNeu: { screen: AufgabeErstellenNeu,
    navigationOptions: () => ({
      title: 'Aufgabe erstellen',
      headerTitleStyle: {
        fontSize: 28,
        lineHeight: 34,
      },
      headerTintColor: '#009999',
      headerStyle: {
        backgroundColor: '#fff',
        height: 75,
        elevation: 0,
      },
    }),
  },
  // Kategorie2: { screen: Kategorie2,
  //   navigationOptions: () => ({
  //     title: 'Typ Auswahl',
  //     headerTintColor: '#009999',
  //     headerStyle: {
  //       backgroundColor: '#fff',
  //     },
  //     headerRight: <Icon name='md-checkmark' style={{height: 28, width: 28, marginRight: 13, color: '#009999'}}></Icon>
  //   }),
  // },
  AufgabeBearbeiten: { screen: AufgabeBearbeiten,
    navigationOptions: () => ({
      title: 'Bearbeiten',
      headerTitleStyle: {
        fontSize: 28,
        lineHeight: 34,
      },
      headerTintColor: '#009999',
      headerStyle: {
        backgroundColor: '#fff',
        height: 75,
        elevation: 0,
      },
    }),
  },
  ModalScreen: { screen: ModalScreen, 
    navigationOptions: () => ({
      headerLeft: <View></View>,
      headerStyle: {
        backgroundColor: '#fff',
        height: 75,
        elevation: 0,
      },
  }),
},
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headertitle: {
    backgroundColor: '#009999',
    color: '#fff',
    textAlign: 'center',
  }
});
