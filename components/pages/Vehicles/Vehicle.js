import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import { getVehicleById, tempData } from '../../../database/tables/vehicles';

const Vehicle = ({route}) => {

  const {id} = route.params;

  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState(null);

  const fetchVehicle = async () => {
    try {
      // const data = tempData.find(car => car.id === id);
      const data = await getVehicleById(id);
      setVehicle(data);
    } catch (e) {
      setVehicle(null);
      setError(e.error);
    }
  };

  useEffect(() => {
    fetchVehicle();
  }, []);

  return (
    <View style={{paddingLeft: 10}}>
      <Text>Car Details for ID: {id}</Text>
      {error && <Text>{error}</Text>}
      {vehicle && <View>
        <Text>Vin: {vehicle.vin}</Text>
        <Text>ro: {vehicle.ro}</Text>
        <Text>make: {vehicle.make}</Text>
        <Text>model: {vehicle.model}</Text>
        <Text>carColor: {vehicle.carColor}</Text>
        <Text>interiorColor: {vehicle.interiorColor}</Text>
        <Text>miles: {vehicle.miles}</Text>
        <Text>gas: {`${vehicle.gas}%`}</Text>
        <Text>location: {vehicle.location}</Text>
        <Text>used: {vehicle.used ? 'Used' : 'New'}</Text>
        <Text>year: {vehicle.year}</Text>
        <Text>currentOwner: {vehicle.currentOwner}</Text>
      </View>
      }
    </View>
  );
};

Vehicle.propTypes = {
  route: PropTypes.object
};

export default Vehicle;
