import React, { Component } from "react";
import { View, ScrollView, StatusBar,TouchableOpacity,Image} from "react-native";
import styles from "./OrdersScreenStyle";
import StyledText from '../../components/StyledTexts/StyledText'
import HeaderMenu from '../../components/HeadersComponent/HeaderMenu'
import OrderList from '../../components/OrderList'

export default class OrdersScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ordersTap:[
                {id:1,name:'طلبات الزبائن',isSelect:false},
                {id:0,name:'طلباتي',isSelect:true},
            ],
            showFilter:'طلباتي',
            orderList:[
                {id:0,hallName:'اسم الصالة',orderNum:'123456',orderDate:'16/6/2020',orderTime:'7:30'},
                {id:1,hallName:'اسم الصالة',orderNum:'123456',orderDate:'16/6/2020',orderTime:'7:30'},
                {id:2,hallName:'اسم الصالة',orderNum:'123456',orderDate:'16/6/2020',orderTime:'7:30'},
            ],
            otherOrderList:[
                {id:0,hallName:'اسم الصالة',orderNum:'123456',orderDate:'16/6/2020',orderTime:'7:30'},
                {id:1,hallName:'اسم الصالة',orderNum:'123456',orderDate:'16/6/2020',orderTime:'7:30'},
                {id:2,hallName:'اسم الصالة',orderNum:'123456',orderDate:'16/6/2020',orderTime:'7:30'},
                {id:3,hallName:'اسم الصالة',orderNum:'123456',orderDate:'16/6/2020',orderTime:'7:30'},
            ]
        }
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
        this.setState({
            ordersTap: listDataCopy,
            showFilter: filter,
        });
    }

    render() {
        return (
        <View style={styles.containerStyle}>          
            <View style={styles.StatusBar}>
                <StatusBar barStyle="light-content"/>
            </View>
            <View>
            <HeaderMenu navigation={this.props.navigation} title='الطلبات'></HeaderMenu>
            </View>
            <ScrollView
                style={{ width: '100%' }}
                showsVerticalScrollIndicator={false} snapToStart={true}
                contentContainerStyle={{flexGrow:1,justifyContent:'flex-start',paddingBottom:50,backgroundColor:'#fff',paddingTop:20,paddingHorizontal:10}}
            >
                <View style={{height:50,flexDirection:'row',width:'100%'}}>  
                    {this.state.ordersTap.map((item, index)=>(
                        <View key={index} style={{marginHorizontal:5,flex:1}}> 
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

                {this.state.showFilter == 'طلباتي' ?
                <View style={{width: '100%'}}>
                    {this.state.orderList.length > 0 ?
                        <>
                        <View style={styles.storiesImagesCont}>
                            <OrderList 
                                navigation={this.props.navigation}
                                details={this.state.orderList}
                            />
                        </View>
                        </>
                        :
                        <View style={{width: '100%',paddingTop:50,justifyContent:'center',alignItems:'center'}}>
                            <Image source={require('../../assets/images/noSearch.png')}/>
                            <StyledText style={{color:'#000'}}>لا يوجد طلبات خاصة بك</StyledText>
                        </View>
                    }
                </View>
                :
                <View style={{width: '100%'}}>
                    {this.state.otherOrderList.length > 0 ?
                        <>
                        <View style={styles.storiesImagesCont}>
                            <OrderList 
                                navigation={this.props.navigation}
                                details={this.state.otherOrderList}
                            />
                        </View>
                        </>
                        :
                        <View style={{width: '100%',paddingTop:50,justifyContent:'center',alignItems:'center'}}>
                            <Image source={require('../../assets/images/noSearch.png')}/>
                            <StyledText style={{color:'#000'}}>لا يوجد طلبات خاصة بالآخرين</StyledText>
                        </View>
                    }
                </View>
                }
            </ScrollView>
        </View>
        );
    }
}