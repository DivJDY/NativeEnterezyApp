/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  FlatList,
  Animated,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import BannerPagination from './BannerPagination';
import {hostName} from '../../App';

// const {width} = Dimensions.get('window');

const BannerLists = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef(null);
  const flatListRef = useRef(null);
  const [slides, setSlides] = useState([]);

  const fetchBannerLists = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    };
    await fetch(hostName + '/banner', requestOptions)
      .then(res => res.json())
      .then(response => {
        console.warn('banner ', response.banner_data);
        setSlides(response.banner_data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchBannerLists();
  }, []);

  useEffect(() => {
    setTimeout(() => fetchBannerLists(), 3000);
  });

  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef(({viewableItem}) => {
    if (viewableItem && viewableItem.length > 0) {
      setCurrentIndex(viewableItem[0].index);
    }
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const {width} = useWindowDimensions();
  const deleteBannerItem = async id => {
    Alert.alert(
      '',
      'You want delete this banner',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            await deleteBannerById(id);
          },
        },
      ],
      {cancelable: true},
    );
  };

  const deleteBannerById = async id => {
    await fetch(hostName + '/banner/' + id, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(response => {
        console.log(response.message);
        Alert.alert(response.message);
        fetchBannerLists();
      })
      .catch(error => {
        // Handle any network or other errors
        console.error('Error:', error);
      });
  };

  console.warn(' ite   ', slides);
  const RenderSlides = ({item}) => {
    return (
      <View style={[styles.container, {width}]}>
        <Card.Cover
          // style={{marginBottom: 10}}
          source={{uri: item?.banner_image}}
          // resizeMode="repeat"
          resizeMode="contain"
          style={[styles.image, {width, height: '100%'}]}
        />
        <View style={{position: 'absolute', top: 10, left: '90%', right: 10}}>
          <TouchableOpacity onPress={() => deleteBannerItem(item.banner_code)}>
            <Icon
              name="delete"
              size={30}
              color="#000"
              style={{fontWeight: 'bold'}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Function to update the scroll position
  const scrollToIndex = index => {
    flatListRef.current.scrollToIndex({animated: true, index});
    setCurrentIndex(index);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate the next index to scroll to
      const nextIndex = (currentIndex + 1) % slides.length;
      scrollToIndex(nextIndex); // This line could be causing the NaN issue

      // Instead of the above line, you should just update the currentIndex without triggering a scroll
      setCurrentIndex(nextIndex);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, slides.length]);
  // useEffect(() => {
  //   // const interval = setInterval(() => {
  //   //   // Calculate the next index to scroll to
  //   //   const nextIndex = (currentIndex + 1) % slides.length;
  //   //   scrollToIndex(nextIndex);
  //   // }, 3000); // Change this value to control the interval
  //   // // Clear the interval when the component unmounts
  //   // return () => {
  //   //   clearInterval(interval);
  //   // };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentIndex]);

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
          ref={flatListRef}
          keyExtractor={item => item.banner_code}
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
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    justifyContent: 'center',
  },
});
