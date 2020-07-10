import React, { Component } from "react";
import { View, ScrollView, StatusBar,TouchableOpacity,Image,Modal,TextInput,Switch} from "react-native";
import styles from "./SearchScreenStyle";
import Constants from 'expo-constants'
import StyledText from '../../components/StyledTexts/StyledText'
import StyledTextBold from '../../components/StyledTexts/StyledTextBold'
import HeaderMenu from '../../components/HeadersComponent/HeaderMenu'
import { SearchBar } from "react-native-elements";
import {MaterialCommunityIcons,AntDesign,Entypo} from '@expo/vector-icons'
import SearchList from '../../components/SearchList'
import { Rating } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      regionsList:[
        {id:0,name:'الكل',isSelect:true},
        {id:1,name:'جنوب غزة',isSelect:false},
        {id:2,name:'شرق غزة',isSelect:false},
        {id:3,name:'شمال غزة',isSelect:false},
        {id:4,name:'غرب غزة',isSelect:false},
      ],
      reginFilter:'الكل',
      searchList:[
        {id:0,image:require('../../assets/images/hall.png'),name:'صالة لارزوا',price:'100 $',
          location:'دير البلح',discount:null,isFav:true,uri:false
        },
        {id:1,image:require('../../assets/images/hall.png'),name:'صالة لارزوا',price:'100 $',
          location:'دير البلح',discount:'60%',isFav:false,uri:false
        },
        {id:2,image:require('../../assets/images/hall.png'),name:'صالة لارزوا',price:'100 $',
          location:'دير البلح',discount:null,isFav:true,uri:false
        },
        {id:3,image:require('../../assets/images/hall.png'),name:'صالة لارزوا',price:'100 $',
          location:'دير البلح',discount:'60%',isFav:false,uri:false
        },
        {id:4,image:require('../../assets/images/hall.png'),name:'صالة لارزوا',price:'100 $',
          location:'دير البلح',discount:null,isFav:false,uri:false
        },
        {id:5,image:require('../../assets/images/hall.png'),name:'صالة لارزوا',price:'100 $',
          location:'دير البلح',discount:'60%',isFav:true,uri:false
        },
        {id:6,image:require('../../assets/images/hall.png'),name:'صالة لارزوا',price:'100 $',
          location:'دير البلح',discount:null,isFav:false,uri:false
        },
      ],
      modalVisible:false,
      hallPersonNum:300,
      priceValue:0,

      date:new Date(),
      showDate:false,
      Selecteddate:'',
      mostBooked:true,
      minPrice:'',
      maxPrice:''
    }
  }

  selectItem = (id) => {
    let listDataCopy = JSON.parse(JSON.stringify(this.state.regionsList));
    listDataCopy.forEach((elem) => {
      elem.isSelect = false;
      if (elem.id === id) {
        elem.isSelect = true;
      }
    });
    const filter = listDataCopy[id].name;
    this.setState({
      regionsList: listDataCopy,
      reginFilter: filter,
    });
  }

  ratingCompleted(rating) {
    console.log("Rating is: " + rating)
  }

  selectDate(value){
    this.setState({showDate:false,showTimer:false})
    const SelectedDateTime = value;
    const Selecteddate = moment(value).format("YYYY-MM-DD");
    const SelectedTime = moment(value).format("h:mm:ss");
    // console.log(Selecteddate , SelectedTime)
    this.setState({Selecteddate:Selecteddate})
  } 

  toggleSwitch = () => {
    this.setState({mostBooked: ! this.state.mostBooked})
  }

  searchFilter(){
    this.setState({modalVisible:false})
  }

  render() {
    return (
      <View style={styles.containerStyle}>          
        <View style={styles.StatusBar}>
          <StatusBar barStyle="light-content"/>
        </View>
        <View>
          <HeaderMenu navigation={this.props.navigation} title='البحث'></HeaderMenu>
        </View>
        <View style={{ width: '100%',marginTop: 10}}>
          <ScrollView
            style={{ width: '100%' }}
            showsVerticalScrollIndicator={false} snapToStart={true}
            contentContainerStyle={{flexGrow:1,justifyContent:'flex-start',backgroundColor:'#fff',paddingBottom:60,paddingTop:20,paddingHorizontal:10}}
          >

            <View style={styles.searchContainer}>
              <TouchableOpacity style={styles.filterCont} onPress={()=> this.setState({modalVisible:true})}>
                <MaterialCommunityIcons name='filter-variant' color='#000' size={20}/>
              </TouchableOpacity>
              <View style={{flex:1}}>
                <SearchBar
                  placeholder="بحث"
                  value={this.state.search}
                  inputContainerStyle={styles.searchInputContainerStyle}
                  containerStyle={styles.searchContainerStyle}
                  inputStyle={styles.searchInputStyle}
                  returnKeyType="search"
                  lightTheme={true}
                  onChangeText={this.updateSearch}
                  onClearText={this.clearSearch}
                  onSubmitEditing={() => this.SearchAboutProducts(this.state.search)} 
                />
              </View>
            </View>

            <View style={{height:70}}>
            <ScrollView
              style={{marginVertical: 10}} 
              horizontal={true} showsHorizontalScrollIndicator={false}
            >
              {this.state.regionsList.map((item, index)=>(
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
            </ScrollView>
            </View>

            <View style={{width: '100%'}}>
              {this.state.searchList.length > 0 ?
                <>
                  <View style={styles.storiesImagesCont}>
                    <SearchList 
                      navigation={this.props.navigation}
                      details={this.state.searchList}
                    />
                  </View>
                </>
                :
                <View style={{width: '100%',paddingTop:50,justifyContent:'center',alignItems:'center'}}>
                  <Image source={require('../../assets/images/noSearch.png')}/>
                  <StyledText style={{color:'#000'}}>لا يوجد نتائج بحث</StyledText>
                </View>
              }
            </View>

            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>

                  <View style={styles.firstView}>
                    <TouchableOpacity
                      onPress={() => this.setState({modalVisible:false})}
                    >
                      <AntDesign name='close' color='#924480' size={20}/>
                    </TouchableOpacity>
                    <View style={styles.firstViewtilte}>
                      <StyledText style={styles.modalText}>فلتر</StyledText>
                    </View>
                  </View>

                  <View style={styles.modalRow}>
                    <StyledText>السعر</StyledText>
                    <View style={{width:'100%', flexDirection: 'row'}}>
                      <View style={[styles.InputContainer2,{flex:1}]}>
                        <TextInput
                          placeholder="السعر الأقل"
                          placeholderTextColor="#A2A2A2"
                          underlineColorAndroid="transparent"
                          value={this.state.minPrice}
                          returnKeyType={"next"}
                          onChangeText={(minPrice) => this.setState({ minPrice })}
                          blurOnSubmit={false}
                          keyboardType='number-pad'
                          style={styles.Input}
                        />
                      </View>
                      <View style={{width:20}}></View>
                      <View style={[styles.InputContainer2,{flex:1}]}>
                        <TextInput
                          placeholder="السعر الأعلى"
                          placeholderTextColor="#A2A2A2"
                          underlineColorAndroid="transparent"
                          value={this.state.maxPrice}
                          returnKeyType={"next"}
                          onChangeText={(maxPrice) => this.setState({ maxPrice })}
                          blurOnSubmit={false}
                          keyboardType='number-pad'
                          style={styles.Input}
                        />
                      </View>
                    </View>
                  </View>

                  <View style={styles.modalRow}>
                    <StyledText style={styles.rowTitle}>سعة الأفراد</StyledText>
                    <View style={styles.InputContainer2}>
                      <TextInput
                        placeholder="300"
                        placeholderTextColor="#A2A2A2"
                        underlineColorAndroid="transparent"
                        value={this.state.hallPersonNum}
                        returnKeyType={"next"}
                        onChangeText={(hallPersonNum) => this.setState({ hallPersonNum })}
                        blurOnSubmit={false}
                        keyboardType='number-pad'
                        style={styles.Input}
                      />
                    </View>
                  </View>
                  
                  <View style={styles.modalRow}>
                    <StyledText style={styles.rowTitle}>حسب التقييم </StyledText>
                    <Rating
                        type='star' ratingCount={5} imageSize={35} startingValue={1}
                        onFinishRating={this.ratingCompleted}
                    />
                  </View>

                  <View style={styles.modalRow}>
                    <StyledText style={styles.rowTitle}>تاريخ الحجز</StyledText>
                    <View style={[styles.InputContainer2,{flexDirection:'row'}]}>
                      <AntDesign name='left' color='#000' size={20}/>
                      <TouchableOpacity onPress={()=> this.setState({showDate:true})}>
                        <Entypo name='calendar' size={20} color='#924480'/>
                      </TouchableOpacity>
                      <View style={{flex:1}}>
                        <StyledText style={styles.rowTitle}>{this.state.Selecteddate}</StyledText>
                      </View>  
                    </View>
                  </View>

                  <View>
                    {this.state.showDate &&
                      <DateTimePicker
                          value={this.state.date}
                          mode={'date'}
                          is24Hour={true}
                          display="default"
                          onChange={(event, selectedDate) => this.selectDate(selectedDate)}
                      />
                    }
                  </View>

                  <View style={[styles.modalRow,{flexDirection:'row',marginTop: 15}]}>
                    <Switch
                      trackColor={{ false: "#767577", true: "#767577" }}
                      thumbColor={this.state.mostBooked ? "#5CCF93" : "#f4f3f4"}
                      onValueChange={this.toggleSwitch}
                      value={this.state.mostBooked}
                    />
                    <View style={{flex:1}}>
                      <StyledText style={styles.rowTitle}>الأكثر حجزاً</StyledText>
                    </View>
                  </View>


                  <View style={styles.done}>
                    <TouchableOpacity style={styles.doneTouch} onPress={()=>this.searchFilter()}>
                      <AntDesign name='check' size={20} color='#fff'/>
                    </TouchableOpacity>
                  </View>

                </View>
              </View>
            </Modal>

          </ScrollView>
        </View>
      </View>
    );
  }

  updateSearch = (search) => {
    // this.setState({ search: search.trim() });
    // if (search) {
    // } else {
    //   this.setState({
    //     showSearchView:false,
    //     empty: false,
    //     productsFound: false,
    //     img_empty: false,
    //     refreshing: false,
    //     spinner:false
    //   });
    // }
  }

  clearSearch() {
    // this.setState({
    //   showSearchView:false,
    //   empty: false,
    //   productsFound: false,
    //   spinner: false,
    //   img_empty: false,
    //   refreshing: false
    // });
  }

  SearchAboutProducts(searchText) {
    // if (searchText.trim() != null && searchText.trim() != "") {
    //     this.setState({
    //         showSearchView:true,
    //         activities: [],
    //         spinner: true,
    //         img_empty: false,
    //         refreshing: false,
    //         search:searchText
    //     });
    //     this.props.searchProduct(searchText).then((response) => {
    //         // console.log(response)
    //         if (response.type == 'FETCH_SEARCH_SUCESS') {
    //         if (response.payload.items.length) {
    //             try {
    //                 let activitiesArray = response.payload.items;
    //                 this.setState({
    //                     spinner: false,
    //                     empty: false,
    //                     activities: activitiesArray,
    //                     img_empty: false,
    //                     refreshing: false,
    //                     selectIndex:null
    //                 });
    //             } catch (error) {
    //                 console.log(error.message);
    //             }
    //         } else {
    //             try {
    //                 this.setState({
    //                     empty: true,
    //                     spinner: false,
    //                     img_empty: true,
    //                     refreshing: false,
    //                     selectIndex:null
    //                 });
    //             } catch (error) {
    //                 console.log(error.message);
    //             }
    //         }
    //         } else {
    //         this.setState({
    //             empty: true, img_empty: true, refreshing: false, selectIndex:null
    //         });
    //             alert(i18n.t('loginScreen.server',{locale:this.props.LanguageReducer.langID}));
    //         }
    //     });
    // }
  }

}