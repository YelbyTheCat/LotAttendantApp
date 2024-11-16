import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const IconButton = ({icon, label, onPress}) => {
  return (
    <Pressable style={styles.iconButton} {...{onPress}}>
      <MaterialIcons name={icon} size={24} color="#fff"/>
      <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconButtonLabel: {
    color: '#fff',
    marginTop: 12
  }
});

IconButton.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
  onPress: PropTypes.func
};

export default IconButton;
