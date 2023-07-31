import {View, PermissionsAndroid} from 'react-native';
import React, {useEffect} from 'react';
import RNFS from 'react-native-fs';
import {Alert} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const DownloadUsers = ({users}) => {
  function formatMobileNumber(number) {
    const formattedNumber = Number(number).toFixed(0); // Convert number to fixed-point notation with 0 decimal places
    return formattedNumber;
  }

  const generateCSVData = data => {
    let csvData = 'Name,Mobile Number,Role,Address\n'; // Header row

    data.forEach(item => {
      //   const mobileNumberInteger = item.user_verified_mobile_number.toString();
      //   const mobileNumber = item.user_verified_mobile_number.toLocaleString(
      //     'en',
      //     {minimumFractionDigits: 0, maximumFractionDigits: 0},
      //   );

      //   const mobileNumber = formatMobileNumber(item.user_verified_mobile_number);

      //   console.log(mobileNumberInteger);
      csvData += `${item.user_name},${item.user_verified_mobile_number},${item.role},"${item.address}"\n`; // Data rows

      //   csvData +=
      //     item.user_name +
      //     item.user_verified_mobile_number +
      //     item.roleitem.address +
      //     '\n';
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
    const csvData = generateCSVData(data);

    // Get the download directory path
    const downloadDir = RNFS.DownloadDirectoryPath;
    const downloadDest = `${downloadDir}/user_lists.csv`;

    const fileExists = await RNFS.exists(downloadDest);

    if (fileExists) {
      console.warn(' ===>  file extsisrsefgfg');
      await RNFS.unlink(downloadDest); // Delete the existing file
      //   try {
      //     RNFS.writeFile(downloadDest, csvData, 'utf8');
      //     console.log('File downloaded successfully, d ', downloadDest);
      //     Alert.alert(
      //       'User list downloaded successfully! Please check the file in the device download location',
      //     );
      //   } catch (err) {
      //     console.log('Error while downloading file:', err);
      //   }
    }
    // else if (!fileExists) {
    //   try {
    //     RNFS.writeFile(downloadDest, csvData, 'utf8');
    //     console.log('File downloaded successfully, d ', downloadDest);
    //     Alert.alert(
    //       'User list downloaded successfully! Please check the file in the device download location',
    //     );
    //   } catch (err) {
    //     console.log('Error while downloading file:', err);
    //   }
    // }

    try {
      RNFS.writeFile(downloadDest, csvData, 'utf8');
      console.log('File downloaded successfully, d ', downloadDest);
      Alert.alert(
        'User list downloaded successfully! Please check the file in the device download location',
      );
    } catch (err) {
      console.log('Error while downloading file:', err);
    }
  };

  return (
    <>
      {/* Render the button or trigger action */}
      <Entypo
        style={{position: 'absolute', right: 18}}
        name="download"
        size={30}
        color={'black'}
        onPress={() => downloadFile(users)}
      />
    </>
  );
};

export default DownloadUsers;
