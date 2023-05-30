import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',s
    backgroundColor: '#fff',
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
    color: 'red',
  },
});
