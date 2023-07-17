/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

export const dropdownstyle = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 55,
    width: '86%',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 4,
    padding: 12,
    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    color: 'black',
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    color: 'black',
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    color: 'black',
    fontSize: 16,
  },
  selectedTextStyle: {
    color: 'black',
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    color: 'black',
    height: 40,
    fontSize: 16,
    borderColor: 'black',
  },

  //   User role update screen title
  header: {
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
