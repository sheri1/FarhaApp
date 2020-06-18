import React, { Component } from "react";
import { View, ScrollView, StatusBar,Image,TextInput,TouchableOpacity} from "react-native";
import styles from "./ContactScreenStyle";
import Constants from 'expo-constants'
import StyledText from '../../components/StyledTexts/StyledText'
import StyledTextBold from '../../components/StyledTexts/StyledTextBold'
import HeaderMenu from '../../components/HeadersComponent/HeaderMenu'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default class ContactScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: '',
            spinner: false,
            isConnected: null,
            visible:false,
            phone:'',
            problem:''
        }
    }

    render() {
        return (
        <View style={styles.containerStyle}>          
            <View style={styles.StatusBar}>
            <StatusBar barStyle="light-content"/>
            </View>
            <View>
            <HeaderMenu navigation={this.props.navigation} title='تواصل معنا'></HeaderMenu>
            </View>
            <View style={{ width: '100%',marginTop: 10}}>
                <ScrollView
                    style={{ width: '100%' }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flexGrow:1,justifyContent:'flex-start',backgroundColor:'#fff',paddingTop:20}}
                    snapToStart={true}
                >   
                <KeyboardAwareScrollView
                    keyboardDismissMode="on-drag" //work only on ios
                    enableOnAndroid={true}
                    style={{ width: "100%",paddingBottom:150}}
                > 
                    <View style={styles.titleCont}>
                        <StyledText style={styles.title}>معلومات التواصل</StyledText>
                    </View>

                    <View style={styles.InfoCont}>
                        <View style={styles.InfoRow}>
                            <View style={{flex:1}}>
                                <StyledText style={styles.info}>farha@hotmail.com</StyledText>
                            </View>
                            <Image source={require('../../assets/images/email.png')}/>
                        </View>

                        <View style={styles.InfoRow}>
                            <View style={{flex:1}}>
                                <StyledText style={styles.info}>000000000</StyledText>
                            </View>
                            <Image source={require('../../assets/images/phone.png')}/>
                        </View>

                        <View style={styles.InfoRow}>
                            <View style={{flex:1}}>
                                <StyledText style={styles.info}>059999999</StyledText>
                            </View>
                            <Image source={require('../../assets/images/mobile.png')}/>
                        </View>
                    </View>


                    <View style={styles.titleCont}>
                        <StyledText style={styles.title}>نموذج الاتصال</StyledText>
                    </View>

                    <View style={styles.InputContainer}>
                        <View style={styles.InputContainer2}>
                            <StyledTextBold style={styles.InputContainer2Tilte}>الاسم</StyledTextBold>
                            <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                placeholder="اسم المستخدم"
                                placeholderTextColor="#A2A2A2"
                                underlineColorAndroid="transparent"
                                returnKeyType={"next"}
                                onSubmitEditing={() => {this.secondTextInput.focus()}}
                                onChangeText={(usernameNew) => this.setState({ usernameNew })}
                                blurOnSubmit={false}
                                style={styles.Input}
                            />
                            </View>
                        </View>

                        <View style={styles.InputContainer2}>
                            <StyledTextBold style={styles.InputContainer2Tilte}>البريد الالكتروني</StyledTextBold>
                            <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                placeholder="البريد الالكتروني"
                                placeholderTextColor="#A2A2A2"
                                underlineColorAndroid="transparent"
                                returnKeyType={"next"}
                                keyboardType="email-address"
                                ref={(input) => {this.secondTextInput = input}}
                                onSubmitEditing={() => {this.ThirdTextInput.focus()}}
                                onChangeText={(email) => this.setState({ email })}
                                blurOnSubmit={false}
                                style={styles.Input}
                            />
                            </View>
                        </View>

                        <View style={styles.InputContainer2}>
                            <StyledTextBold style={styles.InputContainer2Tilte}>الهاتف</StyledTextBold>
                            <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                placeholder="الهاتف"
                                placeholderTextColor="#A2A2A2"
                                underlineColorAndroid="transparent"
                                returnKeyType={"next"}
                                keyboardType='phone-pad'
                                ref={(input) => {this.ThirdTextInput = input}}
                                onSubmitEditing={() => {this.fourthTextInput.focus()}}
                                onChangeText={(phone) => this.setState({ phone })}
                                blurOnSubmit={false}
                                style={styles.Input}
                            />
                            </View>
                        </View>

                        <View style={styles.InputContainer2}>
                            <StyledTextBold style={styles.InputContainer2Tilte}>المشكلة</StyledTextBold>
                            <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                placeholder="المشكلة"
                                placeholderTextColor="#A2A2A2"
                                underlineColorAndroid="transparent"
                                returnKeyType={"next"}
                                keyboardType='default'
                                ref={(input) => {this.fourthTextInput = input}}
                                // onSubmitEditing={() => {this.fifthTextInput.focus()}}
                                onChangeText={(problem) => this.setState({ problem })}
                                blurOnSubmit={false}
                                style={styles.Input}
                            />
                            </View>
                        </View>
                    </View>

                    <View style={styles.RegisterButtonCont}>
                        <TouchableOpacity activeOpacity={0.5} style={styles.LoginTouch}
                          // onPress={() => {this._register()}}
                        >
                          <StyledText style={{color:'#fff',fontSize:15}}>إرسال</StyledText>
                        </TouchableOpacity>
                    </View>

                </KeyboardAwareScrollView> 
                </ScrollView>
            </View>
        </View>
        );
    }
}