/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  mapCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    elevation: 5,
  },
  map: {
    height: 350,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  formContainer: {
    marginLeft: '8%',
    marginTop: 30,
  },
  input: {
    width: '90%',
    marginBottom: 10,
  },

  subInp: {
    width: '100%',
    marginBottom: 10,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
  },

  btnStyle: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 20,
  },
  submitBtn: {
    backgroundColor: 'black',
    marginTop: 10,
    padding: 3,
  },
  subBtnTxt: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // map file textinput styles
  pwTxtInp: {
    marginVertical: 20,
    marginHorizontal: 10,
    backgroundColor: '#FECE00',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // HelperText error
  error: {
    fontSize: 18,
    marginTop: 4,
    fontWeight: 'bold',
  },
});
