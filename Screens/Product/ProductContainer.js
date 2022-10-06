import { View, StyleSheet,ActivityIndicator,FlatList, Dimensions,Text } from 'react-native';
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
      <View style={styles.container}>
          <Text>Product Contianer</Text>
          <View style={styles.listContainer}>
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

export default ProductContainer;

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    backgroundColor: "gainsboro"
  },
  listContainer: {
    height: '100%',
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  center: {
      justifyContent: 'center',
      alignItems: 'center'
  }
});