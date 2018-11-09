//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image, AsyncStorage } from 'react-native';

// create a component
class ModalScreen extends Component {
    async removeItemValue(key) {
        try {
          await AsyncStorage.removeItem('fixedHash');
          console.log('removed');
          return true;
        }
        catch(exception) {
          return false;
        }
      }
    render() {
        return (
            <View style={{backgroundColor: '#fff', height: '100%'}}>
                <View style={{paddingLeft: 18, paddingRight: 18}}> 
                
                    <Text style={{ fontSize: 17, textAlign: 'center', paddingBottom: 10, fontFamily: 'siemens_global_bold', }}>Wollen Sie wirklich ausgeloggt werden?</Text>
                    {/* <Button
                        onPress={() => this.props.navigation.navigate('WelcomeScreen')}
                        title="Ja"
                    />
                    <Button
                        onPress={() => this.props.navigation.goBack()}
                        title="Nein"
                    /> */}
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('WelcomeScreen') && this.removeItemValue()}>
                        <Text style={styles.buttonText}>Ja</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.goBack()}>
                        <Text style={styles.buttonText}>Nein</Text>
                    </TouchableOpacity>
                </View>
                {/* <View style={{borderColor: 'black', borderWidth: 1, flex: 1,
                    alignItems: "center",
                    justifyContent: "center"}}>
                    <Image soure={require('./logo.jpg')} style={{width: 200}}></Image></View> */}
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
        paddingLeft: 10,
        paddingRight: 10,
    },
    buttonText: {
        textAlign: 'center',
        color : '#fff',
        fontFamily: 'siemens_global_bold',
        fontSize: 15,
        lineHeight: 18
    }
});


//make this component available to the app
export default ModalScreen;
