//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, ToastAndroid, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Label } from 'native-base';


const globalState = {}; // https://stackoverflow.com/questions/44227235/global-state-in-react-native
export const StoreCus = (obj) => {
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
// create a component
class Kundenauswahl extends Component {
    constructor(props) {
        super(props);
        this.state= {
            kunden: this.props.navigation.state.params.kunden,
        }
    }
    static navigationOptions = {
        headerTitle: <Text style={{ fontFamily: 'siemens_global_bold',fontSize: 28, lineHeight: 34, color: "#009999", left: 20}}>Kunde auswählen</Text>,
    }
    _choseCustomer(name, city) {
        StoreCus({type: 'set', key:'ok', value: name + ", " + city});
        console.log(StoreCus({type: 'get', key: 'ok'}));
        this.props.navigation.goBack();
    }
    // StoreGlobal({type: 'set', key:'ok', value: responseData.fixedHash});
    //         console.log("store", StoreGlobal({type: 'get', key: 'ok'}))  ;
    render() {
        return (
           <View>
               <FlatList
                    style={{backgroundColor: 'white', alignSelf: 'stretch', alignContent: 'stretch', marginTop: 10}} // https://stackoverflow.com/questions/33297367/100-width-in-react-native-flexbox
                    data={this.state.kunden}
                    renderItem={({item}) =>
                    <View style={{backgroundColor: '#f5f5f5'}}>
                        <View style={{paddingLeft: 18}}>
                            <Text onPress={() => this._choseCustomer(item.name, item.city)} style={{fontFamily: 'siemens_global_bold', fontSize: 16, lineHeight: 24, paddingTop: 9}}>{item.name}</Text>
                            <Text onPress={() => this._choseCustomer(item.name, item.city)} style={{fontFamily: 'siemens_global_roman', fontSize: 12, lineHeight: 20, color: '#505050'}}>{item.street}</Text>
                            <Text onPress={() => this._choseCustomer(item.name, item.city)} style={{fontFamily: 'siemens_global_roman', fontSize: 12, lineHeight: 20, color: '#505050', paddingBottom: 13}}>{item.plz}, {item.city}</Text>
                            </View>
                        <View style={{borderBottomColor: '#EAEAEA', borderBottomWidth: 1}}></View>
                    </View> 
                    }
                    keyExtractor={item => Math.random().toString()}
                    titleStyle={{fontFamily: 'siemens_global_bold', fontSize: 16, lineHeight: 24, backgroundColor: 'white' }}
                />
           </View>
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
export default Kundenauswahl;
