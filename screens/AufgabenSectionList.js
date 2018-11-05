//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, SectionList, ScrollView, RefreshControl, DeviceEventEmitter, TouchableOpacity, FlatList } from 'react-native';
import { Button, Icon, List, Content } from 'native-base';
import Moment from 'react-moment';
import moment from 'moment';
import Modal from 'react-native-modal';
import {StoreGlobal} from './WelcomeScreen';

// const Right = ({onPress}) => {
//     <TouchableOpacity onPress={onPress}>
//         <Icon name='md-log-out' style={{height: 28, width: 28, marginRight: 13, color: '#009999' }}></Icon>
//     </TouchableOpacity>
// };

// create a component
class AufgabenSectionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataT: [],
            dataY: [],
            dataW: [],
            aufgaben: [],
            currDate: '',
            currDateF: '',
            currDateT: '',
            yesterday: '',
            wocheA: '',
            wocheE: '',
            refreshing: false,
            isModalVisible: false,
            fixedHash: '9FFKqvr-iOfrwRkr48TCm-xqf6zjWUQqu063E9X3fRek9peiqq-edilVWGhRVMlweHR4',
            //fixedHash: StoreGlobal({type: 'get', key: 'ok'}),
        }
        console.log("hashhash", this.state.fixedHash);
        DeviceEventEmitter.addListener('refresh', (e) => {
            this._onRefresh();
            // setTimeout(function(){
            //     console.log("It worked!");
            // }, 1000);
            
        });
    }
    static navigationOptions =({navigation}) => {
        // tabBarIcon: ({tintColor}) => (
        //     //<Image source={require('../icons/large/baseline_assignment_black_18dp.png')} style={{height: 25, width: 25}}/>
        //     <Icon name='baseline-assignment' style={{height: 25, width: 25, color: tintColor}}/>
        // ),
        //const params = navigation.state.params || {}
        //console.log("param", params);
        // const { navigation } = this.props;
        // const fixedHash = navigation.getParam('hash', 'asdf');
        // console.log(fixedHash);
        //this.setState({fixedHash: params.hash})
        return {
            drawerLabel: 'Aufgaben',
            title: 'Aufgaben',
            headerTitle: <Text style={{ fontFamily: 'siemens_global_bold',fontSize: 28, lineHeight: 34, color: "#009999", left: 20}}>Aufgaben</Text>,
            headerTintColor: '#009999',
            headerTitleStyle: {
                fontSize: 28,
                lineHeight: 34,
                fontFamily: 'siemens_global_bold',
            },
            headerStyle: {
                height: 75,
                elevation: 0,
            },
            // header: ({ goBack }) => ({
            //     headerRight: <Right onPress={goBack} />,
            // }),
            //header: null,
            headerRight: 
                <TouchableOpacity onPress={() => navigation.navigate('ModalScreen')}>
                    <Icon name='md-log-out' style={{height: 28, width: 28, marginRight: 13, color: '#009999' }}></Icon>
                </TouchableOpacity>,
            }
    }
    _toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    }
    componentWillMount() {
        var date = new Date().getDate();
        var month = new Date().getMonth()+1;
        var year = new Date().getFullYear();
        var d = new Date();
        console.log(d);
        // var tag = moment(new Date().getDate());
        // var monat = moment(new Date().getMonth()+1);
        // var jahr = moment(new Date().getFullYear());
        // var datum = jahr+"-"+monat+"-"+tag;
        // console.log(datum);
        var yesterday = moment(d).subtract(1, 'day').format('YYYY-MM-DD');
        console.log(yesterday);
        var j = parseInt(yesterday.substring(0, 4), 10);
        var m = parseInt(yesterday.substring(5, 7), 10);
        var t = parseInt(yesterday.substring(8, 10), 10);
        this.setState({yesterday: yesterday});
        console.log("yesterday", yesterday);
        console.log(j, m, t);
        //var h = moment(new Date());
        //var yesterday = moment(new Date()).subtract(1, 'day').format('YYYY-MM-DD');
        //var yesterdayT = moment(new Date()).subtract(1, 'day').format('YYYY-MM-DD');
        //console.log(yesterdayF);
        //console.log(yesterdayT);
        //h.subtract(1, 'day');
        //console.log(m);
        //console.log(d);
        var day = year+"-"+month+"-"+date;
        // var ddate = year+"-"+month+"-"+date+'T00:00:00+01:00';
        // var dddate = year+"-"+month+"-"+date+'T23:59:59+01:00';
        // //console.log(ddate);
        // //console.log(dddate);
        this.setState({currDate: day});
        console.log("currdate", this.state.currDate);
        console.log(day);

        var tag = moment(new Date().getDate());
        var monat = moment(new Date().getMonth()+1);
        var jahr = moment(new Date().getFullYear());
        var datum = jahr+"-"+monat+"-"+tag;
        var heute = moment(new Date()).format('YYYY-MM-DD');
        console.log(heute);
        this.setState({currDate: heute});
        var morgen = moment(heute).add(1, 'day').format('YYYY-MM-DD');
        console.log(morgen);
        // this.setState({currDateF: ddate});
        // this.setState({currDateF: ddate});
        // //console.log(date);
        // var ddate = new Date() -1;
        // console.log(ddate.toLocaleString());
        fetch('https://asc.siemens.at/datagate/external/Calendar/search', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "fixedHash": this.state.fixedHash,
                "from": '2018-10-5T00:00:00+02:00',
                "to": '2018-10-5T23:59:59+02:00',
            }),
        })
        .then(response => (response.json()))
        .then(aufgaben => {
            //this._color(aufgaben);
            this.setState({aufgaben: aufgaben});
            //console.log(aufgaben);
        })
        fetch('https://asc.siemens.at/datagate/external/Calendar/search', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "fixedHash": this.state.fixedHash,
                "from": heute+'T00:00:00+01:00',
                "to": morgen+'T23:59:59+01:00',
            }),
        })
        .then(response => (response.json()))
        .then(aufgaben => {
            //this._color(aufgaben);
            this.setState({dataT: aufgaben});
            if (this.state.dataT.length === 0) {
                this.state.dataT.push({
                    title: 'Kein Eintrag vorhanden',
                    content: '',
                    from: heute+'T00:00:00+01:00',
                    to: heute+'T00:00:00+01:00',
                    type: 'Visit',
                })
            }
            //console.log(aufgaben);
        })
        fetch('https://asc.siemens.at/datagate/external/Calendar/search', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "fixedHash": this.state.fixedHash,
                "from": j+"-"+m+"-"+t+'T00:00:00+01:00',
                "to": j+"-"+m+"-"+t+'T23:59:59+01:00',
            }),
        })
        .then(response => (response.json()))
        .then(aufgaben => {
            //this._color(aufgaben);
            this.setState({dataY: aufgaben});
            //console.log(aufgaben);
        })
        var wocheA = moment().day(1).utc().format('YYYY-MM-DD');
        var wocheE = moment().day(7).utc().format('YYYY-MM-DD');
        var TagInWoche = moment(new Date()).format('YYYY-MM-DD');
        if (moment().day(0).utc().format('YYYY-MM-DD') === TagInWoche) {
            wocheA = moment().day(-6).utc().format('YYYY-MM-DD');
            wocheE = moment().day(0).utc().format('YYYY-MM-DD');
        } else {
            wocheA = moment().day(1).utc().format('YYYY-MM-DD');
            wocheE = moment().day(7).utc().format('YYYY-MM-DD');
        }
        this.setState({wocheA: wocheA});
        this.setState({wocheE: wocheE});
        //console.log(wocheA, wocheE, TagInWoche);

        fetch('https://asc.siemens.at/datagate/external/Calendar/search', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "fixedHash": this.state.fixedHash,
                "from": wocheA + 'T00:00:00+02:00',
                "to":wocheE + "T23:59:59+02:00",
            }),
        })
        .then(response => (response.json()))
        .then(aufgaben => {
            //this._color(aufgaben);
            this.setState({dataW: aufgaben});
            //console.log(aufgaben);
        })
    }
    _onRefresh=() => {
        this.setState({refreshing: true});
        var date = new Date().getDate();
        var month = new Date().getMonth()+1;
        var year = new Date().getFullYear();
        var d = new Date();
        console.log(d);
        // var tag = moment(new Date().getDate());
        // var monat = moment(new Date().getMonth()+1);
        // var jahr = moment(new Date().getFullYear());
        // var datum = jahr+"-"+monat+"-"+tag;
        // console.log(datum);
        var yesterday = moment(d).subtract(1, 'day').format('YYYY-MM-DD');
        console.log(yesterday);
        var j = parseInt(yesterday.substring(0, 4), 10);
        var m = parseInt(yesterday.substring(5, 7), 10);
        var t = parseInt(yesterday.substring(8, 10), 10);
        this.setState({yesterday: yesterday});
        console.log("yesterday", yesterday);
        console.log(j, m, t);
        //var h = moment(new Date());
        //var yesterday = moment(new Date()).subtract(1, 'day').format('YYYY-MM-DD');
        //var yesterdayT = moment(new Date()).subtract(1, 'day').format('YYYY-MM-DD');
        //console.log(yesterdayF);
        //console.log(yesterdayT);
        //h.subtract(1, 'day');
        //console.log(m);
        //console.log(d);
        var day = year+"-"+month+"-"+date;
        // var ddate = year+"-"+month+"-"+date+'T00:00:00+01:00';
        // var dddate = year+"-"+month+"-"+date+'T23:59:59+01:00';
        // //console.log(ddate);
        // //console.log(dddate);
        this.setState({currDate: day});
        console.log("currdate", this.state.currDate);
        console.log(day);

        var tag = moment(new Date().getDate());
        var monat = moment(new Date().getMonth()+1);
        var jahr = moment(new Date().getFullYear());
        var datum = jahr+"-"+monat+"-"+tag;
        var heute = moment(new Date()).format('YYYY-MM-DD');
        console.log(heute);
        this.setState({currDate: heute});
        var morgen = moment(heute).add(1, 'day').format('YYYY-MM-DD');
        console.log(morgen);
        // this.setState({currDateF: ddate});
        // this.setState({currDateF: ddate});
        // //console.log(date);
        // var ddate = new Date() -1;
        // console.log(ddate.toLocaleString());
        fetch('https://asc.siemens.at/datagate/external/Calendar/search', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "fixedHash": this.state.fixedHash,
                "from": '2018-10-5T00:00:00+02:00',
                "to": '2018-10-5T23:59:59+02:00',
            }),
        })
        .then(response => (response.json()))
        .then(aufgaben => {
            //this._color(aufgaben);
            this.setState({aufgaben: aufgaben});
            //console.log(aufgaben);
        })
        fetch('https://asc.siemens.at/datagate/external/Calendar/search', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "fixedHash": this.state.fixedHash,
                "from": heute+'T00:00:00+01:00',
                "to": morgen+'T23:59:59+01:00',
            }),
        })
        .then(response => (response.json()))
        .then(aufgaben => {
            //this._color(aufgaben);
            this.setState({dataT: aufgaben});
            if (this.state.dataT.length === 0) {
                this.state.dataT.push({
                    title: 'Kein Eintrag vorhanden',
                    content: '',
                    from: year+"-"+month+"-"+date+'T00:00:00+02:00',
                    to: year+"-"+month+"-"+date+'T00:00:00+02:00',
                    type: 'Visit',
                })
            }
            //console.log(aufgaben);
        })
        fetch('https://asc.siemens.at/datagate/external/Calendar/search', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "fixedHash": this.state.fixedHash,
                "from": j+"-"+m+"-"+t+'T00:00:00+01:00',
                "to": j+"-"+m+"-"+t+'T23:59:59+01:00',
            }),
        })
        .then(response => (response.json()))
        .then(aufgaben => {
            //this._color(aufgaben);
            this.setState({dataY: aufgaben});
            //console.log(aufgaben);
        })
        var wocheA = moment().day(1).utc().format('YYYY-MM-DD');
        var wocheE = moment().day(7).utc().format('YYYY-MM-DD');
        var TagInWoche = moment(new Date()).format('YYYY-MM-DD');
        if (moment().day(0).utc().format('YYYY-MM-DD') === TagInWoche) {
            wocheA = moment().day(-6).utc().format('YYYY-MM-DD');
            wocheE = moment().day(0).utc().format('YYYY-MM-DD');
        } else {
            wocheA = moment().day(1).utc().format('YYYY-MM-DD');
            wocheE = moment().day(7).utc().format('YYYY-MM-DD');
        }
        this.setState({wocheA: wocheA});
        this.setState({wocheE: wocheE});
        //console.log(wocheA, wocheE, TagInWoche);

        fetch('https://asc.siemens.at/datagate/external/Calendar/search', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "fixedHash": this.state.fixedHash,
                "from": wocheA + 'T00:00:00+02:00',
                "to":wocheE + "T23:59:59+02:00",
            }),
        })
        .then(response => (response.json()))
        .then(aufgaben => {
            //this._color(aufgaben);
            this.setState({dataW: aufgaben});
            //console.log(aufgaben);
        })
        this.setState({refreshing: false});
    }
    _timefunction(to, from) {
        var to = to;
        var from = from;
        to = to.substring(11,16);
        from = from.substring(11,16);
        return from + " - " + to;
    }
    _detail(item) {
        if (item.title === "Kein Eintrag vorhanden") {
            this.props.navigation.navigate("AufgabeErstellenNeu", {aufgaben: this.state.aufgaben})
        } else {
            this.props.navigation.navigate("Detail", {title: item.title, content : item.content, type: item.type, from: item.from, to: item.to})
        }
    }
    renderItem = ({item}) => {
        if (item.title === "Kein Eintrag vorhanden") {
            return (
                <View>
                    <View style={{paddingLeft: 18, borderBottomWidth: 1, borderBottomColor: '#EEEEEE', backgroundColor: '#fff'}}>
                        <Text onPress={() => this._detail(item)} style={{fontSize: 16, lineHeight: 24, paddingTop: 9, fontFamily: 'siemens_global_bold'}}>
                            {item.title}
                        </Text>
                        <Text onPress={() => this._detail(item)} style={{ fontSize: 12, lineHeight: 12, color: '#505050', fontFamily: 'siemens_global_roman'}}>
                            {item.type}
                        </Text>
                        <Text onPress={() => this._detail(item)} style={{ fontSize: 12, lineHeight: 20, color: '#505050', paddingBottom: 13, fontFamily: 'siemens_global_roman'}}>
                            {item.from.substring(8, 10)}.{item.from.substring(5,7)}.{item.from.substring(0, 4)}
                        </Text>
                    </View>
                    <View style={{position: 'absolute', right: 20, justifyContent: 'center', alignItems: 'center', top: 27}}>
                        <Text onPress={() => this._detail(item)} style={{ fontSize: 14, lineHeight: 24, color: '#505050', fontFamily: 'siemens_global_roman'}}>{this._timefunction(item.to, item.from)}</Text>
                    </View>
                {/* <View style={{borderBottomWidth: 1, borderBottomColor: '#EAEAEA'}}></View> */}
                </View>
            )
        } else {
            return (
                <View>
                    <View style={{paddingLeft: 18, borderBottomWidth: 1, borderBottomColor: '#EEEEEE', backgroundColor: '#fff'}}>
                        <Text onPress={() => this._detail(item)} style={{fontSize: 16, lineHeight: 24, paddingTop: 9, fontFamily: 'siemens_global_bold'}}>
                            {item.title}
                        </Text>
                        <Text onPress={() => this._detail(item)} style={{ fontSize: 12, lineHeight: 12, color: '#505050', fontFamily: 'siemens_global_roman'}}>
                            {item.type}
                        </Text>
                        <Text onPress={() => this._detail(item)} style={{ fontSize: 12, lineHeight: 20, color: '#505050', paddingBottom: 13, fontFamily: 'siemens_global_roman'}}>
                        {item.from.substring(8, 10)}.{item.from.substring(5,7)}.{item.from.substring(0, 4)}
                        </Text>
                    </View>
                    <View style={{position: 'absolute', right: 20, justifyContent: 'center', alignItems: 'center', top: 27}}>
                        <Text onPress={() => this._detail(item)} style={{ fontSize: 14, lineHeight: 24, color: '#505050', fontFamily: 'siemens_global_roman'}}>{this._timefunction(item.to, item.from)}</Text>
                    </View>
                {/* <View style={{borderBottomWidth: 1, borderBottomColor: '#EAEAEA'}}></View> */}
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
        // const { navigation } = this.props;
        // const fixedHash = navigation.getParam('hash', 'asdf');
        // console.log(fixedHash);
        return ( //https://doc.ebichu.cc/react-native/releases/0.44/docs/sectionlist.html
            <View style={{flex: 1}}
            // refreshControl={
            //     <RefreshControl
            //         refreshing={this.state.refreshing}
            //         onRefresh={this._onRefresh}
            //     />
            // }
            >
                {/* <ScrollView style={{backgroundColor: '#fff', top: 0, ren}}
                    refreshControl= {
                        <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                    }
                /> */}
                    {/* <List
                    refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
                        /> */}
                        
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
                                backgroundColor: '#009999',
                                color: '#fff',
                                title: 'Heute ' + '('+this.state.currDate.substring(8, 10) +"."+ this.state.currDate.substring(5, 7) +"."+  this.state.currDate.substring(0, 4)+')',
                                data: this.state.dataT,
                            },
                            {
                                id: 1,
                                //key: 1,
                                backgroundColor: '#EAEAEA',
                                color: '#505050',
                                title: 'Gestern ' + '('+this.state.yesterday.substring(8, 10) +"."+ this.state.yesterday.substring(5, 7) +"."+  this.state.yesterday.substring(0, 4)+')',
                                data: this.state.dataY,
                            },
                            {
                                id: 2,
                                //key: 2,
                                backgroundColor: '#EAEAEA',
                                color: '#505050',
                                title: 'Diese Woche ' + '('+this.state.wocheA.substring(8, 10) +"."+ this.state.wocheA.substring(5, 7) +"."+  this.state.wocheA.substring(0, 4) + ' bis ' + this.state.wocheE.substring(8, 10) +"."+ this.state.wocheE.substring(5, 7) +"."+  this.state.wocheE.substring(0, 4) + ')',
                                data: this.state.dataW,
                            },
                        ]}
                        renderItem={this.renderItem}
                        renderSectionHeader={({section}) => <Text style={{backgroundColor: section.backgroundColor, color: section.color, height: 38, width: '100%', fontSize: 14, lineHeight: 24, fontFamily: 'siemens_global_bold', paddingLeft: 16, paddingVertical: 7}}>{section.title}</Text>}
                        //keyExtractor={extractKey}
                    />
                {/* </Content> */}
                {/* </ScrollView> */}
                <Button style={styles.button} onPress={() => this.props.navigation.navigate('AufgabeErstellenNeu', {aufgaben: this.state.aufgaben})}> 
                    <Icon active name="add" style={{color:'white', fontSize: 30}}/> 
                </Button>
                <Modal isVisible={this.state.isModalVisible}>
                    <Text>Wollen Sie wirklich ausgeloggt werden?</Text>
                    <TouchableOpacity onPress={() =>this.props.navigate.goBack()}>
                        <Text>Ja</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._toggleModal}>
                        <Text>Nein</Text>
                    </TouchableOpacity>
                </Modal>
            </View>
        );
    }
}

//const extractKey = ({id}) => id
// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    button : {
        width: 77,
        height: 77,
        backgroundColor: '#009999',
        borderRadius: 100,
        margin: 5,
        position: 'absolute',
        alignSelf: 'flex-end',
        bottom: 15, 
        borderRadius: 77/2, justifyContent: 'center',
        right: 15,
    },
});

//make this component available to the app
export default AufgabenSectionList;
