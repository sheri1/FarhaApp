import React, { Component } from "react";
import { View, ScrollView, StatusBar,Image} from "react-native";
import styles from "./OrderDetailScreenStyle";
import StyledText from '../../components/StyledTexts/StyledText'
import HeaderBack from '../../components/HeadersComponent/HeaderBack'
import { Entypo } from '@expo/vector-icons'; 

export default class OrderDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderDate:'7/8/2020',
            orderTime:'7:30',
            orderOrder:'123456',

            orderStartTime:'5:30 pm',
            orderEndTime:'9:00 pm',
            orderDetails : {}
        }
    }

    componentDidMount() {
        const details = this.props.navigation.getParam('details');
        this.setState({orderDetails : details});
    }

          //     id:doc.id,
        //     rigesterDate: orderData.registerDate,
        //     orderNumber:  doc.id,
        //     hallName: orderData.hallName,
        //     roomName: orderData.roomName,
        //     userId:orderData.uid,
        //     userName: orderData.userName,
        //     userPhone: orderData.userPhone,
        //     orderStatus: orderData.orderStatus
        //    }

    render() {
        const {orderDetails} = this.state;
        return (
        <View style={styles.containerStyle}>          
            <View style={styles.StatusBar}>
                <StatusBar barStyle="light-content"/>
            </View>
            <View>
                <HeaderBack navigation={this.props.navigation} title='تفاصيل الطلب'></HeaderBack>
            </View>
            <ScrollView
                style={{ width: '100%'}} showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow:1,justifyContent:'flex-start',paddingTop:20,marginBottom:50}}
            >
                <View style={styles.content}>
                    <View style={styles.orderViewCont}>
                        <View style={styles.orderView}>
                            <StyledText style={styles.orderTxtDetail}>
                                {orderDetails.orderDate} 
                            </StyledText>
                            <StyledText style={styles.orderTxtDetail}>
                                رقم الطلب : {orderDetails.orderNumber}
                            </StyledText>
                        </View>
                    </View>

                    <View style={styles.dataRow}>
                        <View style={styles.dataRowView}>
                            <StyledText style={styles.dataRowDetail}>قيد التنفيذ</StyledText>
                        </View>
                        <StyledText>الحالة : </StyledText>   
                    </View>

                    <View style={styles.dataRow}>
                        <View style={styles.dataRowView}>
                            <StyledText style={styles.dataRowDetail}>{orderDetails.price}</StyledText>
                        </View>
                        <StyledText>المجموع : </StyledText>   
                    </View>

                    <View style={styles.Row}>
                        <StyledText style={styles.rowDetail}>تفاصيل الحجز</StyledText>   
                    </View>

                    <View style={styles.dataRow}>
                        <View style={styles.dataRowView}>
                            <StyledText style={styles.dataRowDetail}>{orderDetails.rigesterDate}</StyledText>
                        </View>
                        <StyledText>تاريخ الحجز : </StyledText>   
                    </View>

                    {/* <View style={styles.dataRow}>
                        <View style={styles.dataRowView}>
                            <StyledText style={styles.dataRowDetail}>
                                من {this.state.orderStartTime} الى {this.state.orderEndTime}
                            </StyledText>
                        </View>
                        <StyledText>وقت الحجز : </StyledText>   
                    </View> */}

                    <View style={styles.dataColumn}>
                        <View>
                            <StyledText style={styles.dataColumnTxt}>الخدمات :</StyledText>
                        </View> 
                        <View style={styles.dataViewTxt}>
                            <StyledText numberOfLines={5} style={styles.dataColumnDetail}>
                            كوشه مضيئة 
                             - ليزر -  فيديو - دي جي طوال الحفل  
                            </StyledText>
                        </View>
                    </View>

                    <View style={styles.dataColumn}>
                        <View>
                            <StyledText style={styles.dataColumnTxt}>ملاحظات :</StyledText>
                        </View> 
                        <View style={styles.dataViewTxt}>
                            <StyledText numberOfLines={5} style={styles.dataColumnDetail}>
                                        لا يوجد
                            </StyledText>
                        </View>
                    </View>

                    <View style={styles.Row}>
                        <StyledText style={styles.rowDetail}>بيانات الصالة</StyledText>   
                    </View>

                    <View style={styles.dataRow}>
                        <View style={styles.dataRowView}>
                            <StyledText style={styles.dataRowDetail}>{orderDetails.hallName}</StyledText>
                        </View>
                        <StyledText>اسم الصالة : </StyledText>   
                    </View>

                    <View style={styles.dataRow}>
                        <View style={styles.dataRowView}>
                            <StyledText style={styles.dataRowDetail}>{orderDetails.roomName}</StyledText>
                        </View>
                        <StyledText>اسم القاعة : </StyledText>   
                    </View>

                    {/* <View style={styles.Row}>
                        <StyledText style={styles.rowDetail}>بيانات الصالة</StyledText>   
                    </View> */}

                    {/* <View style={styles.hallRowCont}>
                        <View style={styles.hallRow}>
                            <View style={styles.hallDetail}>
                                <View>
                                    <StyledText style={styles.hallName}>اسم الصالة</StyledText>
                                </View>
                                <View style={styles.hallRowLocation}>
                                    <View style={styles.hallLocation}>
                                        <StyledText style={styles.hallPlace}>دير البلح</StyledText>
                                    </View>
                                    <Entypo name="location-pin" size={15} color="#A2A2A2" />
                                </View>
                                <View>
                                    <StyledText style={styles.hallPrice}>200$</StyledText>
                                </View>
                            </View>
                            <View style={styles.hallImage}>
                                <Image style={{width:100,height:100}} source={require('../../assets/images/hall2.png')}/>
                            </View>  
                        </View>
                    </View> */}

                </View>
            </ScrollView>
        </View>
        );
    }
}