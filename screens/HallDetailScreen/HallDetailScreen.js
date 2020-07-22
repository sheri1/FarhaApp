import React, { Component } from "react";
import { View, ScrollView, StatusBar,Modal,TouchableOpacity,ImageBackground, Picker,ActivityIndicator,Text} from "react-native";
import styles from "./HallDetailScreenStyle";
import StyledText from '../../components/StyledTexts/StyledText'
import HeaderBack from '../../components/HeadersComponent/HeaderBack'
import ViewPager from '@react-native-community/viewpager';
import StyledTextBold from '../../components/StyledTexts/StyledTextBold'
import { Entypo, FontAwesome, AntDesign } from '@expo/vector-icons'; 
import {Calendar} from 'react-native-calendars';
import { Rating } from 'react-native-elements';
import { withFirebaseHOC } from '../../config/Firebase'
import * as firebase from 'firebase';
import { AppLoading } from "expo";
class HallDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Sliderimages:[],
            hallDetail:{},
            roomDetails: [],
            roomNum:1,
            ordersTap:[
                {id:0,name:'معلومات التواصل',isSelect:false},],
            managerDetails: {
                name: 'اسم المالك',
                phone: '059000000',
                email: 'manager@gmail.com'
            },
            showFilter: 1,
            showTabs:0,
            modalVisible:false,
            selectedDate:'',
            user: {},
            hallId:null,
            ownerId: null,
            isLoading:true,
            category: "",
            earnest:'',
            markedDates: {},
            orderNum:'',
        isAnonymousUser: false
        }
    }
    
    componentDidMount() {
        const currentUser = this.props.firebase.auth.currentUser;
        if(currentUser.isAnonymous) {this.setState({isAnonymousUser:true})}
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
                        ownerId: docData.owner,
                        earnest:docData.earnest,
                        orderNum : docData.ordersCounter
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

                      
            const roomTabs = Array.from({length: this.state.roomNum}, (v, i) => i);
                    
                    
            const tabs = roomTabs.map((item)=> {
                const number = item + 1;
                return{
                    // {id:0,name:'معلومات التواصل',isSelect:false},
                    id : number ,
                    name: "القاعة رقم " + number,
                    isSelect: number === 1 ? true : false
                }
            });

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
                 if (querySnapshot.size === 1) {this.setState({showTabs:0})}
                  
                let roomListDetails = [];
                  querySnapshot.forEach((doc) => {
                    const roomData = doc.data();
                    roomListDetails.push( 
                      {
                        // image: roomData.hallImage,
                        name: roomData.roomName,
                        numOfPeople: roomData.roomPersons,
                        price: roomData.roomPrice,
                      
                        }
                    )

                    this.setState({category:roomData.roomName})

                });
                var joined = this.state.roomDetails.concat(roomListDetails)
                this.setState({roomDetails:joined,
                    isLoading:false
                });

                
            })
              .catch(function(error) {
                console.log("Error getting documents: ", error);
            });

            
          
           

           setTimeout(()=> {
            this.props.firebase.getUserDocument(this.state.ownerId)
            .then(userData=> {
           
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
            
           firebase.firestore().collection('registration')
           .where('hallId' , '==' , id)
           .get()
           .then((querySnapshot)  => {
            querySnapshot.forEach((doc) => {
              const rigesteredDate = doc.data();
              let dateObj = {};
              dateObj[rigesteredDate.registerDate] = {selected: true, marked: true, disableTouchEvent: true, selectedColor: '#d92027'}
           
              this.setState(prevState => ({
                markedDates: {...prevState.markedDates,...dateObj}
              }))
                
              
          });
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
      });


      firebase.firestore().collection("hallImages").where('hallId', "==" , id).get()
        .then((querySnapshot)  => {
            let hallListData = [];
            querySnapshot.forEach((doc) => {
            const data = doc.data();
            hallListData.push(
                { image: data.hallImage,caption:data.caption}
            )

            hallListData.push(
                { image: data.roomImage,caption:data.caption}
            )
                
        });

        this.setState(prevState => ({
            Sliderimages: [...prevState.Sliderimages, ...hallListData]
        }))

        this.setState({isLoading:false});
        
        })
        .catch(function(error) {
        console.log("Error getting documents: ", error);
        });
        }


    render() {
        const {user,roomDetails,managerDetails,hallId,isLoading,showFilter,ownerId,category,ordersTap,showTabs,Sliderimages} = this.state;
  
        if (isLoading) {
            return (
                <View style={{flex: 1, justifyContent: "center"}}>
                     <ActivityIndicator size="large" color="#924480" />
                </View>
            );
          } else {
        return (
        <View style={styles.containerStyle}>        

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
                                        style={styles.imageStyle} source={{uri:item.image}}
                                        key={item.id} imageStyle={styles.imageStyle} resizeMode='cover'
                                    >
                                       {index === 0 ? 
                                        <Text style={{color:"#fff",position:"absolute",top:"80%",right:10}}>{item.caption}</Text>
                                        : <Text style={{color:"#fff",position:"absolute",top:"80%",right:10}}>{roomDetails[0].name}</Text>}
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

                        
                        {showFilter === 0  ?  
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

                        :
                            <View style={styles.ContactView}>
                                <View style={styles.firstRow}>
                                    <View style={styles.firstRowPrice}>
                                        <StyledText style={styles.firstPrice}>{roomDetails[showTabs].price}</StyledText>
                                    </View>
                                    <View style={styles.firstRowName}>
                                <StyledText style={styles.firstName}>{roomDetails[showTabs].name}</StyledText>
                                    </View>
                                </View>

                                <View style={styles.capView}>
                                    <StyledText style={styles.capTXT}>تتسع لأفراد حتى {roomDetails[showTabs].numOfPeople} شخص </StyledText>
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

                                markedDates={this.state.markedDates}

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

                            <View style={styles.InputContainer2}>
                
                       
                       <View style={styles.pickerStyle}>
                            <Picker
                            mode="dropdown"
                            selectedValue={this.state.category}
                            style={styles.Input}
                            onValueChange={(category, itemIndex) => this.setState({category})}
                            >

                            {
                                this.state.roomDetails.map((item, index)=>{
                           return <Picker.Item key={item.index} label={item.name} value={item.name} style={{textAlign: 'right'}} />
                                
                            })}
                            </Picker>
                            </View>
                        </View>

                        

                            <View style={styles.done}>
                                <TouchableOpacity style={styles.doneTouch} onPress={() => this.register()}>
                                    <StyledText style={styles.doneTxt}>حجز الصالة</StyledText>
                                </TouchableOpacity>
                            </View>

                            </View>
                        </View>
                        </ScrollView>
                    </Modal>

                </View>
            </ScrollView>
            {user.manager && user.uid === ownerId ? 
            <View style={{display:"flex",flexDirection: "row"}}>
            <TouchableOpacity style={styles.minView2} onPress={() => this.props.navigation.navigate('AddRoomScreen',{id:hallId,roomNum:this.state.roomNum})}>
                <StyledText style={styles.minTXT2}>أضف قاعة جديدة</StyledText>
            </TouchableOpacity>

            
            <TouchableOpacity style={styles.minView2} onPress={()=> this.setState({modalVisible:true})}>
                <StyledText style={styles.minTXT2}>أضف التواريخ المحجوزة مسبقا</StyledText>
            </TouchableOpacity>
            </View>
            :
        

            <TouchableOpacity style={styles.minView} onPress={()=> this.setState({modalVisible:true})}>
                <StyledText style={styles.minTXT}>الحجوزات</StyledText>
            </TouchableOpacity>

}
        </View>
        )
    }
    }

    selectItem = (id) => {
        const {roomDetails,ordersTap} = this.state;
        let listDataCopy = JSON.parse(JSON.stringify(ordersTap));
        listDataCopy.forEach((elem) => {
        elem.isSelect = false;
        if (elem.id === id) {
            elem.isSelect = true;
        }
        });

        let filter = id ;
        let filter2 = id - 1;
        if(filter2 < 0) {
            filter2 = 0;
        }
      
        // const filter = listDataCopy[id].id;
        this.setState({
            ordersTap: listDataCopy,
            showFilter: filter,
            showTabs:filter2
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

    register() {
        
        this.setState({modalVisible:false})
        
        const {roomDetails,category,isAnonymousUser,orderNum,hallId} = this.state;

        function pad(c, width) {
            let parts = c.split('-');
            let n = Number(parts[1]) + 1;
            n = n + '';
            let padNum = n.length >= width ? n : new Array(width - n.length + 1).join(0) + n;
          
            return parts[0] + '-' + padNum
        }
        
        //Increase ordersCounter
        firebase.firestore().collection('halls').doc(hallId)
            .update({
                ordersCounter: pad(orderNum,3)
            })
        

       
        if (isAnonymousUser){
            this.props.navigation.navigate('LoginScreen');
        }else {
        const roomPrice = roomDetails.filter(item => {
            return item.name === category && item
        })


        const fullOrderDate = new Date();
        const year = fullOrderDate.getFullYear();
        const month = fullOrderDate.getMonth() + 1;
        const date = fullOrderDate.getDate();
        const orderDate = year + '-' + month  + '-' + date;
        firebase.firestore().collection('registration').add({
            orderStatus :false,
            orderDate : orderDate,
            registerDate : this.state.selectedDate,
            roomName: this.state.category,
            managerId: this.state.ownerId,
            hallId: this.state.hallId,
            hallName: this.state.hallDetail.name,
            uid: this.state.user.uid,
            userName: this.state.user.displayName,
            userPhone: this.state.user.phone,
            roomPrice: roomPrice[0].price,
            orderNum: pad(orderNum,3)
        }).then(()=> {
            const dateObj = {
                [this.state.registerDate]:{selected: true, marked: true, disableTouchEvent: true, selectedColor: '#d92027'}
            }
            this.setState(prevState => ({
                markedDates: {...prevState.markedDates,...dateObj}
              }))
            //alert('لتأكيد الحجز يرجى التوجه للصالة لدفع العربون في خلال 3 أيام')
        })

        const hallInfo = {
            earnest:this.state.earnest,
            isManager:this.state.user.manager
        }
       
         this.props.navigation.navigate('BookingDoneScreen',{info:hallInfo});
        }
    }
}


export default withFirebaseHOC(HallDetailScreen);