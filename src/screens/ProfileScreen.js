/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Avatar, Title, Text, Button} from 'react-native-paper';
import {styles} from '../styles/profileScreen';
import {hostName} from '../../App';
import {FetchUtilityOptions} from '../fetchUtility/FetchRequestOption';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingIndicator from '../components/LoadingIndicator';
import NoDataFound from '../components/NoDataFound';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUser = async id => {
    setLoading(true);
    await fetch(hostName + '/user/' + id, {
      method: 'GET',
      FetchUtilityOptions,
    })
      .then(response => response.json())
      .then(response => {
        console.warn('User response ', response);
        setData(response);
        setLoading(false);
      })
      .catch(error => console.warn('Error while fetch user ', error));
  };

  // console.warn(' User Id ', userId);

  const getUserId = async () => {
    await AsyncStorage.getItem('userId')
      .then(id => {
        if (id !== null) {
          // Value found in AsyncStorage
          console.log(id);
          setUserId(id);
          fetchUser(id);
        } else {
          // Value not found in AsyncStorage
          console.log('No value found for key "userId"');
        }
      })
      .catch(error => {
        // Handle any errors that occur during AsyncStorage retrieval
        console.log('Error retrieving value:', error);
      });
  };

  useEffect(() => {
    setLoading(true);
    getUserId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.warn(' ---- > ', data?.user_name.charAt(0).toUpperCase());
  return (
    <>
      {loading ? (
        <View style={{marginTop: '10%'}}>
          <LoadingIndicator />
        </View>
      ) : Object.keys(data).length !== 0 ? (
        <View style={styles.container}>
          <View style={styles.userInfoSection}>
            <Avatar.Text
              size={100}
              label={data?.user_name?.charAt(0).toUpperCase()}
            />
          </View>

          <View style={styles.titleContainer}>
            <Title style={styles.title}>{data?.user_name}</Title>
          </View>

          <View style={styles.listContainer}>
            <View style={{flex: 0.5}}>
              <Text style={styles.label}>Phone Number : </Text>
            </View>
            <View style={{flex: 0.5}}>
              <Text style={styles.info}>
                +{data?.user_verified_mobile_number}
              </Text>
            </View>
          </View>

          {/* <View style={styles.listContainer}>
            <View style={{flex: 0.5}}>
              <Text style={styles.label}>Email :</Text>
            </View>
            <View style={{flex: 0.5}}>
              <Text style={styles.info}>{data?.user_email}</Text>
            </View>
          </View> */}

          <View style={styles.listContainer}>
            <View style={{flex: 0.5}}>
              <Text style={styles.label}>Location : </Text>
            </View>
            <View style={{flex: 0.5}}>
              <Text style={styles.info}>India</Text>
            </View>
          </View>
        </View>
      ) : (
        <NoDataFound message="Profile data not found please do login" />
      )}
      <View style={[styles.titleContainer, {marginBottom: '10%'}]}>
        <Button
          mode="contained"
          buttonColor="blue"
          onPress={() => navigation.navigate('ProfileLogIn')}
          style={styles.btn}>
          <Text style={styles.btnText}>Login</Text>
        </Button>
      </View>
    </>
  );
};

export default ProfileScreen;
