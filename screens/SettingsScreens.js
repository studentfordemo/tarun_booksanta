import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,TextInput,Modal,ScrollView,KeyboardAvoidingView, SnapshotViewIOS } from 'react-native';
import db from "../config";
import  firebase from "firebase"
import {MyHeader} from "../components/MyHeader"

export default class SettingsScreen extends React.Component{
    constructor(){
        super();
    this.state={
        emailId:"",
        password:"",
        firstName:"",
        lastName:"",
        
        address:"",
        contact:"",
        docId:"",
    }
}
    getReciverDetails=()=>{
var email=firebase.auth().currentUser.email
db.collection("users").where("emailId","==",email)
.get()
.then(snapshot=>{
    snapshot.forEach(doc=>{
        var data=doc.data()
        this.setState({firstName:data.first_Name,
            lastName:data.last_Name,
            address:data.address,
            password:data.password,
            contact:data.contact,
            emailId:data.emailId,
            docId:doc.id
        })
    })
})
    }
    componentDidMount(){
        this.getReciverDetails();
    }
    updateUserDetails=()=>{
        db.collection("users").doc(this.state.docId).update({
            first_Name:this.state.firstName,
            last_Name:this.state.lastName,
            address:this.state.address,
            contact:this.state.contact,
            emailId:this.state.emailId,
            password:this.state.password
        })
        return alert("Updated Successfully")
    }
    render(){
        return(
            <View>
           <View>
                <MyHeader
                title="Profile Settings" navigation={this.props.navigation}/>
                <View>
                <TextInput
        style={styles.inputBox}
        placeholder="firstName"
        maxLength={8}
        onChangeText={(text)=>{this.setState({firstName:text})}}
        value={this.state.firstName}/>
        <TextInput
        style={styles.inputBox}
        placeholder="lastName"
        maxLength={8}
        onChangeText={(text)=>{this.setState({lastName:text})}}
        value={this.state.lastName}/>
        <TextInput
        style={styles.inputBox}
        placeholder="Contact"
        maxLength={10}
        keyboardType={"numeric"}
        onChangeText={(text)=>{this.setState({contact:text})}}
        value={this.state.contact}/>
        <TextInput
        style={styles.inputBox}
        placeholder="Address"
        multiline={true}
        onChangeText={(text)=>{this.setState({address:text})}}
        value={this.state.address}/>
        <TextInput
        style={styles.inputBox}
        placeholder="password"
    secureTextEntry={true}
        onChangeText={(text)=>{this.setState({password:text})}}
        value={this.state.password}/>
         <TextInput
        style={styles.inputBox}
        placeholder="abc@gmail.com"
        keyboardType="email-address"
        onChangeText={(text)=>{this.setState({emailId:text})}}
        value={this.state.emailId}/>
        <TouchableOpacity style={styles.Button}
        onPress={()=>{this.updateUserDetails()}}>
<Text>
  Save Changes
</Text>
        </TouchableOpacity>
                </View>
           </View>      
            </View>
           
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:20
    },
    Button:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    text:{
      fontSize: 15,
      textAlign: 'center',
      marginTop: 10
    },
    inputBox:{
      width: 200,
      height: 40,
      borderWidth: 1.5,
      borderRightWidth: 0,
      fontSize: 20
    },
    })
