import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import { getVehicleById} from '../../../database/tables/vehicles';

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
        <Text>Year: {vehicle.year}</Text>
        <Text>Make: {vehicle.make}</Text>
        <Text>Model: {vehicle.model}</Text>
        <Text>Odometer: {vehicle.miles}</Text>
        <Text>Location: {vehicle.location}</Text>
      </View>
      }
    </View>
  );
};

Vehicle.propTypes = {
  route: PropTypes.object
};

export default Vehicle;
