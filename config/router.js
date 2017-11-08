import React from 'react';
import { StackNavigator } from 'react-navigation';
import Login from '../component/Login';
import Signup from '../component/Signup';
import MainEntry from '../component/MainEntry';
import {DrawerNav} from '../component/MainEntry';
export const NavStack = StackNavigator({
    loginscreen: { 
        screen: Login 
    },
    signupscreen: { 
        screen: Signup 
    },
    mainscreen: {
        screen: DrawerNav
    }
}, { headerMode: 'none' });