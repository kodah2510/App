import React, { Component } from 'react';
import { Alert, StyleSheet, View, Image, Text, TouchableHighlight, TouchableOpacity, TextInput, Linking } from 'react-native';
import { StackNavigation } from 'react-navigation';
import { FormLabel, FormInput, Icon, Button } from 'react-native-elements';
import Expo from 'expo';
import styles from '../config/styles';
import { MainEntry } from './MainEntry';
import { hostAddress, FB_APP_ID, GOOGLE_ANDROID_CLIENT_ID, GOOGLE_IOS_CLIENT_ID } from '../config/setup';
//set cookies
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            userId: '',
        };
    }d

    _loginWithFacebook = () => {
        var name = '';
        var id = '';
        var email = '';
        var state = this.state;
        var props = this.props;
        const { type, token } = Expo.Facebook.logInWithReadPermissionsAsync(`${FB_APP_ID}`, {
            permissions: ['public_profile', 'email']
        })
            .then((res) => {
                if (res.type == 'success') {
                    // Get the user's name using Facebook's Graph API
                    fetch(`https://graph.facebook.com/me?fields=id,name,email,picture{url}&access_token=${res.token}`)
                        .then((response) => {
                            //console.log(response);
                            return response.json();
                        })
                        .then((resJson) => {
                            id = resJson.id;
                            name = resJson.name;
                            email = resJson.email;
                            photoUrl = resJson.picture.data.url;

                            var loginResult = fetch(`http://${hostAddress}/users/login/facebook`, {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    'id': id,
                                    'name': name,
                                    'email': email,
                                    'photoUrl': photoUrl
                                })
                            }).then((response) => {
                                if(response.status == 200) {
                                    console.log(id);
                                    props.navigation.navigate('mainscreen', {
                                        user: {
                                            id: id,
                                            name: name,
                                            email: email,
                                            photoUrl: photoUrl
                                        }, 
                                        accType: 'fb'});
                                }
                                return response.status;
                            });
                            
                        });
                }
            })

    }
    _loginWithGoogle = () => {
        var state = this.state;
        var props = this.props;
        const result = Expo.Google.logInAsync({
            androidClientId: `${GOOGLE_ANDROID_CLIENT_ID}`,
            iosClientId: `${GOOGLE_IOS_CLIENT_ID}`,
            scope: ['profile', 'email'],
        }).then((result) => {
            if (result.type == 'success') {
                fetch(`http://${hostAddress}/users/login/google`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'id': result.user.id,
                        'email': result.user.email,
                        'name': result.user.name,
                        'photoUrl': result.user.photoUrl
                    })
                }).then((response) => {
                    console.log(response.status);
                    if (response.status == 200) {
                        state.isLoggedIn = true;
                        props.navigation.navigate('mainscreen', {
                            user: {
                                id: result.user.id,
                                name: result.user.name,
                                email: result.user.email,
                                photoUrl: result.user.photoUrl
                            }, accType: 'gg'});                        
                    }
                })
            } else {
                console.log(`error occured ${result.type}`);
            }
        })
    }
    _login() {
        var state = this.state;
        var props = this.props;
        var id = '';
        //add fetch
        var result = fetch(`http://${hostAddress}/users/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": this.state.username,
                "password": this.state.password
            })
        }).then((response) => {
            console.log(response);
            if(response.status == 200) {
                return response.json();
            } else if(response.status >= 500) {
                Alert.alert('Something wrong with server');
                return null;
            } else if(response.status >= 400 && response.status <= 500) {
                return response.json();
            }
        }).then((resJson) => {
            console.log(resJson);
            if(resJson.id != undefined) {
                props.navigation.navigate('mainscreen', {
                    user: {
                        id: resJson.id,
                }, accType: 'nm'});      
            }
            else if(resJson.message) {
                Alert.alert(resJson.message);
            }
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.box, styles.box1]}>
                    <Image
                        style={styles.logo}
                        source={require('../img/icon.jpg')}
                    />
                </View>
                <View style={[styles.box, styles.box2]}>
                    <FormInput
                        containerStyle={styles.textInput}
                        blurOnSubmit={true}
                        placeholder={'Username'}
                        onChangeText={(text) => this.setState({ username: text })}
                    />
                    <FormInput
                        containerStyle={styles.textInput}
                        blurOnSubmit={true}
                        placeholder={'Password'}
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({ password: text })}
                    />
                    <Button
                        title='Login'
                        buttonStyle={styles.button}
                        onPress={() => { this._login() }}
                    />
                </View>
                <View style={[styles.box, styles.box3]}>
                    <Button
                        icon={{ name: 'facebook-official', type: 'font-awesome' }}
                        title='Login with Facebook'
                        buttonStyle={styles.googleAndFacebookButton}
                        onPress={() => this._loginWithFacebook()}
                    />

                    <Button
                        icon={{ name: 'google-plus', type: 'font-awesome' }}
                        title='Login with Google'
                        buttonStyle={styles.googleAndFacebookButton}
                        onPress={() => this._loginWithGoogle()}
                    />
                </View>
                <View style={[styles.box, styles.box4]}>
                    <Text
                        style={styles.linkText}
                        onPress={() => this.props.navigation.navigate('signupscreen')}>
                        Create new account
                    </Text>
                </View>
            </View>
        );
    }
}
