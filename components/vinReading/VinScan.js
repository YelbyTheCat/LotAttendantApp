import React from 'react';
import PropTypes from 'prop-types';
import { View, Button } from 'react-native';
import VINScanner from './VINScanner';
import VINOCR from './VINOCR';

const VinScan = ({navigation}) => {
  const handleScan = vin => {
    console.log('Scanned VIN:', vin);
    // Do something with the scanned VIN, like updating the state
  };

  return (
    <View>
      <Button title="Scan VIN" onPress={() => navigation.navigate('VINScanner', {onScan: handleScan})}/>
      <Button title="Capture VIN" onPress={() => navigation.navigate('VINOCR')}/>
    </View>
  );
};

VinScan.propTypes = {
  navigation: PropTypes.object
};

export default VinScan;
