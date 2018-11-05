//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {Icon} from 'native-base';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import AgendaScreen from './AgendaScreen';
import Störungen from './Störungen';
import AufgabenSectionList from './AufgabenSectionList';

// create a component

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});
const StackAgenda = createStackNavigator({
    Agenda: {screen: AgendaScreen}
})
const StackAufgaben = createStackNavigator({
    Aufgaben: {screen: AufgabenSectionList,
        // navigationOptions = (navigation) => {
        //     const { navigation } = this.props;
        //     const fixedHash = navigation.getParam('hash', 'asdf');
        //     console.log(fixedHash);
        }
})
const StackStörungen = createStackNavigator({
    Störungen: {screen: Störungen}
})
const AppTabNavigator = createBottomTabNavigator({
    Agenda: {screen: StackAgenda,
        navigationOptions: {
            tabBarIcon:({tintColor})=> (
                <Icon name="md-calendar" style={{color: tintColor}} size={24}/>
            ),
            tabBarOptions: {
                activeTintColor: '#009999',
                inactiveTintColor: 'grey',
                style: {
                    height: 60,
                    paddingBottom:7,
                    paddingTop: 7
                }
            }
            // tabBarIcon: ({ focused, horizontal, tintColor }) => {
            //     //const { routeName } = navigation.state;
            //     //source={require('./icon+logo.png')}>
            //     let icongreen = require('./ic_green.png');
            //     let icongrey = require('./ic_grey.png');
            //     <Image
            //     source={focused ? icongreen : icongrey}
            //     //size={24}
            //     //style={{ color: tintColor }}
            //     />
            // }
        }
    },
    Aufgaben: {screen: StackAufgaben,
        navigationOptions: {
            tabBarIcon:({tintColor})=> (
                <Icon name="md-checkmark-circle-outline" style={{color: tintColor}} size={24}/>
            ),
            tabBarOptions: {
                activeTintColor: '#009999',
                inactiveTintColor: 'grey',
                style: {
                    height: 60,
                    paddingBottom:7,
                    paddingTop: 7
                }
            }
        }
    },
        // title: 'Aufgaben',
    Störungen: {screen: StackStörungen,
        navigationOptions: {
            tabBarOptions: {
                activeTintColor: '#009999',
                inactiveTintColor: 'grey',
                style: {
                    height: 60,
                    paddingBottom:7,
                    paddingTop: 7
                }
            },
            tabBarIcon:({tintColor})=> (
                <Icon name="md-warning" style={{color: tintColor}} size={24}/> 
            )
        }
    },
},{
    initialRouteName:'Aufgaben',
    order:['Agenda', 'Aufgaben', 'Störungen'],
    tabBarOptions: {
        activeTintColor: '#009999',
        // activeBackgroundColor: 'red',
        // inactiveBackgroundColor: 'blue',
        inactiveTintColor: 'grey',
        style: {
            height: 60,
            paddingBottom:7,
            paddingTop: 7
        }
    }
})
//make this component available to the app
export default AppTabNavigator;
