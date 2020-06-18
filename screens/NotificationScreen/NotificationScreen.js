import React, { Component } from "react";
import { View, StatusBar,TouchableOpacity,Image } from "react-native";
import NotificationComponent from "../../components/NotificationComponent";
import styles from "./NotificationScreenStyle";
import HeaderMenu from '../../components/HeadersComponent/HeaderMenu'
import StyledText from '../../components/StyledTexts/StyledText';
import StyledTextBold from '../../components/StyledTexts/StyledTextBold';
import NetInfo from "@react-native-community/netinfo";

export default class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: null,
      notificationList:[
        {id:0,title:'يتم جمع وسائل التواصل المتاحة التي من في شأنها تسهيل التواصل وإنشاء يبل وتأكيد عضوية ',time:'7:30',date:'7/8/2020'},
        {id:0,title:'يتم جمع وسائل التواصل المتاحة التي من في شأنها تسهيل التواصل وإنشاء يبل وتأكيد عضوية ',time:'7:30',date:'7/8/2020'},
        {id:0,title:'يتم جمع وسائل التواصل المتاحة التي من في شأنها تسهيل التواصل وإنشاء يبل وتأكيد عضوية ',time:'7:30',date:'7/8/2020'},
        {id:0,title:'يتم جمع وسائل التواصل المتاحة التي من في شأنها تسهيل التواصل وإنشاء يبل وتأكيد عضوية ',time:'7:30',date:'7/8/2020'},
        {id:0,title:'يتم جمع وسائل التواصل المتاحة التي من في شأنها تسهيل التواصل وإنشاء يبل وتأكيد عضوية ',time:'7:30',date:'7/8/2020'},
      ]
    };
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

  render() {
    if (this.state.isConnected === false) {
      return (
        <>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <View style={styles.StatusBar}>
                <StatusBar barStyle="light-content"/>
              </View>
              <View style={{ width: '100%' }}>
                <HeaderMenu navigation={this.props.navigation} title='الاشعارات'></HeaderMenu>
              </View>
            </View>
            <View style={{flexGrow: 1,justifyContent: 'flex-start',paddingHorizontal: 15}}>
              <View style={{justifyContent: "center",alignItems: "center",paddingTop:0,flex:1}}>
                <Image source={require("../../assets/images/noInternet.png")}/>
                <StyledText style={{fontSize: 14,paddingTop:10,color:'#000'}}>
                  لا يوجد انترنت
                </StyledText>
                <StyledText numberOfLines={2} style={{fontSize:11,paddingTop:10,color:'#A2A2A2',marginBottom: 15}}>
                جهازك غير متصل بالإنترنت ، من فضلك تأكد من عمل اتصالك
                </StyledText>

                <TouchableOpacity>
                  <StyledText numberOfLines={2} style={{fontSize:11,paddingTop:10,color:'#924480',textDecorationLine:'underline'}}>
                    حاول مرة أخرى
                  </StyledText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
      )
    } 
    else {
      return (
        <>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <View style={styles.StatusBar}>
                <StatusBar barStyle="light-content"/>
              </View>
              <View style={{ width: '100%' }}>
                <HeaderMenu navigation={this.props.navigation} title='الاشعارات'></HeaderMenu>
              </View>
            </View>

            <View style={{flexGrow: 1,justifyContent: 'flex-start',paddingHorizontal: 15}}>
              {this.state.notificationList.length > 0 ?
                <View style={{ flex: 1, paddingTop:30}}>
                  <NotificationComponent 
                    details={this.state.notificationList}
                    navigation={this.props.navigation}
                  />
                </View> 
                :
                <View style={{justifyContent: "center",alignItems: "center",paddingTop:0,flex: 2}}>
                  <Image source={require("../../assets/images/noNotification.png")} />
                  <StyledText style={{fontSize: 14,paddingTop:10,color:'#000'}}>
                    لا يوجد انترنت
                  </StyledText>
                  <StyledText numberOfLines={2} style={{fontSize:11,paddingTop:20,color:'#A2A2A2',marginBottom: 15}}>
                    لم تتلقى أي اشعارات حتى الآن
                  </StyledText>
                </View>
              }
            </View>
          </View>
        </>
      );
    }
  }
}