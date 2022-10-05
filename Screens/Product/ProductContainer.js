import { View, Text,StyleSheet,ActivityIndicator,FlatList } from 'react-native';
import React,{useEffect, useState} from 'react';
import ProductList from './ProductList';
const data = require("../../assets/data/products.json");

const ProductContainer = () => {

    const [productList,setProductList] = useState([]);


    useEffect(()=>{
        setProductList(data);

        return ()=>{
            setProductList([])
        }
    },[]);
  return (
    <View>
        <Text>Container Product</Text>
        <View style={{marginTop:100}}>
        <FlatList 
        
        data={productList}
        renderItem={({item})=>
               <ProductList key={item.id} item={item}/>
        }
        keyExtractor={(item)=>item.name}
        />
        </View>
    </View>
  )
}

export default ProductContainer