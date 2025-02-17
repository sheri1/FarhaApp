import React, { Component } from "react";
import { View, ScrollView, StatusBar,Image,TextInput,TouchableOpacity,ActivityIndicator} from "react-native";
import styles from "./BookingDoneScreenStyle";
import StyledText from '../../components/StyledTexts/StyledText'
import StyledTextBold from '../../components/StyledTexts/StyledTextBold'
import HeaderMenu from '../../components/HeadersComponent/HeaderMenu'
import * as firebase from 'firebase';

export default class BookingDoneScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            isConnected: null,
            isManager:false,
            isLoading:false,
            earnest:''
        }
    }

    componentDidMount(){
        const info = this.props.navigation.getParam('info');
        this.setState({
            earnest: info.earnest,
            isManager: info.isManager
        })
    }

    render() {
        const {isManager,isLoading} = this.state;
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
  
            <View style={{ width: '100%',marginTop: 10}}>
                <ScrollView
                    style={{ width: '100%' }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flexGrow:1,alignItems:'center',justifyContent:'center',backgroundColor:'#fff',paddingTop:120}}
                    snapToStart={true}
                >   
                    <Image source={require('../../assets/images/contact.png')} />
                    {!isManager ?
                        <>
                        <StyledText style={styles.thanks}>لتأكيد الحجز يرجى التوجه للصالة</StyledText>
                        <StyledText style={styles.thanks}> لدفع العربون بقيمة {this.state.earnest} خلال مدة 3 أيام</StyledText>
                         </>
                    :
                    <StyledText style={styles.thanks}>تم إضافة التاريخ بنجاح</StyledText>
                    }
                    <StyledText style={styles.thanks}></StyledText>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('HomeScreen')}>
                        <StyledText style={styles.move}>الرجوع للرئيسية</StyledText>
                    </TouchableOpacity>
                
                </ScrollView>
            </View>
        </View>
        );
                }
    }
}