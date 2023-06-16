import React from 'react';
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const deviceWidth = Dimensions.get('window').width;

const CustomBanner = () => {
  const images = [
    require('../../assets/banner1.jpeg'),
    require('../../assets/banner2.jpeg'),
    require('../../assets/banner1.jpeg'),
  ];

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled>
        {images.map((image, index) => (
          <View key={index} style={{width: deviceWidth, height: 200}}>
            <Image
              source={image}
              style={{
                position: 'relative',
                width: deviceWidth,
                height: 200,
                marginTop: 5,
                paddingLeft: 10,
              }}
            />
            <TouchableOpacity
              style={{position: 'absolute', top: 10, right: 25}}
              onPress={() => {
                /* Handle button press */
              }}>
              {/* Add your button component here */}
              <Ionicons name="close-circle" size={25} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          /* Handle close button action */
        }}>
        {/* Add close button component */}
      </TouchableOpacity>
    </View>
  );
};

export default CustomBanner;
