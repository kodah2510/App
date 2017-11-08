import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
var { height } = Dimensions.get('window');
var boxCount = 4;
var boxHeight = height / boxCount;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ecf0f1',
    },
    box: {
        height: boxHeight,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    box1: {
        flex: 0.7,
        justifyContent: 'flex-end',
        //backgroundColor:'yellow'
    },
    box2: {
        flex: 1,
        //backgroundColor:'red'
    },
    box3: {
        flex: 0.6,
        //backgroundColor:'blue'
    },
    box4: {
        flex: 0.2,
        //backgroundColor:'green'
    },

    logo: {
        borderRadius: 75,
        width: 150,
        height: 150,
    },
    formLoginWithFacebookAndGoogle: {
        flexDirection: 'column',
        margin: 20,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    bottomTextView: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginBottom: 10,
        marginTop: 60,
    },
    linkText: {
        fontSize: 15,
        textAlign: 'center',
        opacity: 0.7,
    },
    button: {
        height: 40,
        width: 300,
        marginHorizontal: 40,
        padding: 20,
        backgroundColor: "#34495E",
    },
    googleAndFacebookButton: {
        height: 40,
        width: 300,
        marginHorizontal: 40,
        backgroundColor: '#004d4d'
    },
    buttonText: {
        padding: 10,
        fontSize: 15,
        color: "#FFF",
    },
    textInput: {
        padding: 10,
        marginHorizontal: 20,
    },
    buttonIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

});

export default styles;