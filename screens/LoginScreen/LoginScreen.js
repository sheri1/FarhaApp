import React, { Component } from "react";
import { View, TouchableOpacity, ScrollView, TextInput, AsyncStorage, Alert,Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import StyledText from "../../components/StyledTexts/StyledText";
import StyledTextBold from "../../components/StyledTexts/StyledTextBold";
import StyledTextLight from "../../components/StyledTexts/StyledTextLight";
import styles from "./LoginScreenStyle";
import { Ionicons } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";
import NetInfo from "@react-native-community/netinfo";
import * as firebase from "firebase"; 
import * as Facebook from 'expo-facebook';
import { withFirebaseHOC } from "../../config/Firebase";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      spinner: false,
      isConnected: null,
      securePassword:true,
      errorMessage:'',
      user:false,
    }
  }

  componentDidMount() {
    const currentUser = firebase.auth().currentUser;
    if (currentUser != null) {
      this.setState({user:true})
    }
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

  async loginWithFacebook() {

    try {
      Facebook.initializeAsync('1160721987624507','Farhah');
      const { type, token } = await Facebook.logInWithReadPermissionsAsync('1160721987624507', 
              {permissions: ['public_profile','email']})

    if (type == 'success') {

      const credential = firebase.auth.FacebookAuthProvider.credential(token)

     firebase.auth().signInWithCredential(credential)
     .then(currentUser => {
      console.log(currentUser.user.uid);
      if(currentUser.user){
        const user = currentUser.user;
        const uid = currentUser.user.uid;
          firebase.firestore().doc(`users/${uid}`).set({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            city:'غزة',
            uid:user.uid,
            phone:'',
            createdAt:new Date(),
          }).then(()=>{
            this.props.navigation.navigate('HomeScreen')
          })
      
      }

    })
    }
    } catch (error){
      console.log('error ',error)
    }
  }

  signAnonymously() {

    firebase.auth().signInAnonymously()
    .then(() => {
      this.props.navigation.navigate('HomeScreen')
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorMessage = error.message;
      console.log(errorMessage);
      // ...
    });
 

  }
  render() {
    const {errorMessage, user} = this.state;
    return (
      <>
        <View style={styles.containerLinear}>
          <Spinner
            visible={this.state.spinner} color="white" textContent={"جاري تسجيل الدخول.."}
            textStyle={{ fontSize: 20, fontFamily: "tahoma", color: "white" }}
          />
          <View style={{ width: '100%' }}>
            <ScrollView
              style={{ width: '100%' }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,justifyContent: 'flex-start',backgroundColor:'#fff',paddingTop:70
              }}
              snapToStart={true}
            >
              <View style={{ flex: 1 }}>
                <View style={styles.KeyBoard}>
                  <KeyboardAwareScrollView
                    keyboardDismissMode="on-drag" //work only on ios
                    enableOnAndroid={true}
                    style={{ width: "100%" }}
                  >
                    {!user && <View style={{width:'100%'}}>
                      <TouchableOpacity style={{width:60,height:30,borderRadius:10,backgroundColor:'#F7F6F7',justifyContent:'center',alignItems:'center'}}
                        onPress={this.signAnonymously}
                      >
                        <StyledText style={{color:'#924480'}}>تخطي</StyledText>
                      </TouchableOpacity>
                    </View>}
                    <View style={styles.logoImage}>
                      <Image source={require('../../assets/images/loginLogo.png')} />
                      <StyledTextBold style={styles.title1}>مرحبا بك</StyledTextBold>
                      <StyledText style={styles.title2}>سجل الدخول للمتابعة</StyledText>
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
                            returnKeyType={"next"}
                            onChangeText={(email) => this.setState({ email })}
                            blurOnSubmit={false}
                            keyboardType="email-address"
                            onSubmitEditing={() => {
                              this.secondTextInput.focus();
                            }}
                            style={styles.Input}
                          />
                        </View>
                      </View>
                      
                      <View style={styles.InputContainer2}>
                        <StyledTextBold style={styles.InputContainer2Tilte}>كلمة المرور</StyledTextBold>
                        <View style={{ flexDirection: 'row' }}>
                          <TouchableOpacity onPress={()=>this.securePasswordMethod()}>
                            {!this.state.securePassword && <Ionicons name='md-eye' size={25} color='#8D8D8D' />}
                            {this.state.securePassword && <Ionicons name='md-eye-off' size={25} color='#8D8D8D' />}
                          </TouchableOpacity>
                          <TextInput
                            placeholder="أدخل كلمة السر "
                            placeholderTextColor="#A2A2A2"
                            underlineColorAndroid="transparent"
                            value={this.state.password}
                            returnKeyType={"done"}
                            onChangeText={(password) => this.setState({ password })}
                            blurOnSubmit={true}
                            secureTextEntry={this.state.securePassword}
                            ref={(input) => {
                              this.secondTextInput = input;
                            }}
                            style={styles.Input}
                            onSubmitEditing={() => this.login()}
                          />
                        </View>
                      </View>
                      <StyledText style={{color:'#F00'}}>{errorMessage}</StyledText>
                      <View style={styles.forget}>
                        <TouchableOpacity 
                          onPress={() => this.props.navigation.navigate('ForgetPasswordScreen')}
                        >
                          <StyledTextLight style={styles.forgetTitle}>
                            هل نسيت كلمة المرور ؟
                          </StyledTextLight>
                        </TouchableOpacity>
                      </View>

                      <View style={{justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity activeOpacity={0.5} style={styles.LoginTouch}
                          onPress={() => this.login()}
                        >
                          <StyledText style={{color:'#fff',fontSize:15}}>تسجيل الدخول</StyledText>
                        </TouchableOpacity>
                      </View>

                      <View style={styles.registerCon}>
                        <TouchableOpacity activeOpacity={0.5}
                          onPress={() => this.props.navigation.navigate('RegisterScreen')}
                        >
                          <StyledText style={styles.txt1}>تسجيل حساب جديد</StyledText>
                        </TouchableOpacity>
                        <View>
                          <StyledText style={styles.txt2}>مستخدم جديد ؟</StyledText>
                        </View>
                      </View>

                      <View style={styles.OrCont}>
                        <View>
                          <StyledTextLight style={styles.ortxt}>
                            أو قم بالتسجيل عبر
                          </StyledTextLight>
                        </View>
                        <View style={styles.SocialIconCon}>
                          <TouchableOpacity style={styles.SocialIconFace}>
                            <Image source={require('../../assets/images/google.png')} />
                          </TouchableOpacity>

                          <TouchableOpacity style={styles.SocialIconFace} onPress={this.loginWithFacebook}>
                            <Image source={require('../../assets/images/facebook.png')} />
                          </TouchableOpacity>
                        </View>
                      </View>
                      
                    </View>
                  </KeyboardAwareScrollView>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </>
    );
  }

  login(){
      if(this.validation()){
        this.handleLogin();
      }else {
        // alert('error');

      }
  }

  handleLogin = () => {
    const {email,password} = this.state;
    firebase.auth().signInWithEmailAndPassword(email,password)
        .then (()=>this.props.navigation.navigate('HomeScreen'))
        .catch(error => this.setState({ errorMessage: "خطأ في اسم المستخدم أو كلمة المرور" }))
  }

  validation = () => {
    const {email,password} = this.state;
    let isValid = true;
    if(!email) {
      isValid = false;
      alert("يرجى ادخال بريد الكتروني صحيح");
      return;
    }

    if (!password){
      isValid = false;
      alert("يرجى ادخال كلمة المرور ");
      return;
    }

    return isValid;

  }
}

export default withFirebaseHOC(LoginScreen);