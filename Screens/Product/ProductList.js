import { View, Text,TouchableOpacity,Dimensions,StyleSheet } from 'react-native';
import React from 'react'
import ProductCard from './ProductCard';

const {width} = Dimensions.get('window');

const ProductList = ({item}) => {
  return (
      <TouchableOpacity style={styles.listContainer}>
           <View style={styles.inner}>
                <ProductCard {...item}/>
            </View>
      </TouchableOpacity>
  )
}

export default ProductList;

const styles = StyleSheet.create({
    listContainer:{
        width:'50%',
        backgroundColor:'red'
    },
    inner:{
        width:width/2,
        backgroundColor:'gainsboro'
    }


});