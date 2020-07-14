import React, { Component } from "react";
import { View, ScrollView, StatusBar,Image,TextInput,TouchableOpacity} from "react-native";
import styles from "./OrderDoneScreenStyle";
import StyledText from '../../components/StyledTexts/StyledText'
import StyledTextBold from '../../components/StyledTexts/StyledTextBold'
import HeaderMenu from '../../components/HeadersComponent/HeaderMenu'

export default class OrderDoneScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            isConnected: null,
        }
    }

    render() {
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
                    <StyledText style={styles.thanks}>لتأكيد الحجز يرجى التوجه للصالة لدفع العربون في خلال 3 أيام</StyledText>
                    

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('HomeScreen')}>
                        <StyledText style={styles.move}>الانتقال للرئيسية</StyledText>
                    </TouchableOpacity>
                
                </ScrollView>
            </View>
        </View>
        );
    }
}