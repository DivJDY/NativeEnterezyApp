import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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
  error: {
    paddingLeft: 12,
    marginBottom: 20,
    color: '#FECE00',
    fontWeight: 'bold',
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
});
