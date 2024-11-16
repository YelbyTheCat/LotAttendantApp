import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';


import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// https://docs.expo.dev/tutorial/gestures/

// npx expo start

import HomeScreen from './components/pages/HomeScreen';
import Vehicles from './components/pages/Vehicles/Vehicles';
import Vehicle from './components/pages/Vehicles/Vehicle';
import VinScan from './components/vinReading/VinScan';
import VINScanner from './components/vinReading/VINScanner';
import VINOCR from './components/vinReading/VINOCR';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Vehicles" component={Vehicles} options={{title: 'Vehicles'}}/>
        <Stack.Screen name="Vehicle" component={Vehicle} options={{title: 'Vehicle Details'}}/>
        <Stack.Screen name="VinScan" component={VinScan} options={{title: 'Vin Scan'}}/>
        <Stack.Screen name="VINScanner" component={VINScanner} options={{title: 'Vin Scanner'}}/>
        <Stack.Screen name="VINOCR" component={VINOCR} options={{title: 'Vin ORC'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1/3,
    alignItems: 'center'
  },
  optionsConainer: {
    position: 'absolute',
    bottom: 80
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row'
  }
});
