// import React, {useState} from 'react';
// import {View, Image, Button} from 'react-native';
// import ImagePicker from 'react-native-image-picker';
// import AWS from 'aws-sdk';
// import {launchImageLibrary} from 'react-native-image-picker';
// import {AWSAccessKeyId, AWSSecretKeyId} from '../../keys';

// // Configure AWS
// AWS.config.update({
//   accessKeyId: AWSAccessKeyId,
//   secretAccessKey: AWSSecretKeyId,
//   region: 'Asia Pacific (Sydney) ap-southeast-2', // Replace with your AWS S3 bucket region
// });

// // Create S3 instance
// const s3 = new AWS.S3();

// const AwsUpload = () => {
//   const [imageData, setImageData] = useState(null);

// const pickImage = () => {
//   const options = {
//     mediaType: 'photo',
//     storageOptions: {
//       skipBackup: true,
//       path: 'Pictures/ImageUploadApp', // Desired permanent location in the device's storage
//     },
//   };

//   launchImageLibrary(options, response => {
//     if (response.didCancel) {
//       console.log('Image selection canceled');
//     } else if (response.error) {
//       console.log('Image selection error: ', response.error);
//     } else {
//       console.warn(' ----- source path ==> ', response);

//       uploadImageToS3(response);
//       // setUploadImage(sourcePath);
//       // setImageName(fileName);
//       // saveImageToPermanentLocation(response);
//     }
//   });
// };

//   const uploadImageToS3 = image => {
//     const {uri, fileName} = image.assets[0];
//     const contentType = 'image/jpeg/jpg'; // Adjust the content type based on your use case.
//     console.warn(' =======AWS === ', uri, ' *** ', fileName);
//     const params = {
//       Bucket: 'enterezy-images',
//       Key: fileName,
//       Body: {uri},
//       ContentType: contentType,
//       ACL: 'public-read', // This makes the uploaded image publicly accessible. Adjust permissions as needed.
//     };

//     s3.upload(params, (err, data) => {
//       if (err) {
//         console.log('Error uploading image to S3:', err);
//       } else {
//         console.log('Image uploaded to S3 successfully:', data.Location);
//       }
//     });
//   };

//   return (
//     <View>
//       {imageData && (
//         <Image
//           source={{uri: imageData.uri}}
//           style={{width: 200, height: 200}}
//         />
//       )}
//       <Button title="Pick Image" onPress={pickImage} />
//     </View>
//   );
// };

// export default AwsUpload;

// **************************************************

// How to Upload any File or Image to AWS S3 Bucket from React Native App
// https://aboutreact.com/react-native-upload-file-to-aws-s3-bucket/

// Import React
// import React, {useState} from 'react';
// // Import required components
// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Image,
// } from 'react-native';
// import {RNS3} from 'react-native-aws3';
// import {AWSAccessKeyId, AWSSecretKeyId} from '../../keys';

// import {launchImageLibrary} from 'react-native-image-picker';

// const App = () => {
//   const [filePath, setFilePath] = useState({});
//   const [uploadSuccessMessage, setUploadSuccessMessage] = useState('');

//   const chooseFile = () => {
//     let options = {
//       mediaType: 'photo',
//     };
//     launchImageLibrary(options, response => {
//       console.log('Response = ', response);
//       setUploadSuccessMessage('');
//       if (response.didCancel) {
//         alert('User cancelled camera picker');
//         return;
//       } else if (response.errorCode === 'camera_unavailable') {
//         alert('Camera not available on device');
//         return;
//       } else if (response.errorCode === 'permission') {
//         alert('Permission not satisfied');
//         return;
//       } else if (response.errorCode === 'others') {
//         alert(response.errorMessage);
//         return;
//       }
//       setFilePath(response);
//     });
//   };

