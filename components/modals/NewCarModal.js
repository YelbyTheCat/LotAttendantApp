import React from 'react';
import PropTypes from 'prop-types';

import BaseModal from './BaseModal';

import {useForm, Controller} from 'react-hook-form';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import FormInputController from '../forms/FormControllers/FormInputController';
import {getByVin} from '../../actions/vin';

const NewCarModal = ({show, setShow, title = 'Add Car', onSubmit, navigation}) => {
  
  const {control, handleSubmit, setValue, getValues, formState: {errors}} = useForm();

  // const onSubmit = data => {
  //   console.log(data);
  // };

  const checkVin = async vin => {
    console.log('Vin:', vin);
    if (!vin) return;
    try {
      const res = await getByVin(vin);
      const {data} = res;
      console.log('data', data);
      const carInfo = data.Results[0];

      if (carInfo.ErrorCode !== '0') return;
      const relevantInfo = ['Make', 'Model', ['ModelYear', 'year'], 'Trim'];
      console.log(`
        Make: ${carInfo.Make}\n
        Model: ${carInfo.Model}\n
        Year: ${carInfo.ModelYear}\n
        color: ${carInfo.Color}\n
        trim: ${carInfo.Trim}
        `);
      for (let i = 0; i < relevantInfo.length; i++) {
        const current = relevantInfo[i];
        if (Array.isArray(current)) {
          setValue(current[1], carInfo?.[current[0]]);
        } else {
          setValue(current.toLowerCase(), carInfo?.[current]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleScan = scan => {
    if (!scan) return;
    setValue('vin', scan);
  };

  return (
    <BaseModal {...{title, show, setShow}}>
      <FormInputController name='vin' placeholder='VIN' autoCapitalize="characters" {...{control, errors}}/>
      
      {/* Wrap the Button in a View with margin */}
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="Scan Barcode" onPress={() => navigation.navigate('VINScanner', {onScan: handleScan})}/>
        </View>
        <View style={styles.button}>
          <Button title="Check Vin" onPress={() => {
            const vinValue = getValues('vin');
            const upperCase = vinValue.toUpperCase();
            checkVin(upperCase);
          }}/>
        </View>
      </View>

      <FormInputController name="make" placeholder='Make' {...{ control, errors }}/>
      <FormInputController name="model" placeholder='Model' {...{ control, errors }}/>
      <FormInputController name="year" placeholder='Year' {...{ control, errors }}/>
      <FormInputController name="trim" placeholder='trim' {...{ control, errors }}/>
      
      {/* Wrap the Button in a View with margin */}
      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit(onSubmit)}/>
      </View>
    </BaseModal>
  );
};

NewCarModal.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.object,
  onSubmit: PropTypes.func,
  navigation: PropTypes.object
};

export default NewCarModal;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: '90%',
    marginTop: 18,
    borderColor: 'Gray'
  },
  textError: {
    color: 'red'
  },
  buttonContainer: {
    marginTop: 10,  // Add top margin for spacing from previous element
    flexDirection: 'row',  // Align the buttons horizontally
    justifyContent: 'space-between',  // Space the buttons apart
    alignItems: 'center'  // Ensure buttons are vertically aligned
  },
  button: {
    flex: 1,  // Make buttons take up equal space
    marginHorizontal: 5  // Add space between the buttons
  }
});

