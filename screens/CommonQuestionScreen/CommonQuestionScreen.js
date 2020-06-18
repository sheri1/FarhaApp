import React, { Component } from "react";
import { View, ScrollView, StatusBar,Image} from "react-native";
import styles from "./CommonQuestionScreenStyle";
import Constants from 'expo-constants'
import StyledText from '../../components/StyledTexts/StyledText'
import StyledTextBold from '../../components/StyledTexts/StyledTextBold'
import HeaderMenu from '../../components/HeadersComponent/HeaderMenu'
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import {Ionicons} from '@expo/vector-icons'

export default class CommonQuestionScreen extends Component {
    constructor(props) {
        super(props);
        this.page = 1;
        this.state = {
            repeatedQuestion:[
                {id:0,question:'السؤال الأول',
                    answer:`يتم جمع وسائل التواصل المتاحة التي من في ي شأنها تسهيل التواصل وإنشاء وتأكيد عضوية الاشت على سبيل المثال وليس الحصر عل سبيل المثال وليس الحصر`
                },
                {id:1,question:'السؤال الثاني',
                    answer:`يتم جمع وسائل التواصل المتاحة التي من في ي شأنها تسهيل التواصل وإنشاء وتأكيد عضوية الاشت على سبيل المثال وليس الحصر عل سبيل المثال وليس الحصر`
                },
                {id:2,question:'السؤال الثالث',
                    answer:`يتم جمع وسائل التواصل المتاحة التي من في ي شأنها تسهيل التواصل وإنشاء وتأكيد عضوية الاشت على سبيل المثال وليس الحصر عل سبيل المثال وليس الحصر`
                },
                {id:3,question:'السؤال الرابع',
                    answer:`يتم جمع وسائل التواصل المتاحة التي من في ي شأنها تسهيل التواصل وإنشاء وتأكيد عضوية الاشت على سبيل المثال وليس الحصر عل سبيل المثال وليس الحصر`
                },
            ]
        };
    }

    render() {
        return (
        <View style={styles.containerStyle}>          
            <View style={styles.StatusBar}>
            <StatusBar barStyle="light-content"/>
            </View>
            <View>
            <HeaderMenu navigation={this.props.navigation} title='الأسئلة الشائعة'></HeaderMenu>
            </View>
            <View style={{ width: '100%',marginTop: 10}}>
                <ScrollView
                    style={{ width: '100%' }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flexGrow:1,justifyContent:'flex-start',backgroundColor:'#fff',
                        paddingTop:20,paddingHorizontal:15}}
                    snapToStart={true}
                >     
                    {this.state.repeatedQuestion.map((item,index)=>{
                        return(
                            <Collapse key={index}
                                style={{width:'100%',minHeight:35,marginBottom:10,padding: 15, borderRadius: 10}}
                            >
                                <CollapseHeader>
                                    <View style={{flexDirection:'row'}}>
                                        <View>
                                            <Ionicons name='ios-arrow-back' size={24} style={styles.iconStyle} color='#000'/>
                                        </View>
                                        <View style={{flex:1}}>
                                            <StyledText style={{color:'#000',textAlign:'right',fontSize:14}}>
                                                {item.question}
                                            </StyledText>
                                        </View>
                                    </View>
                                </CollapseHeader>
                                <CollapseBody>
                                    <View style={{marginTop:10,backgroundColor:'#F7F6F7',padding:10}}>
                                        <StyledText style={{color:'#000',textAlign:'right',fontSize:14,lineHeight:20}}>
                                            {item.answer}
                                        </StyledText>
                                    </View>
                                </CollapseBody>
                            </Collapse>
                        )
                    })
                    }
                </ScrollView>
            </View>
        </View>
        );
    }
}