import React, { Component } from "react";
import { View, ScrollView, StatusBar,Image,TextInput,TouchableOpacity} from "react-native";
import styles from "./AddHallStep3ScreenStyle";
import Constants from 'expo-constants'
import StyledText from '../../components/StyledTexts/StyledText'
import StyledTextBold from '../../components/StyledTexts/StyledTextBold'
import HeaderBack from '../../components/HeadersComponent/HeaderBack'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {FontAwesome,Ionicons} from '@expo/vector-icons'
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';

export default class AddHallStep3Screen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step3:true,
            ownerPhotos:[],
            imagesScrollVisibileOwner: false,
            ownerName:'',
            ownerEmail:'',
            ownerPhone:'',
            userId:'',
            errors:{},
            hallImgURL: '',
            roomImgURL: '',
            managerImgURL: ''
        }
    }


    // للتجربة عشان نطبع الداتا بالتيرمينال 
    componentDidMount(){
        const currentUser = firebase.auth().currentUser;
        if(currentUser != null) {
           this.setState({userId:currentUser.uid});
        }
    }
    //

    selectPicture2 = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "Images"
        }).then((result) => {
            if (!result.cancelled) {
                const {ownerPhotos} = this.state;
                const path = result.uri;
                ownerPhotos.push({path: result.uri})
                this.setState({ownerPhotos, imagesScrollVisibileOwner: true})
                var imgName = 'manager' + new Date().getTime(); 
                console.log(path);               
                this.uploadImage(path,imgName);
                let hallImage = this.props.navigation.getParam('firstInfo').hallPhotos[0]["path"]
                var hallImg = 'hall' + new Date().getTime();          
                console.log(hallImage);               
                this.uploadImage2(hallImage,hallImg);
                var roomPath =this.props.navigation.getParam('secInfo').roomPhotos[0]["path"] 
                var roomImg = 'room' + new Date().getTime();       
                console.log(roomPath)         
                this.uploadImage3(roomPath,roomImg);
            }
        })
    }

    uploadImage = async (path, imageName) => {
        const response = await fetch(path);
        const blob = await response.blob();
    
        const ref = firebase.storage().ref().child("requests/" + imageName);
        return ref.put(blob).then(() => { //After store the image -> get the url of it 
                ref.getDownloadURL()
                .then(url=>{
                    this.setState({managerImgURL:url});
                })
        })
    }

    uploadImage2 = async (path, imageName) => {
        const response = await fetch(path);
        const blob = await response.blob();
    
        const ref = firebase.storage().ref().child("requests/" + imageName);
        return ref.put(blob).then(() => { //After store the image -> get the url of it 
                ref.getDownloadURL()
                .then(url=>{
                    this.setState({hallImgURL:url});
                })
        })
    }

    uploadImage3 = async (path, imageName) => {
        const response = await fetch(path);
        const blob = await response.blob();
    
        const ref = firebase.storage().ref().child("requests/" + imageName);
        return ref.put(blob).then(() => { //After store the image -> get the url of it 
                ref.getDownloadURL()
                .then(url=>{
                    this.setState({roomImgURL:url});
                })
        })
    }

    deleteImageOwner(index){
        var array = [...this.state.ownerPhotos]     // make a separate copy of the array
        if (index !== -1) {
            array.splice(index, 1)
            this.setState({ownerPhotos: array})
            if(array.length == 0){
                this.setState({imagesScrollVisibileOwner: false})
            }
        }
    }

    validation() {
        let isValid = true;
        const {ownerName,ownerPhone,ownerEmail,ownerPhotos,errors} = this.state;
        if (!ownerName) {
            isValid = false;
            errors["ownerName"] = "الرجاء ادخال اسمك"
        }

        if (!ownerPhone) {
            isValid = false;
            errors["ownerPhone"] = "الرجاء ادخال رقم هاتفك"
        }

        if (!ownerEmail) {
            isValid = false;
            errors["ownerEmail"] = "الرجاء ادخال بريدك الإلكتروني"
        }

        if(!ownerEmail.match(/[^\d][\w.]+@\w+(\.[A-Za-z]+){1,2}/g)){
            isValid = false;
            errors["ownerEmail"] = "البريد الالكتروني الذي أدخلته غير صحيح";
              //add Error message
          }
      
          if (!ownerPhone.match(/[0-9]{10}/)){
            isValid = false;
            errors["ownerPhone"] = "رقم الهاتف الذي أدخلته غير صحيح";
              //add Error message
          }

        if (ownerPhotos.length === 0) {
            isValid = false;
            errors["photoError"] = "الرجاء اختيار صورة للصالة"
        }

        this.setState({errors});
        return isValid;

    }

    render() {
        const {errors} = this.state;
        return (
        <View style={styles.containerStyle}>          
            <View style={styles.StatusBar}>
                <StatusBar barStyle="light-content"/>
            </View>
            <View>
                <HeaderBack navigation={this.props.navigation} title='أضف صالتك'></HeaderBack>
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
                <View style={styles.imageCont}>
                    <TouchableOpacity style={styles.CircleCont}>
                        <View style={styles.inAciveCircleCont}>
                            <StyledText style={styles.txt}>3</StyledText>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.spaceCont}></View>
                    <TouchableOpacity style={styles.CircleCont}>
                        <View style={styles.aciveCircleCont}>
                            <StyledText style={styles.txt}>2</StyledText>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.spaceCont}></View>
                    <TouchableOpacity style={styles.CircleCont}>
                        <View style={styles.aciveCircleCont}>
                            <StyledText style={styles.txt}>1</StyledText>
                        </View>
                    </TouchableOpacity>
                </View>

                {this.state.step3 &&
                <>
                    <View style={styles.InputContainer}>
                        <View style={styles.InputContainer2}>
                            <StyledTextBold style={styles.InputContainer2Tilte}>تفاصيل صاحب الصالة :</StyledTextBold>
                            <View style={styles.inputCont}>
                                <TouchableOpacity style={styles.photoIcon} onPress={this.selectPicture2}>
                                    <FontAwesome name='camera' color='#924480' size={20}/>
                                </TouchableOpacity>
                                <View style={styles.photoTilteCont}>
                                    <StyledTextBold style={styles.photoTilte}>صورة صاحب الصالة</StyledTextBold>
                                </View>     
                            </View>
                        </View>

                        {this.state.imagesScrollVisibileOwner && (
                        <ScrollView
                            style={{flex:1, marginVertical: 10,marginBottom:20}} 
                            horizontal={true} showsHorizontalScrollIndicator={false}
                        >
                            {this.state.ownerPhotos.map((item, index)=>(
                                <View key={index} style={{marginHorizontal:5}}> 
                                    <Image source={{uri: item.path}} style={{height:90, width:90}} />
                                    <TouchableOpacity style={{position: 'absolute', padding:3, right: 0}} onPress={()=>this.deleteImageOwner(index)}>
                                        <Ionicons name='ios-close-circle-outline' size={22} color='red'/>
                                    </TouchableOpacity>
                                </View>
                            ))}  
                        </ScrollView>
                        )}

                        <StyledText style={{color:'#F00',fontSize:12,marginBottom:15,paddingHorizontal:10}}>
                            {errors["photoError"]}
                        </StyledText>

                        <View style={styles.InputContainer2}>
                            <StyledTextBold style={styles.InputContainer2Tilte}>اسم صاحب الصالة : </StyledTextBold>
                            <View style={styles.inputCont}>
                            <TextInput
                                placeholder="********"
                                placeholderTextColor="#A2A2A2"
                                underlineColorAndroid="transparent"
                                returnKeyType={"next"}
                                keyboardType="default"
                                onSubmitEditing={() => {this.secondTextInput.focus()}}
                                onChangeText={(ownerName) => this.setState({ ownerName })}
                                blurOnSubmit={false}
                                style={styles.Input}
                            />
                            </View>
                        </View>

                        <StyledText style={{color:'#F00',fontSize:12,marginBottom:15,paddingHorizontal:10}}>
                            {errors["ownerName"]}
                        </StyledText>

                        <View style={styles.InputContainer2}>
                            <StyledTextBold style={styles.InputContainer2Tilte}>رقم الجوال : </StyledTextBold>
                            <View style={styles.inputCont}>
                            <TextInput
                                placeholder="********"
                                placeholderTextColor="#A2A2A2"
                                underlineColorAndroid="transparent"
                                returnKeyType={"next"}
                                keyboardType="phone-pad"
                                ref={(input) => {this.secondTextInput = input}}
                                onSubmitEditing={() => {this.ThirdTextInput.focus()}}
                                onChangeText={(ownerPhone) => this.setState({ ownerPhone })}
                                blurOnSubmit={false}
                                style={styles.Input}
                            />
                            </View>
                        </View>

                        <StyledText style={{color:'#F00',fontSize:12,marginBottom:15,paddingHorizontal:10}}>
                            {errors["ownerPhone"]}
                        </StyledText>

                        <View style={styles.InputContainer2}>
                            <StyledTextBold style={styles.InputContainer2Tilte}>الايميل : </StyledTextBold>
                            <View style={styles.inputCont}>
                            <TextInput
                                placeholder="example@gmail.com"
                                placeholderTextColor="#A2A2A2"
                                underlineColorAndroid="transparent"
                                returnKeyType={"next"}
                                keyboardType="email-address"
                                ref={(input) => {this.ThirdTextInput = input}}
                                onSubmitEditing={() => {this.doneAddHall()}}
                                onChangeText={(ownerEmail) => this.setState({ ownerEmail })}
                                blurOnSubmit={false}
                                style={styles.Input}
                            />
                            </View>
                        </View>
                    </View>

                    <StyledText style={{color:'#F00',fontSize:12,marginBottom:15,paddingHorizontal:10}}>
                            {errors["ownerEmail"]}
                    </StyledText>

                    <View style={styles.RegisterButtonCont}>
                        <TouchableOpacity activeOpacity={0.5} style={styles.LoginTouch}
                          onPress={() => {this.doneAddHall()}}
                        >
                          <StyledText style={{color:'#fff',fontSize:15}}>أضف الصالة</StyledText>
                        </TouchableOpacity>
                    </View>
                </>
                }

                </KeyboardAwareScrollView> 
                </ScrollView>
            </View>
        </View>
        );
    }

    doneAddHall(){
        const {userId,ownerName,ownerPhone,ownerEmail,ownerPhotos,hallImgURL,roomImgURL,managerImgURL} = this.state;
        let fisrtStep = this.props.navigation.getParam('firstInfo')
        let secStep = this.props.navigation.getParam('secInfo')
        let thirdStep = {ownerName,ownerEmail,ownerPhone,ownerPhotos,hallImgURL,roomImgURL,managerImgURL}
        let addHallRequest = {userId,...fisrtStep,...secStep,...thirdStep};
        if(this.validation()){
            const ref = firebase.firestore().collection('requests').add(addHallRequest)
                .then(function(docRef) {

                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                    alert('Something went wrong');
                });

                setTimeout(()=> {
                this.props.navigation.navigate('AddHallDoneScreen');
                },5500);
        }
        
       
    }
}