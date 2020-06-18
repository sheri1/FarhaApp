import * as React from "react";
import { StyleSheet, View, Image, TouchableOpacity , FlatList } from "react-native";
import StyledText from './StyledTexts/StyledText';
import { AntDesign, Entypo } from "@expo/vector-icons";

export default class OrderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        let orderList = this.props.details

        // {id:0,hallName:'اسم الصالة',orderNum:'123456',orderDate:'16/6/2020',orderTime:'7:30'}

        return (
        <>
            <FlatList
                style={{flex: 1}}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{marginTop:30}}
                snapToStart={true}
                data={orderList}
                extraData={this.props}
                numColumns={1}
                renderItem={({item, index})=>(
                    <View key={index} style={styles.container} activeOpacity={0.8}>
                        <View style={styles.btnCont}>
                            <TouchableOpacity style={styles.btn}
                                onPress={()=>this.props.navigation.navigate('OrderDetailScreen')}
                            >
                                <StyledText style={{color:'#fff'}}>الحالة > </StyledText>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.detailCont}>
                            <StyledText style={[styles.orderTxtDetail,{color:'#A2A2A2',fontSize: 12}]}>
                                {item.orderDate}    {item.orderTime}
                            </StyledText>
                            <StyledText style={styles.orderTxtDetail}>
                                رقم الطلب : {item.orderNum}
                            </StyledText>
                            <StyledText style={[styles.orderTxtDetail,{color:'#A2A2A2',fontSize: 12}]}>
                                {item.hallName}
                            </StyledText>
                        </View>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </>
        );
    }
}

const styles = StyleSheet.create({
    container: {flex:1, borderRadius: 15,backgroundColor:'#fff',
        justifyContent:'center',alignItems:'center',marginHorizontal:10,marginVertical:10,
        flexDirection:'row',borderColor:'#E4E4E4',borderWidth:1,height:110
    },
    detailCont:{flex:3,justifyContent:'flex-start',alignItems:'flex-end',height:'100%',padding:10},
    btnCont:{flex:1,height:'100%'},
    btn:{width:'100%',height:50,backgroundColor:'#924480',justifyContent:'center',alignItems:'center',
        position:'absolute',bottom:0,borderBottomLeftRadius:15,borderTopRightRadius:20,borderBottomRightRadius:10
    },
    orderTxtDetail:{width:'100%',textAlign:'right',marginVertical:5}
})