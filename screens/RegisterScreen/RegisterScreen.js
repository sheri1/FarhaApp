import React, { Component } from "react";
import { View,StatusBar,Image, TouchableOpacity, ScrollView, TextInput, AsyncStorage, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import StyledText from "../../components/StyledTexts/StyledText";
import StyledTextBold from "../../components/StyledTexts/StyledTextBold";
import StyledTextLight from "../../components/StyledTexts/StyledTextLight";
import styles from "./RegisterScreenStyle";
import { Ionicons,AntDesign } from "@expo/vector-icons";
import Dialog, { DialogContent } from "react-native-popup-dialog";
import NetInfo from "@react-native-community/netinfo";
import HeaderBack from '../../components/HeadersComponent/HeaderBack'
//import {withFirebaseHOC} from '../../services/firebase';
import { withFirebaseHOC } from '../../config/Firebase'

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      location: null,
      isConnected: null,
      visible:false,   
      
      username: "",
      usernameNew:"",
      password: "",
      password_confirmation:'',
      email: '',
      area: '',
      securePassword:true,
      securePassword2:true,
      errorslist:[],
      phone:'',
      city:''
      
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
  }

  securePasswordMethod(){
    this.setState({
      securePassword: !this.state.securePassword
    })
  }

  securePasswordMethod2(){
    this.setState({
      securePassword2: !this.state.securePassword2
    })
  }

  register(){
    // this.handleOnSignup(values);
    if(this.validation()){
      this.handleOnSignup();
    }else {
      alert('error');
    }
  }

  validation = () => {
    const {usernameNew,email,phone,city,password,password_confirmation} = this.state;
    let isValid = true;

    if (!usernameNew.match(/^[a-zA-Z\u0600-\u06FF\s]+$/) || !usernameNew){
        isValid = false;
        //add Error message
    }

    if(!email.match(/[^\d][\w.]+@\w+(\.[A-Za-z]+){1,2}/g) || !email){
      isValid = false;
        //add Error message
    }

    if (!phone.match(/[0-9]{10}/) || !phone){
      isValid = false;
        //add Error message
    }

    if(!city.match(/^[a-zA-Z\u0600-\u06FF\s]+$/) || !city){
      isValid = false;
      //add Error message
    }

    if(password !== password_confirmation){
      isValid = false;
    }

    return isValid;
  }

  handleOnSignup =  async () => {
      const {usernameNew,email,phone,city,password} = this.state;
      try {
        const currentUser = await this.props.firebase.signupWithEmail(
          email,
          password
        )
        
        if(currentUser.user){
          const user = currentUser.user;
          const uid = currentUser.user.uid;
          const userData = { email, displayName, phone,city,uid };
          await this.props.firebase.createUserDocument(user,userData);
          this.props.navigation.navigate('RegisterDoneScreen');
        }

      } catch (err) {
        console.log('Something went wrong: ' + err);
        throw err
      }


      // firebase
      //   .auth()   
      //   .createUserWithEmailAndPassword(this.state.email, this.state.password)
      //   .then(() =>  this.props.navigation.navigate('RegisterDoneScreen'))
      //   .catch(error =>console.log(error));
 
  }

  render() {
    return (
      <>
        <View style={styles.containerLinear}>
          <View style={styles.StatusBar}>
              <StatusBar barStyle="light-content"/>
          </View>
          <View style={{width:'100%'}}>
            <HeaderBack navigation={this.props.navigation} title=''></HeaderBack>
          </View>
          <View style={{ width: '100%',marginTop: 10}}>
            <ScrollView
              style={{ width: '100%' }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{flexGrow:1,justifyContent:'flex-start',backgroundColor:'#fff',paddingHorizontal:20}}
              snapToStart={true}>
              
              {/* <SignUpForm /> */}

              <View style={{ flex: 1}}>
                <View style={styles.KeyBoard}>
                  <KeyboardAwareScrollView
                    keyboardDismissMode="on-drag" //work only on ios
                    enableOnAndroid={true}
                    style={{ width: "100%",paddingBottom: 100}}
                  >
                    <View style={{ flex: 2}}>
                      <View style={styles.OrCont}>
                        <View>
                          <StyledTextBold style={styles.Ortxt}>
                            تسجيل حساب جديد
                          </StyledTextBold>
                        </View>
                        <View>
                          <StyledText style={styles.Ortxt2}>
                            يرجى إدخال جميع البيانات المطلوبة لإنشاء حساب جديد
                          </StyledText>
                        </View>
                      </View>

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
                        <StyledTextBold style={styles.InputContainer2Tilte}>المدينة</StyledTextBold>
                        <View style={{ flexDirection: 'row' }}>
                          <TextInput
                            placeholder="المدينة"
                            placeholderTextColor="#A2A2A2"
                            underlineColorAndroid="transparent"
                            returnKeyType={"next"}
                            keyboardType='default'
                            ref={(input) => {this.fourthTextInput = input}}
                            onSubmitEditing={() => {this.fifthTextInput.focus()}}
                            onChangeText={(city) => this.setState({ city })}
                            blurOnSubmit={false}
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
                            placeholder="كلمة المرور"
                            placeholderTextColor="#A2A2A2"
                            underlineColorAndroid="transparent"
                            secureTextEntry={this.state.securePassword}
                            ref={(input) => {this.fifthTextInput = input}}
                            onSubmitEditing={() => {this.sixthTextInput.focus()}}
                            returnKeyType={"done"}
                            onChangeText={(password) => this.setState({ password })}
                            blurOnSubmit={false}
                            style={styles.Input}
                          />
                        </View>
                      </View>

                      <View style={styles.InputContainer2}>
                        <StyledTextBold style={styles.InputContainer2Tilte}>تأكيد كلمة المرور</StyledTextBold>
                        <View style={{ flexDirection: 'row' }}>
                          <TouchableOpacity onPress={()=>this.securePasswordMethod2()}>
                            {!this.state.securePassword2 && <Ionicons name='md-eye' size={25} color='#8D8D8D' />}
                            {this.state.securePassword2 && <Ionicons name='md-eye-off' size={25} color='#8D8D8D' />}
                          </TouchableOpacity>
                          <TextInput
                            placeholder="إعادة كلمة المرور"
                            placeholderTextColor="#A2A2A2"
                            underlineColorAndroid="transparent"
                            secureTextEntry={this.state.securePassword2}
                            ref={(input) => {this.sixthTextInput = input}}
                            onSubmitEditing={() => {this.register()}}
                            returnKeyType={"done"}
                            onChangeText={(password_confirmation) => this.setState({ password_confirmation })}
                            blurOnSubmit={false}
                            style={styles.Input}
                          />
                        </View>
                      </View>

                      <View style={styles.RegisterButtonCont}>
                        <TouchableOpacity activeOpacity={0.5} style={styles.LoginTouch}
                          onPress={() => {this.register()}}
                        >
                          <StyledText style={{color:'#fff',fontSize:15}}>تسجيل حساب جديد</StyledText>
                        </TouchableOpacity>
                      </View>

                      <View style={styles.conditionCont}>
                        <TouchableOpacity activeOpacity={1} style={styles.condition}>
                          <StyledText style={{color:'#69415C',fontSize:11}}>
                            أنت توافق على الشروط وسياسة الخصوصية
                          </StyledText>
                        </TouchableOpacity>
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
}

export default withFirebaseHOC(RegisterScreen)

