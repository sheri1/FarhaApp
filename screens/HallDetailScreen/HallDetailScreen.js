import React, { Component } from "react";
import { View, ScrollView, StatusBar,Modal,TouchableOpacity,ImageBackground} from "react-native";
import styles from "./HallDetailScreenStyle";
import StyledText from '../../components/StyledTexts/StyledText'
import HeaderBack from '../../components/HeadersComponent/HeaderBack'
import ViewPager from '@react-native-community/viewpager';
import { Entypo, FontAwesome, AntDesign } from '@expo/vector-icons'; 
import {Calendar} from 'react-native-calendars';
import { Rating } from 'react-native-elements';
import { withFirebaseHOC } from '../../config/Firebase'
import * as firebase from 'firebase';
class HallDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Sliderimages:[
                {id:0,image:require('../../assets/images/detailImage.png'),name:'صالة لارزوا'},
                {id:1,image:require('../../assets/images/detailImage.png'),name:'صالة لارزوا'},
                {id:2,image:require('../../assets/images/detailImage.png'),name:'صالة لارزوا'},
            ],
            hallDetail:{
                name:'اسم الصالة',
                location:'دير البلح - البلد',
                description:`يتم جمع وسائل التواصل المتاحة التي من ف شأنها تسهيل التواصل وإنشاء وتأكيد عضوية الاشتراك، على سبيل المثال وليس الحصر عل سبيل المثال وليس الحصر`,
            },
            roomDetails: [
                {
                    name: 'اسم القاعة',
                    price: '2000$',
                    numOfPeople: '200',
                    services:''
                }
            ],
            roomNum:1,
            ordersTap:[
                {id:0,name:'معلومات التواصل',isSelect:false},
               
            ],
            managerDetails: {
                name: 'اسم المالك',
                phone: '059000000',
                email: 'manager@gmail.com'
            },
            showFilter:'القاعة رقم 1',
            modalVisible:false,
            selectedDate:'',
            user: {},
            hallId:null,
            ownerId: null
        }
    }
    
    componentDidMount() {
        const currentUser = this.props.firebase.auth.currentUser;
        if(currentUser != null) {
            this.props.firebase.getUserDocument(currentUser.uid)
                .then(userData=> {
                    this.setState({user:userData});
                })
                .catch(error=>console.log('e',error))
        }

        const id = this.props.navigation.getParam('id');
        this.setState({hallId:id});

      
        const hallDoc =  firebase
            .firestore()
            .collection('halls')
            .doc(id)
            .get()
            .then(doc => {
                if (doc.exists) {
                    const docData = doc.data();
                    this.setState({
                        roomNum: docData.roomNum,
                        ownerId: docData.owner
                    }
                    );
                    const hallData = {
                        name: docData.name,
                        location: docData.address,
                        description: docData.description,
        
                    }

                    this.setState(prevState => ({
                        hallDetail: {...prevState.hallDetail,...hallData}
                      }))

                    const roomTabs = Array.from({length: docData.roomNum}, (v, i) => i);
                    
                    
                    const tabs = roomTabs.map((item)=> {
                        const number = item + 1;
                        return{
                            // {id:0,name:'معلومات التواصل',isSelect:false},
                            id : item+1 ,
                            name: "القاعة رقم " + number,
                            isSelect: number === 1 ? true : false
                        }
                    });
                    console.log(tabs)
                    this.setState(prevState => ({
                        ordersTap: [...prevState.ordersTap, ...tabs]
                    }))

              

                } else {
            
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });

        const roomsRef = firebase.firestore().collection("rooms");
        const query = roomsRef.where("hallId", "==",id)
              .get().then((querySnapshot)  => {
                  querySnapshot.forEach((doc) => {
                    const roomData = doc.data();
                    let roomListData = [];
                    roomListData.push(
                      
                      {id:doc.id,
                        // image: roomData.hallImage,
                        name: roomData.name,
                        numOfPeople: roomData.numberOfPeople,
                        price: roomData.price,
                      
                        }
                    )
                    this.setState({roomDetails: this.state.roomDetails.map(item => {
                        return ({
                            name: roomData.name,
                        numOfPeople: roomData.numberOfPeople,
                        price: roomData.price + '$',
                        })

                    })})
                      
                    
                });
              })
              .catch(function(error) {
                console.log("Error getting documents: ", error);
            });


           setTimeout(()=> {
            this.props.firebase.getUserDocument(this.state.ownerId)
            .then(userData=> {
                console.log(this.state.ownerId)
                const managerInfo = {
                    name : userData.displayName,
                    phone : userData.businessPhone,
                    email : userData.businessEmail
                }
                this.setState(prevState => ({
                    managerDetails: {...prevState.managerDetails,...managerInfo}
                  }))
            })
            .catch(error=>console.log('e',error))
           },5000)
            
    }


    render() {
        const {user,roomDetails,managerDetails} = this.state;
        return (
        <View style={styles.containerStyle}>        
            {/* <View style={styles.StatusBar}>
                <StatusBar barStyle="light-content"/>
            </View> */}

            <View style={{position:'absolute',width:'100%',top:0,zIndex:1000}}>
                <HeaderBack navigation={this.props.navigation} title='تفاصيل الصالة' from='profile'></HeaderBack>
            </View>
            <ScrollView
                style={{ width: '100%' }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow:1,justifyContent:'flex-start',backgroundColor:'#fff'}}
                snapToStart={true}
            >     
                <View style={{width: '100%',height:'100%'}}>

                    <View style={styles.viewPager}>
                        <ViewPager style={styles.viewPager} initialPage={0} ref={this.viewPager}
                            onPageSelected={(onPageSelected) => this.setState({activeIndex:onPageSelected.nativeEvent.position})}
                        >
                            {this.state.Sliderimages.map((item, index) => {
                                return (
                                    <ImageBackground
                                        style={styles.imageStyle} source={item.image}
                                        key={item.id} imageStyle={styles.imageStyle} resizeMode='cover'
                                    >
                                    </ImageBackground>
                                )
                            })}  
                        </ViewPager>
                        <View style={styles.dotCont}>
                            {this.state.Sliderimages.map((item, index) => {
                                return (
                                    <View key={index}>
                                        {index != this.state.activeIndex ? this.dot() : this.activeDot() }
                                    </View>
                                )
                            })}
                        </View>
                    </View>

                    <View style={styles.whiteView}>
                        <View style={styles.shareFavCont}>
                            <TouchableOpacity style={styles.shareButton}>
                                <Entypo name="share" size={24} color="black" />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.favButton}>
                                <AntDesign name="heart" size={24} color="black" />
                            </TouchableOpacity>
                        </View>

                        <StyledText style={styles.nameTXT}>
                            {this.state.hallDetail.name}
                        </StyledText>

                        <View style={styles.locationTXTView}>
                            <StyledText style={styles.locationTXT}>
                                {this.state.hallDetail.location}
                            </StyledText>
                            <Entypo name="location-pin" size={24} color="#924480" />
                        </View>

                        <StyledText style={styles.descTXT}>
                            {this.state.hallDetail.description}
                        </StyledText>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={{height:50,justifyContent:'center',alignItems:'center',flexDirection:'row',width:'100%',marginTop:10}}>  
                                {this.state.ordersTap.map((item, index)=>(
                                    <View key={index} style={{marginHorizontal:5}}> 
                                        <TouchableOpacity style={item.isSelect ? styles.activeItem : styles.inActiveItem}
                                            onPress={()=> this.selectItem(item.id)}
                                        >
                                        <StyledText style={item.isSelect ? styles.activeTXT : styles.inActiveTXT}>
                                            {item.name}
                                        </StyledText>
                                        </TouchableOpacity>
                                    </View>
                                ))}  
                            </View>
                        </ScrollView>

                        {this.state.showFilter === 'القاعة رقم 1' && 
                            <View style={styles.ContactView}>
                                <View style={styles.firstRow}>
                                    <View style={styles.firstRowPrice}>
                                        <StyledText style={styles.firstPrice}>{roomDetails[0].price}</StyledText>
                                    </View>
                                    <View style={styles.firstRowName}>
                                <StyledText style={styles.firstName}>{roomDetails[0].name}</StyledText>
                                    </View>
                                </View>

                                <View style={styles.capView}>
                                    <StyledText style={styles.capTXT}>تتسع لأفراد حتى {roomDetails[0].numOfPeople} شخص </StyledText>
                                </View>

                                <View style={styles.serviceView}>
                                    <View style={styles.serviceRow}>
                                        <StyledText style={styles.serviceTitle}>الخدمات المجانية</StyledText>
                                    </View>
                                    <View style={styles.serviceRow}>
                                        <StyledText style={styles.serviceInfo}>
                                            {`قاعة مكيفة بالكامل - اضاءة أنوار مختلفة -عرض زفة دخول العروسين - شاشات عرض  - ورد للتزين`}
                                        </StyledText>
                                    </View>
                                </View>

                                <View style={styles.serviceView}>
                                    <View style={styles.serviceRow}>
                                        <StyledText style={styles.serviceTitle}>
                                        الخدمات ( مدفوعة تبدأ من 30 دولار )
                                        </StyledText>
                                    </View>
                                    <View style={styles.serviceRow}>
                                        <StyledText style={styles.serviceInfo}>
                                            {`كوشه مضيئة - ليزر - فيديو - دي جي طوال الحفل - ماكينة دخان - عرض التورته - بوفيه للمشروبات - ورد أثناء الرقص`}
                                        </StyledText>
                                    </View>
                                </View>

                                <View style={styles.rateCont}>
                                    <View style={styles.rateView}>
                                        <Rating
                                            imageSize={35} type='star' readonly
                                            startingValue={3}
                                        />
                                    </View>
                                    <StyledText style={styles.rateTitle}>
                                        تقييم المستخدمين
                                    </StyledText>  
                                </View>

                            </View>
                        }

                        {this.state.showFilter === 'القاعة رقم 2' &&
                            <View style={styles.ContactView}>
                                <View style={styles.firstRow}>
                                    <View style={styles.firstRowPrice}>
                                        <StyledText style={styles.firstPrice}>200$</StyledText>
                                    </View>
                                    <View style={styles.firstRowName}>
                                        <StyledText style={styles.firstName}>اسم القاعة</StyledText>
                                    </View>
                                </View>

                                <View style={styles.capView}>
                                    <StyledText style={styles.capTXT}>تتسع لأفراد حتى 300 شخص </StyledText>
                                </View>

                                <View style={styles.serviceView}>
                                    <View style={styles.serviceRow}>
                                        <StyledText style={styles.serviceTitle}>الخدمات المجانية</StyledText>
                                    </View>
                                    <View style={styles.serviceRow}>
                                        <StyledText style={styles.serviceInfo}>
                                            {`قاعة مكيفة بالكامل - اضاءة أنوار مختلفة -عرض زفة دخول العروسين - شاشات عرض  - ورد للتزين`}
                                        </StyledText>
                                    </View>
                                </View>

                                <View style={styles.serviceView}>
                                    <View style={styles.serviceRow}>
                                        <StyledText style={styles.serviceTitle}>
                                        الخدمات ( مدفوعة تبدأ من 30 دولار )
                                        </StyledText>
                                    </View>
                                    <View style={styles.serviceRow}>
                                        <StyledText style={styles.serviceInfo}>
                                            {`كوشه مضيئة - ليزر - فيديو - دي جي طوال الحفل - ماكينة دخان - عرض التورته - بوفيه للمشروبات - ورد أثناء الرقص`}
                                        </StyledText>
                                    </View>
                                </View>

                                <View style={styles.rateCont}>
                                    <View style={styles.rateView}>
                                        <Rating
                                            imageSize={35} type='star' readonly
                                            startingValue={3}
                                        />
                                    </View>
                                    <StyledText style={styles.rateTitle}>
                                        تقييم المستخدمين
                                    </StyledText>  
                                </View>

                            </View>
                        }

                        {this.state.showFilter === 'معلومات التواصل' && 
                            <View style={styles.ContactView}>
                                <View style={styles.infoRowCont,{flexDirection:'row'}}>
                                    <View style={{flex:1}}>
                                        <StyledText style={styles.infoName}>{managerDetails.name}</StyledText>
                                    </View>
                                    <StyledText style={styles.infoName}>اسم المالك</StyledText>
                                </View>
                                <View style={styles.infoRowCont}>
                                    <View style={styles.infoRow}>
                                        <StyledText style={styles.info}>{managerDetails.phone}</StyledText>
                                        <Entypo name="phone" size={24} color="#924480" />
                                    </View>
                                    <View style={styles.infoRow}>
                                        <StyledText style={styles.info}>{managerDetails.email}</StyledText>
                                        <FontAwesome name="envelope" size={24} color="#924480" />
                                    </View>
                                </View>
                            </View>
                        }

                    </View>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                    >
                        <ScrollView
                            style={{ width: '100%' }}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{flexGrow:1,justifyContent:'flex-start'}}
                            snapToStart={true}
                        >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                            
                            <View style={styles.firstView}>
                                <TouchableOpacity onPress={() => this.setState({modalVisible:false})}>
                                    <AntDesign name='close' color='#fff' size={20}/>
                                </TouchableOpacity>
                                <View style={{flex:1}}></View>
                            </View>

                            <Calendar
                                current={new Date()}
                                minDate={new Date()}
                                // onDayPress={(day) => {console.log('selected day', day.dateString)}}
                                onDayPress={(day) => this.setState({selectedDate:day.dateString}) }
                                // onDayLongPress={(day) => {console.log('selected day', day)}}
                                monthFormat={'yyyy MM'}
                                // onMonthChange={(month) => {console.log('month changed', month)}}
                                hideArrows={false}
                                hideExtraDays={false}
                                disableMonthChange={true}
                                // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                                firstDay={1}
                                hideDayNames={false}
                                showWeekNumbers={true}
                                disableArrowLeft={false}
                                disableArrowRight={false}
                                disableAllTouchEventsForDisabledDays={true}

                                markedDates={{
                                    '2020-07-16': {selected: true, marked: true, disableTouchEvent: true, selectedColor: '#d92027'},
                                    '2020-07-17': {selected: true,marked: true, disableTouchEvent: true, selectedColor: '#d92027'},
                                    '2020-07-18': {selected: true,marked: true, disableTouchEvent: true, dotColor: 'white', activeOpacity: 0, selectedColor: '#d92027'},
                                    '2020-07-19': {selected: true,disabled: true,marked: true, disableTouchEvent: true, selectedColor: '#d92027', dotColor: 'white'}
                                }}

                                style={{
                                    backgroundColor:'#924480',
                                   
                                    // height: 350,
                                }}
                                theme={{
                                  //  backgroundColor: '#924480',
                                  //  calendarBackground: '#924480',
                                    textSectionTitleColor: '#fff',
                                   // textSectionTitleDisabledColor: '#d9e1e8',
                                   // selectedDayBackgroundColor: '#00adf5',
                                    //selectedDayTextColor: 'red',
                                    //todayTextColor: '#00adf5',
                                   // dayTextColor: '#2d4150',
                                   // textDisabledColor: '#d9e1e8',
                                   // dotColor: '#00adf5',
                                    selectedDotColor: '#ffffff',
                                    arrowColor: '#f4f6ff',
                                    //disabledArrowColor: '#d9e1e8',
                                    monthTextColor: 'white',
                                    //indicatorColor: 'blue',
                                    // textDayFontFamily: 'monospace',
                                    // textMonthFontFamily: 'monospace',
                                    // textDayHeaderFontFamily: 'monospace',
                                    // textDayFontWeight: '300',
                                    // textMonthFontWeight: 'bold',
                                    // textDayHeaderFontWeight: '300',
                                    // textDayFontSize: 16,
                                    // textMonthFontSize: 16,
                                    // textDayHeaderFontSize: 16
                                }}
                            />

                            <View style={styles.done}>
                                <View style={styles.dateCont}>
                                    <StyledText style={styles.doneTxt}>تاريخ الحجز</StyledText>
                                    <View style={styles.dateCont2}>
                                        <StyledText style={styles.doneTxt}>
                                            {this.state.selectedDate}
                                        </StyledText>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.done}>
                                <TouchableOpacity style={styles.doneTouch}>
                                    <StyledText style={styles.doneTxt}>حجز الصالة</StyledText>
                                </TouchableOpacity>
                            </View>

                            </View>
                        </View>
                        </ScrollView>
                    </Modal>

                </View>
            </ScrollView>
            {user.manager  ? 
            
            <TouchableOpacity style={styles.minView} onPress={() => this.props.navigation.navigate('AddRoomScreen')}>
                <StyledText style={styles.minTXT}>أضف قاعة جديدة</StyledText>
            </TouchableOpacity>
            :
        

            <TouchableOpacity style={styles.minView} onPress={()=> this.setState({modalVisible:true})}>
                <StyledText style={styles.minTXT}>الحجوزات</StyledText>
            </TouchableOpacity>

}
        </View>
        )
    }

    selectItem = (id) => {
        let listDataCopy = JSON.parse(JSON.stringify(this.state.ordersTap));
        listDataCopy.forEach((elem) => {
        elem.isSelect = false;
        if (elem.id === id) {
            elem.isSelect = true;
        }
        });
        const filter = listDataCopy[id].name;
        // const filter = listDataCopy[id].id;
        this.setState({
            ordersTap: listDataCopy,
            showFilter: filter,
        });
    }

    dot(){
        return(
          <View style={{backgroundColor:'#DC96CC', width: 8, height:8,borderRadius: 8/2,
            marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,backgroundColor:'#fff'}} />
        )
    }
    activeDot(){
        return(
          <View style={{backgroundColor:'#924480', width: 8, height:8,borderRadius: 8/2,
            marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />
        )
    }
}


export default withFirebaseHOC(HallDetailScreen);