import { View, Text,StyleSheet,Image,SafeAreaView,TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const Header = () => {
  return (
    <SafeAreaView style={styles.header}>
        <Image 
            source={require('../assets/logo.png')}
            resizeMode='contain'
            style={{height:50}}
         />
         <View style={styles.searchContainer}>
          <TextInput placeholder='Search' style={styles.input}/>
          <Ionicons name="search" size={24} color="black" />
        </View>
    </SafeAreaView>
  )
}

export default Header;

const styles = StyleSheet.create({
    header:{
        width:'100%',
        flexDirection:'column',
        alignContent:'center',
        justifyContent:'center',
        padding:20,
    },
    searchContainer:{
      flexDirection:'row',
      alignItems:'center'
    },
    input:{
      height:40,
      margin:12,
      borderBottomWidth:1,
      borderTopWidth:1,
      padding:10,
      borderRadius:10,
      flex:1
    }
});