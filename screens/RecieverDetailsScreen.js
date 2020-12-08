import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,TextInput,Modal,ScrollView,KeyboardAvoidingView } from 'react-native';
import db from "../config";
import  firebase from "firebase"
import { Icon,Header, Card } from 'react-native-elements';

export default class RecieverDetailsScreen extends React.Component{
    constructor(props){
        super(props);
    this.state={
        userId:firebase.auth().currentUser.email,
        recieverId:this.props.navigation.getParam("details")["user_Id"],
        requestId:this.props.navigation.getParam("details")["request_id"],
        bookName:this.props.navigation.getParam("details")["book_name"],
        reasonToRequest:this.props.navigation.getParam("details")["reason_to_request"],
        recieverName:"",
        recieverContact:"",
        recieverAddress:"",
        recieverRequestDocId:""
    }
    }
    getRecieverDetails(){
        db.collection("users").where("email_id","==",this.state.recieverId).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({
                    recieverName:doc.data().first_name,
                    recieverContact:doc.data().contact,
                    recieverAddress:doc.data().address,
                })
                
            })
        })
        db.collection("requested_books").where("request_id","==",this.state.requestId).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({
                   recieverRequestDocId:doc.id
                })
                
            })
        })
    }
    updateBookStatus=()=>{
            db.collection("all_donations").add({
                book_name:this.state.bookName,
                request_id:this.state.requestId,
                requested_by:this.state.recieverName,
                donor_id:this.state.userId,
                request_status:"donorIntrested"
            })
    }
    componentDidMount(){
        this.getRecieverDetails()
    }
    render(){
        return(
            < View style={{flex:1}}>
<View style={{flex:0.1}}>
<Header
        leftComponent={<Icon
        name="arrow-left" type="font-awesome" color="black" onPress={()=>{
            this.props.navigation.goBack()
        }}/>}
        centerComponent={{text:"DonateBooks",style:{color:"blue",fontSize:20,fontWeight:"bold"}}}
        backgroundColor="red"
        />
</View>
<Card title={"Book Information"} titleStyle={{fontWeight:"bold",fontSize:20}}>
    <Card>
        <Text style={{fontWeight:"bold",fontSize:10}}>
Name:{this.state.bookName}
        </Text>
    </Card>
    <Card>
        <Text style={{fontWeight:"bold",fontSize:10}}>
Reason:{this.state.reasonToRequest}
        </Text>
    </Card>
</Card>


<View style={{flex:0.3}}>
<Card title={"Reciever Information"} titleStyle={{fontWeight:"bold",fontSize:20}}>
    <Card>
        <Text style={{fontWeight:"bold",fontSize:10}}>
Name:{this.state.recieverName}
        </Text>
    </Card>
    <Card>
        <Text style={{fontWeight:"bold",fontSize:10}}>
Contact:{this.state.contact}
        </Text>
    </Card>
    <Card>
        <Text style={{fontWeight:"bold",fontSize:10}}>
Address:{this.state.address}
        </Text>
    </Card>
</Card>
</View>
<View>
{this.state.recieverId!==this.state.userId
?(
    <TouchableOpacity onPress={()=>{
        this.updateBookStatus()
        this.props.navigation.navigate("MyDonations")
    }}>
<Text>
    I Want To Donate
</Text>
    </TouchableOpacity>
)
:null}

</View>
            </View>
        )
    }
}
