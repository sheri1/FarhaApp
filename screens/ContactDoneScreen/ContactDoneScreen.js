import React, { Component } from "react";
import { View, ScrollView, StatusBar,Image,TextInput,TouchableOpacity} from "react-native";
import styles from "./ContactDoneScreenStyle";
import StyledText from '../../components/StyledTexts/StyledText'
import StyledTextBold from '../../components/StyledTexts/StyledTextBold'
import HeaderMenu from '../../components/HeadersComponent/HeaderMenu'

export default class ContactDoneScreen extends Component {
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
            {/* <View>
            <HeaderMenu navigation={this.props.navigation} title='تواصل معنا'></HeaderMenu>
            </View> */}
            <View style={{ width: '100%',marginTop: 10}}>
                <ScrollView
                    style={{ width: '100%' }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flexGrow:1,alignItems:'center',justifyContent:'center',backgroundColor:'#fff',paddingTop:120}}
                    snapToStart={true}
                >   
                    <Image source={require('../../assets/images/contact.png')} />
                    <StyledText style={styles.thanks}>شكرا على التواصل</StyledText>
                    <StyledText style={styles.try}>سنحاول التواصل معك بأقرب وقت</StyledText>

                    <TouchableOpacity>
                        <StyledText style={styles.move}>الانتقال للرئيسية</StyledText>
                    </TouchableOpacity>
                
                </ScrollView>
            </View>
        </View>
        );
    }
}