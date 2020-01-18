import React, { Component } from 'react'
import { ImageBackground, RefreshControl, Image, TouchableOpacity, ScrollView, View, Text, Dimensions, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SearchBar,ListItem  } from 'react-native-elements';
import { EventRegister } from 'react-native-event-listeners';
import Spinner from "react-native-loading-spinner-overlay";

import { productListStyle } from '../Category/ProductListStyle';
import { commonStyle} from '../Common/CommonStyle';
import ProductListItem from '../Category/ProductListItem';
import { CustomIconInfoButton, } from '../Common/index';
import { Navigation } from "react-native-navigation";
import { onNavigation, addCommonListeners, onNavigationPopToRoot } from '../../config/navigations';

import colors from '../../resources/colors';
import images from "../../resources/images";
import fontSize from '../../resources/fontSize';

//Action
import { CategoryAction } from "../../redux/actions/index";
import { ShoppingCartAction } from "../../redux/actions/index";


const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export class SearchPage extends Component {
    
    static propTypes = {
        searchText: PropTypes.any
    }
    constructor(props) {
        super(props);
        this.state = {
            search: this.props.searchText,
            spinner: false,
            refreshing: false,
            searchResult:[],
            shoppingCartData:this.props.shoppingCartData ? this.props.shoppingCartData : [],
          isSearchListFound:0,
            offset:1,
            count:100,
            resultMgs:'',
            // shoppingCartData : this.props.shoppingCartData,
        };
        Navigation.events().bindComponent(this);
        
    }
  

   

   

    
    

    componentWillMount() {
        // this.search.focus();

        var totalItems = this.getTotalItems();
        totalItems === 0 ? EventRegister.emit('updateShoppingCartItemsCount', '') : EventRegister.emit('updateShoppingCartItemsCount', totalItems);        
    }
    componentDidMount(){
        Navigation.mergeOptions(this.props.componentId, {
            bottomTabs: {
              visible: false,
              ...Platform.select({ android: { drawBehind: true } })
            },
          });

          this.search.focus()
    }


    componentWillReceiveProps(nextProps) {
        const {searchResult,offset}=this.state;
        if(this.props.isSearchDataFound!==nextProps.isSearchDataFound){
            if(nextProps.isSearchDataFound===1){
                this.setState({
                    searchResult:offset===1?nextProps.searchResult:[...searchResult,...nextProps.searchResult],
                    spinner:false,
                    isSearchListFound:0,
                    resultMsg:'',
                })
            }else if(nextProps.isSearchDataFound===2){
                this.setState({
                    searchResult:[],
                    spinner:false,
                    isSearchListFound:2,
                    resultMsg:'No Record Found..',

                })
            }
        }
    }

    

    onProductDetail(productItem){
        console.log(productItem,"productItem is "); 
        productItem.Quantity = "1";
        onNavigation( "navigation.ismart.ProductDetail", "", this.props.componentId, {productDetails: productItem, productId: productItem.ProductId, categoryId: productItem.CatagoryId,  type:"Cata", }, )
    }

    getTotalItems=()=>{
        var itemsCount = 0;
        for(i=0; i<this.state.shoppingCartData.length; i++) {
            let tempItem = this.state.shoppingCartData[i];
            itemsCount = itemsCount +  parseInt(tempItem.Quantity, 10);
        }
        // console.log(itemsCount);
        return itemsCount;
    }

    onAddToCart=(productItem)=>{
        console.log("product id is ");
        console.log(productItem.ProductId);
        alert("Item added to shopping cart!");
        productItem.Quantity = "1";
        let arrTemp = this.state.shoppingCartData;
        var isItemAlreadyExistsInArray = false;
        for(i=0; i<arrTemp.length; i++) {
            let tempItem = arrTemp[i];
            if(tempItem.ProductId == productItem.ProductId) {
                // alert("item is the same");
                isItemAlreadyExistsInArray = true;
                var count = parseInt(tempItem.Quantity, 10);
                count++;
                tempItem.Quantity = count.toString();
                arrTemp[i] = tempItem;
                break;
            } 
        }
        if(!isItemAlreadyExistsInArray){
            arrTemp.push(productItem);
        }
        this.setState({ shoppingCartData: arrTemp});
        console.log("shopping cart");
        console.log(this.state.shoppingCartData);
        this.props.saveShoppingCartItems({
            shoppingCartData: this.state.shoppingCartData,
          });
        var totalItems = this.getTotalItems();
        EventRegister.emit('updateShoppingCartItemsCount', totalItems); 
    }

    updateSearch = search => {

        
        this.setState({ 
            search ,
            spinner:true,
            resultMgs:'Loading...',
            offset:1

        });
        console.log("search is", search);
        this.props.searchProduct({
            search:search,
            offset:1,
            count:300,
            
        })
    };

    loadProductList=()=>{
        const {offset,count,search}=this.state;
        this.props.searchProduct({
            search:search,
            offset:offset,
            count:count,
            
        })
    }
    _onScrollLoadData=()=>{
        const {offset,spinner,search}=this.state;
       if(search===""){
        this.setState({
            offset:offset+1,
            refreshing:true,
        },()=>{
            console.log("offset123",this.state.offset)
            this.loadProductList();
        })
    }else{
        this.setState({
            offset:offset,
            refreshing:true,
        },()=>{
            console.log("offset123",this.state.offset)
            this.loadProductList();
        })
    }
        
        
    }
    _renderProductList=({item})=>(
        
        
        <TouchableOpacity onPress={()=>this.onProductDetail(item)}>
        <View 
        style={{
            flex:1,
            flexDirection:'row',
            borderBottomColor:colors.white,
            borderBottomWidth:1,
            padding:2,
            marginBottom:2}}
        >
            <View>
            <Image resizeMode="cover" style={{
                marginTop:0, 
                height:60, 
                width:60,
                borderRadius:12,
                alignSelf:"center",
            }}  source={{uri:item.ProductImage}}/>
            
            </View>
            <View style={{flex:2}}>
                <Text style={{
                    fontSize:16,
                    fontWeight:'700',
                    padding:5
                    
                }}>{item.ProductName}</Text>
                <Text style={{
                    color:colors.red,
                    fontSize:12,
                    paddingLeft:10,
                }}>{"₹ "+item.Price}</Text>
                <Text style={{
                    color:colors.red,
                    fontSize:12,
                    paddingLeft:10
                }}>Item Code : {item.SUK}</Text>
            </View>
        </View>
        </TouchableOpacity>

    //     <ListItem
    //     roundAvatar
    //     title={item.ProductName}
    //     subtitle={item.Price}
    //     avatar={{ uri: item.ProductImage }}
    //     containerStyle={{ borderBottomWidth: 0 }}
    // /> 
    )
    render() {
        const { search,resultMgs } = this.state;
        return (
            <ImageBackground style={ commonStyle.imageBackground } resizeMode='cover' source={images.background}>
                <SearchBar 
                placeholder="Search here" 
                showLoading={this.state.spinner} 
                onChangeText={this.updateSearch} 
                value={search} 
                autoCorrect={false} 
                ref={search => this.search = search}
                inputContainerStyle={commonStyle.searchBarInputContainerStyle } 
                containerStyle={commonStyle.searchBarContainerStyle} />
                
                
                {/* <ScrollView refreshControl={ <RefreshControl refreshing={this.state.refreshing} onRefresh={}/> } >  */}
                    <ScrollView style={productListStyle.scrollContainer}  >
                        {this.state.searchResult && this.state.searchResult.length > 0 ?  
                        <FlatList
                            data={this.state.searchResult}
                            renderItem={this._renderProductList}
                            keyExtractor={item=>item.SUK+"-"+item.ProductName}
                            onEndReached={this._onScrollLoadData}
                            refreshing={this.state.refreshing}
                            // onEndThreshold={-100}
                            onEndReachedThreshold={10}
                            
                           
                        />
                        
                        :<View style={commonStyle.emptyViewContainerStyle}><Text style={commonStyle.emptyHeadingTextStyle}>{this.props.isSearchDataFound===2?"No Record Found":resultMgs}</Text></View>}
                    </ScrollView>                                       
                {/* </ScrollView> */}
            </ImageBackground>
        )
    }
}

const mapStateToProps = (state) => ({
    shoppingCartData:state.shoppingcart.shoppingCartData,
    searchResult:state.category.searchResult,
    isSearchDataFound:state.category.isSearchDataFound
    
})

const mapDispatchToProps = {
   ...CategoryAction
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)

