/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Alert, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Button, Card, Text, Menu, IconButton} from 'react-native-paper';
import {show_rental} from '../styles/showRentals';
import {rentalStyle} from './DisplayRental';
import {hostName} from '../../App';
import LoadingIndicator from '../components/LoadingIndicator';

const ShowRentals = () => {
  const [isloading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(null);
  const [data, setData] = useState([]);
  const [page_limit, setPageLimit] = useState(8);
  const [filter, setFilter] = useState(false);
  const [status, setStatus] = useState('');
  // const numberOfComponents = 5;
  // const componentsArray = Array.from({length: numberOfComponents});
  useEffect(() => {
    setIsLoading(true);
    fetchShowRentals();
  }, []);

  const updateRentalStatus = async (shelf_code, value) => {
    setIsLoading(true);
    const updateData = {status: value};

    await fetch(hostName + '/shelfRentals/' + shelf_code, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })
      .then(response => response.json())
      .then(responseData => {
        // console.warn('fetch data ==> ', responseData.shelf_rentals);
        Alert.alert(responseData.message);
        fetchShowRentals();
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.error(error);
      });
  };

  const handleStatusUpdate = (shelf_code, value) => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to update the rental status  ',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {},
        },
        {
          text: 'OK',
          onPress: () => {
            updateRentalStatus(shelf_code, value);
          },
        },
      ],
      {cancelable: true},
    );

    // Close the menu
    handleMenuClose();
  };

  const deleteRentalItem = async shelf_code => {
    Alert.alert(
      '',
      'You want delete this product',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            await deleteRentalById(shelf_code);
          },
        },
      ],
      {cancelable: true},
    );
  };

  const deleteRentalById = async shelf_code => {
    await fetch(hostName + '/shelfRentals/' + shelf_code, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(response => {
        console.log(response.message);
        fetchShowRentals();
      })
      .catch(error => {
        // Handle any network or other errors
        console.error('Error:', error);
      });
  };

  const footerView = () => {
    // console.warn('gggg ', filteredData.length);
    return (
      <View style={{flex: 1}}>
        {data.length === 0 ? (
          <Text
            style={{
              textAlign: 'center',
              marginTop: 20,
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            No Data Found
          </Text>
        ) : isloading ? (
          <LoadingIndicator />
        ) : (
          <TouchableOpacity onPress={handleLoadMore}>
            <Text style={show_rental.loadMoreTxt}>Load more</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  async function fetchShowRentals() {
    setFilter(false);
    setIsLoading(true);
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    };
    await fetch(
      hostName + `/shelfRentals?page_limit=${page_limit}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(responseData => {
        // console.warn('fetch data ==> ', responseData.shelf_rentals);
        setData(responseData.shelf_rentals);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.error(error);
      });
  }

  const handleMenuOpen = shelf_code => {
    setVisible(shelf_code);
  };

  const handleMenuClose = () => {
    setVisible(null);
  };

  const renderItem = ({item}) => {
    return (
      <Card
        style={[
          show_rental.card,
          show_rental.cardBg,
          item.status === 'active'
            ? show_rental.cardActBg
            : show_rental.cardClsBg,
        ]}>
        <Card.Content
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: -10,
          }}>
          <Text variant="bodyLarge" style={show_rental.cardContent}>
            Status - {item?.status}
          </Text>
          <Menu
            visible={visible === item.shelf_code}
            onDismiss={handleMenuClose}
            anchor={
              <IconButton
                icon="pencil"
                // color="#000"
                size={28}
                style={{color: '#000'}}
                onPress={() => handleMenuOpen(item.shelf_code)}
              />
            }>
            <Menu.Item
              onPress={() => handleStatusUpdate(item.shelf_code, 'request')}
              title="request"
            />
            <Menu.Item
              onPress={() => handleStatusUpdate(item.shelf_code, 'active')}
              title="active"
            />
            <Menu.Item
              onPress={() => handleStatusUpdate(item.shelf_code, 'closed')}
              title="closed"
            />
          </Menu>
          <TouchableOpacity onPress={() => deleteRentalItem(item.shelf_code)}>
            <Icon name="delete" size={20} color="black" />
          </TouchableOpacity>
        </Card.Content>
        <Card.Cover
          resizeMode="contain"
          style={{marginLeft: 15, marginVertical: 10, marginRight: 10}}
          source={{
            uri: item?.rental_image,
          }}
        />

        <Card.Content style={show_rental.cardContentcontainer}>
          <Text variant="bodyLarge" style={show_rental.cardContent}>
            Asset Name: {item?.store_asset_name}
          </Text>
          <Text variant="bodyLarge" style={[show_rental.cardContent]}>
            Amount : {item?.cost} Rs
          </Text>
        </Card.Content>
        <Card.Content style={show_rental.cardContentcontainer}>
          <Text variant="bodyLarge" style={show_rental.cardContent}>
            Duration : {item?.period_start.slice(0, 10)} to{' '}
            {item?.period_end.slice(0, 10)}
          </Text>
        </Card.Content>
      </Card>
    );
  };
  const handleLoadMore = () => {
    if (!isloading) {
      setPageLimit(page_limit + 5);
      if (filter) {
        statusFilter(status);
      } else {
        fetchShowRentals();
      }
    }
  };

  const statusFilter = async value => {
    setFilter(true);
    setIsLoading(true);
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    };
    await fetch(
      hostName + `/shelfRentals?status=${value}&page_limit=${page_limit}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(responseData => {
        // console.warn('fetch data ==> ', responseData.shelf_rentals);
        setData(responseData.shelf_rentals);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.error(error);
      });
  };

  return (
    <View style={{flex: 1, marginTop: 10}}>
      <Text style={rentalStyle.rentStoreTxt}>Display Rental</Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginTop: 15,
          marginHorizontal: 10,
          marginBottom: 20,
        }}>
        <Button
          style={[show_rental.btn]}
          onPress={() => {
            setStatus('active');
            statusFilter('active');
          }}>
          <Text style={show_rental.btnTxt}>Active</Text>
        </Button>

        <Button
          style={[show_rental.btn]}
          onPress={() => {
            fetchShowRentals();
          }}>
          <Text style={show_rental.btnTxt}>Clear Filter</Text>
        </Button>

        <Button
          style={[show_rental.btn]}
          onPress={() => {
            setStatus('closed');
            statusFilter('closed');
          }}>
          <Text style={show_rental.btnTxt}>Closed</Text>
        </Button>
      </View>

      {isloading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={renderItem}
          ListFooterComponent={footerView}
          keyExtractor={item => item.shelf_code.toString()}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
};

export default ShowRentals;
