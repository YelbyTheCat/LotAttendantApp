import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

const VINScanner = ({ route }) => {
  const { onScan } = route.params;

  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    // Camera permissions are still loading.
    return <View/>;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission"/>
      </View>
    );
  }

  // Handle barcode scanned
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log(`Barcode scanned: ${data}`);
    onScan(data); // Use scanned data
    alert(`VIN number scanned: ${data}`);
  };

  // Check permission status
  if (permission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (permission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>Permission {permission.granted}</Text>
      <CameraView 
        style={StyleSheet.absoluteFillObject}
        facing='back'
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
      {scanned && <Button title="Tap to Scan Again" onPress={() => setScanned(false)}/>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

VINScanner.propTypes = {
  route: PropTypes.object.isRequired,
};

export default VINScanner;