//   const uploadFile = () => {
//     if (Object.keys(filePath).length == 0) {
//       alert('Please select image first');
//       return;
//     }
//     RNS3.put(
//       {
//         // `uri` can also be a file system path (i.e. file://)
//         uri: filePath.assets[0].uri,
//         name: filePath.assets[0].fileName,
//         type: filePath.assets[0].type,
//       },
//       {
//         keyPrefix: 'eneterzyimages/', // Ex. myuploads/
//         bucket: 'enterezy-images', // Ex. aboutreact
//         region: 'Asia Pacific (Sydney) ap-southeast-2', // Ex. ap-south-1
//         accessKey: AWSAccessKeyId,
//         // Ex. AKIH73GS7S7C53M46OQ
//         secretKey: AWSSecretKeyId,
//         // Ex. Pt/2hdyro977ejd/h2u8n939nh89nfdnf8hd8f8fd
//         successActionStatus: 201,
//       },
//     )
//       .progress(progress =>
//         setUploadSuccessMessage(
//           `Uploading: ${progress.loaded / progress.total} (${
//             progress.percent
//           }%)`,
//         ),
//       )
//       .then(response => {
//         if (response.status !== 201) alert('Failed to upload image to S3');
//         console.log(response.body);
//         setFilePath('');
//         let {bucket, etag, key, location} = response.body.postResponse;
//         setUploadSuccessMessage(
//           `Uploaded Successfully:
//           \n1. bucket => ${bucket}
//           \n2. etag => ${etag}
//           \n3. key => ${key}
//           \n4. location => ${location}`,
//         );
//         /**
//          * {
//          *   postResponse: {
//          *     bucket: "your-bucket",
//          *     etag : "9f620878e06d28774406017480a59fd4",
//          *     key: "uploads/image.png",
//          *     location: "https://bucket.s3.amazonaws.com/**.png"
//          *   }
//          * }
//          */
//       });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.titleText}>
//         How to Upload any File or Image to AWS S3 Bucket{'\n'}
//         from React Native App
//       </Text>
//       <View style={styles.container}>
//         {/* {filePath.assets[0].uri !== null ? ( */}
//         <>
//           <Image
//             source={{
//               uri: 'https://enterezy-images.s3.ap-southeast-2.amazonaws.com/eneterzyimages/w2.jpg',
//             }}
//             style={styles.imageStyle}
//           />
//           {/* <Text style={styles.textStyle}>{filePath?.assets[0]?.uri}</Text>  */}
//           <TouchableOpacity
//             activeOpacity={0.5}
//             style={styles.buttonStyleGreen}
//             onPress={uploadFile}>
//             <Text style={styles.textStyleWhite}>Upload Image</Text>
//           </TouchableOpacity>
//         </>
//         {/* ) : null} */}
//         {uploadSuccessMessage ? (
//           <Text style={styles.textStyleGreen}>{uploadSuccessMessage}</Text>
//         ) : null}
//         <TouchableOpacity
//           activeOpacity={0.5}
//           style={styles.buttonStyle}
//           onPress={chooseFile}>
//           <Text style={styles.textStyleWhite}>Choose Image</Text>
//         </TouchableOpacity>
//       </View>
//       <Text style={{textAlign: 'center'}}>www.aboutreact.com</Text>
//     </SafeAreaView>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: '#fff',
//   },
//   titleText: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     paddingVertical: 20,
//   },
//   textStyle: {
//     padding: 10,
//     color: 'black',
//     textAlign: 'center',
//   },
//   textStyleGreen: {
//     padding: 10,
//     color: 'green',
//   },
//   textStyleWhite: {
//     padding: 10,
//     color: 'white',
//   },
//   buttonStyle: {
//     alignItems: 'center',
//     backgroundColor: 'orange',
//     marginVertical: 10,
//     width: '100%',
//   },
//   buttonStyleGreen: {
//     alignItems: 'center',
//     backgroundColor: 'green',
//     marginVertical: 10,
//     width: '100%',
//   },
//   imageStyle: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//     resizeMode: 'contain',
//     margin: 5,
//   },
// });

// import React from 'react';
// import {View, Image, Text, StyleSheet} from 'react-native';

// const ImageDisplayScreen = () => {
//   const imageURL = 'http://acs.amazonaws.com/groups/global/AllUsers'; // Replace this with the actual URL of the uploaded image

//   const image = 's3://enterezy-images/eneterzyimages/w2.jpg';
//   return (
//     <View style={styles.container}>
//       <Image source={{uri: imageURL}} style={styles.image} />
//       <Text>heel</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     width: 150,
//     height: 150,
//     resizeMode: 'cover', // Adjust the resizeMode as needed
//   },
// });

// export default ImageDisplayScreen;

// *************************************

import React from 'react';
import {View, Text, TouchableOpacity, Button, Image} from 'react-native';
import {RNS3} from 'react-native-aws3';
import {launchImageLibrary} from 'react-native-image-picker';
import {AWSAccessKeyId, AWSSecretKeyId} from '../../keys';

const UploadImageToS3 = () => {
  const handleImageUpload = image => {
    // const imageFile = {
    //   // uri: 'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg', // Replace this with the actual path to your image file
    //   uri: 'C:Userswww.abcom.inDesktopEcommerceAndroidMay2023assets\banner4.jpg',
    //   name: 'my-image.jpg', // Replace this with a suitable name for your image file
    //   type: 'image/jpeg', // Replace this with the appropriate file type (e.g., 'image/png' for PNG images)
    // };/

    const imageFile = {
      uri: image.uri,
      name: 'my-image.jpg', // Replace this with a suitable name for your image file
      type: 'image/jpeg', // Replace this with the appropriate file type (e.g., 'image/png' for PNG images)
    };

    const options = {
      keyPrefix: 'productimages/', // The folder name where you want to store the image in the S3 bucket
      bucket: 'enterezy-images', // Replace this with the actual name of your S3 bucket
      region: 'ap-southeast-2', // Replace this with the AWS region where your S3 bucket is located (e.g., 'us-east-1')
      accessKey: AWSAccessKeyId, // Replace this with your AWS access key
      secretKey: AWSSecretKeyId, // Replace this with your AWS secret key
      successActionStatus: 201,
      // contentType: 'image/jpeg/jpg/webp',
    };

    console.log(' image ===> ', imageFile);

    const formData = new FormData();
    formData.append('file', imageFile, {
      type: 'image/jpeg/jpg/webp',
      contentType: 'image/jpeg',
    });

    RNS3.put(imageFile, options)
      .then(response => {
        if (response.status !== 201) {
          console.error('React native Failed to upload image to S3:', response);
        } else {
          console.log('Image successfully uploaded to S3:', response.body);
        }
      })
      .catch(error => {
        console.error('Error uploading image to S3:', error);
      });
  };

  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
        path: 'Pictures/ImageUploadApp', // Desired permanent location in the device's storage
      },
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('Image selection canceled');
      } else if (response.error) {
        console.log('Image selection error: ', response.error);
      } else {
        console.warn(' ----- source path ==> ', response);

        handleImageUpload(response.assets[0]);
        // setUploadImage(sourcePath);
        // setImageName(fileName);
        // saveImageToPermanentLocation(response);
      }
    });
  };

  return (
    <View>
      <Button title="Pick Image" onPress={pickImage} />
      <TouchableOpacity onPress={handleImageUpload}>
        <Text>Upload Image to S3</Text>
      </TouchableOpacity>

      <Image
        source={{
          uri: 'https://enterezy-images.s3.amazonaws.com/productimages%2Fmy-image.jpg',
        }}
        style={{width: 100, height: 100}}
      />
    </View>
  );
};

export default UploadImageToS3;
