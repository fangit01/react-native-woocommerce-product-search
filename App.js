import React from 'react';
import { StyleSheet, Text, View ,ScrollView} from 'react-native';

import Header from "./src/components/header.js";
import SearchBooks from "./src/components/SearchBooks.js";

export default class App extends React.Component {
  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
        <SearchBooks/>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'flex-start',
    marginTop:30,
    marginLeft:20,
    marginRight:20,
    // justifyContent: 'flex-start'
  },
});
