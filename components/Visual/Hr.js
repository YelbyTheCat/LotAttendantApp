import React from 'react';
import { StyleSheet, View } from 'react-native';

const Hr = () => (
  <View style={styles.seperator}/>
);

const styles = StyleSheet.create({
  seperator: {
    height: 1,
    width: '100%',
    backgroundColor: '#ddd'
  }
});

export default Hr;
