/* eslint-disable react-native/no-inline-styles */
// import React, {useState} from 'react';
// import {View, Button} from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';

// const UserRoleUpdateScreen = () => {
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState([]);
//   const [items, setItems] = useState([
//     {label: 'Spain', value: 'spain'},
//     {label: 'Madrid', value: 'madrid'},
//     {label: 'Barcelona', value: 'barcelona'},

//     {label: 'Italy', value: 'italy'},
//     {label: 'Rome', value: 'rome'},

//     {label: 'Finland', value: 'finland'},
//     {label: 'Spain', value: 'spain'},
//     {label: 'Madrid', value: 'madrid'},
//     {label: 'Barcelona', value: 'barcelona'},

//     {label: 'Italy', value: 'italy'},
//     {label: 'Rome', value: 'rome'},

//     {label: 'Finland', value: 'finland'},
//   ]);

//   return (
//     <View
//       style={{
//         // backgroundColor: '#171717',
//         flex: 1,
//         // alignItems: 'center',
//         // justifyContent: 'center',
//         paddingHorizontal: 15,
//       }}>
//       <DropDownPicker
//         open={open}
//         value={value}
//         items={items}
//         setOpen={setOpen}
//         setValue={setValue}
//         setItems={setItems}
//         // theme="DARK"
//         multiple={true}
//         mode="BADGE"
//         // badgeDotColors={[
//         //   '#e76f51',
//         //   '#00b4d8',
//         //   '#e9c46a',
//         //   '#e76f51',
//         //   '#8ac926',
//         //   '#00b4d8',
//         //   '#e9c46a',
//         // ]}
//       />
//     </View>
//   );
// };

// export default UserRoleUpdateScreen;

import React, {useEffect, useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {Button} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {hostName} from '../../App';
import {FetchUtilityOptions} from '../fetchUtility/FetchRequestOption';
import LoadingIndicator from '../components/LoadingIndicator';
import DropDownSelection from '../components/DropDownSelection';
import {dropdownstyle} from '../styles/dropdownStyles';

const UserRoleUpdateScreen = () => {
  const [data, setData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const roles = [{role: 'super_admin'}, {role: 'admin'}, {role: 'rental'}];

  const [selectedRole, setSelectedRole] = useState();

  const options = FetchUtilityOptions();

  const fetchUserList = async () => {
    setLoading(true);
    await fetch(hostName + '/user', {options, method: 'GET'})
      .then(res => res.json())
      .then(response => {
        console.warn('user ', response);
        setData(response);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  const renderItem = item => {
    return (
      <View style={dropdownstyle.item}>
        <Text style={dropdownstyle.textItem}>{item.user_name}</Text>
        {item.id === selectedItem && (
          <AntDesign
            style={dropdownstyle.icon}
            color="black"
            name="check"
            size={20}
          />
        )}
      </View>
    );
  };

  const renderRoleItem = item => {
    return (
      <View style={dropdownstyle.item}>
        <Text style={dropdownstyle.textItem}>{item.role}</Text>
        {item._index === selectedRole._index && (
          <AntDesign
            style={dropdownstyle.icon}
            color="black"
            name="check"
            size={20}
          />
        )}
      </View>
    );
  };

  const handleSubmit = async () => {
    const updateData = {role: selectedRole};
    if (selectedItem !== undefined && selectedRole !== undefined) {
      await fetch(hostName + '/user/' + selectedItem, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      })
        .then(response => response.json())
        .then(responseData => {
          // Update the state or perform any necessary actions
          console.warn(responseData.message);
          Alert.alert(responseData.message);
          setSelectedItem('');
          setSelectedRole('');
        })
        .catch(error => {
          console.error('Error updating data:', error);
        });
    } else {
      Alert.alert('Please select the above fields');
    }
  };

  useEffect(() => {
    fetchUserList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = item => {
    setSelectedRole(item.role);
  };

  const handleChangeItem = item => {
    setSelectedItem(item.id);
  };

  return (
    <View style={{marginLeft: 10}}>
      <Text style={dropdownstyle.header}>Update the user role</Text>
      {loading && <LoadingIndicator />}
      <Text
        style={{marginLeft: 20, marginTop: 20, color: 'black', fontSize: 16}}>
        Please select the user
      </Text>
      {data && (
        <DropDownSelection
          data={data}
          selectedValue={selectedItem}
          onChange={handleChangeItem}
          renderItem={renderItem}
          labelField={'user_name'}
          valueField={'id'}
          placeholder={'Select user *'}
          searchPlaceholder={'Search user...'}
        />
      )}

      <Text
        style={{marginLeft: 20, marginTop: 10, color: 'black', fontSize: 16}}>
        Please select the role
      </Text>
      {roles && (
        <DropDownSelection
          data={roles}
          selectedValue={selectedRole}
          onChange={handleChange}
          renderItem={renderRoleItem}
          labelField={'role'}
          valueField={'role'}
          placeholder={'Select role *'}
          searchPlaceholder={'Search role...'}
        />
      )}

      <Button
        style={{marginTop: 20, marginLeft: 15, marginRight: 30}}
        mode="contained"
        onPress={handleSubmit}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}> Update Role</Text>
      </Button>
    </View>
  );
};

export default UserRoleUpdateScreen;
