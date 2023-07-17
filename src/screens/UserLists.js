/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Alert} from 'react-native';
import {
  List,
  IconButton,
  Menu,
  Divider,
  Searchbar,
  Provider as PaperProvider,
} from 'react-native-paper';
import {hostName} from '../../App';
import {FetchUtilityOptions} from '../fetchUtility/FetchRequestOption';
import LoadingIndicator from '../components/LoadingIndicator';
import NoDataFound from '../components/NoDataFound';
import {styles} from '../styles/userListsStyle';
import DownloadUsers from '../components/DownloadUsers';

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
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>List of Users</Text>
        <DownloadUsers users={users} />

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
    </PaperProvider>
  );
};

export default UserLists;
