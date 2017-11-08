import React from 'react';
import { View, Image, StyleSheet, TouchableHighlight, Text } from 'react-native';
// import { MainEntry } from './component/MainEntry';
import { NavStack } from './config/router';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userId: '' };
    }
    render() {
        return <NavStack />;
    }
}

const styles = StyleSheet.create({

});
