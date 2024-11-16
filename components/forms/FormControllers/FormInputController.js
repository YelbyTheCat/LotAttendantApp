import React from 'react';
import PropTypes from 'prop-types';
import {Controller} from 'react-hook-form';
import { StyleSheet, Text, TextInput } from 'react-native';

const FormInputController = ({name, placeholder, control, errors, errorMessage, ...props}) => {
  return (
    <>
      <Controller {...{name, control}} render={({field: {onChange, onBlur, value}}) => (
        <TextInput
          style={styles.input} 
          placeholder={placeholder}
          onChangeText={onChange}
          {...props}
          {...{value, onBlur}}
        />
      )}/>
      {errors?.[name] && <Text style={styles.textError}>{errorMessage}</Text>}
    </>
  );
};

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
  }
});

FormInputController.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  control: PropTypes.object,
  errors: PropTypes.object,
  errorMessage: PropTypes.string
};

export default FormInputController;

