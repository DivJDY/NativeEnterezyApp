// import React, {useRef, useEffect, useState} from 'react';
// import {
//   View,
//   ScrollView,
//   Text,
//   Dimensions,
//   TouchableOpacity,
//   Image,
// } from 'react-native';

// const CustomBanner = () => {
//   const windowWidth = Dimensions.get('window').width;
//   const scrollViewRef = useRef(null);
//   //   const scrollViewRef = useRef(null);

//   //   const scrollToTop = () => {
//   //     if (scrollViewRef.current) {
//   //       scrollViewRef.current.scrollTo({y: 0, animated: true});
//   //     }
//   //   };

//   // Function to scroll to the next slide
//   const scrollToNextSlide = () => {
//     scrollViewRef.current.scrollTo({x: windowWidth, y: 0, animated: true});
//     console.warn('SCroll ' + JSON.stringify(scrollViewRef));
//   };

//   // Function to start the auto-scrolling
//   const startAutoScroll = () => {
//     // Scroll to the next slide every 3 seconds
//     setInterval(scrollToNextSlide, 3000);
//   };

//   useEffect(() => {
//     // Start the auto-scrolling when the component mounts
//     startAutoScroll();
//   }, []);

//   const bannerImages = [
//     '../../assets/banner1.jpeg',
//     '../../assets/banner2.jpeg',
//     '../../assets/banner1.jpeg',
//   ];

//   return (
//     <ScrollView
//       ref={scrollViewRef}
//       horizontal
//       pagingEnabled
//       showsHorizontalScrollIndicator={false}
//       onMomentumScrollEnd={event => {
//         // Calculate the current slide index based on the scroll position
//         const slideIndex = Math.floor(
//           event.nativeEvent.contentOffset.x / windowWidth,
//         );
//         // Do something with the current slide index
//         console.log('Current slide index:', slideIndex);
//       }}>
//       {bannerImages.map((imageUrl, index) => (
//         <TouchableOpacity key={index}>
//           <Image
//             source={require('../../assets/banner1.jpeg')}
//             style={styles.bannerImage}
//           />
//         </TouchableOpacity>
//       ))}
//       {/* Slide 1 */}
//       {/* <View style={{width: windowWidth, height: 200, backgroundColor: 'red'}}>
//         <Text>Slide 1</Text>
//       </View>

//       {/* Slide 2 */}
//     </ScrollView>
//   );
// };

// export default CustomBanner;

// import React, {useState} from 'react';
// import {View, ScrollView, TouchableOpacity, Image} from 'react-native';

// const CustomBanner = () => {
//   const [showBanner, setShowBanner] = useState(true);

//   const handleBannerClose = () => {
//     setShowBanner(false);
//   };

//   const renderBanner = () => {
//     // if (!showBanner) {
//     //   return null;
//     // }

//     // Replace the image URLs with your own banner images

//     return (
//       <ScrollView horizontal>
// {/* {bannerImages.map((imageUrl, index) => (
//   <TouchableOpacity key={index} onPress={handleBannerClose}>
//     <Image source={{uri: imageUrl}} style={styles.bannerImage} />
//   </TouchableOpacity>
// ))} */}
//         <TouchableOpacity onPress={handleBannerClose}>
//           <Image
//             source={require('../../assets/banner1.jpeg')}
//             style={styles.bannerImage}
//           />
//         </TouchableOpacity>
//         <Image
//           source={require('../../assets/banner2.jpeg')}
//           style={styles.bannerImage}
//         />
//       </ScrollView>
//     );
//   };

//   return <View style={styles.container}>{renderBanner()}</View>;
// };

// const styles = {
//   container: {
//     flex: 1,
//   },
//   bannerImage: {
//     width: 300, // Adjust the image width as needed
//     height: 200, // Adjust the image height as needed
//   },
// };

// export default CustomBanner;

// import React, {useState} from 'react';
// import {View, ScrollView, Dimensions} from 'react-native';
// import {Button, Card} from 'react-native-paper';

// const CustomerBanner = () => {
//   const [banners, setBanners] = useState([
//     {id: 1, text: 'Banner 1'},
//     {id: 2, text: 'Banner 2'},
//     {id: 3, text: 'Banner 3'},
//   ]);

//   const width = Dimensions.get('window').width;
//   const closeBanner = id => {
//     setBanners(banners.filter(banner => banner.id !== id));
//   };

//   return (
//     <ScrollView horizontal>
//       {banners.map(banner => (
//         <Card key={banner.id} style={{width: 340, borderRadius: 0}}>
//           {/* <Card.Title
//             title={banner.text}
//             right={() => (
//               <Button icon="close" onPress={() => closeBanner(banner.id)} />
//             )}
//           /> */}
//           <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
//         </Card>
//       ))}
//     </ScrollView>
//   );
// };

// export default CustomerBanner;

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
