//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, ToastAndroid, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Label } from 'native-base';
import {StoreGlobal} from './WelcomeScreen';

// create a component
class LogScreen extends Component {
    constructor(props) {
        super(props);
        this.state= {
            number: this.props.navigation.state.params.ticketNumber,
            logs: [],
            currDate: '',
            refreshing: false,
            infoText: '',
            fixedHash: StoreGlobal({type: 'get', key: 'ok'}),
        }
        fetch('https://asc.siemens.at/datagate/external/mobileticket/logForTicket/'+ this.state.number, {
            method: 'GET',
            headers: { 
              'Content-Type': 'application/json',
              'userhash': this.state.fixedHash
            },
            // body: JSON.stringify({
            //   "fixedHash":"hKjxQjF7-h4mffXGYvX8QytA5b7q3BqkGcJ92Y-FQkLk28FSF8Z0OIybGXVGfmcBeHR4",
            //   "from":"2018-09-01T00:00:00+01:00",
            //   "to":"2018-12-31T23:59:59+01:00",
            // }),
        })
        .then(response => (response.json()))
        .then(logs => {
            //this._color(aufgaben);
            logs.reverse();
            this.setState({logs: logs});
            //logs.reverse();
            console.log(logs);
        }).catch((error) => {
            console.error(error);
            ToastAndroid.showWithGravity("Fehler aufgetreten", ToastAndroid.LONG, ToastAndroid.BOTTOM);
        });
    }
    // componentDidMount() {
        
    // }
    static navigationOptions = {
        headerTitle: <Text style={{ fontFamily: 'siemens_global_bold',fontSize: 28, lineHeight: 34, color: "#009999", left: 20}}>Log Eintrag</Text>,
    }
    _onRefresh = () => {
        this.setState({refreshing: true});
        fetch('https://asc.siemens.at/datagate/external/mobileticket/logForTicket/'+ this.state.number, {
            method: 'GET',
            headers: { 
              'Content-Type': 'application/json',
              'userhash': this.state.fixedHash
            },
            // body: JSON.stringify({
            //   "fixedHash":"hKjxQjF7-h4mffXGYvX8QytA5b7q3BqkGcJ92Y-FQkLk28FSF8Z0OIybGXVGfmcBeHR4",
            //   "from":"2018-09-01T00:00:00+01:00",
            //   "to":"2018-12-31T23:59:59+01:00",
            // }),
        })
        .then(response => (response.json()))
        .then(logs => {
            //this._color(aufgaben);
            logs.reverse();
            this.setState({logs: logs});
            this.setState({refreshing: false})
            console.log(logs);
        }).catch((error) => {
            console.error(error);
            ToastAndroid.showWithGravity("Fehler aufgetreten", ToastAndroid.LONG, ToastAndroid.BOTTOM);
        });
    }
    _update() {
        fetch('https://asc.siemens.at/datagate/external/mobileticket/update', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'userhash': this.state.fixedHash
            },
            'processData': false,
            //'data': "{\"id\":" + this.state.id+",\"event\":4,\"infoText\":\"" + this.state.infoText+ "\"}",
            body: JSON.stringify({
              "id":this.state.number,
              "event": 4,
              "infoText": this.state.infoText,
            }),
        })
        .then(response => (response.json()))
        .then(logupdate => {
            //this._color(aufgaben);
            //this.setState({logs: logs});
            this.setState({infoText: ''});
            console.log(logupdate);
            this._onRefresh();
            //this.props.navigation.navigate('Störungen');
        }).catch((error) => {
            console.error(error);
            ToastAndroid.showWithGravity("Fehler", ToastAndroid.LONG, ToastAndroid.BOTTOM);
        });
    }
    _currDate() {
        const date = new Date().getDate();
        const month = new Date().getMonth()+1;
        const year = new Date().getFullYear();

        const ddate = year+"-"+month+"-"+date;
        console.log(this.ddate);
        this.setState({currDate: ddate});
    }
    _dateDiff(date) {
        console.log(this.state.currDate - date);
        return this.state.currDate - date;
    }
    _date(date) {
        var year = date.substring(0,4);
        var month = date.substring(5, 7);
        var date = date.substring(8, 10);
        var time = date.substring(11, 16);
        var ddate = year + "-" + month + "-" + date + " " + time;
        console.log(ddate);
        return ddate;
    }
    render() {
        return (
            <ScrollView style={{backgroundColor: '#EAEAEA', padding:15}}>
                <View style={{backgroundColor: '#fff', paddingLeft: 18, paddingRight: 18, paddingBottom: 5,
                    paddingTop: 10,
                    borderRadius: 10,}}>
                    <View>
                        <Label style={styles.labelText}>Bemerkung</Label>
                        <TextInput
                            style={styles.input}
                            placeholder=''
                            //value={this.state.title}
                            placeholderTextColor='#505050'
                            //returnKeyType='next'
                            autoCorrect={false}
                            ref={"txtBemerkung"}
                            //onSubmitEditing={()=> this.refs.txtContent.focus()}
                            onChangeText={(text)=> this.setState({infoText: text})}
                        />
                        <TouchableOpacity onPress={() => this._update()} style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>Aktualisieren</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('Störungen')}>
                            <Text>Abbrechen</Text>
                        </TouchableOpacity> */}
                    </View>
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
                        style={{backgroundColor: 'white', alignSelf: 'stretch', alignContent: 'stretch', marginTop: 10}} // https://stackoverflow.com/questions/33297367/100-width-in-react-native-flexbox
                        data={this.state.logs}
                        renderItem={({item}) =>
                        <View style={{backgroundColor: '#f5f5f5'}}>
                            <View style={{paddingLeft: 18}}>
                                <Text style={{fontFamily: 'siemens_global_bold', fontSize: 16, lineHeight: 24, paddingTop: 9}}>{item.name}</Text>
                                <Text style={{fontFamily: 'siemens_global_roman', fontSize: 12, lineHeight: 20, color: '#505050'}}>{item.value}</Text>
                                <Text style={{fontFamily: 'siemens_global_roman', fontSize: 12, lineHeight: 20, color: '#505050', paddingBottom: 13}}>– {item.by} am {item.at.substring(0, 10)} {item.at.substring(11, 16)}</Text>
                                </View>
                            <View style={{borderBottomColor: '#EAEAEA', borderBottomWidth: 1}}></View>
                        </View> 
                        }
                        keyExtractor={item => Math.random().toString()}
                        titleStyle={{fontFamily: 'siemens_global_bold', fontSize: 16, lineHeight: 24, backgroundColor: 'white' }}
                    />
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
        fontSize: 18,
        marginBottom: 10,
        fontFamily: 'siemens_global_bold',
        fontSize: 15,
    },
    input: {
        height: 50,
        backgroundColor: '#fff',
        color: '#000000',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

//make this component available to the app
export default LogScreen;
