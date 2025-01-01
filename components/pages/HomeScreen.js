import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {View, Text, Button} from 'react-native';
import {getExternalInventory} from '../../actions/inventory';
import {getAllVehicles} from '../../database/tables/vehicles';
import {vehiclesMeta} from '../../database/meta/vehiclesMeta';

const HomeScreen = ({navigation}) => {

  const [dealershipInventory, setDealershipInventory] = useState(null);
  const [localInventory, setLocalInventory] = useState(null);
  const [inventoryDifferences, setInventoryDifferences] = useState(null);
  const [error, setError] = useState(null);

  const getDealershipInventory = async () => {
    try {
      const data = await getExternalInventory({accountId: 'cioccanissanofquakertown3', compositeType: ['new'], status: ['1-1'], pageSize: 1});
      // const data = await getExternalInventory({accountId: 'cioccanissanofquakertown3', compositeType: ['new', 'used'], status: ['1-1','7-7'], pageSize: 100});
      setDealershipInventory(data);
      console.log(data);
      // const {pageInfo} = data;
      // const {trackingData} = pageInfo;
      // console.log(`Tracking data length: ${trackingData.length}`);
      // for (let i = 0; i < data.length; i++) {
      //   const current = data[i];
      //   console.log(`[${i}]: ${current.year} ${current.exteriorColor} ${current.make} ${current.model} ${current.trim} ${current.stockNumber} ${current.vin} ${current.accountId} ${current.status}`);
      // }
    } catch (e) {
      console.log('Error', e);
      setError('Failed to get Dealership Inventory');
      setDealershipInventory([]);
    }
  };

  const getLocalInventory = async () => {
    try {
      const data = await getAllVehicles();
      setLocalInventory(data);
    } catch (e) {
      console.log('Error', e);
      setError('Failed to get Local Inventory');
    }
  };

  const processData = async () => {
    await getDealershipInventory();
    await getLocalInventory();

    if (!dealershipInventory) {
      setError('No dealership inventory');
      return;
    }

    if (!localInventory) {
      setError('No local inventory');
      return;
    }

    const localVins = localInventory.reduce((map, vehicle) => {
      map[vehicle.vin] = vehicle;
      return map;
    }, {});

    const newVehicles = [];

    for (let i = 0; i < dealershipInventory.length; i++) {
      const currentVehicle = dealershipInventory[i];

      const existingVehicle = localVins[currentVehicle.vin];

      // Update differences
      if (existingVehicle) {
        let vehicleClone = structuredClone(existingVehicle);
        vehicleClone['make'] = currentVehicle.make;
        vehicleClone['model'] = currentVehicle.model;
        vehicleClone['carColor'] = currentVehicle.exteriorColor;
        vehicleClone['interiorColor'] = currentVehicle.interiorColor;
      }
    }
  };

  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Go to Vehicles" onPress={() => navigation.navigate('Vehicles')}/>
      <Text></Text>
      <Button title="Call vehicles" onPress={() => getDealershipInventory()}/>
    </View>
  );
};


HomeScreen.propTypes = {
  navigation: PropTypes.object
};


export default HomeScreen;
