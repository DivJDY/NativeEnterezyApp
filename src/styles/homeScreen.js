import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  searchBar: {
    marginTop: 5,
    marginBottom: 14,
    height: 50,
    borderRadius: 10,
    // backgroundColor: '#b9bdba',
  },
  loadMoreTxt: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    // fontFamily: 'RobotoCondensed-Regular',
    marginVertical: 10,
  },
  loadMoreTxtdis: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 10,
    color: 'gray',
  },
  btnStyle: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 20,
  },
});
