import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,TextInput,Modal,ScrollView,KeyboardAvoidingView,FlatList } from 'react-native';
import {ListItem,Icon} from "react-native-elements"
import db from "../config";
import  firebase from "firebase"
import {MyHeader} from "../components/MyHeader"

export default class MyDonation extends React.Component{
    static navigationOptions={header:null}
    constructor(){
        super();
        this.state={
            userId:firebase.auth().currentUser.email,
            allDonations:[]
        }
        this.requestRef=null
    }
    getallDonations=()=>{
        this.requestRef=db.collection("all_donations").where("donor_id","==",this.state.userId)
        .onSnapshot((snapshot)=>{
            var allDonations=snapshot.docs.map(document=>document.data())
            this.setState({
                allDonations:allDonations
            })
        })
    }
    componentDidMount(){
        this.getallDonations();
    }
    componentWillUnmount(){
        this.requestRef()
    }
    keyExtractor=(item,index)=>index.toString()
    renderItem=({item,i})=>{
        return(
            <ListItem
            key={i}
            title={item.book_name}
            subtitle={"RequestedBy:"+item.requested_by+"\nStatus"+item.request_status}
            titleStyle={{color:"black",fontWeight:"bold"}}
            leftComponent={<Icon
                name="book" type="font-awesome" color="black"/>}
            rightElement={
                <TouchableOpacity style={styles.Button}>
<Text style={{color:"Red"}}>
  SEND BOOK
</Text>
                </TouchableOpacity>
            }
            bottomDivider
            />
        )
    }
    render(){
        return(
            <View style={{flex:1}}>
                <MyHeader
                title="My Donations" navigation={this.props.navigation}/>
                {
                 this.state.allDonations.length===0
                 ?(<View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                     <Text>
                         List Of All Donated Books
                     </Text>
                 </View>)
                 :(
                     <FlatList
                     keyExtractor={this.keyExtractor}
                     data={this.state.allDonations}
                    renderItem={this.renderItem}
                     />
                 )   
                }
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
