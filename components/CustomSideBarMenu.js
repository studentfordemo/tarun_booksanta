import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,TextInput,Modal,ScrollView,KeyboardAvoidingView } from 'react-native';
import db from "../config";
import  firebase from "firebase"
import {DrawerItems} from "react-navigation-drawer"


export default class CustomSideBarMenu extends React.Component{
render(){
    return(
        <View>
         <View style={{flex:1}}>
        <DrawerItems
        {
            ...this.props
        }
        />
        </View>
        <View>
            <TouchableOpacity onPress={()=>{
                this.props.navigation.navigate("WelcomeScreen")
                firebase.auth().signOut()
            }}>
                <Text>
                    Logout
                </Text>
            </TouchableOpacity>
        </View>    
        </View>
       
    )
}
}
