import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,TextInput,Modal,ScrollView,KeyboardAvoidingView } from 'react-native';
import db from "../config";
import  firebase from "firebase"
import {MyHeader} from "../components/MyHeader"


export default class BookRequestScreen extends React.Component{
    constructor(){
        super();
        this.state={
            userId:firebase.auth().currentUser.email,
            bookName:"",
            reasonToRequest:""
        }
    }
    createUniqueId(){
        return Math.random().toString(36).substring(7)
    }
    addRequest=(bookName,reasonToRequest)=>{
    var userId=this.state.userId
var randomRequestId=this.createUniqueId()
db.collection("requested_books").add({
    "user_Id":userId,
    "book_name":bookName,
    "reason_to_request":reasonToRequest,
    "request_id":randomRequestId
})
this.setState({
    bookName:"",
    reasonToRequest:""
})
return alert("Request Submitted Succefully")
}
    render(){
        return(
            <View style={{flex:1}}>
                                <MyHeader
                title="Request Boooks" navigation={this.props.navigation}/>
                <TextInput
                style={styles.inputBox}
                placeholder={"EnterBookName"}
                onChangeText={(text)=>{
                    this.setState({
                    bookName:text
                    })
                }}
                
                value={this.state.bookName}/>
  <TextInput
                style={styles.inputBox}
                placeholder={"Why Do You Want To Take This Book?"}
                onChangeText={(text)=>{
                    this.setState({
                    reasonToRequest:text
                    })
                }}
                
                value={this.state.reasonToRequest}/>
              <TouchableOpacity style={styles.Button} onPress={()=>{
                this.addRequest(this.state.bookName,this.state.reasonToRequest)
              }}>
                  <Text style={styles.text}>
                      Request
                  </Text>
                  
              </TouchableOpacity>
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