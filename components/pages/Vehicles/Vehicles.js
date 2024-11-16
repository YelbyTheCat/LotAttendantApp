import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Pressable, Image, Button } from 'react-native';

import { initializeDatabase, createVehiclesTable, getAllVehicles, insertVehicles, tempData, getTableSchema, dropTable } from '../../../database/tables/vehicles';

import nissanLogo from '../../../assets/logos/nissan.png';
import hyundaiLogo from '../../../assets/logos/hyundai.gif';
// import NewVehicleModal from './NewVehicleModal';
import axios from 'axios';
import NewCarModal from '../../modals/NewCarModal';

const Vehicles = ({ navigation }) => {

  const [cars, setCars] = useState(null);
  const [show, setShow] = useState(false);

  const initializeAndFetchVehicles = async () => {
    try {
      await initializeDatabase(); // Initialize the database
      await createVehiclesTable(); // Create the vehicles table if it doesn't exist
      await getTableSchema();
      const vehicles = await getAllVehicles(); // Fetch vehicles
      setCars(vehicles);
    } catch (e) {
      setCars(null);
      console.error('Failed to fetch vehicles:', e);
    }
  };

  useEffect(() => {
    initializeAndFetchVehicles();
  }, []);

  const onSubmit = async data => {
    try {
      await insertVehicles(data);
      setShow(false);
      // reset();
      await initializeAndFetchVehicles(); // Refresh the list
    } catch (e) {
      console.error('Failed to add vehicle:', e);
    }
  };

  const getStockNumber = (vin, year) => {
    if (!vin) return 'N/A';
    if (year !== new Date().getFullYear()) return `${year}${vin.substring(vin.length - 4)}`;
    return vin.substring(vin.length - 8);
  };

  const getLogo = make => {
    try {
      switch (make.toLowerCase()) {
        case 'nissan': return <Image source={nissanLogo} style={{ width: 50, height: 50, resizeMode: 'contain' }}/>;
        case 'hyundai': return <Image source={hyundaiLogo} style={{ width: 50, height: 50, resizeMode: 'contain' }}/>;
        default: return null;
      }
    } catch (e) {
      console.warn(`No logo found for make: ${make}`);
      return null;
    }
  };

  const checkVin = async vin => {
    try {
      const response = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vin}?format=json`);
      const carInfo = response.data.Results[0];

      if (carInfo.ErrorCode === '0') {
        console.log(`
          Make: ${carInfo.Make}\n
          Model: ${carInfo.Model}\n
          Year: ${carInfo.ModelYear}\n
          color: ${carInfo.Color}
          `);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleScan = vin => {
    if (!vin) return;
    console.log('Scanned VIN:', vin);
    // Do something with the scanned VIN, like updating the state
    console.log('Before Checked stuff');
    checkVin(vin);
    console.log('Checked stuff');
  };

  return (
    <View>
      <View>
        <Text>Vehicles</Text>
        <Button title="New Car" onPress={() => setShow(true)}/>
        <Button title="Vin Scan" onPress={() => navigation.navigate('VINScanner', {onScan: handleScan})}/>
        {/* <Button title="Drop Table" onPress={() => dropTable()}/> */}
      </View>
      {cars && cars.map(car => (
        <View key={car.id} style={{ backgroundColor: 'lightblue', marginBottom: 2, marginHorizontal: 6, borderColor: 'black', borderWidth: 3 }}>
          <Pressable onPress={() => navigation.navigate('Vehicle', { id: car.id })}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 4, paddingLeft: 4 }}>
                <Text style={{ fontSize: 14 }}>{`RO: ${car?.ro} | Stock: ${getStockNumber(car.vin, car.year)}`}</Text>
                <Text style={{ fontSize: 20 }}>{`${car.make} | ${car.model}`}</Text>
              </View>
              <View style={{ flex: 1 }}>
                {getLogo(car.make)}
              </View>
            </View>
          </Pressable>
        </View>
      ))}
      {/* <NewVehicleModal {...{modalVisible, setModalVisible, onSubmit}}/> */}
      <NewCarModal {...{show, setShow, onSubmit, navigation}}/>
    </View>
  );
};

Vehicles.propTypes = {
  navigation: PropTypes.object
};

export default Vehicles;
