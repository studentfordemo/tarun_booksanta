import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,TextInput,Modal,ScrollView,KeyboardAvoidingView } from 'react-native';
import db from "../config";
import  firebase from "firebase"



export default class WelcomeScreen extends React.Component{
    constructor(){
        super();
    this.state={
        emailId:"",
        password:"",
        firstName:"",
        lastName:"",
        confirmPassword:"",
        address:"",
        contact:"",
        isModalVisible:false
    }
    }
    userSignUp=(emailId,password,confirmPassword)=>{
        if(password!==confirmPassword){
            alert("Passwords Not Same")
        }
        else{
            firebase.auth().createUserWithEmailAndPassword(emailId,password)
            .then(()=>{
                db.collection("users").add({
                    first_Name:this.state.firstName,
                    last_Name:this.state.lastName,
                    address:this.state.address,
                    contact:this.state.contact,
                    emailId:this.state.emailId,
                    password:this.state.password
                })
                return alert("User Added Successfully",
                "",
                [{text:"OK",onPress:()=>this.setState({"isModalVisible":false})}])
            })
.catch(function(error){
var errorCode=error.code
 var errormessage=error.message
 return alert(errormessage)
})
        }

    }
    showModal=()=>{
return(
    <Modal
         animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}>
            <View style={{flex:1}}>
<ScrollView style={{width:"100%"}}>
<KeyboardAvoidingView style={{margin:10, justifyContent:"center"}}>
<Text style={styles.text}>
Registeration
</Text>
<TextInput
        style={styles.inputBox}
        placeholder="FirstName"
        maxLength={8}
        onChangeText={(text)=>{this.setState({firstName:text})}}/>
        <TextInput
        style={styles.inputBox}
        placeholder="lastName"
        maxLength={8}
        onChangeText={(text)=>{this.setState({lastName:text})}}/>
        <TextInput
        style={styles.inputBox}
        placeholder="Contact"
        maxLength={10}
        keyboardType={"numeric"}
        onChangeText={(text)=>{this.setState({contact:text})}}/>
        <TextInput
        style={styles.inputBox}
        placeholder="Address"
        multiline={true}
        onChangeText={(text)=>{this.setState({address:text})}}/>
         <TextInput
        style={styles.inputBox}
        placeholder="abc@gmail.com"
        keyboardType="email-address"
        onChangeText={(text)=>{this.setState({emailId:text})}}/>
        <TextInput
        style={styles.inputBox}
        placeholder="password"
    secureTextEntry={true}
        onChangeText={(text)=>{this.setState({password:text})}}/>
        <TextInput
        style={styles.inputBox}
        placeholder="Confirm Password"
    secureTextEntry={true}
        onChangeText={(text)=>{this.setState({confirmPassword:text})}}/>
               <TouchableOpacity style={styles.Button}
        onPress={()=>{this.userSignUp(this.state.emailId,this.state.password,this.state.confirmPassword)}}>
<Text>
  Register
</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button}
        onPress={()=>this.setState({"isModalVisible":false})}>
            <Text>
                Cancel
            </Text>
            
        </TouchableOpacity>
</KeyboardAvoidingView>
</ScrollView>
            </View>
    </Modal>
)

    }

    userLogin=(emailId,password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId,password)
        .then((response)=>{this.props.navigation.navigate("DonateBooks")})
        .catch(function(error){
        var errorCode=error.code
         var errormessage=error.message
         return alert(errormessage)
        })
            }
render(){
    return(
        <View style={styles.container}>
            {this.showModal()}
            
         <Text style={styles.text}>
                Book Santa
            </Text>
        <TextInput
        style={styles.inputBox}
        placeholder="abc@gmail.com"
        keyboardType="email-address"
        onChangeText={(text)=>{this.setState({emailId:text})}}/>
        <TextInput
        style={styles.inputBox}
        placeholder="password"
    secureTextEntry={true}
        onChangeText={(text)=>{this.setState({password:text})}}/>
        <TouchableOpacity style={styles.Button}
        onPress={()=>{this.userLogin(this.state.emailId,this.state.password)}}>
<Text>
    Login
</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button}
        onPress={()=>this.setState({"isModalVisible":true})}>
            <Text>
                SignUp
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
