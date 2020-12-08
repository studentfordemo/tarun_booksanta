import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,TextInput,Modal,ScrollView,KeyboardAvoidingView } from 'react-native';
import db from "../config";
import  firebase from "firebase"
import { Icon,Header, Card } from 'react-native-elements';
import {createStackNavigator} from "react-navigation-stack";
import BookDonateScreen from "../screens/BookDonateScreen";
import RecieverDetailsScreen from "../screens/RecieverDetailsScreen";


export const AppStackNavigator=createStackNavigator({
    BookDonateList:{
        screen:BookDonateScreen,
        navigationOptions:{
            headerShown:false
        }
    },
    RecieverDetails:{
        screen:RecieverDetailsScreen,
        navigationOptions:{
            headerShown:false
        }
    }
    },
    
    {initialRouteName:"BookDonateList"}
    )
    
