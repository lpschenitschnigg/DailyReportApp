//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ToastAndroid, DeviceEventEmitter} from 'react-native';
import moment from 'moment';
import DatePicker from 'react-native-datepicker'; // https://github.com/xgfe/react-native-datepicker
import { Label, Toast } from 'native-base';
import {StoreGlobal} from './WelcomeScreen';
//import DateTimePicker from 'react-native-modal-datetime-picker';

// create a component
class AufgabeBearbeiten extends Component {
    constructor(props) {
        super(props);
        this.state = {
            from: this.props.navigation.state.params.from.substring(11, 16),
            to: this.props.navigation.state.params.to.substring(11, 16),
            date: this.props.navigation.state.params.from.substring(0, 11),
            title: this.props.navigation.state.params.title,
            content: this.props.navigation.state.params.content,
            showToast: true,
            //isDateTimePickerVisible: false,
            type: this.props.navigation.state.params.type,
            fixedHash: StoreGlobal({type: 'get', key: 'ok'}),
        };
    }
    static navigationOptions = {
        headerTitle: <Text style={{ fontFamily: 'siemens_global_bold',fontSize: 28, lineHeight: 34, color: "#009999", left: 20}}>Bearbeiten</Text>,
    }
    _saveAufgabe(from, to, title, content, type) {
        console.log(from, to);
        console.log(from, to);
        console.log(from, to);
        console.log(from, to);
        console.log(this.state.date);
        var f = this.state.date + from;
        var t = this.state.date + to;
        console.log(f, t);
        //console.log(moment.unix(f), moment.unix(t));
        // if (moment.unix(f) < moment.unix(t)) {
        var v = moment.utc(from, 'HH:mm');
        var b = moment.utc(to, 'HH:mm');
        console.log("v", v, "/", "b", b);
        //     console.log("true");
        if (v < b) {
            console.log("true");
            if (title != "" && content != "") {
                    fetch('https://asc.siemens.at/datagate/external/Calendar/create', {
                    method: 'POST',
                    headers: { 
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                    "fixedHash": this.state.fixedHash,
                    "from": f,
                    "to": t,
                    'title': title,
                    'content' : content,
                    'type' : type,
                    }),
                })
                .then(response => (response.json()))
                .then((responseData) => {
                    console.log(responseData)
                    ToastAndroid.showWithGravity("Task erstellt", ToastAndroid.LONG, ToastAndroid.BOTTOM);
                    DeviceEventEmitter.emit('refresh');
                    this.props.navigation.navigate('Aufgaben' ,{refresh: true});
                    //this.props.navigation.goBack();
                }).catch((error) => {
                    console.error(error);
                    ToastAndroid.showWithGravity("Fehler", ToastAndroid.LONG, ToastAndroid.BOTTOM);
                });
                } else {
                    //console.error(error);
                    ToastAndroid.showWithGravity("Fehler", ToastAndroid.LONG, ToastAndroid.BOTTOM);
                }
        } else {
            console.log("false");
            ToastAndroid.showWithGravity("Falsche Eingabe der Zeit", ToastAndroid.LONG, ToastAndroid.BOTTOM);
        }
        //https://stackoverflow.com/questions/34247283/how-to-subtract-2-times-with-moment-js-then-subtract-some-minutes/34255728#34255728
            // var from = moment.utc(from, 'HH:mm');
            // var to = moment.utc(to, 'HH:mm');
            // var diff = moment.duration(to.diff(from));
            // // var time = moment.utc(diff).format('HH:mm');
            // var time = to.diff(from, 'minutes');
            // var interval = moment().hour(0).minute(time);
            // return interval.format('HH:mm');

