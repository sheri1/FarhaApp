import React from "react";
import { Image, View, StyleSheet,TouchableOpacity,ScrollView } from "react-native";
import { ListItem, Icon, Body, Right, Left } from "native-base";
import Text from "./StyledTexts/StyledText";
import { FontAwesome, MaterialIcons, AntDesign,Feather,MaterialCommunityIcons} from "@expo/vector-icons";
import StyledText from "./StyledTexts/StyledText";
import * as firebase from "firebase";

export default class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTintColor: "#3FE3EA",
      inactiveTintColor: "#242424", // #000
      itemFlag:'Home'
    };
  }

  itemClicked(nav,flag){
    this.setState({itemFlag:flag})
    this.props.navigation.navigate(nav)
  }

  render() {
    return (
      <View style={[styles.containerView,{backgroundColor:'#fff',paddingTop:150}]}> 
        <Image source={require('../assets/images/drawerIcons/top.png')}
         style={{position:'absolute',top:0,right:0,height:130,width:130}}
        />
        <ScrollView style={{marginBottom:10}}>
          <ListItem icon noBorder button={true} onPress={()=> this.itemClicked('AppBottom','Home')}
            style={[styles.firstItemList,{backgroundColor:'#fff'}]}>
            <Left>
              <AntDesign name="left" size={20} color="black" />
            </Left>
            <Body>
              <Text style={styles.firstItemTitle}>
                الرئيسية
              </Text>
            </Body>
            <Right>
              <MaterialCommunityIcons name='home-outline' style={{fontSize:20,textAlign: "center",color:'#924480'}}/>
            </Right>
          </ListItem>

          <ListItem icon noBorder button={true} onPress={()=> this.itemClicked('NotificationScreen','notifi')}
            style={[styles.firstItemList,{backgroundColor:'#fff'}]}>
            <Left>
              <AntDesign name="left" size={20} color="black" />
            </Left>
            <Body>
              <Text style={styles.firstItemTitle}>
                الاشعارات
              </Text>
            </Body>
            <Right>
              <Image source={require('../assets/images/drawerIcons/notification.png')} />  
            </Right>
          </ListItem>   

          <ListItem icon noBorder button={true} onPress={()=> this.itemClicked('FavoriteScreen','fav')}
            style={[styles.firstItemList,{backgroundColor:'#fff'}]}>
            <Left>
              <AntDesign name="left" size={20} color="black" />
            </Left>
            <Body>
              <Text style={styles.firstItemTitle}>
                المفضلة
              </Text>
            </Body>
            <Right>
              <Image source={require('../assets/images/drawerIcons/fav.png')} />  
            </Right>
          </ListItem> 

          <ListItem icon noBorder button={true} onPress={()=> this.itemClicked('OffersScreen','offer')}
            style={[styles.firstItemList,{backgroundColor:'#fff'}]}>
            <Left>
              <AntDesign name="left" size={20} color="black" />
            </Left>
            <Body>
              <Text style={styles.firstItemTitle}>
                العروض
              </Text>
            </Body>
            <Right>
              <Image source={require('../assets/images/drawerIcons/offers.png')} />  
            </Right>
          </ListItem>   

          <ListItem icon noBorder button={true} onPress={()=> this.itemClicked('AboutAppScreen','about')}
            style={[styles.firstItemList,{backgroundColor:'#fff'}]}>
            <Left>
              <AntDesign name="left" size={20} color="black" />
            </Left>
            <Body>
              <Text style={styles.firstItemTitle}>
                عن التطبيق
              </Text>
            </Body>
            <Right>
              <Image source={require('../assets/images/drawerIcons/aboutApp.png')} />  
            </Right>
          </ListItem>   

          <ListItem icon noBorder button={true} onPress={()=> this.itemClicked('ContactScreen','contact')}
            style={[styles.firstItemList,{backgroundColor:'#fff'}]}>
            <Left>
              <AntDesign name="left" size={20} color="black" />
            </Left>
            <Body>
              <Text style={styles.firstItemTitle}>
                تواصل معنا
              </Text>
            </Body>
            <Right>
              <Image source={require('../assets/images/drawerIcons/contact.png')} />  
            </Right>
          </ListItem>

          <ListItem icon noBorder button={true} onPress={()=> this.itemClicked('CommonQuestionScreen','common')}
            style={[styles.firstItemList,{backgroundColor:'#fff'}]}>
            <Left>
              <AntDesign name="left" size={20} color="black" />
            </Left>
            <Body>
              <Text style={styles.firstItemTitle}>
                الأسئلة الشائعة
              </Text>
            </Body>
            <Right>
              <Image source={require('../assets/images/drawerIcons/commonQues.png')} />  
            </Right>
          </ListItem>

          {/* <ListItem icon noBorder button={true} onPress={()=> this.itemClicked('CommonQuestionScreen','common')}
            style={[styles.firstItemList,{backgroundColor:'#fff'}]}>
            <Body>
              <Text style={styles.firstItemTitle}>
                مشاركة التطبيق
              </Text>
            </Body>
            <Right>
              <Image source={require('../assets/images/drawerIcons/commonQues.png')} />  
            </Right>
          </ListItem>   */}

          <ListItem icon noBorder button={true} onPress={()=> this.itemClicked('UseRuleScreen','userole')}
            style={[styles.firstItemList,{backgroundColor:'#fff'}]}>
            <Left>
              <AntDesign name="left" size={20} color="black" />
            </Left>
            <Body>
              <Text style={styles.firstItemTitle}>
                شروط الاستخدام
              </Text>
            </Body>
            <Right>
              <Image source={require('../assets/images/drawerIcons/howToUse.png')} />  
            </Right>
          </ListItem>  

          <ListItem icon noBorder button={true} onPress={()=> this.itemClicked('PolicyScreen','policy')}
            style={[styles.firstItemList,{backgroundColor:'#fff'}]}>
            <Left>
              <AntDesign name="left" size={20} color="black" />
            </Left>
            <Body>
              <Text style={styles.firstItemTitle}>
                سياسة الخصوصية
              </Text>
            </Body>
            <Right>
              <Image source={require('../assets/images/drawerIcons/privacy.png')} />  
            </Right>
          </ListItem>  

          <ListItem icon noBorder button={true} 
          // onPress={()=> this.itemClicked('Logout','Logout')}
          onPress={()=>firebase.auth().signOut()}
            style={[styles.firstItemList,{backgroundColor:'#fff'}]}>
            <Left>
              <AntDesign name="left" size={20} color="black" />
            </Left>
            <Body>
              <Text style={styles.firstItemTitle}>
                تسجيل الخروج
              </Text>
            </Body>
            <Right>
              <Image source={require('../assets/images/drawerIcons/logout.png')} />  
            </Right>
          </ListItem>        
          
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerView: { flex: 1 },
  firstItemList: {
    marginTop: 5,
    paddingRight:5,
    marginLeft:0,
    marginRight:0,
    paddingLeft:10,
    marginBottom:5
  },
  firstItemTitle: { alignSelf: "flex-end", marginRight: 24, padding: 10,color:'#000' },
  label: {
    fontSize: 16,
    fontWeight: "normal"
  }
})