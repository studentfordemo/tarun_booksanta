import React from 'react';
import { StyleSheet, Text, View, Image,FlatList,TouchableOpacity,Alert } from 'react-native';
import {ListItem} from 'react-native-elements';
import MyHeader from '../components/MyHeader';
import db from '../config';
import firebase from 'firebase';

export default class MyReceivedBooks extends React.Component {
  constructor () {
    super ();
    this.state = {
      receivedBookList : [],
      userId : firebase.auth().currentUser.email
    }
    this.requestRef = null

  } 
  getReceivedBookList = () => {
   this.requestRef = db.collection("received_books")
   .where("user_id","==",this.state.userId)
   .where("bookStatus","==","received")
   
   .onSnapshot((snapshot)=>{
     var receivedBookList = snapshot.docs.map(document=>document.data())
     this.setState({
       receivedBookList:receivedBookList
     })
   })
  } 
componentDidMount (){
  this.getReceivedBookList()
}
  componentWillUnmount (){
    this.requestRef()
  }
  keyExtractor = (item,index)=>
    index.toString();
  renderItem = ({item,i}) => {
    return (
    <ListItem
       key={i}
       title = {item.book_Name}
       subtitle = {item.bookStatus}
       titleStyle = {{color:"black",fontWeight:"bold"}}
       bottomDivider 
    />
    )
  }

  render(){
    return (
      <View style={{flex:1}}>
        <MyHeader title="Received Books" 
          navigation= {this.props.navigation}
        />
        <View style={{flex:1}}>
           {
             this.state.receivedBookList.length === 0
             ? (
               <View>
                 <Text> List of all books received </Text>
               </View>
             ) 
             : (
               <FlatList
                  keyExtractor = {this.keyExtractor}
                  data = {this.state.receivedBookList}
                  renderItem = {this.renderItem}
               />
             )
           }
        </View>
      </View>
    );
  }
}
