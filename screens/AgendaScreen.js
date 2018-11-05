import React, { Component } from "react";
import { View, StyleSheet, FlatList, ListView, ToastAndroid, Image, RefreshControl, ScrollView, DeviceEventEmitter } from 'react-native';
import { Container, Header, Content, Button, Icon, List, ListItem, Text, Left, Title, Body, Right, Item } from 'native-base';
import { DrawerNavigator, DrawerItems } from "react-navigation";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import AgendaComponent from './Agenda';

// create a component
class Kalender extends Component {
    static navigationOptions = {
        drawerLabel: 'Agenda',
        title: 'Agenda',
        headerTintColor: '#009999',
        headerTitle: <Text style={{ fontFamily: 'siemens_global_bold',fontSize: 28, lineHeight: 34, color: "#009999", left: 20}}>Agenda</Text>,
        headerStyle: {
            height: 75,
            elevation: 0,
        },
    }
    constructor(props) {
        super(props);
        this.state = {
          items: {},
          currentDate: '',
        };
      }
    _currDate() {
        const date = new Date().getDate();
        const month = new Date().getMonth()+1;
        const year = new Date().getFullYear();

        const ddate = year+"-"+month+"-"+date;
        console.log(this.ddate);
        this.setState({currDate: ddate});
    }
    render() {
        return (
                <AgendaComponent />
        );
    }
    
    // // loadItems(day) {
    // //     setTimeout(() => {
    // //       for (let i = 0; i < 20; i++) {
    // //         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
    // //         const strTime = this.timeToString(time);
    // //         if (!this.state.items[strTime]) {
    // //           this.state.items[strTime] = [];
    // //           const numItems = Math.floor(Math.random() * 5);
    // //           for (let j = 0; j < numItems; j++) {
    // //             this.state.items[strTime].push({
    // //               name: 'Item for ' + strTime,
    // //               height: Math.max(50, Math.floor(Math.random() * 150))
    // //             });
    // //           }
    // //         }
    // //       }
    // //       //console.log(this.state.items);
    // //       const newItems = {};
    // //       Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
    // //       this.setState({
    // //         items: newItems
    // //       });
    // //     }, 1000);
    // //     // console.log(`Load Items for ${day.year}-${day.month}`);
    // //   }
    
    // //   renderItem(item) {
    // //     return (
    // //       <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
    // //     );
    // //   }
    
    // //   renderEmptyDate() {
    // //     return (
    // //       <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    // //     );
    // //   }
    
    // //   rowHasChanged(r1, r2) {
    // //     return r1.name !== r2.name;
    // //   }
    
    // //   timeToString(time) {
    // //     const date = new Date(time);
    // //     return date.toISOString().split('T')[0];
    // //   }
    }

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
      },
      emptyDate: {
        height: 15,
        flex:1,
        paddingTop: 30,
      }
});

//make this component available to the app
export default Kalender;
