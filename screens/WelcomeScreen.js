import React, { Component } from 'react'
import {
    StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, SafeAreaView, Keyboard, TouchableOpacity,
    KeyboardAvoidingView, Button, Alert, ToastAndroid,
    AsyncStorage, Platform, AlertIOS
} from 'react-native'
import { Label, Toast } from 'native-base';
// import Expo from "expo";
import { Notifications } from 'expo';
import moment from 'moment';
import { Permissions } from 'expo';
import * as firebase from 'firebase';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from "graphql-tag";


const globalState = {}; // https://stackoverflow.com/questions/44227235/global-state-in-react-native
export const StoreGlobal = (obj) => {
    // globalState[obj.fixedHash] = this.state.fixedHash;
    if(obj.type==='set'){
        globalState[obj.key]=obj.value;
        return true;
        }else
          if(obj.type==='get'){
        return globalState[obj.key];
        }else{
        return null;
        }
}
const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.graph.cool/simple/v1/cjna4ydca59580129beayc2nw"
  }),
  cache: new InMemoryCache()
});

// async function register() {
//     const {status} = await Expo.Permissions.askAsync(
//       Expo.Permissions.NOTIFICATIONS
//     );
//     if (status !== 'granted') {
//       alert('You nedd Permissions');
//       return;
//     }
//     const token = await Expo.Notifications.getExpoPushTokenAsync();
//     console.log(status, token);
//   }
// const localNotification = {
//     title: 'Daily Report :)',
//     body: 'Bitte eine Statusmeldung abgeben',
//     android: 
//     {
//         sound: true,
//         vibrate: true,
//     }
// };
// let t = moment(new Date()).format('YYYY-MM-DD HH:mm');
// let tt = moment(t.substring(0,10) + '08:00');
// var time = tt.to;


// const schedulingOptions = {
//     time: tt,
//     repeat: 'day',
// };
// Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);

