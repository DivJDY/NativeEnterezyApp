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
    marginBottom: 15,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    paddingLeft: 12,
    marginBottom: 10,
    color: '#FECE00',
    fontWeight: 'bold',
  },
  btnStyle: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 20,
  },
});
