import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Pressable, Image, Button, StyleSheet, FlatList} from 'react-native';

import {initializeDatabase, createVehiclesTable, getAllVehicles, insertVehicles, tempData, getTableSchema, dropTable} from '../../../database/tables/vehicles';

import hyundaiLogo from '../../../assets/logos/hyundai.gif';
import nissanLogo from '../../../assets/logos/nissan.png';
import fordLogo from '../../../assets/logos/ford.png';
import subaruLogo from '../../../assets/logos/subaru.png';
import lincolnLogo from '../../../assets/logos/lincoln.png';
import kiaLogo from '../../../assets/logos/kia.png';
import hondaLogo from '../../../assets/logos/honda.png';
import nullLogo from '../../../assets/logos/null.gif';

// import NewVehicleModal from './NewVehicleModal';
import axios from 'axios';
import NewCarModal from '../../modals/NewCarModal';

const getLogo = make => {
  try {
    if (!make) return <Image source={nullLogo} style={{width: 50, height: 50, resizeMode: 'contain'}}/>;
    switch (make.toLowerCase()) {
      case 'ford': return <Image source={fordLogo} style={{width: 50, height: 50, resizeMode: 'contain'}}/>;
      case 'honda': return <Image source={hondaLogo} style={{width: 50, height: 50, resizeMode: 'contain'}}/>;
      case 'hyundai': return <Image source={hyundaiLogo} style={{width: 50, height: 50, resizeMode: 'contain'}}/>;
      case 'kia': return <Image source={kiaLogo} style={{width: 50, height: 50, resizeMode: 'contain'}}/>;
      case 'lincoln': return <Image source={lincolnLogo} style={{width: 50, height: 50, resizeMode: 'contain'}}/>;
      case 'nissan': return <Image source={nissanLogo} style={{width: 50, height: 50, resizeMode: 'contain'}}/>;
      case 'subaru': return <Image source={subaruLogo} style={{width: 50, height: 50, resizeMode: 'contain'}}/>;
      default: return null;
    }
  } catch (e) {
    console.warn(`No logo found for make: ${make}`);
    return null;
  }
};

const Vehicles = ({navigation}) => {

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

  const checkVin = async vin => {
    try {
      const response = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vin}?format=json`);
      const carInfo = response.data.Results[0];

      if (carInfo.ErrorCode === '0') {
        console.log(`
          Make: ${carInfo.Make}\n
          Model: ${carInfo.Model}\n
          Year: ${carInfo.ModelYear}
          `);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Button style={styles.button} title="Check-in Vehicle" onPress={() => setShow(true)}/>
      {/* <Button title="Drop Table" onPress={() => dropTable()}/> */}
      <FlatList
        data={cars ? cars : []}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{paddingBottom: 20}}
        renderItem={({item: car}) => (
          <View style={styles.card}>
            <Pressable onPress={() => navigation.navigate('Vehicle', {id: car.id})}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 4, paddingLeft: 4}}>
                  <Text style={{fontSize: 14}}>
                    VIN: {car?.vin?.slice(0, -8)}
                    <Text style={{textDecorationLine: 'underline'}}>
                      {car?.vin?.slice(-8)}
                    </Text>
                    {` | Odometer: ${car.odometer}`}
                  </Text>
                  <Text style={{fontSize: 20}}>
                    {car.make} | {car.model}
                  </Text>
                </View>
                <View style={{flex: 1}}>
                  {getLogo(car.make)}
                </View>
              </View>
            </Pressable>
          </View>
        )}
      />


      {/* <NewVehicleModal {...{modalVisible, setModalVisible, onSubmit}}/> */}
      <NewCarModal {...{show, setShow, onSubmit, navigation}}/>
    </View>
  );
};

Vehicles.propTypes = {
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    padding: 10,
    margin: 10,
    backgroundColor: '#007bff',
    alignItems: 'center'
  },
  card: {
    backgroundColor: 'lightblue',
    marginBottom: 2,
    marginHorizontal: 6,
    borderColor: 'black',
    borderWidth: 3
  }
});

export default Vehicles;
