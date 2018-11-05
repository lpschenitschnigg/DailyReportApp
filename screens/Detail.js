//import liraries
import React, { Component } from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';
import { Left } from 'native-base';

// create a component
class Detail extends Component {
    state = {
        mapRegion: { latitude: 47.50311, longitude: 9.7471, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
        locationResult: null,
        location: {coords: { latitude: 47.50311, longitude: 9.7471}},
      };
      _timefunction(to, from) {
        var to = to;
        var from = from;
        to = to.substring(11,16);
        from = from.substring(11,16);
        return from + " - " + to;
    }
    static navigationOptions = {
        headerTitle: <Text style={{ fontFamily: 'siemens_global_bold',fontSize: 28, lineHeight: 34, color: "#009999", left: 20}}>Detail</Text>,
    }
    render() {
        if(this.props.loading) return null;
        return (
            <View style={styles.container}>
                <View style={styles.description}>
                    <Text style={{fontSize: 19, lineHeight: 24, fontFamily: 'siemens_global_bold' }}>{this.props.navigation.state.params.title}</Text>
                    {/* <Text style={{fontSize: 12, lineHeight: 20, color: '#6C6C6C'}}>Hinterfeldgasse 19, 6900 Bregenz</Text> */}

                    <View>
                        {/* <Text style={{fontSize: 10, lineHeight: 17, paddingTop: 10, color: '#6C6C6C'}}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor 
                            invidunt ut labore et dolore magna aliquyam erat, 
                            sed diam voluptua. Atng elitr, sed diam nonumy eirmod tempor 
                            invidunt ut labore et dolore magna aliquyam erat, 
                            sed diam voluptua. AtLorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor 
                            invidunt ut labore et dolore magna aliquyam erat, 
                            sed diam voluptua. Atng elitr, sed diam nonumy eirmod tempor 
                            invidunt ut labore et dolore magna aliquyam erat, 
                            sed diam voluptua. At</Text> */}
                            <Text style={{fontSize: 14, lineHeight: 17, paddingTop: 5, color: '#6C6C6C', fontFamily: 'siemens_global_roman'}}>
                            <Text style={{ fontFamily: 'siemens_global_bold', color: '#383838'}}>Information:</Text> {this.props.navigation.state.params.content}
                            </Text>
                            <Text style={{fontSize: 14, lineHeight: 17, paddingTop: 10, color: '#6C6C6C', fontFamily: 'siemens_global_roman'}}>
                                <Text style={{ fontFamily: 'siemens_global_bold', color: '#383838'}}>Kategorie:</Text> {this.props.navigation.state.params.type}
                            </Text>
                            <Text style={{fontSize: 14, lineHeight: 17, paddingTop: 10, color: '#6C6C6C', fontFamily: 'siemens_global_roman'}}>
                                <Text style={{ fontFamily: 'siemens_global_bold', color: '#383838' }}>Zeit:</Text> {this._timefunction(this.props.navigation.state.params.to, this.props.navigation.state.params.from)}
                            </Text>
                            <Text style={{fontSize: 14, lineHeight: 17, paddingTop: 10, color: '#6C6C6C', fontFamily: 'siemens_global_roman'}}>
                                <Text style={{ fontFamily: 'siemens_global_bold', color: '#383838' }}>Datum:</Text> {this.props.navigation.state.params.from.substring(8, 10)}.{this.props.navigation.state.params.from.substring(5,7)}.{this.props.navigation.state.params.from.substring(0, 4)}
                            </Text>
                    </View>
                    {/* <View style={{height: 32, width: 74, backgroundColor: '#EAEAEA', marginTop: 20, borderRadius: 10, marginBottom: 35}}>
                        <TouchableOpacity>
                            <Text style={{fontSize: 13, lineHeight: 15, color: '#505050', textAlign: 'center', paddingTop:8}}>Starten</Text>
                        </TouchableOpacity>
                    </View> */}
                    <View>
                        {/* <TouchableOpacity style={{backgroundColor: '#009999'}}  onPress={() => this.props.navigation.navigate('AufgabeBearbeiten', {title: this.props.navigation.state.params.title, content : this.props.navigation.state.params.content, type: this.props.navigation.state.params.type, to: this.props.navigation.state.params.to, from: this.props.navigation.state.params.from})}>
                            <Text>Bearbeiten</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('AufgabeBearbeiten', {title: this.props.navigation.state.params.title, content : this.props.navigation.state.params.content, type: this.props.navigation.state.params.type, to: this.props.navigation.state.params.to, from: this.props.navigation.state.params.from})}>
                            <Text style={styles.buttonText}>BEARBEITEN</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* <MapView
                    style={{ alignSelf: 'stretch', height: 200 }}
                    region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
                    >
                    <MapView.Marker
                    coordinate={this.state.location.coords}
                    title="My Marker"
                    description="Some description"
                    />
                </MapView> */}
                
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: "#EAEAEA",
        //paddingTop: 12,
        padding: 15,
        paddingTop: 15
    },
    description: {
        backgroundColor: "white",
        paddingLeft: 15,
        //paddingTop: 20,
        paddingRight: 15,
        //marginBottom: 15,
        width: '100%',
        //height: '50%'
        paddingBottom: 15,
        paddingTop: 10,
        borderRadius: 10
    },
    buttonContainer: {
        backgroundColor: '#009999',
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 15
    },
    buttonText: {
        textAlign: 'center',
        color : '#fff',
        fontSize: 15,
        fontFamily: 'siemens_global_bold'
    },
});

//make this component available to the app
export default Detail;
