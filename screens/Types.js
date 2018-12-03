//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, ToastAndroid, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Label } from 'native-base';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from "graphql-tag";

const client = new ApolloClient({
    link: new HttpLink({
      uri: "https://api.graph.cool/simple/v1/cjna4ydca59580129beayc2nw"
    }),
    cache: new InMemoryCache()
});

const globalState = {}; // https://stackoverflow.com/questions/44227235/global-state-in-react-native
export const StoreTyp = (obj) => {
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
class Types extends Component {
    constructor(props) {
        super(props);
        this.state= {
            types: [],
        }
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

    static navigationOptions = {
        headerTitle: <Text style={{ fontFamily: 'siemens_global_bold',fontSize: 28, lineHeight: 34, color: "#009999", left: 20}}>Typ auswählen</Text>,
    }
    _choseType(name) {
        StoreTyp({type: 'set', key:'ok', value: name});
        console.log(StoreTyp({type: 'get', key: 'ok'}));
        this.props.navigation.goBack();
    }
    // StoreGlobal({type: 'set', key:'ok', value: responseData.fixedHash});
    //         console.log("store", StoreGlobal({type: 'get', key: 'ok'}))  ;
    render() {
        return (
           <View>
               <FlatList
                    style={{backgroundColor: 'white', alignSelf: 'stretch', alignContent: 'stretch', marginTop: 10}} // https://stackoverflow.com/questions/33297367/100-width-in-react-native-flexbox
                    data={this.state.types}
                    renderItem={({item}) =>
                    <View style={{backgroundColor: '#f5f5f5'}}>
                        <View style={{paddingLeft: 18, borderLeftColor: item.color, borderLeftWidth: 5, height: 50, flex: 1}}>
                            <Text onPress={() => this._choseType(item.name)} style={{fontFamily: 'siemens_global_bold', fontSize: 16, lineHeight: 24, paddingTop: 9}}>{item.name}</Text>
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
export default Types;
