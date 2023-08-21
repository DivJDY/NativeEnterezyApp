/* eslint-disable react-native/no-inline-styles */
import {View, PermissionsAndroid, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import RNFS from 'react-native-fs';
import {Alert} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const DownloadOrder = ({order}) => {
  const generateCSVData = data => {
    let csvData =
      'Product Brand, User Name, Product Code, Product Name, Product Image, Tax Rate, Qunatity Purchased, Selling Price, Ordered Price\n'; // Header row

    data.forEach(item => {
      csvData += `${item.product_brand}, ${item.user_name}, ${item.product_code}, ${item.product_name}, ${item.product_image}, ${item.tax_rate}, ${item.quantity_purchased},${item.selling_price}, ${item.total_price}\n`; // Data rows
    });

    return csvData;
  };

  const requestExternalWritePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message:
            'Your app needs access to your device storage to download files.',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  useEffect(() => {
    requestExternalWritePermission();
  }, []);

  const downloadFile = async data => {
    // console.log(' hell');
    const csvData = generateCSVData(data);
    // Get the download directory path
    const downloadDir = RNFS.DownloadDirectoryPath;
    const downloadDest = `${downloadDir}/order_lists.csv`;
    const fileExists = await RNFS.exists(downloadDest);
    if (fileExists) {
      await RNFS.unlink(downloadDest);
      console.warn(' ===>  file extsisrsefgfg'); // Delete the existing file
    }
    try {
      RNFS.writeFile(downloadDest, csvData, 'utf8');
      console.log('File downloaded successfully, d ', downloadDest);
      Alert.alert(
        'Order lists downloaded successfully! Please check the file in the device download location',
      );
    } catch (err) {
      console.log('Error while downloading file:', err);
    }
  };

  return (
    // <View
    //   style={{
    //     alignContent: 'flex-end',
    //     alignItems: 'flex-end',
    //     marginTop: 15,
    //     marginRight: 10,
    //   }}>
    <TouchableOpacity onPress={() => downloadFile(order)}>
      <Entypo name="download" size={30} color={'black'} />
    </TouchableOpacity>
    // </View>
  );
};

export default DownloadOrder;
