import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, FlatList, Image, Platform, Pressable } from 'react-native';

const EmojiList = ({onSelect, onCloseModal}) => {

  const [emoji] = useState([
    require('../assets/images/Layer 2.png'),
    require('../assets/images/Layer 3.png'),
    require('../assets/images/Layer 4.png'),
    require('../assets/images/Layer 5.png'),
    require('../assets/images/Layer 6.png'),
    require('../assets/images/Layer 7.png'),
    require('../assets/images/Layer 8.png'),
    require('../assets/images/Layer 9.png'),
    require('../assets/images/Layer 10.png'),
    require('../assets/images/Layer 11.png'),
  ]);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      data={emoji}
      contentContainerStyle={styles.listContainer}
      renderItem={({item, index}) => (
        <Pressable
          onPress={() => {
            onSelect(item);
            onCloseModal();
          }}>
          <Image source={item} key={index} style={styles.image}/>
        </Pressable>
      )}
    >
      
    </FlatList>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20
  }
});

EmojiList.propTypes = {
  onSelect: PropTypes.func,
  onCloseModal: PropTypes.func
};

export default EmojiList;
