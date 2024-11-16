import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Modal, Text, Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const EmojiPicker = ({isVisible, children, onClose}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Chose a sticker</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#fff" size={22}/>
          </Pressable>
        </View>
        {children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    height: '25%',
    width: '100%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
  },
  titleContainer: {
    height: '16%',
    backgroundColor: '#464C55',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 16,
  }
});

EmojiPicker.propTypes = {
  isVisible: PropTypes.bool,
  children: PropTypes.object,
  onClose: PropTypes.func
};

export default EmojiPicker;
