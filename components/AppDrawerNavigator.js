import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,TextInput,Modal,ScrollView,KeyboardAvoidingView,Image } from 'react-native';
import db from "../config";
import  firebase from "firebase"
import {createDrawerNavigator} from "react-navigation-drawer"
import {AppTabNavigator} from "./AppTabNavigator"
import CustomSideBarMenu from "./CustomSIdeBarMenu"
import MyDonationScreen from "../screens/MyDonationScreen"
import SettingsScreen from "../screens/SettingsScreens"
export const AppDrawerNavigator=createDrawerNavigator({
Home:{
    screen:AppTabNavigator
},
setting:{
    screen:SettingsScreen
},
MyDonations:{
screen:MyDonationScreen
}
},
{contentComponent:CustomSideBarMenu},
{initialRouteName:"Home"}
)
