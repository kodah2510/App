import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableHighlight, Text, Alert } from 'react-native';
import { Header, Icon, FormLabel, Button, FormInput } from 'react-native-elements';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import styles from '../config/styles';
import { hostAddress } from '../config/setup';
class Home extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) => (
            <Icon name='home' type='entypo'/>
        ),
      };
    render() {
        return (
            <Header 
                statusBarProps={{barStyle: 'light-content'}}
                leftComponent={
                    <Icon name='menu' 
                        onPress={() => this.props.navigation.navigate('DrawerOpen')} 
                    />
                    }
                centerComponent={{text:'Main Screen', style: {color: '#fff', alignItems: 'center', justifyContent: 'center'}}}
                outerContainerStyles={{backgroundColor:'#2ecc71'}}
            >
            </Header>
        );
    }
}
class Profile extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        drawerLabel: 'View My Profile',
        drawerIcon: ({ tintColor }) => (
            <Icon name='person' type='materialIcons'/>
        ),
        user: navigation.state.params.user,
        accType: navigation.state.params.accType,
        });
   
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            email: '',
            photoUrl: '',
            isUpdateButtonCLicked: false
        };
        const { params } = this.props.navigation.state;
        //_getUserProfile(params.userId, params.accType);
        var accType = params.accType;
        if ( accType == 'nm') {
            var id = params.user.id;
            //user login with normal account
            const request  = async () => {
                const response = await fetch(`http://${hostAddress}/users/${id}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                const json = await response.json();
                this.setState((prevState) => {
                    return {
                        id: id,
                        name: json.name,
                        email: json.email,
                        photoUrl: json.photoUrl
                    }
                });
            }
            request();
        }
        else { //user login with facebook or google account
            this.setState((prevState) => {
                return {
                    id: params.user.id,
                    name: params.user.name,
                    email: params.user.email,
                    photoUrl: params.user.photoUrl 
                }
            });
        }
        console.log(this.state);
    }
      /**
       * find the way to pass the id variable between login result and this class
       */
   
    _submitUpdateInfo() {
        var id = this.state.id;
        console.log(id);
        console.log('state');
        console.log(this.state);
        var result = fetch(`http://${hostAddress}/users/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                photoUrl: this.state.photoUrl
            })
        })
        .then((response) => {
            if(response.status == 200) {
                return response.json();
            }
        }).then((resJson) => {
            console.log(resJson);
            this.setState((prevState) => {return {
                id: resJson.id,
                name: resJson.name,
                email: resJson.email,
                isUpdateButtonCLicked: false
            }});
            console.log(this.state);
            Alert.alert("Profile updated");
        });
      
    }
    render() {
        const { params } = this.props.navigation.state;
        if(!this.state.isUpdateButtonCLicked) {
            return (
                <View style={styles.container}> 
                    <View style={[styles.box1,styles.box]}> 
                        <Image src={this.state.photoUrl}/>
                    </View>
                    <View style={[styles.box2]}> 
                        <FormLabel>Name</FormLabel>
                        <FormInput value={this.state.name} editable={false}/>
                        <FormLabel>Email</FormLabel>
                        <FormInput value={this.state.email} editable={false}/>
                        <Button 
                            title='Update My Profile'
                            style={styles.button}
                            onPress={() => this.setState({isUpdateButtonCLicked: true})}
                        />  
                    </View>
                </View>
            ) 
        } else {
            /**
             * only normal accounts are able to update the their profile
             */
            return (
                <View style={styles.container}> 
                    <View style={[styles.box1,styles.box]}> 
                        <Image src={this.state.photoUrl}>Avatar</Image>
                    </View>
                    <View style={[styles.box2]}> 
                        <FormLabel>Name</FormLabel>
                        <FormInput 
                            value={this.state.name} 
                            onChangeText={(input) => this.setState({name : input})} 
                            editable={true}
                            returnKeyType='next'
                            />
                        <FormLabel>Email</FormLabel>
                        <FormInput 
                            value={this.state.email} 
                            onChangeText={(input) => this.setState({email : input})}
                            editable={true}
                            keyboardType='email-address'
                            returnKeyType='go'
                            />
                        <Button 
                            title='Submit'
                            style={styles.button}
                            onPress={() => this._submitUpdateInfo()}
                        />  
                    </View>
            </View>
            )
        }
        
    }
}
export const DrawerView = (props) => {
    return(
        <View style={styles.container}>
            <DrawerItems {...props} />
            <Button title='Logout' onPress={ async () => {
                 const response = await fetch(`http://${hostAddress}/users/login/logout`, {
                    method: 'GET', 
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                if(response.status == 200){
                    Alert.alert('You are logged out');
                    props.navigation.navigate('loginscreen');
                }
            }} />
        </View>
    );
};
export const DrawerNav = DrawerNavigator({
    home : {
        screen: Home
    },
    profile: {
        screen: Profile
    }
},
{
    contentComponent: DrawerView,
    drawerBackgroudColor: 'transparent'
});


