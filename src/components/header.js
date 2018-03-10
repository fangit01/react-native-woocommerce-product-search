import React from 'react';
import { Text, View, StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    header: {
      backgroundColor:"lightgray",
      height:30,
      // borderBottomWidth: 2,
      borderColor:'#ddd',
      // marginBottom:20,
      // paddingBottom:50,
      justifyContent:'center', //vertical align
      alignItems: 'center', // horizontal align
      // elevation:2,
      // position:'relative',
      // shadowColor:'#000',
      // shadowOffset:{widht:0, height:2},
      // shadowOpacity:0.2
      
    },  
    h1: {
        fontSize: 20,
    },
    red: {
        color: 'red',
    },
});


const Header = (props) => {
    return (
        <View style = {styles.header}>
          <Text style={styles.h1}>{props.headerText}</Text> 
          {/* in class based component use this.props */}
        </View>
        )
};



export default Header;
