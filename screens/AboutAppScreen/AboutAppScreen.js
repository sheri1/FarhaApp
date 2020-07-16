import React, { Component } from "react";
import { View, ScrollView, StatusBar,Image} from "react-native";
import styles from "./AboutAppScreenStyle";
import Constants from 'expo-constants'
import StyledText from '../../components/StyledTexts/StyledText'
import StyledTextBold from '../../components/StyledTexts/StyledTextBold'
import HeaderMenu from '../../components/HeadersComponent/HeaderMenu'

export default class AboutAppScreen extends Component {
  render() {
    return (
      <View style={styles.containerStyle}>          
        <View style={styles.StatusBar}>
          <StatusBar barStyle="light-content"/>
        </View>
        <View>
          <HeaderMenu navigation={this.props.navigation} title='عن التطبيق'></HeaderMenu>
        </View>
        <View style={{ width: '100%',marginTop: 10}}>
            <ScrollView
                style={{ width: '100%' }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow:1,justifyContent:'flex-start',backgroundColor:'#fff',paddingTop:20}}
                snapToStart={true}
            >     
                <View style={styles.titleCont}>
                    <Image style={{width:'100%',borderRadius:10}} source={require('../../assets/images/AboutApp.png')} />
                </View>

                <View style={styles.TxtsCont}>
                    <View style={styles.detailCont}>
                        <StyledText style={styles.detail1}>عن التطبيق :</StyledText>
                    </View>

                    <View style={styles.detailCont}>
                        <StyledText style={styles.detail}>
                            {`تطبيق فرحة يهدف الى تسهيل عمليات الحجز للصالات الموجودة في مدينة غزة ، فهو يخفف على المستخدمين عناء البحث عن مختلف الصالات و المواعيد المتاحة للحجوزات و التي تتطلب الكثير من الوقت و الجهد  كما و يسمح للمستخدمين بالاطلاع على مختلف الصالات المتواجدة في مناطق مدينة غزة و الاطلاع على صور الصالات  و معرفة المواعيد المتاحة للحجز و اختيار الموعد المناسب  للقيام بالحجز . `}
                        </StyledText>
                    </View>
                </View>
            </ScrollView>
        </View>
      </View>
    );
  }
}