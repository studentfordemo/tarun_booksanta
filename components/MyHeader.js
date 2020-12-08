import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,TextInput,Modal,ScrollView,KeyboardAvoidingView,Image } from 'react-native';
import {Header,Icon,Badge} from "react-native-elements"
export const MyHeader = props=>{
    return(
        <Header
        leftComponent={<Icon
        name="bars" type="font-awesome" color="black" onPress={()=>{
            props.navigation.toggleDrawer()
        }}/>}
        centerComponent={{text:props.title,style:{color:"blue",fontSize:20,fontWeight:"bold"}}}
        backgroundColor="red"
        />
    )
}
