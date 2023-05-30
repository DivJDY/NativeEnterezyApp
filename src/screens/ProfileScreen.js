/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {Avatar, Title, Text, Button} from 'react-native-paper';
import {styles} from '../styles/profileScreen';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <View style={styles.userInfoSection}>
          <Avatar.Image
            source={require('../../assets/profile.jpeg')}
            size={120}
          />
        </View>

        <View style={styles.titleContainer}>
          <Title style={styles.title}>John Doe</Title>
        </View>

        <View style={styles.listContainer}>
          <View style={{flex: 0.5}}>
            <Text style={styles.label}>Phone Number : </Text>
          </View>
          <View style={{flex: 0.5}}>
            <Text style={styles.info}>123-456-7890</Text>
          </View>
        </View>

        <View style={styles.listContainer}>
          <View style={{flex: 0.5}}>
            <Text style={styles.label}>Email :</Text>
          </View>
          <View style={{flex: 0.5}}>
            <Text style={styles.info}>johndoe@example.com</Text>
          </View>
        </View>

        <View style={styles.listContainer}>
          <View style={{flex: 0.5}}>
            <Text style={styles.label}>Location : </Text>
          </View>
          <View style={{flex: 0.5}}>
            <Text style={styles.info}>India</Text>
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Button
            mode="contained"
            buttonColor="blue"
            onPress={() => navigation.navigate('Login')}
            style={styles.btn}>
            <Text style={styles.btnText}>Login</Text>
          </Button>
        </View>
      </View>
    </>
  );
};

export default ProfileScreen;