// create a component
class WelcomeScreen extends Component {
    // componentWillMount() {
    //     register();
    //     this.listener = Expo.Notifications.addListener(this.listen)
    // }
    // componentWillUnmount() {
    //     this.listener && Expo.Notifications.removeListener(this.listen)
    // }
    // listen = ({origin, data}) => {
    //     console.log('data:', origin, data);
    // }

    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            showToast: false,
            token: '',
            fixedHash: '',
            disabled: false,
          };
    }
    static token;
    componentDidMount() {
        this.registerForPushNotificationAsync();
        this._retrieveData();
    }
    _sendToServer(name) {
        this.setState({disabled: true});
        const client = new ApolloClient({
            link: new HttpLink({
              uri: "https://api.graph.cool/simple/v1/cjna4ydca59580129beayc2nw"
            }),
            cache: new InMemoryCache()
          });
        client.query({
            query: gql`
            {
                allAppuserOwns{token, username, date, fixedHash}
            }
            `
        }).then(result => {
            console.log(result);
            let dataQuery = result.data.allAppuserOwns;
            //console.log(dataQuery);
            let trigger = false;
            dataQuery.forEach(element => {
                if (this.state.token === element.token) {
                    console.log("Same!");
                    trigger = true;
                }
            });
            
            if (trigger === false) {
                client.mutate({
                    variables: { token: this.state.token, username: name, fixedHash: StoreGlobal({type: 'get', key: 'ok'}), date: moment(new Date()) },
                    mutation: gql`
                        mutation createAppuserOwn($token: String!, $username: String!, $date: DateTime, $fixedHash: String){
                            createAppuserOwn(token: $token, username: $username, date: $date, fixedHash: $fixedHash) {
                                token
                                username
                                date
                                fixedHash
                            }
                        }
                    `,
                }).then(() => {
                    this.setState({disabled: false});
                    this.props.navigation.navigate('TabNavigator');
                }).catch(error => {
                    console.log(error);
                })
                console.log("Sent to Server!");

                this.setState({disabled: false});
                
            }
            this.setState({disabled: false});
            this.props.navigation.navigate('TabNavigator');
        }).catch(error => {
            console.log(error);
        });
    }
    _login(name, password) {
        this.setState({disabled: true});
        fetch('https://asc.siemens.at/datagate/external/login/Identify', {
            method: 'POST',
            headers: { 
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            "name": this.state.name,
            "password": this.state.password,
            }),
        })
        .then(response => (response.json()))
        .then((responseData) => {
            //this.setState({disabled: true});
            this._storeData(responseData.fixedHash);
            console.log(responseData);   
            this._sendToServer(name);    
            console.log(responseData.fixedHash);
            StoreGlobal({type: 'set', key:'ok', value: responseData.fixedHash});
            console.log("store", StoreGlobal({type: 'get', key: 'ok'}))  ;

            if (Platform.OS === "android") {
                ToastAndroid.showWithGravity("Sie wurden erfolgreich eingeloggt", ToastAndroid.LONG, ToastAndroid.BOTTOM);
            } else {
                AlertIOS.alert("Eingeloggt");
            }
        }).catch((error) => {
            console.log(error);
            //Alert.alert('Unvalid username/password', 'Bitte versuchen Sie es erneut')
            this.refs.txtName.focus()
            this.setState({disabled: false});
            if (Platform.OS === "android") {
                ToastAndroid.showWithGravity("Unvalid username/password", ToastAndroid.LONG, ToastAndroid.BOTTOM);
            } else {
                AlertIOS.alert("falsche eingabe");
            }
            
        });
        
    }
    _storeData = async (hash) => {
        try {
            await AsyncStorage.setItem('fixedHash', hash);
        } catch (error) {
            console.log(error);
        }
    }
    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('fixedHash');
            if (value !== null) {
              // We have data!!
              console.log("async value fixedhash", value);
              StoreGlobal({type: 'set', key:'ok', value: value}); // <--- zum speichern des fixedHash global für die Requests
              this.props.navigation.navigate('TabNavigator');
            }
           } catch (error) {
                console.log(error);
           }
    }
    registerForPushNotificationAsync = async () => {
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;
        
        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
            // Android remote notification permissions are granted during the app
            // install, so this will only ask on iOS
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        
        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
            return;
        }
        
        // Get the token that uniquely identifies this device
        token = await Notifications.getExpoPushTokenAsync();
        //alert(token);
        // let uid = firebase.auth().currentUser.uid;
        // firebase.database().ref("users").child(uid).update({
        //   expoPushToken
        // });
        this.setState({token: token});
        console.log(this.state.token);
        
    }
    render() {
        return (
            <View style={styles.container}>
                {/* //<Button title='AufgabenScreen' onPress={() => this.props.navigation.navigate('DrawerNavigator')} /> */}
                <SafeAreaView style={styles.container}>
                    <StatusBar barStyle="light-content" />
                    <KeyboardAvoidingView behavior='padding' style={styles.container}>
                        <TouchableWithoutFeedback style={styles.container} 
                                onPress={Keyboard.dismiss}>
                            <View style={styles.logoContainer}>
                                <View style={styles.logoContainer}>
                                    <Image style={styles.logo}
                                        source={require('./icon+logo.png')}>
                                    </Image>
                                </View>
                                <View style={styles.infoContainer}>
                                    <TextInput style={styles.input}
                                        ref={"txtName"}
                                        placeholder="Username..."
                                        underlineColorAndroid='#009999'
                                        placeholderTextColor='#009999'
                                        keyboardType='email-address'
                                        returnKeyType='next'
                                        autoCorrect={false}
                                        onSubmitEditing={()=> this.refs.txtPassword.focus()}
                                        onChangeText={(text)=> this.setState({name: text})}
                                    />
                                    <TextInput style={styles.input} 
                                        placeholder="Passwort..."
                                        underlineColorAndroid='#009999'
                                        placeholderTextColor='#009999'
                                        returnKeyType='go'
                                        secureTextEntry
                                        autoCorrect={false}
                                        ref={"txtPassword"}
                                        onChangeText={(text)=> this.setState({password: text})}
                                    />
                                    <TouchableOpacity style={styles.buttonContainer} disabled={this.state.disabled} onPress={()=> this._login(this.state.name, this.state.password)}>
                                        <Text style={styles.buttonText}>EINLOGGEN</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </View>
            
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE',
        flexDirection: 'column',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        top: -50,
        backgroundColor: '#009999'
    },
    logo: {
        height: 127,
        width: 164,
    },
    title: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 5,
        opacity: 0.9
    },
    infoContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        //height: 200,
        padding: 20,
        backgroundColor: '#EEEEEE'
    },
    input: {
        height: 40,
        backgroundColor: '#EEEEEE',
        color: '#009999',
        marginBottom: 20,
        paddingHorizontal: 10,
        paddingBottom: 20,
        fontFamily: 'siemens_global_bold',
    },
    buttonContainer: {
        backgroundColor: '#009999',
        paddingVertical: 15,
        borderRadius: 6,
        height: 48,
        marginTop: 10,
    },
    buttonText: {
        textAlign: 'center',
        color : '#fff',
        fontFamily: 'siemens_global_bold',
        fontSize: 15,
        lineHeight: 18
    },
})

//make this component available to the app
export default WelcomeScreen;
