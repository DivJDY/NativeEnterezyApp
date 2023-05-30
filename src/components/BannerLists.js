/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useState, useRef} from 'react';
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  FlatList,
  Animated,
} from 'react-native';
import BannerPagination from './BannerPagination';

const slides = [
  {id: 1, image: require('../../assets/banner4.jpg')},
  {id: 2, image: require('../../assets/banner1.jpeg')},
  {id: 3, image: require('../../assets/banner3.jpg')},
  {id: 4, image: require('../../assets/banner4.jpg')},
  {id: 5, image: require('../../assets/banner1.jpeg')},
  {id: 6, image: require('../../assets/banner3.jpg')},
];

const BannerLists = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef(null);

  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef(({viewableItem}) => {
    if (viewableItem && viewableItem.length > 0) {
      setCurrentIndex(viewableItem[0].index);
    }
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const {width} = useWindowDimensions();
  const RenderSlides = ({item}) => {
    return (
      <View style={[styles.container, {width}]}>
        <Image
          source={item.image}
          style={[styles.image, {width, resizeMode: 'contain'}]}
        />
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={slides}
          renderItem={({item}) => <RenderSlides item={item} />}
          horizontal
          showsHorizontalScrollIndicator
          pagingEnabled
          bounces={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          onViewableItemsChanged={viewableItemsChanged}
          // viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
          keyExtractor={item => item.id}
        />
      </View>
      <BannerPagination data={slides} scrollX={scrollX} />
    </>
  );
};

export default BannerLists;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 0.5,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    justifyContent: 'center',
  },
});
