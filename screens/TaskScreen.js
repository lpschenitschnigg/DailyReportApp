//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, SectionList, RefreshControl } from 'react-native';
import {Button, Icon} from 'native-base'; 
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from "graphql-tag";
import { Segment } from 'expo';
const client = new ApolloClient({
    link: new HttpLink({
      uri: "https://api.graph.cool/simple/v1/cjna4ydca59580129beayc2nw"
    }),
    cache: new InMemoryCache()
});
// create a component
class TaskScreen extends Component {
    static navigationOptions = {
        drawerLabel: 'Tasks',
        title: 'Tasks',
        headerTintColor: '#009999',
        headerTitle: <Text style={{ fontFamily: 'siemens_global_bold',fontSize: 28, lineHeight: 34, color: "#009999", left: 20}}>Tasks</Text>,
        headerStyle: {
            height: 75,
            elevation: 0,
        },
    }
    constructor(props) {
        super(props)
        this.state = {
            cards: [],
            dataBregenz: [],
            dataDornbirn: [],
            dataHohenems: [],
            dataFeldkirch: [],
            dataBludenz: [],
            refreshing: false,
            fixedHash: '9FFKqvr-iOfrwRkr48TCm-xqf6zjWUQqu063E9X3fRek9peiqq-edilVWGhRVMlweHR4',

        }
        // client.query({
        //     query: gql`
        //     {
        //         allTrelloCards(filter: {laneId: "cjooe47t3ko4s0167fvd0aoc3"}) {
        //             id
        //             title
        //             laneId
        //         }
        //     }
        //     `
        // }).then(result => {
        //     console.log(result);
        //     this.setState({cards: result.data.allTrelloCards});
        //     console.log(this.state.cards);

        // });
        // DeviceEventEmitter.addListener('refresh', (e) => {
        //     this._onRefresh();
        //     // setTimeout(function(){
        //     //     console.log("It worked!");
        //     // }, 1000);
            
        // });
        Segment.track('Task Screen');
    }
    componentWillMount() {
        client.query({
            query: gql`
            {
                allTrelloCards(filter: {laneId: "cjooe47t3ko4s0167fvd0aoc3"}) {
                    id
                    title
                    laneId
                }
            }
            `
        }).then(result => {
            console.log(result);
            this.setState({cards: result.data.allTrelloCards});
            console.log(this.state.cards);

        });
        fetch('https://asc.siemens.at/datagate/external/Calendar/search', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "fixedHash": this.state.fixedHash,
                "from": '2018-09-01T00:00:00+02:00',
                "to": '2018-12-31T23:59:59+02:00',
            }),
        })
        .then(response => (response.json()))
        .then(aufgaben => {
            //this._color(aufgaben);
            this.setState({aufgaben: aufgaben});
            //console.log(aufgaben);
        })
        // this.state.dataBregenz.push({
        //     title: 'Hak-Bregenz',
        //     content: 'Reperatur Heizung',
        //     address: 'Hinterfeldgasse 19, 6900 Bregenz',
        // })
        // this.state.dataDornbirn.push({
        //     title: 'Sparkasse Dornbirn',
        //     content: 'Reperatur Heizung',
        //     address: 'Sparkassenplatz 1, 6850 Dornbirn',
        // })
        // this.state.dataHohenems.push({
        //     title: 'Palast Hohenems',
        //     content: 'Reperatur Heizung',
        //     address: 'Schloßpl. 8, 6845 Hohenems',
        // })
        // this.state.dataFeldkirch.push({
        //     title: 'Schattenburg',
        //     content: 'Reperatur Heizung',
        //     address: 'Burggasse 1, 6800 Feldkirch',
        // })
        // this.state.dataBludenz.push({
        //     title: 'Fohren Center - Wirtshaus Kohldampf Strike Bowling Lasertag Bar',
        //     content: 'Reperatur Heizung',
        //     address: 'Werdenbergerstraße 53, 6700 Bludenz',
        // })
    }
    _onRefresh=() => {
        this.setState({refreshing: true});
        const client = new ApolloClient({
            link: new HttpLink({
              uri: "https://api.graph.cool/simple/v1/cjna4ydca59580129beayc2nw"
            }),
            cache: new InMemoryCache()
        });
        client.query({
            query: gql`
            {
                allTrelloCards(filter: {laneId: "cjooe47t3ko4s0167fvd0aoc3"}) {
                    id
                    title
                    laneId
                }
            }
            `
        }).then(result => {
            console.log(result);
            this.setState({cards: []});
            this.setState({cards: result.data.allTrelloCards});
            console.log(this.state.cards);

        });
        fetch('https://asc.siemens.at/datagate/external/Calendar/search', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "fixedHash": this.state.fixedHash,
                "from": '2018-09-01T00:00:00+02:00',
                "to": '2018-12-31T23:59:59+02:00',
            }),
        })
        .then(response => (response.json()))
        .then(aufgaben => {
            //this._color(aufgaben);
            this.setState({aufgaben: aufgaben});
            //console.log(aufgaben);
        })
        this.setState({refreshing: false});
    }
    renderItem = ({item}) => {
        return (
            <View>
                {/* <Button onPress={() => this.props.navigation.navigate('TagesmeldungAusTask')}> 
                    <Icon active name="md-checkmark" style={{color:'white', fontSize: 30}}/> 
                </Button> */}
                <View style={{paddingLeft: 18, borderBottomWidth: 1, borderBottomColor: '#EEEEEE', backgroundColor: '#fff', paddingBottom:15}}>
                    <Text style={{fontSize: 16, lineHeight: 24, paddingTop: 12, fontFamily: 'siemens_global_bold'}}>
                        {item.title}
                    </Text>
                    {/* <Text style={{ fontSize: 12, lineHeight: 12, color: '#505050', fontFamily: 'siemens_global_roman'}}>
                        {item.content}
                    </Text>
                    <Text style={{ fontSize: 12, lineHeight: 16, color: '#505050', fontFamily: 'siemens_global_roman'}}>
                        {item.address}
                    </Text> */}
                </View>
                <Button style={{backgroundColor: '#fff', position: "absolute", right: 5, borderWidth: 0 }}onPress={() => this.props.navigation.navigate('TagesmeldungAusTask', {title: item.title, id: item.id, aufgaben: this.state.aufgaben})}> 
                    <Icon active name="md-checkmark" style={{color:'#009999', fontSize: 30}}/> 
                </Button>
            </View>
        )
    }
    renderSectionHeader = ({section}) => {
        return (
            <Text>
                {section.title}
            </Text>
        )
    }
    render() {
        
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
                        // {
                        //     id: 0,
                        //     //key: 0,
                        //     backgroundColor: '#EAEAEA',
                        //     color: '#505050',
                        //     title: 'Bregenz',
                        //     data: this.state.dataBregenz,
                        // },
                        // {
                        //     id: 1,
                        //     //key: 1,
                        //     backgroundColor: '#EAEAEA',
                        //     color: '#505050',
                        //     title: 'Dornbirn',
                        //     data: this.state.dataDornbirn,
                        // },
                        // {
                        //     id: 3,
                        //     //key: 1,
                        //     backgroundColor: '#EAEAEA',
                        //     color: '#505050',
                        //     title: 'Hohenems',
                        //     data: this.state.dataHohenems,
                        // },
                        // {
                        //     id: 4,
                        //     //key: 1,
                        //     backgroundColor: '#EAEAEA',
                        //     color: '#505050',
                        //     title: 'Feldkirch',
                        //     data: this.state.dataFeldkirch,
                        // },
                        // {
                        //     id: 5,
                        //     //key: 1,
                        //     backgroundColor: '#EAEAEA',
                        //     color: '#505050',
                        //     title: 'Bludenz',
                        //     data: this.state.dataBludenz,
                        // },
                        {
                            id: 0,
                            backgroundColor: '#EAEAEA',
                            color: '#505050',
                            title: 'Aufgaben',
                            data: this.state.cards,
                        }
                    ]}
                    renderItem={this.renderItem}
                    renderSectionHeader={({section}) => <Text style={{backgroundColor: section.backgroundColor, color: section.color, height: 38, width: '100%', fontSize: 14, lineHeight: 24, fontFamily: 'siemens_global_bold', paddingLeft: 16, paddingVertical: 7}}>{section.title}</Text>}
                    //keyExtractor={extractKey}
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
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default TaskScreen;
