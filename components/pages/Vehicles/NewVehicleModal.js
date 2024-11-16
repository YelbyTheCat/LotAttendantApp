import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Button, Modal, TextInput} from 'react-native';
import {useForm, Controller} from 'react-hook-form';

const NewVehicleModal = ({modalVisible, setModalVisible, onSubmit}) => {

  const {control, handleSubmit, reset} = useForm();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <View style={{width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10}}>
          <Text>Add New Vehicle</Text>
          <Controller
            control={control}
            name="ro"
            defaultValue=""
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="RO Number"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={{borderBottomWidth: 1, marginBottom: 10}}
              />
            )}
          />
          <Controller
            control={control}
            name="make"
            defaultValue=""
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Make"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={{borderBottomWidth: 1, marginBottom: 10}}
              />
            )}
          />
          {/* Add other form fields similarly... */}
          <Button title="Submit" onPress={handleSubmit(onSubmit)}/>
          <Button title="Cancel" onPress={() => setModalVisible(false)}/>
        </View>
      </View>
    </Modal>
  );
};


NewVehicleModal.propTypes = {
  modalVisible: PropTypes.bool,
  setModalVisible: PropTypes.func,
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func
};

export default NewVehicleModal;
