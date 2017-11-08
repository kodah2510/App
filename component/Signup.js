import React from 'react';
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native';
import { FormInput, Icon } from 'react-native-elements';
import styles from '../config/styles';
export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
        };
    }
    _onPress() {
        fetch('http://192.168.1.2:3000/api/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": this.state.username,
                "password": this.state.password,
                "email": this.state.email
            })
        }).then(function (response) {
            console.log(response);
            return response.json();
        }).catch(function (err) {
            console.log(err);
            return err;
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <FormInput
                        containerStyle={styles.textInput}
                        placeholder={'Username'}
                        returnKeyType={'next'}
                        onChangeText={(text) => { this.state.username = text }}
                    />
                    <FormInput
                        containerStyle={styles.textInput}
                        placeholder={'Email Adresses'}
                        keyboardType={'email-address'}
                        returnKeyType={'next'}
                        onChangeText={(text) => { this.state.email = text }}
                    />
                    <FormInput
                        containerStyle={styles.textInput}
                        placeholder={'Password'}
                        secureTextEntry={true}
                        returnKeyType={'next'}
                        onChangeText={(text) => { this.state.password = text }}
                    />
                    <FormInput
                        containerStyle={styles.textInput}
                        placeholder={'Retype password'}
                        secureTextEntry={true}
                        returnKeyType={'go'}
                    />
                    <TouchableHighlight
                        style={styles.button}
                        onPress={this._onPress}>
                        <Text style={styles.buttonText}> Sign up </Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={this._onPress}>
                        <View style={styles.buttonIconContainer}>
                            <Icon name='facebook' type='entypo' color={'white'} />
                            <Text> Sign up with Facebook</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={this._onPress}>
                        <View style={styles.buttonIconContainer}>
                            <Icon name='google-' type='entypo' color={'white'} />
                            <Text > Sign up with Gmail</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

//const styles = StyleSheet.create({
//    container: {
//        flex: 1,
//        flexDirection: 'column',
//        alignItems: 'center',
//        justifyContent: 'center',
//    }
//});