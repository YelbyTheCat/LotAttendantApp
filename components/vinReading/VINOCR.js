// import {useCameraPermissions} from 'expo-camera';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
// import TextRecognition from 'react-native-text-recognition';

import MLKit from 'react-native-mlkit-ocr';

const VINOCR = () => {

  const [image, setImage] = useState(null);
  const [text, setText] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({mediaTypes: ImagePicker.MediaTypeOptions.Images});

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // useEffect(() => {
  //   launchLibrary();
  // }, []);

  const readImage = async () => {
    if (!image) {
      setText('No Image');
    }
    console.log('Image:', image);
    setText('Image');
    const result = await MLKit.detectFromUri(image);
    console.log('Result:', result);
    setText(result);
  };

  useEffect(() => {
    readImage();
  }, [image]);

  return (
    <View>
      <Button title="Pick an image from camera roll" onPress={pickImage}/>
      <Text>{text}</Text>
      {image && <Image source={{uri: image}}/>}
    </View>
  );

};

export default VINOCR;
