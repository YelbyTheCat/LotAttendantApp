import React from 'react';
import PropTypes from 'prop-types';
import { View, Modal, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Hr from '../Visual/Hr';

const BaseModal = ({show, setShow, title='New Modal', children}) => {
  
  return (
    <Modal animationType='slide' transparent visible={show} onRequestClose={() => setShow(false)}>
      <View style={styles.modalBackground}>
        <View style={styles.modalForground}>
          {/* Container for title and close button */}
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={() => setShow(false)}>
              <Text style={styles.closeButton}>X</Text>
            </TouchableOpacity>
          </View>
          
          <Hr/>
          
          <View style={styles.container}>
            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
};

BaseModal.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.array
};

export default BaseModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalForground: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
  container: {
    alignItems: 'center',
  },
});
