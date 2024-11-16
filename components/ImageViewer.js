import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Image} from 'react-native';

const ImageViewer = ({placeholderImageSource, selectedImage}) => {
  const imageSource = selectedImage ? {uri: selectedImage} : placeholderImageSource;
  return (
    <Image style={styles.image} source={imageSource}/>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18
  }
});

ImageViewer.propTypes = {
  placeholderImageSource: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selectedImage: PropTypes.string
};

export default ImageViewer;
