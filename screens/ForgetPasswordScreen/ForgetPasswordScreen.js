
import React, { Component } from "react";
import { View, TouchableOpacity, ScrollView, TextInput, AsyncStorage, Alert,Image,StatusBar } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import StyledText from "../../components/StyledTexts/StyledText";
import StyledTextBold from "../../components/StyledTexts/StyledTextBold";
import StyledTextLight from "../../components/StyledTexts/StyledTextLight";
import styles from "./ForgetPasswordScreenStyle";
import { Ionicons } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";
import NetInfo from "@react-native-community/netinfo";
import HeaderBack from '../../components/HeadersComponent/HeaderBack'
import Firebase from '../../config/Firebase'

export default class ForgetPasswordScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        email: "",
        password: "",
        spinner: false,
        isConnected: null,
        securePassword:true,
        }
    }

    componentDidMount() {
        NetInfo.fetch().then(state => {
        let isConnected = state.isConnected;
        if(isConnected){
            this.setState({ isConnected:true });
        }
        else{
            this.setState({ isConnected: false });
        }
        })
        NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectivityChange);

    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener(
        "connectionChange",
        this._handleConnectivityChange
        );
    }

    _handleConnectivityChange = (isConnected) => {
        this.setState({ isConnected });
    };

    securePasswordMethod(){
        this.setState({
        securePassword: !this.state.securePassword
        })
    }

    render() {
        return (
        <>
            <View style={styles.containerLinear}>
            <Spinner
                visible={this.state.spinner} color="white" textContent={""}
                textStyle={{ fontSize: 20, fontFamily: "tahoma", color: "white" }}
            />
            <View style={styles.StatusBar}>
                <StatusBar barStyle="light-content"/>
            </View>
            <View style={{width:'100%'}}>
                <HeaderBack navigation={this.props.navigation} title=''></HeaderBack>
            </View>
            <View style={{ width: '100%' }}>
                <ScrollView
                style={{ width: '100%',height:'100%' }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1,paddingHorizontal:20,justifyContent: 'flex-start',backgroundColor:'#fff',paddingTop:100}}
                snapToStart={true}
                >
                <View style={{ flex: 1 }}>
                    <View style={styles.KeyBoard}>
                    <KeyboardAwareScrollView
                        keyboardDismissMode="on-drag" //work only on ios
                        enableOnAndroid={true}
                        style={{width:"100%",height:'100%'}}
                    >
                        <View style={styles.logoImage}>
                            <StyledTextBold style={styles.title1}>نسيت كلمة المرور</StyledTextBold>
                            <StyledText style={styles.title2}>الرجاء إدخال بريد الكتروني فعال  لاسترداد حسابك</StyledText>
                        </View>

                        <View style={{ flex: 2, paddingTop: 40 }}>
                        <View style={styles.InputContainer2}>
                            <StyledTextBold style={styles.InputContainer2Tilte}>الايميل</StyledTextBold>
                            <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                placeholder="أدخل البريد الالكتروني "
                                placeholderTextColor="#A2A2A2"
                                underlineColorAndroid="transparent"
                                value={this.state.email}
                                returnKeyType={"done"}
                                onChangeText={(email) => this.setState({ email })}
                                blurOnSubmit={false}
                                keyboardType="email-address"
                                onSubmitEditing={() => this.forget()}
                                style={styles.Input}
                            />
                            </View>
                        </View>
                        
                        </View>

                        
                    </KeyboardAwareScrollView>

                    <View style={{justifyContent:'center',alignItems:'center',position:'relative',bottom:100,width:'100%'}}>
                        <TouchableOpacity activeOpacity={0.5} style={styles.LoginTouch}
                        onPress={() => this.forget()}
                        >
                            <StyledText style={{color:'#fff',fontSize:15}}>
                                نسيت كلمة المرور
                            </StyledText>
                        </TouchableOpacity>
                    </View>

                    </View>
                </View>
                </ScrollView>
            </View>
            </View>
        </>
        );
    }

    forget(){
       // this.props.navigation.navigate('LoginScreen')
        var emailAddress = this.state.email;
        Firebase.auth.sendPasswordResetEmail(emailAddress).then(function() {
        // Email sent.
        alert('Email sent Successfuly');
        }).catch(function(error) {
        alert('error')
         });
    }
}

