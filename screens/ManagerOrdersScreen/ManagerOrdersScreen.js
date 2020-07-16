import React, { Component } from "react";
import { View, ScrollView, StatusBar,TouchableOpacity,Image} from "react-native";
import styles from "./ManagerOrdersScreenStyle";
import StyledText from '../../components/StyledTexts/StyledText'
import HeaderMenu from '../../components/HeadersComponent/HeaderMenu'
import OrderList from '../../components/OrderList'
import * as firebase from 'firebase';

export default class ManagerOrdersScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        
            orderList:[
            ]
        }
    }

    componentDidMount() {
        const userId = firebase.auth().currentUser;
        console.log('id',userId.uid);
        firebase.firestore().collection('registration')
        .where("managerId",  '==', userId.uid)
        .get()
        .then((querySnapshot)  => {
            // console.log('q',querySnapshot)
            querySnapshot.forEach((doc) => {
              const orderData = doc.data();
              console.log('ff',orderData);
              let DatesList = [];
              DatesList.push(
                
                {
                    id:doc.id,
                 rigesterDate: orderData.registerDate,
                 orderNumber:  doc.id,
                 hallName: orderData.hallName,
                 roomName: orderData.roomName,
                 userId:orderData.uid,
                 userName: orderData.userName,
                 userPhone: orderData.userPhone,
                 orderStatus: orderData.orderStatus
                }
              )
              var joined = this.state.orderList.concat(DatesList)
              this.setState({orderList:joined})

            
          });
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
      });

    }

    render() {
        return (
        <View style={styles.containerStyle}>          
            <View style={styles.StatusBar}>
                <StatusBar barStyle="light-content"/>
            </View>
            <View>
            <HeaderMenu navigation={this.props.navigation} title='لوحة التحكم'></HeaderMenu>
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
                            <OrderList 
                                navigation={this.props.navigation}
                                details={this.state.orderList}
                            />
                        </View>

                        </>
                        :
                        <View style={{width: '100%',paddingTop:50,justifyContent:'center',alignItems:'center'}}>
                            <Image source={require('../../assets/images/noSearch.png')}/>
                            <StyledText style={{color:'#000'}}>لا يوجد حجوزات بالصالات الخاصة بك</StyledText>
                        </View>
                    }
                </View>
                
            </ScrollView>
        </View>
        );
    }
}