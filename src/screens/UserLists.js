// import {View} from 'react-native';
// import React, {useState, useEffect} from 'react';
// // import {Text, List, IconButton} from 'react-native-paper';
// import {Text, List, IconButton, Menu, Divider} from 'react-native-paper';

// import {hostName} from '../../App';
// import {FetchUtilityOptions} from '../fetchUtility/FetchRequestOption';

// const UserLists = () => {
//   const [users, setUsers] = useState([]);

//   const fetchUser = async () => {
//     // setLoading(true);
//     await fetch(hostName + '/user', {
//       method: 'GET',
//       FetchUtilityOptions,
//     })
//       .then(response => response.json())
//       .then(response => {
//         console.warn('User response ', response);
//         setUsers(response);
//         // setLoading(false);
//       })
//       .catch(error => console.warn('Error while fetch user ', error));
//   };

//   // Fetch user data from API or use sample data
//   useEffect(() => {
//     fetchUser();
//   }, []);

//   const handleEditRole = userId => {
//     // Implement the logic to handle role update
//     // You can update the user's role in the state or trigger an API call

//     // Example: Updating role in the state
//     // const updatedUsers = users.map(user => {
//     //   if (user.id === userId) {
//     //     // Update the role property for the specific user
//     //     return { ...user, role: 'New Role' };
//     //   }
//     //   return user;
//     // });

//     // // Update the state with the updated user list
//     // setUsers(updatedUsers);

//     console.warn(' idddd ', userId);
//   };
//   //   return (
//   //     <List.Section>
//   //       {users.map(user => (
//   //         <List.Item
//   //           key={user.id}
//   //           title={user.user_name}
//   //           description={`Contact: ${user.user_verified_mobile_number}`}
//   //           right={() => (
//   //             <IconButton icon="pencil" onPress={() => handleEditRole(user.id)} />
//   //           )}
//   //         />
//   //       ))}
//   //     </List.Section>
//   //   );

//   const [visible, setVisible] = useState(null);

//   //   const handleSubmit = async () => {
//   //     const updateData = {role: selectedRole};
//   //     if (selectedItem !== undefined && selectedRole !== undefined) {
//   //       await fetch(hostName + '/user/' + selectedItem, {
//   //         method: 'PUT',
//   //         headers: {
//   //           'Content-Type': 'application/json',
//   //         },
//   //         body: JSON.stringify(updateData),
//   //       })
//   //         .then(response => response.json())
//   //         .then(responseData => {
//   //           // Update the state or perform any necessary actions
//   //           console.warn(responseData.message);
//   //           Alert.alert(responseData.message);
//   //           setSelectedItem('');
//   //           setSelectedRole('');
//   //         })
//   //         .catch(error => {
//   //           console.error('Error updating data:', error);
//   //         });
//   //     } else {
//   //       Alert.alert('Please select the above fields');
//   //     }
//   //   };

//   const openMenu = userId => {
//     setVisible(userId);
//   };

//   const closeMenu = () => {
//     setVisible(null);
//   };

//   const handleRoleUpdate = (userId, newRole) => {
//     // Implement the logic to handle role update
//     // You can update the user's role in the state or trigger an API call

//     // Example: Updating role in the state
//     const updatedUsers = users.map(user => {
//       if (user.id === userId) {
//         // Update the role property for the specific user
//         return {...user, role: newRole};
//       }
//       return user;
//     });

//     // Update the state with the updated user list
//     setUsers(updatedUsers);

//     // Close the menu
//     closeMenu();
//   };

//   return (
//     <List.Section>
//       {users.map(user => (
//         <List.Item
//           key={user.id}
//           title={`Name:  ${user.user_name}`}
//           description={`Contact: ${user.user_verified_mobile_number}`}
//   right={() => (
//     <>
//       {/* <Text marginTop={10}> {user.role}</Text> */}
//       <Menu
//         visible={visible === user.id}
//         onDismiss={closeMenu}
//         anchor={
//           <IconButton icon="pencil" onPress={() => openMenu(user.id)} />
//         }>
//         <Menu.Item
//           onPress={() => handleRoleUpdate(user.id, 'super_admin')}
//           title="super_admin"
//         />
//         <Menu.Item
//           onPress={() => handleRoleUpdate(user.id, 'admin')}
//           title="admin"
//         />
//         <Menu.Item
//           onPress={() => handleRoleUpdate(user.id, 'rental')}
//           title="rental"
//         />
//       </Menu>
//     </>
//   )}
//         />
//       ))}
//     </List.Section>
//   );
// };

// export default UserLists;

