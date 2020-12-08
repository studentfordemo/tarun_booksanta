import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,TextInput,Modal,ScrollView,KeyboardAvoidingView,FlatList } from 'react-native';
import {ListItem} from "react-native-elements"
import db from "../config";
import  firebase from "firebase"
import {MyHeader} from "../components/MyHeader"

export default class BookDonateScreen extends React.Component{
    constructor(){
        super();
        this.state={
            requestedBookList:[]
        }
        this.requestRef=null
    }
    getRequestBooksList=()=>{
        this.requestRef=db.collection("requested_books")
        .onSnapshot((snapshot)=>{
            var requestedBookList=snapshot.docs.map(document=>document.data())
            this.setState({
                requestedBookList:requestedBookList
            })
        })
    }
    componentDidMount(){
        this.getRequestBooksList();
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
            subtitle={item.reason_to_request}
            titleStyle={{color:"black",fontWeight:"bold"}}
            rightElement={
                <TouchableOpacity style={styles.Button} onPress={()=>{
this.props.navigation.navigate("RecieverDetails",{"details":item})
                }}>
<Text style={{color:"Red"}}>
    View
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
                title="Donate Boooks" navigation={this.props.navigation}/>
                {
                 this.state.requestedBookList.length===0
                 ?(<View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                     <Text>
                         List Of All Requested Books
                     </Text>
                 </View>)
                 :(
                     <FlatList
                     keyExtractor={this.keyExtractor}
                     data={this.state.requestedBookList}
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
