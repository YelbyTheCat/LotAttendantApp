import React from 'react';
import PropTypes from 'prop-types';

import {View, Text, Button} from 'react-native';
import {getExternalInventory} from '../../actions/inventory';

const HomeScreen = ({navigation}) => {

  const getInventory = async () => {
    try {
      const data = await getExternalInventory({accountId: 'cioccanissanofquakertown3', compositeType: 'new'});
      console.log(data);
      // const {pageInfo} = data;
      // const {trackingData} = pageInfo;
      // console.log(`Tracking data length: ${trackingData.length}`);
      for (let i = 0; i < data.length; i++) {
        const current = data[i];
        console.log(`[${i}]: ${current.year} ${current.exteriorColor} ${current.make} ${current.model} ${current.trim} ${current.stockNumber} ${current.vin} ${current.accountId} ${current.status}`);
      }
    } catch (e) {
      console.log('Error');
    }
  };

  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Go to Vehicles" onPress={() => navigation.navigate('Vehicles')}/>
      <Button title="Call vehicles" onPress={() => getInventory()}/>
    </View>
  );
};


HomeScreen.propTypes = {
  navigation: PropTypes.object
};


export default HomeScreen;
