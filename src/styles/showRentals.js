import {StyleSheet} from 'react-native';

export const show_rental = StyleSheet.create({
  btn: {
    backgroundColor: '#000',
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  btnTxt: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 5,
    marginHorizontal: 10,
    paddingLeft: 10,
    paddingRight: 8,
  },
  cardBg: {
    borderWidth: 3,
    marginBottom: '6%',
  },
  cardActBg: {
    backgroundColor: '#BBB6B5',
  },
  cardClsBg: {
    backgroundColor: '#fff',
  },
  cardContent: {
    fontSize: 16,
    color: '#000',
    padding: 3,
    fontWeight: 'bold',
  },
  cardContentcontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardActionBtn: {
    backgroundColor: '#FECE00',
    borderRadius: 0,
    borderWidth: 1,
    borderColor: '#000',
    marginVertical: 10,
    marginHorizontal: 2,
  },
  loadMoreTxt: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 15,
    color: '#000',
  },
});
