import React, { Component } from "react";
import { View, ScrollView, StatusBar,TouchableOpacity,Image,ActivityIndicator} from "react-native";
import styles from "./OrdersScreenStyle";
import StyledText from '../../components/StyledTexts/StyledText'
import HeaderMenu from '../../components/HeadersComponent/HeaderMenu'
import OrderList from '../../components/OrderList'
import UserOrderList from "../../components/UserOrderList";
import * as firebase from 'firebase';

export default class OrdersScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
            orderList:[],
            isLoading:true
        }
    }

    componentDidMount() {
        const userId = firebase.auth().currentUser;
        firebase.firestore().collection('registration')
        .where("uid",  '==', userId.uid)
        .get()
        .then((querySnapshot)  => {
            let DatesList = [];
            let counter = 1;
            querySnapshot.forEach((doc) => {
              const orderData = doc.data();
              DatesList.push(                
                {
                 id:doc.id,
                 rigesterDate: orderData.registerDate,
                 orderNumber: 1500 + counter,
                 hallName: orderData.hallName,
                 roomName: orderData.roomName,
                 userId:orderData.uid,
                 userName: orderData.userName,
                 userPhone: orderData.userPhone,
                 orderStatus: orderData.orderStatus,
                 orderDate: orderData.orderDate,
                 price: orderData.roomPrice
                }
              )
              counter++;

            
          });

         this.setState({orderList:DatesList,
        isLoading:false})

    })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
      });

    }

    render() {
        const {isLoading} = this.state;
        if (isLoading) {
            return (
                <View style={{flex: 1, justifyContent: "center"}}>
                     <ActivityIndicator size="large" color="#924480" />
                </View>
            );
          } else {
        return (
        <View style={styles.containerStyle}>          
            <View style={styles.StatusBar}>
                <StatusBar barStyle="light-content"/>
            </View>
            <View>
            <HeaderMenu navigation={this.props.navigation} title='الطلبات'></HeaderMenu>
            </View>
            <ScrollView
                style={{ width: '100%' }}
                showsVerticalScrollIndicator={false} snapToStart={true}
                contentContainerStyle={{flexGrow:1,justifyContent:'flex-start',paddingBottom:50,backgroundColor:'#fff',paddingTop:20,paddingHorizontal:10}}
            >
                

                
                <View style={{width: '100%'}}>
                    {this.state.orderList.length > 0 ?
                        <>
                        <View style={styles.storiesImagesCont}>
                            <UserOrderList 
                                navigation={this.props.navigation}
                                details={this.state.orderList}
                            />
                        </View>
                        </>
                        :
                        <View style={{width: '100%',paddingTop:50,justifyContent:'center',alignItems:'center'}}>
                            <Image source={require('../../assets/images/noSearch.png')}/>
                            <StyledText style={{color:'#000'}}>لم تقم بحجز أي صالة بعد</StyledText>
                        </View>
                    }
                </View>
                
            </ScrollView>
        </View>
        );
      }
    }
}