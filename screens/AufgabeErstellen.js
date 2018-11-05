//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ToastAndroid, DeviceEventEmitter} from 'react-native';

import DatePicker from 'react-native-datepicker'; // https://github.com/xgfe/react-native-datepicker
import { Label, Toast, Item } from 'native-base';
//import DateTimePicker from 'react-native-modal-datetime-picker';

// create a component
class AufgabeErstellen extends Component {
    _showCurrentDate=()=>{
        var date = new Date().getDate();
        var month = new Date().getMonth();
        var year = new Date().getFullYear();

        var ddate = year+"-"+month+"-"+date+" 08:30";
        console.log(this.ddate);
    }
    // _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    // _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
  
    // _handleDatePicked = (date) => {
    //   console.log('A date has been picked: ', date);
    //   this.setState({from: date})
    //   this._hideDateTimePicker();
    // };
    constructor(props) {
        super(props);
        this.state = {
            from: this.ddate,
            to: this.ddate,
            title: '',
            content: '',
            showToast: true,
            //isDateTimePickerVisible: false,
            //cat: this.props.navigation.state.params.cat,
            //refreshing: false
            aufgaben: this.props.navigation.state.params.aufgaben,
        };
        // DeviceEventEmitter.addListener('refresh', (e) => {
        //     this._onRefresh();
        //     //this._onRefresh();
        //     setTimeout(function(){
        //         console.log("cat");
        //     }, 1000);
            
        // });
    }
    componentDidMount() {
        fetch('https://asc.siemens.at/datagate/external/Calendar/planned', {
            method: 'GET',
            headers: { 
            'userhash': 'hKjxQjF7-h4mffXGYvX8QytA5b7q3BqkGcJ92Y-FQkLk28FSF8Z0OIybGXVGfmcBeHR4',
            'Content-Type': 'application/json',
            },
        })
        .then(response => (response.json()))
        .then((responseData) => {
            console.log(responseData)
            //ToastAndroid.showWithGravity("Task erstellt", ToastAndroid.LONG, ToastAndroid.BOTTOM);
            //DeviceEventEmitter.emit('refresh');
            //this.props.navigation.navigate('Aufgaben' ,{refresh: true});
            this.setState({from: responseData.from});
            this.setState({to: responseData.to});
            this.setState({title: responseData.title});
            this.setState({content: responseData.content});
        }).catch((error) => {
            console.error(error);
            //ToastAndroid.showWithGravity("Fehler", ToastAndroid.LONG, ToastAndroid.BOTTOM);
        });
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
        if (this._vorhanden(from) === true) {
            ToastAndroid.showWithGravity("Bereits Eintrag um diese Zeit vorhanden", ToastAndroid.LONG, ToastAndroid.BOTTOM);
        } else if (from === to) {
            ToastAndroid.showWithGravity("Beginn und Ende identisch", ToastAndroid.LONG, ToastAndroid.BOTTOM);
        } else if (title!= "" && content != ""){
            fetch('https://asc.siemens.at/datagate/external/Calendar/create', {
            method: 'POST',
            headers: { 
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            "fixedHash":"hKjxQjF7-h4mffXGYvX8QytA5b7q3BqkGcJ92Y-FQkLk28FSF8Z0OIybGXVGfmcBeHR4",
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
            DeviceEventEmitter.emit('refresh');
            this.props.navigation.navigate('Aufgaben' ,{refresh: true});
        }).catch((error) => {
            console.error(error);
            ToastAndroid.showWithGravity("Fehler", ToastAndroid.LONG, ToastAndroid.BOTTOM);
        });
        } else {
            ToastAndroid.showWithGravity("Fehler", ToastAndroid.LONG, ToastAndroid.BOTTOM);
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
        // if (title != "" && content != "") {
        // } else {
        //     //console.error(error);
        //     ToastAndroid.showWithGravity("Fehler", ToastAndroid.LONG, ToastAndroid.BOTTOM);
        // }
    // componentDidMount() {
    //         //var cat ="";
    //         //this.setState({cat: category});
    //         this.setState({cat: this.props.navigation.state.params.cat});
    //         console.log(this.state.cat);
    // }
    render() {
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
            <ScrollView>
                <View style={{marginTop: 18, paddingLeft: 18, paddingRight: 18, paddingBottom: 10, backgroundColor: '#fff'}}>
                    <Label style={{paddingTop: 18, fontSize: 18, marginBottom: 10}}>Ort/Kunde</Label>
                        <TextInput style={styles.input} 
                            placeholder='Ort/Kunde'
                            value={this.state.title}
                            placeholderTextColor='#505050'
                            returnKeyType='next'
                            autoCorrect={false}
                            ref={"txtTitle"}
                            onSubmitEditing={()=> this.refs.txtContent.focus()}
                            onChangeText={(text)=> this.setState({title: text})}
                        />
                    <Label style={styles.labelText}>Info</Label>
                        <TextInput style={{ backgroundColor: '#fff', color: '#000000', marginBottom: 20, paddingHorizontal: 10, borderWidth: 1, borderColor: 'lightgrey'}} 
                            placeholder='Info'
                            value={this.state.content}
                            multiline = {true}
                            numberOfLines = {4}
                            placeholderTextColor='#505050'
                            returnKeyType='next'
                            autoCorrect={false}
                            ref={"txtContent"}
                            onChangeText={(text)=> this.setState({content: text})}
                        />
                    <Label style={styles.labelText}>Typ: Visit</Label> 
                    <Label style={styles.labelText}>Beginn</Label>
                        <DatePicker
                            style={{width: 200, paddingBottom: 20}}
                            mode="datetime"
                            is24Hour={true}
                            date={this.state.from}
                            placeholder={this.ddate}
                            format="YYYY-MM-DD HH:mm"
                            minDate="2018-07-09"
                            maxDate="2018-12-31"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    width: 0,
                                    height: 0
                                },
                                dateInput: {
                                    
                                }
                            // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(datetime) => {this.setState({from: datetime})}}
                        />
                    <Label style={styles.labelText}>Ende</Label>
                        <DatePicker
                            style={{width: 200, paddingBottom: 20}}
                            mode="datetime"
                            is24Hour={true}
                            date={this.state.to}
                            placeholder={this.ddate}
                            format="YYYY-MM-DD HH:mm"
                            minDate="2018-07-09"
                            maxDate="2018-12-31"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    width: 0,
                                    height: 0
                                },
                                dateInput: {
                                    
                                }
                            // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(datetime) => {this.setState({to: datetime})}}
                        />
                    {/* <TouchableOpacity style={styles.buttonContainer} onPress={this._saveAufgabe(this.state.from, this.state.to, this.state.title, this.state.content)}>
                        <Text style={styles.buttonText}>Aufgabe erstellen</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={styles.buttonContainer} onPress={()=> this._saveAufgabe(this.state.from, this.state.to, this.state.title, this.state.content)}>
                        <Text style={styles.buttonText}>Absenden</Text>
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
        height: 40,
        backgroundColor: '#fff',
        color: '#000000',
        marginBottom: 20,
        paddingHorizontal: 10,
        borderWidth: 1, 
        borderColor: 'lightgrey',
    },
    buttonContainer: {
        backgroundColor: '#009999',
        paddingVertical: 15
    },
    buttonText: {
        textAlign: 'center',
        color : '#fff',
        fontWeight: 'bold',
        fontSize: 18
    },
    labelText: {
        fontSize: 18,
        marginBottom: 10
    }
});

//make this component available to the app
export default AufgabeErstellen;
