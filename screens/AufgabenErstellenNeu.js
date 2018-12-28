//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ToastAndroid, DeviceEventEmitter, Button, Picker, FlatList} from 'react-native';

import Modal from 'react-native-modal';

import DatePicker from 'react-native-datepicker'; // https://github.com/xgfe/react-native-datepicker
import { Label, Toast, Item } from 'native-base';
//import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from "graphql-tag";
import {StoreGlobal} from './WelcomeScreen';
import {StoreCus} from './Kundenauswahl';
import {StoreTyp} from './Types';
import { Segment } from 'expo';
import { NavigationEvents } from 'react-navigation';
const client = new ApolloClient({
    link: new HttpLink({
      uri: "https://api.graph.cool/simple/v1/cjna4ydca59580129beayc2nw"
    }),
    cache: new InMemoryCache()
});



// create a component
class AufgabeErstellen extends Component {
    _showCurrentDate=()=>{
        var date = new Date().getDate();
        var month = new Date().getMonth();
        var year = new Date().getFullYear();

        var ddate = year+"-"+month+"-"+date;
        console.log(ddate);
    }
    // _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    // _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
  
    // _handleDatePicked = (date) => {
    //   console.log('A date has been picked: ', date);
    //   this.setState({from: date})
    //   this._hideDateTimePicker();
    // };
    static navigationOptions = {
        headerTitle: <Text style={{ fontFamily: 'siemens_global_bold',fontSize: 28, lineHeight: 34, color: "#009999", left: 20}}>Meldung Erstellen</Text>,
    }
    constructor(props) {
        super(props);
        var toTime = new Date();
        toTime.setHours(toTime.getHours() + 4);
        this.state = {
            workerid: 'cjooe47t3ko4s0167fvd0aoc3',
            customerid: '',
            typid: '',
            from: '',
            to: '',
            title: '',
            content: '',
            cus: '',
            typ: '',
            showToast: true,
            //isDateTimePickerVisible: false,
            //cat: this.props.navigation.state.params.cat,
            //refreshing: false
            aufgaben: this.props.navigation.state.params.aufgaben,
            colorone: '#979797',
            colortwo: '#979797',
            colorthree: '#979797',
            colorfour: '#979797',
            colorfive: '#979797',
            colorsix: '#979797',
            colorseven: '#979797',
            coloreight: '#979797',
            selected: false,
            kunden: [],
            types: [],
            kunden2: [
                {
                    city: 'Bregenz',
                    id: '1',
                    name: 'Hak Bregenz',
                    street: 'Hinterfeldgasse 19'
                },
                {
                    city: 'Bregenz',
                    id: '2',
                    name: 'Siemens',
                    street: 'Josef-Huter-Straße 6'
                },
                {
                    city: 'Wolfurt',
                    id: '3',
                    name: 'Doppelmayr',
                    street: 'Konrad-Doppelmayr-Straße 1'
                },
            ],
            selected2: '',
            show1: true,
            show2: true,
            from2: new Date(),
            to2: toTime,
            disabled: false,
            fixedHash: StoreGlobal({type: 'get', key: 'ok'}),
            isModalCustomerVisible: false,
            isModalTypVisible: false,
            
            //opacity: 1,
            
        };
        
        // DeviceEventEmitter.addListener('refresh', (e) => {
        //     this._onRefresh();
        //     //this._onRefresh();
        //     setTimeout(function(){
        //         console.log("cat");
        //     }, 1000);
            
        // });
        // client.query({
        //     query: gql`
        //     {
        //         allCustomers {id, name, city, street}
        //     }
        //     `
        // }).then(result =>  {
        //     let dataQuery = result.data.allCustomers;
        //     //console.log(dataQuery);
        //     //let trigger = false;
        //     dataQuery.forEach(element => {
        //         this.state.kunden.push({
        //             id: element.id,
        //             name: element.name,
        //             street: element.street,
        //             city: element.city,
        //         })
        //     });
        //     // this.state.kunden.push({
        //     //     id: result.id,
        //     //     name: result.name,
        //     //     street: result.street,
        //     //     city: result.city,
        //     // })
        //     //this.setState({kunden: result});
        //     console.log(result)
        // });
        // console.log("kunden", this.state.kunden);
        client.query({
            query: gql`
            {
                allCustomers {id, name, city, street, plz}
            }
            `
        }).then(result => {
            console.log(result);
            this.setState({kunden: result.data.allCustomers});
            console.log(this.state.kunden);

        });
        client.query({
            query: gql`
            {
                allTyps {id, name, color}
            }
            `
        }).then(result => {
            console.log(result);
            this.setState({types: result.data.allTyps});
            console.log(this.state.types);

        });
    }
    _toggleModalCustomer = () => {
        this.setState({ isModalCustomerVisible: !this.state.isModalCustomerVisible });
    }
    _toggleModalTyp = () => {
        this.setState({ isModalTypVisible: !this.state.isModalTypVisible });
    }
    componentDidMount() {
        
        fetch('https://asc.siemens.at/datagate/external/Calendar/planned', {
            method: 'GET',
            headers: { 
            'userhash': this.state.fixedHash,
            'Content-Type': 'application/json',
            },
        })
        .then(response => (response.json()))
        .then((responseData) => {
            console.log(responseData)
            //ToastAndroid.showWithGravity("Task erstellt", ToastAndroid.LONG, ToastAndroid.BOTTOM);
            //DeviceEventEmitter.emit('refresh');
            //this.props.navigation.navigate('Aufgaben' ,{refresh: true});
            // this.setState({from: responseData.from});
            // this.setState({to: responseData.to});
            // this.setState({title: responseData.title});
            // this.setState({content: responseData.content});
        }).catch((error) => {
            console.error(error);
            //ToastAndroid.showWithGravity("Fehler", ToastAndroid.LONG, ToastAndroid.BOTTOM);
        });
        this.setState({cus: StoreCus({type: 'get', key: 'ok'}) });
            this.setState({typ: StoreTyp({type: 'get', key: 'ok'}) });
            console.log(this.state.cus);
    }
    // _onRefresh = () => {
    //     //this.setState({refreshing: true});
    //     this.setState({cat: this.props.navigation.state.params.cat})
    //     //this.setState({cat: this.props.navigation.state.params.cat})
    //     console.log(this.state.cat);
    //     //this.setState({refreshing: false})
    // }
    _saveAufgabe(from, to, title, content) {
        console.log(from);
        console.log(to);
        if (from != "" && to != "") {
            var v = moment.utc(from, 'HH:mm');
            var b = moment.utc(to, 'HH:mm');
            console.log("v", v, "/", "b", b);
            //     console.log("true");
            if (v < b) {
                console.log("true");
    
            if (this._vorhanden(from) === true) {
                ToastAndroid.showWithGravity("Bereits Eintrag um diese Zeit vorhanden", ToastAndroid.LONG, ToastAndroid.BOTTOM);
            } else if (from === to) {
                ToastAndroid.showWithGravity("Beginn und Ende identisch", ToastAndroid.LONG, ToastAndroid.BOTTOM);
            } else if (title!= "" && content != ""){
                console.log(from, to);
                this.setState({disabled: true});
                //this.setState({opacity: 0.5});
                console.log('funktioniert');
                    fetch('https://asc.siemens.at/datagate/external/Calendar/create', {
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "fixedHash": this.state.fixedHash,
                            "from": from,
                            "to": to,
                            'title': title,
                            'content' : content,
                        }),
                    })
                    .then(response => (response.json()))
                    .then((responseData) => {
                        console.log(responseData)
                 ToastAndroid.showWithGravity("Task erstellt", ToastAndroid.LONG, ToastAndroid.BOTTOM);
                 Segment.track('Aufgabe erstellt');
                 // --- An unsere DB senden ---> Create WorkingOn
                 client.mutate({
                    variables: { content: this.state.content, from: this.state.from, to: this.state.to, title: this.state.title, customerId: this.state.customerid, typId: this.state.typid, workerId: this.state.workerid},
                    mutation: gql`
                        mutation createWorkingOn($content: String, $from: String!, $to: String!, $title: String, $customerId: ID!, $typId: ID!, $workerId: ID!){
                            createWorkingOn(content: $content, from: $from, to: $to, title: $title, customerId: $customerId, typId: $typId, workerId: $workerId) {
                                id
                                content
                                from
                                to
                                title
                                customer {
                                    id
                                    workingOn {
                                        id
                                    }
                                }
                                typ {
                                    id
                                }
                                worker {
                                    id
                                }
                            }
                        }
                    `,
                }).then((data) => {
                    console.log(data.data.createWorkingOn.id);
                    //var workingonid = data.data.createWorkingOn.id;
                    // mutation { 
                    //     setWorkingOnCustomer(customerCustomerId: ID!, workingOnWorkingOnId: ID!) {
                    //         setWorkingOnCustomer(customerCustomerId: $customer)
                    //     }
                    // }
                    // client.mutate({
                    //     variables: { customer: this.state.customerid, workingonid : workingonid },
                    //     mutation: gql`
                    //     mutation { 
                    //             setWorkingOnCustomer(customerCustomerId: ID!, workingOnWorkingOnId: ID!):
                    //                 setWorkingOnCustomerPayload(customerCustomerId: $customer, workingOnWorkingOnId: $workingonid) {
                    //                     customer {
                    //                         name
                    //                     }
                    //                 }
                    //             }
                    //         }
                    //     `,
                    // }).then((data) => {
                    //     console.log(data);
                    // }).catch(error => {
                    //     console.log(error); 
                    // })
                }).catch(error => {
                    console.log(error); 
                })
                 DeviceEventEmitter.emit('refresh');
                 this.props.navigation.navigate('Aufgaben' ,{refresh: true});

             }).catch((error) => {
                 console.error(error);
                 ToastAndroid.showWithGravity("Fehler", ToastAndroid.LONG, ToastAndroid.BOTTOM);
             });
            } else {
                ToastAndroid.showWithGravity("Fehler", ToastAndroid.LONG, ToastAndroid.BOTTOM);
            }
            } else {
                console.log("false");
                ToastAndroid.showWithGravity("Falsche Eingabe der Zeit", ToastAndroid.LONG, ToastAndroid.BOTTOM);
            }
        } else {
            console.log('keine zeit ausgewählt');
            ToastAndroid.showWithGravity("Keine Zeit ausgewählt", ToastAndroid.LONG, ToastAndroid.BOTTOM);
        }
    };
    _vorhanden(from) {
        var vorhanden = false;
        this.state.aufgaben.forEach(item => {
            var year = item.from.substring(0,4);
            var month = item.from.substring(5, 7);
            var date = item.from.substring(8, 10);
            var time = item.from.substring(11, 16);
            var ddate = year + "-" + month + "-" + date + " " + time;
            console.log(ddate);
            if (from === ddate) {
                vorhanden = true;
            } else {

            }
        });
        return vorhanden;
    }
    // componentDidUpdate() {
    //     render =() => {
    //         return(
    //             <View><TouchableOpacity onPress={() => this.props.navigation.navigate('Kundenauswahl', {kunden: this.state.kunden})}><Text>Kunde auswählen</Text></TouchableOpacity>
    //             <Label style={styles.labelText}>Kunde: {this.state.cus}</Label></View>
    //         );
    //     }
    // }
    // componentDidUpdate() {
    //     if (this.state.cus === "") {
    //         this.setState({cus: StoreCus({type: 'get', key: 'ok'})});
    //     } else {
            
    //     }
    // }
    // shouldComponentUpdate() {
    //     if (this.state.cus === "") {
    //         this.setState({cus: StoreCus({type: 'get', key: 'ok'})});
    //     } else {
            
    //     }
    // }
    // componentWillUpdate() {
    //     this.setState({cus: StoreCus({type: 'get', key: 'ok'}) });
    // }
    _select(id, time) {
        if (id === 1) {
            this.setState({colorone: '#009999'});
            this.setState({colortwo: '#979797'});
            this.setState({colorthree: '#979797'});
            this.setState({colorfour: '#979797'});
            this.setState({from: time});
            console.log(this.state.from);
        } else if (id === 2){
            this.setState({colorone: '#979797'});
            this.setState({colortwo: '#009999'});
            this.setState({colorthree: '#979797'});
            this.setState({colorfour: '#979797'});
            this.setState({from: time});
            console.log(this.state.from);
        } else if (id === 3) {
            this.setState({colorone: '#979797'});
            this.setState({colortwo: '#979797'});
            this.setState({colorthree: '#009999'});
            this.setState({colorfour: '#979797'});
            this.setState({from: time});
            console.log(this.state.from);
        } else if (id === 4) {
            this.setState({colorone: '#979797'});
            this.setState({colortwo: '#979797'});
            this.setState({colorthree: '#979797'});
            this.setState({colorfour: '#009999'});
            this.setState({from2: time});
            this.setState({from: time});
            console.log(this.state.from);
        } else if (id === 5) {
            this.setState({colorfive: '#009999'});
            this.setState({colorsix: '#979797'});
            this.setState({colorseven: '#979797'});
            this.setState({coloreight: '#979797'});
            this.setState({to: time});
            console.log(this.state.to);
        } else if (id === 6) {
            this.setState({colorfive: '#979797'});
            this.setState({colorsix: '#009999'});
            this.setState({colorseven: '#979797'});
            this.setState({coloreight: '#979797'});
            this.setState({to: time});
            console.log(this.state.to);
        } else if (id === 7) {
            this.setState({colorfive: '#979797'});
            this.setState({colorsix: '#979797'});
            this.setState({colorseven: '#009999'});
            this.setState({coloreight: '#979797'});
            this.setState({to: time});
            console.log(this.state.to);
        } else if (id === 8) {
            this.setState({colorfive: '#979797'});
            this.setState({colorsix: '#979797'});
            this.setState({colorseven: '#979797'});
            this.setState({coloreight: '#009999'});
            this.setState({to: time});
            this.setState({to2: time});
            console.log(this.state.to);
        }
    }
    _choseCustomer(name, city, id) {
        this.setState({cus: name + ", " + city});
        this.setState({customerid: id});
        this._toggleModalCustomer();
    }
    _choseTyp(name, id) {
        this.setState({typ: name});
        this.setState({typid: id});
        this._toggleModalTyp();
    }
    render() {
        console.log(StoreCus({type: 'get', key: 'ok'}));
        if(this.props.loading) return null;
        //const { params } = this.props.navigation.state;
        //const category = params ? this.props.navigation.state.params.cat : 'Nichts ausgewählt';
        //this._setCategory(category);
        //console.log(category);
        // const title = params ? this.props.navigation.state.params.title : 'Ort/Kunde';
        // console.log(title);
        // const content = params ? this.props.navigation.state.params.content : 'Info';
        // console.log(content);
        // const to = params ? this.props.navigation.state.params.to : this.ddate;
        // console.log(to);
        // const from = params ? this.props.navigation.state.params.from : this.ddate;
        // console.log(from);
       
            return (
                <ApolloProvider client={client}>
                
                <ScrollView style={{ backgroundColor: "#EAEAEA",
                    padding: 15,
                    paddingTop: 15}}>
                    <View style={{ paddingLeft: 18, paddingRight: 18, paddingBottom: 15,
                        paddingTop: 10,
                        borderRadius: 10,
                        backgroundColor: '#fff'}}>
                        <Label style={{paddingTop: 18, fontSize: 18, marginBottom: 10, fontSize: 15, marginBottom: 10, color: '#606060', lineHeight: 18, fontFamily: 'siemens_global_bold'}}>Titel</Label>
                            <TextInput style={styles.input} 
                                placeholder='Titel...'
                                value={this.state.title}
                                placeholderTextColor='#606060'
                                underlineColorAndroid='#F1F1F1'
                                returnKeyType='next'
                                autoCorrect={false}
                                ref={"txtTitle"}
                                onSubmitEditing={()=> this.refs.txtContent.focus()}
                                onChangeText={(text)=> this.setState({title: text})}
                            />
                        <TouchableOpacity onPress={this._toggleModalCustomer}><Text>Kunde auswählen</Text></TouchableOpacity>
                        <Label style={styles.labelText}>Kunde: {this.state.cus}</Label>
                        <Modal isVisible={this.state.isModalCustomerVisible} onBackButtonPress={this._toggleModalCustomer} onBackdropPress={this._toggleModalCustomer} style={{ backgroundColor: "white", 
                            padding: 22,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 4,
                            borderColor: "rgba(0, 0, 0, 0.1)",
                            }}>
                           <View>
                                <FlatList
                                    style={{backgroundColor: 'white', alignSelf: 'stretch', alignContent: 'stretch', marginTop: 10}} // https://stackoverflow.com/questions/33297367/100-width-in-react-native-flexbox
                                    data={this.state.kunden}
                                    renderItem={({item}) =>
                                    <View style={{backgroundColor: '#f5f5f5'}}>
                                        <View style={{paddingLeft: 18}}>
                                            <Text onPress={() => this._choseCustomer(item.name, item.city, item.id)} style={{fontFamily: 'siemens_global_bold', fontSize: 16, lineHeight: 24, paddingTop: 9}}>{item.name}</Text>
                                            <Text onPress={() => this._choseCustomer(item.name, item.city, item.id)} style={{fontFamily: 'siemens_global_roman', fontSize: 12, lineHeight: 20, color: '#505050'}}>{item.street}</Text>
                                            <Text onPress={() => this._choseCustomer(item.name, item.city, item.id)} style={{fontFamily: 'siemens_global_roman', fontSize: 12, lineHeight: 20, color: '#505050', paddingBottom: 13}}>{item.plz}, {item.city}</Text>
                                            </View>
                                        <View style={{borderBottomColor: '#EAEAEA', borderBottomWidth: 1}}></View>
                                    </View> 
                                    }
                                    keyExtractor={item => Math.random().toString()}
                                    titleStyle={{fontFamily: 'siemens_global_bold', fontSize: 16, lineHeight: 24, backgroundColor: 'white' }}
                                />
                            </View>
                        </Modal>

                        <TouchableOpacity onPress={this._toggleModalTyp}><Text>Typ auswählen</Text></TouchableOpacity>
                        <Label style={styles.labelText}>Typ: {this.state.typ}</Label>
                        <Modal isVisible={this.state.isModalTypVisible} onBackButtonPress={this._toggleModalTyp} onBackdropPress={this._toggleModalTyp} style={{ backgroundColor: "white", 
                            padding: 22,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 4,
                            borderColor: "rgba(0, 0, 0, 0.1)",
                            }}>
                           <View>
                            <FlatList
                                    style={{backgroundColor: 'white', alignSelf: 'stretch', alignContent: 'stretch', marginTop: 10}} // https://stackoverflow.com/questions/33297367/100-width-in-react-native-flexbox
                                    data={this.state.types}
                                    renderItem={({item}) =>
                                    <View style={{backgroundColor: '#f5f5f5'}}>
                                        <View style={{paddingLeft: 18, borderLeftColor: item.color, borderLeftWidth: 5, height: 50, flex: 1}}>
                                            <Text onPress={() => this._choseTyp(item.name, item.id)} style={{fontFamily: 'siemens_global_bold', fontSize: 16, lineHeight: 24, paddingTop: 9}}>{item.name}</Text>
                                            </View>
                                        <View style={{borderBottomColor: '#EAEAEA', borderBottomWidth: 1}}></View>
                                    </View> 
                                    }
                                    keyExtractor={item => Math.random().toString()}
                                    titleStyle={{fontFamily: 'siemens_global_bold', fontSize: 16, lineHeight: 24, backgroundColor: 'white' }}
                                />
                            </View>
                        </Modal>

                        <Label style={styles.labelText}>Info</Label>
                            <TextInput style={{ backgroundColor: '#F1F1F1', height: 109,
                                        borderRadius: 6,
                                        color: '#606060',
                                        fontSize: 15,
                                        lineHeight: 18,
                                        marginBottom: 20,
                                        paddingHorizontal: 10, 
                                        fontFamily: 'siemens_global_bold'}} 
                                placeholder='Info....'
                                underlineColorAndroid='#F1F1F1'
                                value={this.state.content}
                                multiline = {true}
                                numberOfLines = {4}
                                placeholderTextColor='#606060'
                                returnKeyType='next'
                                autoCorrect={false}
                                ref={"txtContent"}
                                onChangeText={(text)=> this.setState({content: text})}
                            />
                        {/* <Label style={styles.labelText}>Typ: Visit</Label>  */}
                        <Label style={styles.labelText}>Beginn</Label>
                            <View style={{flex: 1, flexDirection: 'row', paddingBottom: 20, justifyContent: 'space-between'}}>
                                <TouchableOpacity onPress={() => this._select(1, '07:30')} style={{ width: 68, borderColor: this.state.colorone, borderRadius: 6, borderWidth: 1.75}}>
                                    <Text style={{color: this.state.colorone, fontSize: 15, lineHeight: 18, fontFamily: 'siemens_global_bold', textAlign: 'center', paddingVertical: 16}}>07:30</Text>
                                </TouchableOpacity>
                                <TouchableOpacity  onPress={() => this._select(2, '08:00')} style={{width: 68, borderColor: this.state.colortwo, borderRadius: 6, borderWidth: 1.75}}>
                                    <Text style={{color:this.state.colortwo, fontSize: 15, lineHeight: 18, fontFamily: 'siemens_global_bold', textAlign: 'center', paddingVertical: 16}}>08:00</Text>
                                </TouchableOpacity>
                                <TouchableOpacity  onPress={() => this._select(3, '08:30')} style={{ width: 68, borderColor: this.state.colorthree, borderRadius: 6, borderWidth: 1.75}}>
                                    <Text style={{color:this.state.colorthree, fontSize: 15, lineHeight: 18, fontFamily: 'siemens_global_bold', textAlign: 'center', paddingVertical: 16}}>08:30</Text>
                                </TouchableOpacity>
                                <DatePicker
                                    style={{ width: 68, borderColor: this.state.colorfour, borderRadius: 6, borderWidth: 2}}
                                    mode="time"
                                    is24Hour={true}
                                    date={this.state.from2}
                                    format="HH:mm"
                                    minDate="2018-07-09"
                                    maxDate="2018-12-31"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    showIcon={this.state.show1}
                                    hideText={this.state.show1}
                                    //color='#009999'
                                    iconSource={require('../assets/time.png')}
                                    customStyles={{
                                        dateIcon: {
                                            //backgroundColor: '#979797'
                                            marginTop:9,
                                            width:25,
                                            height:25
                                        },
                                        dateInput: {
                                            paddingTop: 10,
                                            borderWidth: 0,
                                            //fontWeight: "bold",
                                            //color: this.state.colorfour,
                                            
                                        },
                                        dateText: {
                                            color: this.state.colorfour,
                                            fontFamily: 'siemens_global_bold'
                                        },
                                        dateTouchBody: {
                                            //: '#009999'
                                        }
                                    }}
                                    onDateChange={(datetime) => {this.setState({from2: datetime} && {hideText: true} &&this._select(4, datetime)); this.setState({show1:false})}}
                                />
                            </View>
                        <Label style={styles.labelText}>Ende</Label>
                            <View style={{flex: 1, flexDirection: 'row', paddingBottom: 20, justifyContent: 'space-between'}}>
                                <TouchableOpacity onPress={() => this._select(5, '15:30')} style={{ width: 68, borderColor: this.state.colorfive, borderRadius: 6, borderWidth: 1.75}}>
                                    <Text style={{color: this.state.colorfive, fontSize: 15, lineHeight: 18, fontFamily: 'siemens_global_bold', textAlign: 'center', paddingVertical: 16}}>15:30</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this._select(6, '16:00')} style={{width: 68, borderColor: this.state.colorsix, borderRadius: 6, borderWidth: 1.75}}>
                                    <Text style={{color: this.state.colorsix, fontSize: 15, lineHeight: 18, fontFamily: 'siemens_global_bold', textAlign: 'center', paddingVertical: 16}}>16:00</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this._select(7, '16:30')} style={{ width: 68, borderColor: this.state.colorseven, borderRadius: 6, borderWidth: 1.75}}>
                                    <Text style={{color: this.state.colorseven, fontSize: 15, lineHeight: 18, fontFamily: 'siemens_global_bold', textAlign: 'center', paddingVertical: 16}}>16:30</Text>
                                </TouchableOpacity>
                                
                                <DatePicker
                                    style={{ width: 68, borderColor: this.state.coloreight, borderRadius: 6, borderWidth: 2}}
                                    mode="time"
                                    is24Hour={true}
                                    date={this.state.to2}
                                    format="HH:mm"
                                    minDate="2018-07-09"
                                    maxDate="2018-12-31"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    showIcon={this.state.show2}
                                    hideText={this.state.show2}
                                    //color='#009999'
                                    iconSource={require('../assets/time.png')}
                                    customStyles={{
                                        dateIcon: {
                                            marginTop:9,
                                            width:25,
                                            height:25
                                        },
                                        dateInput: {
                                            paddingTop: 10,
                                            borderWidth: 0,
                                            //fontWeight: "bold",
                                            //color: this.state.colorfour,
                                            
                                        },
                                        dateText: {
                                            color: this.state.coloreight,
                                            fontFamily: 'siemens_global_bold'
                                        },
                                        dateTouchBody: {
                                            //: '#009999'
                                        }
                                    }}
                                    onDateChange={(datetime) => {this.setState({to2: datetime} && this._select(8, datetime)); this.setState({show2:false})}}
                                    />
                            </View>
                            
                        {/* <TouchableOpacity style={styles.buttonContainer} onPress={this._saveAufgabe(this.state.from, this.state.to, this.state.title, this.state.content)}>
                            <Text style={styles.buttonText}>Aufgabe erstellen</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity style={styles.buttonContainer} disabled={this.state.disabled} onPress={()=> this._saveAufgabe(this.state.from, this.state.to, this.state.title, this.state.content)}>
                            <Text style={styles.buttonText}>ERSTELLEN</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <NavigationEvents
                    onWillFocus={payload => Segment.track('Erstellen Screen')}
                    //onDidFocus={payload => console.log('did focus',payload)}
                    //onWillBlur={payload => console.log('will blur',payload)}
                    //onDidBlur={payload => console.log('did blur',payload)}
                />
                </ApolloProvider>
            );
        
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    input: {
        height: 48,
        backgroundColor: '#F1F1F1',
        borderRadius: 6,
        color: '#606060',
        fontSize: 15,
        lineHeight: 18,
        marginBottom: 17,
        marginTop: 10,
        paddingHorizontal: 10,
        //borderWidth: 1, 
        //borderColor: 'lightgrey',
        fontFamily: 'siemens_global_bold'
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
    labelText: {
        fontSize: 15,
        marginBottom: 10,
        color: '#606060',
        lineHeight: 18,
        fontFamily: 'siemens_global_bold'
    }
});

//make this component available to the app
export default AufgabeErstellen;