            // if (title != "" && content != "") {
            //     fetch('https://asc.siemens.at/datagate/external/Calendar/create', {
            //     method: 'POST',
            //     headers: { 
            //     'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //     "fixedHash":"hKjxQjF7-h4mffXGYvX8QytA5b7q3BqkGcJ92Y-FQkLk28FSF8Z0OIybGXVGfmcBeHR4",
            //     "from": f,
            //     "to": t,
            //     'title': title,
            //     'content' : content,
            //     'type' : type,
            //     }),
            // })
            // .then(response => (response.json()))
            // .then((responseData) => {
            //     console.log(responseData)
            //     ToastAndroid.showWithGravity("Task erstellt", ToastAndroid.LONG, ToastAndroid.BOTTOM);
            //     DeviceEventEmitter.emit('refresh');
            //     this.props.navigation.navigate('Aufgaben' ,{refresh: true});
            //     //this.props.navigation.goBack();
            // }).catch((error) => {
            //     console.error(error);
            //     ToastAndroid.showWithGravity("Fehler", ToastAndroid.LONG, ToastAndroid.BOTTOM);
            // });
            // } else {
            //     //console.error(error);
            //     ToastAndroid.showWithGravity("Fehler", ToastAndroid.LONG, ToastAndroid.BOTTOM);
            // }
        // } else {
        //     console.log("false");
        //     ToastAndroid.showWithGravity("Falsche Eingabe der Zeit", ToastAndroid.LONG, ToastAndroid.BOTTOM);
        // }
        
    }
    _getDateTimeFrom(from) {
        var year = from.substring(0,4);
        var month = from.substring(5, 7);
        var date = from.substring(8, 10);
        var time = from.substring(11, 16);
        var datetime = year+"-"+month+"-"+date+" " + time;
        //console.log(datetime);
        //this.setState({from: datetime});
        return datetime;
    }
    _getDateTimeTo(to) {
        var year = to.substring(0,4);
        var month = to.substring(5, 7);
        var date = to.substring(8, 10);
        var time = to.substring(11, 16);
        var datetime = year+"-"+month+"-"+date+" " + time;
        //console.log(datetime);
        //this.setState({from: datetime});
        return datetime;
    }
    // _setCategory(category){
    //     this.setState({type: category});
    // }
    render() {
        if(this.props.loading) return null;
        // const { params } = this.props.navigation.state;
        // const category = params ? this.props.navigation.state.params.cat : 'Nichts ausgewählt';
        // console.log(category);
        //this._setCategory(category);
        return (
            <ScrollView style={{ backgroundColor: "#EAEAEA",
                padding: 15,
                paddingTop: 15}}>
                <View style={{ paddingLeft: 18, paddingRight: 18, paddingBottom: 15,
                    paddingTop: 10,
                    borderRadius: 10,
                    backgroundColor: '#fff'}}>
                    {/* <Label style={{paddingTop: 18, fontSize: 18, marginBottom: 10}}>Ort/Kunde</Label> */}
                        <TextInput style={styles.input} 
                            placeholder='Ort/Kunde...'
                            value={this.state.title}
                            placeholderTextColor='#606060'
                            underlineColorAndroid='#F1F1F1'
                            returnKeyType='next'
                            autoCorrect={false}
                            ref={"txtTitle"}
                            onSubmitEditing={()=> this.refs.txtContent.focus()}
                            onChangeText={(text)=> this.setState({title: text})}
                        />
                    {/* <Label style={styles.labelText}>Info</Label> */}
                        <TextInput style={{ backgroundColor: '#F1F1F1', height: 109,
                                    borderRadius: 6,
                                    color: '#606060',
                                    fontSize: 15,
                                    lineHeight: 18,
                                    fontFamily: 'siemens_global_bold',
                                    marginBottom: 20,
                                    paddingHorizontal: 10,}} 
                            placeholder='Info...'
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
                    <View style={{flex:1,flexDirection: 'row'}}>
                        <View style={{flex: 1, paddingBottom: 10}}>
                            <Label style={styles.labelText}>Beginn</Label>
                            <DatePicker
                                    style={{ width: 100, borderColor: '#979797', borderRadius: 6, borderWidth: 2}}
                                    mode="time"
                                    is24Hour={true}
                                    date={this.state.from}
                                    //placeholder={this.ddate}
                                    format="HH:mm"
                                    minDate="2018-07-09"
                                    maxDate="2018-12-31"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    showIcon={true}
                                    //color='#009999'
                                    iconSource={require('../assets/time.png')}
                                    customStyles={{
                                        dateIcon: {
                                            //backgroundColor: '#979797'
                                            marginTop:0,
                                            marginRight: 10,
                                            width:25,
                                            height:25
                                        },
                                        dateInput: {
                                            //paddingTop: 8,
                                            borderWidth: 0,
                                            //color: this.state.colorfour,                                        
                                        },
                                        dateText: {
                                            //color: this.state.colorfour,
                                            color: '#979797',
                                            fontFamily: 'siemens_global_bold'
                                        },
                                        dateTouchBody: {
                                            //: '#009999'
                                        }
                                    // ... You can check the source to find the other keys.
                                    }}
                                    onDateChange={(datetime) => {this.setState({from: datetime})}}
                                />
                        </View>
                        <View style={{flex: 1}}>
                            <Label style={styles.labelText}>Ende</Label>
                            <DatePicker
                                    style={{ width: 100, borderColor: '#979797', borderRadius: 6, borderWidth: 2}}
                                    mode="time"
                                    is24Hour={true}
                                    date={this.state.to}
                                    //placeholder={this.ddate}
                                    format="HH:mm"
                                    minDate="2018-07-09"
                                    maxDate="2018-12-31"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    showIcon={true}
                                    //color='#009999'
                                    iconSource={require('../assets/time.png')}
                                    customStyles={{
                                        dateIcon: {
                                            //backgroundColor: '#979797'
                                            marginTop:0,
                                            marginRight: 10,
                                            width:25,
                                            height:25
                                        },
                                        dateInput: {
                                            //paddingTop: 8,
                                            borderWidth: 0,
                                            
                                        },
                                        dateText: {
                                            //color: this.state.coloreight,
                                            color: '#979797',
                                            fontFamily: 'siemens_global_bold'
                                        },
                                        dateTouchBody: {
                                            //: '#009999'
                                        }
                                    // ... You can check the source to find the other keys.
                                    }}
                                    onDateChange={(datetime) => {this.setState({to: datetime})}}
                                />
                        </View>
                    </View>
                    {/* <TouchableOpacity style={styles.buttonContainer} onPress={this._saveAufgabe(this.state.from, this.state.to, this.state.title, this.state.content)}>
                        <Text style={styles.buttonText}>Aufgabe erstellen</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={styles.buttonContainer} onPress={()=> this._saveAufgabe(this.state.from, this.state.to, this.state.title, this.state.content, this.state.type)}>
                        <Text style={styles.buttonText}>Speichern</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
        fontFamily: 'siemens_global_bold',
        marginBottom: 17,
        marginTop: 10,
        paddingHorizontal: 10,
        //borderWidth: 1, 
        //borderColor: 'lightgrey',
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
        fontFamily: 'siemens_global_bold',
    }
});

//make this component available to the app
export default AufgabeBearbeiten;
