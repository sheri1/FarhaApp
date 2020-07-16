import * as React from "react";
import { StyleSheet, View, Image, TouchableOpacity , FlatList } from "react-native";
import StyledText from './StyledTexts/StyledText';
import { AntDesign, Entypo } from "@expo/vector-icons";
import * as firebase from 'firebase';

export default class OrderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accepted: false
        }
    }

    
    render() {
        let orderList = this.props.details

        // {id:0,hallName:'اسم الصالة',orderNum:'123456',orderDate:'16/6/2020',orderTime:'7:30'}

        // {
        //     rigesterDate: orderData.registerDate,
        //     orderNumber:  doc.id,
        //     hallName: orderData.hallName,
        //     roomName: orderData.roomName,
        //     userName: orderData.userName,
        //     userPhone: orderData.userPhone
        //    }
        return (
        <>
            <FlatList
                style={{flex: 1}}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{marginTop:30}}
                snapToStart={true}
                data={orderList}
                extraData={this.props}
                numColumns={1}
                renderItem={({item, index})=>(
                    <View key={index} style={styles.container} activeOpacity={0.8}>
                        <View style={styles.detailCont}>
                            <StyledText style={[styles.orderTxtDetail,{color:'#A2A2A2',fontSize: 12}]}>
                                {item.rigesterDate}    
                            </StyledText>
                            <StyledText style={styles.orderTxtDetail}>
                                رقم الطلب : {item.orderNumber}
                            </StyledText>
                            <StyledText style={styles.orderTxtDetail}>
                                اسم الصالة : {item.hallName}
                            </StyledText>
                            <StyledText style={styles.orderTxtDetail}>
                                 قاعة: {item.roomName}
                            </StyledText>
                            <StyledText style={styles.orderTxtDetail}>
                                اسم المستخدم : {item.userName}
                            </StyledText>
                            <StyledText style={styles.orderTxtDetail}>
                                رقم التواصل: {item.userPhone}
                            </StyledText>
                        </View>
                        {
                            item.orderStatus || this.state.accepted ? 
                            <>
                             <StyledText style={styles.accept}>
                                تم تأكيد الحجز ✅
                            </StyledText>
                            </>
                            :

                            <>
                            <View style={styles.btnCont}>
                            <TouchableOpacity style={styles.btn}
                                onPress={()=>this.acceptOrder(item.id)}
                            >
                                    <StyledText style={{color:'#fff'}}> تأكيد الحجز</StyledText>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.btnCont}>
                                <TouchableOpacity style={styles.btn2}
                                    onPress={()=>this.reject(item.id,item.userId,item.roomName)}
                                >
                                    <StyledText style={{color:'#fff'}}>رفض الحجز</StyledText>
                                </TouchableOpacity>
                            </View>
                            </>

                        }
                        {/* <View style={styles.btnCont}>
                            <TouchableOpacity style={styles.btn}
                                onPress={()=>this.props.navigation.navigate('OrderDetailScreen')}
                            >
                                <StyledText style={{color:'#fff'}}>تم تأكيد الحجز</StyledText>
                            </TouchableOpacity>
                            
                            <TouchableOpacity style={styles.btn}
                                onPress={()=>this.props.navigation.navigate('OrderDetailScreen')}
                            >
                                <StyledText style={{color:'#fff'}}>رفض الحجز</StyledText>
                            </TouchableOpacity>
                        </View> */}
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </>
        );
    }

    acceptOrder(id) {
        firebase.firestore().collection('registration').doc(id)
        .update({
            orderStatus: true
        }).then(()=>{
            this.setState({accepted:true})
        })
    }

    reject(hallId, userId,roomName) {
        console.log(userId)
        let userInfo = firebase.firestore().collection("users");
        let query = userInfo.where("uid", "==", userId)
                .get()
                .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                let expoToken = doc.data().expoPushToken;
                     console.log('token',expoToken);
                     this.sendPushNotification(expoToken,roomName);
                   });
                })
                .catch(function(error) {
                     console.log("Error getting documents: ", error);
                });

        firebase.firestore().collection('registration').doc(hallId)
        .delete()
    }


    async sendPushNotification(expoPushToken,roomName) {
        const message = {
            to: expoPushToken,
            sound: 'default',
            title: 'Farha App',
            body: `نأسف, تم رفض طلب حجز ${roomName} لتأخرك في دفع العربون`,

        };

        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        }).then(response => console.log(response.text()))
    }

}


const styles = StyleSheet.create({
    container: {flex:1, borderRadius: 15,backgroundColor:'#fff',
        justifyContent:'center',alignItems:'center',marginHorizontal:10,marginVertical:10,
        flexDirection:'column',borderColor:'#E4E4E4',borderWidth:1,height:"100%"
    },
    detailCont:{flex:1,justifyContent:'flex-start',alignItems:'flex-end',height:'100%'},
    btnCont:{ width:'100%',flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',},
    btn:{height:50,backgroundColor:'#49BD78',justifyContent:'center',alignItems:'center',width:'80%'
    , marginTop: 10, borderRadius:15
    
    },

    btn2:{height:50,backgroundColor:'#EC3C3D',justifyContent:'center',alignItems:'center',width:'80%',marginTop:10,marginBottom:10
,borderRadius:15
    },
    orderTxtDetail:{width:'100%',textAlign:'right',marginVertical:5},
    accept:{marginTop:15,color:'#49BD78',marginBottom:15,fontSize:20,fontWeight:'bold'}
})