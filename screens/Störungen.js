import React, { Component } from "react";
import { View, StyleSheet, FlatList, ListView, ToastAndroid, Image, RefreshControl, ScrollView, DeviceEventEmitter, TouchableOpacity, SectionList } from 'react-native';
import { Container, Header, Content, Button, Icon, List, ListItem, Text, Left, Title, Body, Right, Item } from 'native-base';
import { DrawerNavigator, DrawerItems } from "react-navigation";
// import {Icon} from 'react-native-vector-icons';
import Modal from 'react-native-modal';

// create a component
class Störungen extends Component {
    // static navigationOptions = {
    //     header: null
    // }
    static navigationOptions = {
        drawerLabel: 'Störungen',
        title: 'Störungen',
        headerTintColor: '#009999',
        headerTitle: <Text style={{ fontFamily: 'siemens_global_bold',fontSize: 28, lineHeight: 34, color: "#009999", left: 20}}>Störungen</Text>,
        headerStyle: {
            height: 75,
            elevation: 0,
        },
    }
    // _color(aufgaben) {
    //     var aufgabendata = [];
    //     var i = 0;
    //     aufgaben.forEach(item => {
    //         if (item.type === "Visit") {
    //             aufgabendata.push({id: i, title: item.title, content: item.content, type: item.type, from: item.from, to: item.to, color: '#F2C94C'})
    //         } else if (item.type === "Defekt") {
    //             aufgabendata.push({id: i, title: item.title, content: item.content, type: item.type, from: item.from, to: item.to, color: '#2D9CDB'})
    //         } else if (item.type === "Wartung") {
    //             aufgabendata.push({id: i, title: item.title, content: item.content, type: item.type, from: item.from, to: item.to, color: '#9B51E0'})
    //         } else {
    //             aufgabendata.push({id: i, title: item.title, content: item.content, type: item.type, from: item.from, to: item.to, color: '#EEEEEE'})
    //         }
    //         i++;
    //     });
    //     //this.setState({listViewData: aufgabendata});
    //     //console.log(aufgabendata);
    //     return aufgabendata;
    // }
    constructor(props) {
        super(props)
        this.state = {
            störungen: [],
            basic : true,
            //listViewData: [],
            AnfrageStörungen: [],
            refreshing: false,
            isModalVisible: false,
        }
        DeviceEventEmitter.addListener('refresh', (e) => {
            this._onRefresh();
            // setTimeout(function(){
            //     console.log("It worked!");
            // }, 1000);
            
        });
    }
    componentWillMount() {
        this._onRefresh();
        // fetch('https://asc.siemens.at/datagate/external/mobileticket/myTickets', {
        //     method: 'GET',
        //     headers: { 
        //       'Content-Type': 'application/json',
        //       'userhash': 'hKjxQjF7-h4mffXGYvX8QytA5b7q3BqkGcJ92Y-FQkLk28FSF8Z0OIybGXVGfmcBeHR4'
        //     },
        //     // body: JSON.stringify({
        //     //   "fixedHash":"hKjxQjF7-h4mffXGYvX8QytA5b7q3BqkGcJ92Y-FQkLk28FSF8Z0OIybGXVGfmcBeHR4",
        //     //   "from":"2018-09-01T00:00:00+01:00",
        //     //   "to":"2018-12-31T23:59:59+01:00",
        //     // }),
        // })
        // .then(response => (response.json()))
        // .then(stoerungen => {
        //     //this._color(aufgaben);
        //     this.setState({störungen: stoerungen});
        //     if (this.state.störungen.length === 0) {
        //         this.state.störungen.push({
        //             information: 'Test Störung',
        //             name: 'Test-Unternehmen',
        //             number: '31031',
        //             address: 'Hinterfeldgasse 19, 6900 Bregenz',
        //         })
        //         this.state.störungen.push({
        //             information: 'Test Störung 2',
        //             name: 'Test-Unternehmen 2',
        //             number: '31032',
        //             address: 'Hinterfeldgasse 19, 6900 Bregenz',
        //         })
        //         this.state.störungen.push({
        //             information: 'Test Störung 3',
        //             name: 'Test-Unternehmen 3',
        //             number: '31033',
        //             address: 'Hinterfeldgasse 19, 6900 Bregenz',
        //         })
        //         this.state.AnfrageStörungen.push({
        //             information: 'Test Störung',
        //             name: 'Test-Unternehmen',
        //             number: '31031',
        //             address: 'Hinterfeldgasse 19, 6900 Bregenz',
        //             accepted: false,
        //         })
        //     }
        //     console.log(stoerungen);
        // })
        //this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    }
    _onRefresh = () => {
        this.setState({refreshing: true});
        fetch('https://asc.siemens.at/datagate/external/mobileticket/myTickets', {
            method: 'GET',
            headers: { 
              'Content-Type': 'application/json',
              'userhash': '9FFKqvr-iOfrwRkr48TCm-xqf6zjWUQqu063E9X3fRek9peiqq-edilVWGhRVMlweHR4'
            },
            // body: JSON.stringify({
            //   "fixedHash":"hKjxQjF7-h4mffXGYvX8QytA5b7q3BqkGcJ92Y-FQkLk28FSF8Z0OIybGXVGfmcBeHR4",
            //   "from":"2018-09-01T00:00:00+01:00",
            //   "to":"2018-12-31T23:59:59+01:00",
            // }),
        })
        .then(response => (response.json()))
        .then(stoerungen => {
            //this._color(aufgaben);
            this.setState({störungen: stoerungen});
            if (this.state.störungen.length === 0) {
                this.state.störungen.push({
                    information: 'Test Störung',
                    name: 'Test-Unternehmen',
                    number: '31031',
                    address: 'Hinterfeldgasse 19, 6900 Bregenz',
                })
                this.state.störungen.push({
                    information: 'Test Störung 2',
                    name: 'Test-Unternehmen 2',
                    number: '31032',
                    address: 'Hinterfeldgasse 19, 6900 Bregenz',
                })
                this.state.störungen.push({
                    information: 'Test Störung 3',
                    name: 'Test-Unternehmen 3',
                    number: '31033',
                    address: 'Hinterfeldgasse 19, 6900 Bregenz',
                })
                this.state.AnfrageStörungen = [];
                this.state.AnfrageStörungen.push({
                    information: 'Test Störung 4',
                    name: 'Test-Unternehmen 4',
                    number: '31031',
                    address: 'Hinterfeldgasse 19, 6900 Bregenz',
                    accepted: false,
                })
            }
            this.setState({refreshing: false})
            console.log(stoerungen);
        })
    }
    // _timefunction(to, from) {
    //     var to = to;
    //     var from = from;
    //     to = to.substring(11,16);
    //     from = from.substring(11,16);
    //     return from + " - " + to;
    // }
    // _onRefresh = () => {
    //     this.setState({refreshing: true});
    //     fetch('https://asc.siemens.at/datagate/external/Calendar/search', {
    //         method: 'POST',
    //         headers: { 
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //           "fixedHash":"hKjxQjF7-h4mffXGYvX8QytA5b7q3BqkGcJ92Y-FQkLk28FSF8Z0OIybGXVGfmcBeHR4",
    //           "from":"2018-09-01T00:00:00+01:00",
    //           "to":"2018-12-31T23:59:59+01:00",
    //         }),
    //     })
    //     .then(response => (response.json()))
    //     .then(aufgaben => {
    //         this._color(aufgaben);
    //         this.setState({listViewData: this._color(aufgaben)})
    //         //console.log(this.aufgabendata)
    //         this.setState({refreshing: false});
    //     })
    // }
    _toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    }
    renderItem = ({item}) => {
        if (item.accepted === false) {
            return (
                <View style={{backgroundColor: '#fff', borderBottomColor: '#EAEAEA', borderBottomWidth: 1,paddingBottom:5}}>
                    <View style={{paddingLeft: 18}}>
                        <Text style={{fontFamily: 'siemens_global_bold', fontSize: 18, lineHeight: 24, paddingTop: 20}}><Icon name='md-list' style={{color:'black', fontSize: 20}}></Icon>   {item.information}</Text>
                        <Text style={{fontFamily: 'siemens_global_roman', fontSize: 14, lineHeight: 20, color: '#505050'}}>{item.name} ({item.number})</Text>
                        <Text style={{fontFamily: 'siemens_global_roman', fontSize: 14, lineHeight: 20, color: '#505050', paddingBottom: 8}}>{item.address}</Text>
                        </View>
                    <View></View>
                    <View style={{justifyContent: "space-between", flexDirection: 'row', paddingBottom: 10, paddingLeft:18, paddingRight:18}}>
                        <TouchableOpacity style={{height: 35, justifyContent: 'center', borderWidth: 2, borderColor: '#009999', borderRadius: 6, alignSelf: 'center'}}>
                            <View style={{flex:1,flexDirection: 'row',justifyContent: 'center', alignItems: 'center'}}><Icon name='md-thumbs-up' style={{color: '#009999', marginLeft:7,fontSize:19}}></Icon><Text style={styles.labelBtn}>Annehmen</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('LogScreen', {ticketNumber: item.number})} style={{height: 35, justifyContent: 'center', borderWidth: 2, borderColor: '#009999', borderRadius: 6, alignSelf: 'center'}}>
                            <View style={{flex:1,flexDirection: 'row',justifyContent: 'center', alignItems: 'center'}}><Icon name='md-menu' style={{color: '#009999', marginLeft:7,fontSize:21}}></Icon><Text style={styles.labelBtn}>Log Eintrag</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._toggleModal} style={{height: 35, justifyContent: 'center', borderWidth: 2, borderColor: '#009999', borderRadius: 6, alignSelf: 'center'}}>
                            <View style={{flex:1,flexDirection: 'row',justifyContent: 'center', alignItems: 'center'}}><Icon name='md-thumbs-down' style={{color: '#009999', marginLeft:7,fontSize:19}}></Icon><Text style={styles.labelBtn}>Ablehen</Text></View>
                        </TouchableOpacity>
                        {/* https://github.com/react-native-community/react-native-modal/issues/79 */}
                        <Modal isVisible={this.state.isModalVisible} onBackButtonPress={this._toggleModal} onBackdropPress={this._toggleModal} style={{ flex: 0, backgroundColor: "white", 
                            padding: 22,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 4,
                            borderColor: "rgba(0, 0, 0, 0.1)",
                            height: 250,
                            }}>
                            <View>
                                <View style={{width: '100%'}}>
                                    <Text style={{backgroundColor: '#009999', color: '#fff', fontSize: 18, padding: 5, marginBottom: 10}}>Grund angeben</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'space-around', flexDirection: 'column'}}>
                                    <TouchableOpacity onPress={this._toggleModal} style={{ borderWidth: 2, borderColor: '#009999', borderRadius: 6, marginBottom: 15, padding: 5}}>
                                        <Text>Keine Zeit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this._toggleModal} style={{borderWidth: 2, borderColor: '#009999', borderRadius: 6, marginBottom: 15, padding: 5}}>
                                        <Text>Falsche Person</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this._toggleModal} style={{borderWidth: 2, borderColor: '#009999', borderRadius: 6, marginBottom: 15, padding: 5}}>
                                        <Text>Anderer Grund</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </View> 
            )
        } else {
            return (
                <View style={{backgroundColor: '#fff', borderBottomColor: '#EAEAEA', borderBottomWidth: 1,paddingBottom:5}}>
                    <View style={{paddingLeft: 18}}>
                        <Text style={{fontFamily: 'siemens_global_bold', fontSize: 18, lineHeight: 24, paddingTop: 20}}><Icon name='md-list' style={{color:'black', fontSize: 20}}></Icon>   {item.information}</Text>
                        <Text style={{fontFamily: 'siemens_global_roman', fontSize: 14, lineHeight: 20, color: '#505050'}}>{item.name} ({item.number})</Text>
                        <Text style={{fontFamily: 'siemens_global_roman', fontSize: 14, lineHeight: 20, color: '#505050', paddingBottom: 8}}>{item.address}</Text>
                        </View>
                    <View></View>
                    <View style={{justifyContent: "space-between", flexDirection: 'row', paddingBottom: 10,paddingLeft:18, paddingRight:18}}>
                        <TouchableOpacity style={{height: 35, justifyContent: 'center', borderWidth: 2, borderColor: '#009999', borderRadius: 6, alignSelf: 'center'}}>
                            <View style={{flex:1,flexDirection: 'row',justifyContent: 'center', alignItems: 'center'}}><Icon name='md-checkmark' style={{color: '#009999', marginLeft:7,fontSize:21}}></Icon><Text style={styles.labelBtn}>Erledigt</Text></View>
                        </TouchableOpacity>
                        {/* <TouchableOpacity onPress={()=> this.props.navigation.navigate('LogUpdate', {id: item.number})}style={{backgroundColor: '#a5a5a5', width: 50, height: 30}}>
                            <Icon name='md-create' color='black'></Icon>
                        </TouchableOpacity> */}
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('LogScreen', {ticketNumber: item.number})} style={{height: 35, justifyContent: 'center', borderWidth: 2, borderColor: '#009999', borderRadius: 6, alignSelf: 'center'}}>
                            <View style={{flex:1,flexDirection: 'row',justifyContent: 'center', alignItems: 'center'}}><Icon name='md-menu' style={{color: '#009999', marginLeft:7,fontSize:21}}></Icon><Text style={styles.labelBtn}>Log Eintrag</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{height: 35, justifyContent: 'center', borderWidth: 2, borderColor: '#009999', borderRadius: 6, alignSelf: 'center'}}>
                            <View style={{flex:1,flexDirection: 'row',justifyContent: 'center', alignItems: 'center',}}><Icon name='md-person' style={{color: '#009999', marginLeft:7,fontSize:19}}></Icon><Text style={styles.labelBtn}>Hilfe</Text></View>
                        </TouchableOpacity>
                    </View>
                </View> 
            )
        }
    }
    renderSectionHeader = ({section}) => {
        return (
            <Text>
                {section.title}
            </Text>
        )
    }
    render() {
        //const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return (
            <View style={{flex: 1}}>
                <SectionList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                    style={{backgroundColor: 'white', alignSelf: 'stretch', alignContent: 'stretch', flex: 1}}  
                    sections={[
                        {
                            id: 0,
                            //key: 0,
                            backgroundColor: '#EAEAEA',
                            color: '#505050',
                            title: 'Ausstehend',
                            data: this.state.AnfrageStörungen,
                        },
                        {
                            id: 1,
                            //key: 1,
                            backgroundColor: '#EAEAEA',
                            color: '#505050',
                            title: 'Aktuell',
                            data: this.state.störungen,
                        },
                        // {
                        //     id: 2,
                        //     //key: 2,
                        //     backgroundColor: '#EAEAEA',
                        //     color: '#505050',
                        //     title: 'Diese Woche ' + '('+this.state.wocheA + ' bis ' + this.state.wocheE + ')',
                        //     data: this.state.dataW,
                        // },
                    ]}
                    renderItem={this.renderItem}
                    renderSectionHeader={({section}) => <Text style={{backgroundColor: section.backgroundColor, color: section.color, height: 38, width: '100%', fontSize: 14, lineHeight: 24, fontFamily: 'siemens_global_bold', paddingLeft: 16, paddingVertical: 7}}>{section.title}</Text>}
                    //keyExtractor={extractKey}
                />
            </View>
            // <Container>
            // <View>
                // <FlatList
                //     refreshControl={
                //         <RefreshControl
                //             refreshing={this.state.refreshing}
                //             onRefresh={this._onRefresh}
                //         />
                //     }
                //     style={{backgroundColor: '#fff', alignSelf: 'stretch', alignContent: 'stretch'}} // https://stackoverflow.com/questions/33297367/100-width-in-react-native-flexbox
                //     data={this.state.störungen}
                //     renderItem={({item}) =>
                    // <View style={{backgroundColor: '#fff', borderBottomColor: '#EAEAEA', borderBottomWidth: 1}}>
                    //     <View style={{paddingLeft: 18}}>
                    //         <Text style={{fontWeight: "bold", fontSize: 18, lineHeight: 24, paddingTop: 20}}><Icon name='md-list' style={{color:'black', fontSize: 20}}></Icon>   {item.information}</Text>
                    //         <Text style={{fontWeight: "normal", fontSize: 14, lineHeight: 20, color: '#505050'}}>{item.name} ({item.number})</Text>
                    //         <Text style={{fontWeight: "normal", fontSize: 14, lineHeight: 20, color: '#505050', paddingBottom: 13}}>{item.address}</Text>
                    //         </View>
                    //     <View></View>
                    //     <View style={{justifyContent: "space-around", flexDirection: 'row', paddingBottom: 10}}>
                    //         <TouchableOpacity style={{width: 35, height: 35, justifyContent: 'center', borderWidth: 2, borderColor: '#009999', borderRadius: 6, alignSelf: 'center'}}>
                    //             <View style={{justifyContent: 'center', alignItems: 'center'}}><Icon name='md-checkmark' style={{color: '#009999'}}></Icon></View>
                    //         </TouchableOpacity>
                    //         {/* <TouchableOpacity onPress={()=> this.props.navigation.navigate('LogUpdate', {id: item.number})}style={{backgroundColor: '#a5a5a5', width: 50, height: 30}}>
                    //             <Icon name='md-create' color='black'></Icon>
                    //         </TouchableOpacity> */}
                    //         <TouchableOpacity onPress={()=> this.props.navigation.navigate('LogScreen', {ticketNumber: item.number})} style={{ width: 35, height: 35, justifyContent: 'center', borderWidth: 2, borderColor: '#009999', borderRadius: 6, alignSelf: 'center'}}>
                    //             <View style={{justifyContent: 'center', alignItems: 'center'}}><Icon name='md-menu' style={{color: '#009999'}}></Icon></View>
                    //         </TouchableOpacity>
                    //         <TouchableOpacity style={{width: 35, height: 35, justifyContent: 'center', borderWidth: 2, borderColor: '#009999', borderRadius: 6, alignSelf: 'center'}}>
                    //             <View style={{justifyContent: 'center', alignItems: 'center'}}><Icon name='md-person' style={{color: '#009999'}}></Icon></View>
                    //         </TouchableOpacity>
                    //     </View>
                    // </View> 
                //     }
                //     keyExtractor={item => Math.random().toString()}
                //     titleStyle={{fontWeight: "bold", fontSize: 16, lineHeight: 24, backgroundColor: 'white' }}
                // />
            // </View>
            // </Container>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    button : {
        width: 77,
        height: 77,
        backgroundColor: '#009999',
        borderRadius: 100,
        margin: 5,
        position: 'absolute',
        alignSelf: 'flex-end',
        bottom: 15, borderRadius: 77/2, justifyContent: 'center',
        right: 15,
    },
    labelBtn :{
        fontSize:13,
        color: 'grey',
        margin:5,
        fontFamily: 'siemens_global_bold',
        color: '#009999'
    }
})

//make this component available to the app
export default Störungen;