import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import {List, IconButton, Menu, Divider, Searchbar} from 'react-native-paper';
import {hostName} from '../../App';
import {FetchUtilityOptions} from '../fetchUtility/FetchRequestOption';
import LoadingIndicator from '../components/LoadingIndicator';
import NoDataFound from '../components/NoDataFound';

// const users = [
//   {id: 1, name: 'John Doe', contact: 'john@example.com', role: 'Admin'},
//   {id: 2, name: 'Jane Smith', contact: 'jane@example.com', role: 'User'},
//   // Add more user objects as needed
// ];

const UserLists = () => {
  const [visible, setVisible] = useState(null);
  const [users, setUsers] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch user data from API or use sample data
  useEffect(() => {
    setLoading(true);
    fetchUser();
  }, []);

  const handleSubmit = async (userId, userRole) => {
    const updateData = {role: userRole};

    await fetch(hostName + '/user/' + userId, {
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
        fetchUser();
      })
      .catch(error => {
        console.error('Error updating data:', error);
      });
  };

  const fetchUser = async () => {
    setLoading(true);
    await fetch(hostName + '/user', {
      method: 'GET',
      FetchUtilityOptions,
    })
      .then(response => response.json())
      .then(response => {
        console.warn('User response ', response);
        setUsers(response);
        setLoading(false);
      })
      .catch(error => console.warn('Error while fetch user ', error));
  };

  const handleMenuOpen = userId => {
    setVisible(userId);
  };

  const handleMenuClose = () => {
    setVisible(null);
  };

  const handleRoleUpdate = (userId, userRole) => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to update the user role  ',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {},
        },
        {
          text: 'OK',
          onPress: () => {
            handleSubmit(userId, userRole);
          },
        },
      ],
      {cancelable: true},
    );

    // Close the menu
    handleMenuClose();
  };

  const handleSearch = query => {
    setLoading(true);
    if (query !== '') {
      setLoading(false);
      setSearchQuery(query);

      const filteredItems = users?.filter(item =>
        item.user_name.toLowerCase().includes(query.toLowerCase()),
      );
      setUsers(filteredItems);
    } else {
      setLoading(true);
      fetchUser();
    }
  };

  const renderUserItem = ({item}) => (
    <>
      <List.Item
        titleStyle={styles.item}
        descriptionStyle={styles.description}
        title={`Name: ${item.user_name}`}
        description={`Contact: +${item.user_verified_mobile_number}`}
        //   right={() => (
        //     <Menu
        //       visible={visible === item.id}
        //       onDismiss={handleMenuClose}
        //       anchor={
        //         <IconButton icon="edit" onPress={() => handleMenuOpen(item.id)} />
        //       }>
        //       <Menu.Item
        //         onPress={() => handleRoleUpdate(item.id, 'Admin')}
        //         title="Admin"
        //       />
        //       <Menu.Item
        //         onPress={() => handleRoleUpdate(item.id, 'User')}
        //         title="User"
        //       />
        //     </Menu>
        //   )}

        right={() => (
          <>
            <Text marginTop={20}> {item.role}</Text>
            <Menu
              visible={visible === item.id}
              onDismiss={handleMenuClose}
              anchor={
                <IconButton
                  icon="pencil"
                  onPress={() => handleMenuOpen(item.id)}
                />
              }>
              <Menu.Item
                onPress={() => handleRoleUpdate(item.id, 'super_admin')}
                title="super_admin"
              />
              <Menu.Item
                onPress={() => handleRoleUpdate(item.id, 'admin')}
                title="admin"
              />
              <Menu.Item
                onPress={() => handleRoleUpdate(item.id, 'rental')}
                title="rental"
              />
            </Menu>
          </>
        )}
      />
      <Divider style={{borderWidth: 1}} />
    </>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of Users</Text>

      <Searchbar
        placeholder="Search"
        onChangeText={handleSearch}
        value={searchQuery}
        style={styles.searchBar}
        theme={{
          colors: {
            primary: 'black', // Change this to the desired color for the cursor
          },
        }}
      />
      {loading && <LoadingIndicator />}

      {users !== [] ? (
        <FlatList
          data={users}
          renderItem={renderUserItem}
          keyExtractor={item => item.id.toString()}
        />
      ) : (
        <NoDataFound message={'User data not found'} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    // paddingTop: 20,
    // paddingHorizontal: 16,
  },
  title: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
  },
  item: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'justify',
  },
  searchBar: {
    marginHorizontal: 8,
    marginTop: 5,
    marginBottom: 14,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#b9bdba',
  },
  description: {
    fontSize: 14,
    color: 'gray',
  },
});

export default UserLists;
