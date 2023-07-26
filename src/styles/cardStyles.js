/* eslint-disable prettier/prettier */
const {StyleSheet} = require('react-native');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardCover: {
    padding: 20,
    backgroundColor: '#fff',
    height: 300,
  },
  cardContainer: {
    margin: 5,
    width: '50%',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    // height: '100',
  },
  cardTextContainer: {
    marginTop: 8,
  },
  cardTitle: {
    fontFamily: 'Times New Roman',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontFamily: 'Times New Roman',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardPara: {
    fontFamily: 'Times New Roman',
    marginTop: 5,
    fontSize: 14,
    textAlign: 'justify',
    marginBottom: 2,
  },

  line: {
    marginTop: 8,
    borderBottomColor: '#000',
    borderBottomWidth: 1.5,
    width: '100%',
  },
  submitbtn: {
    // marginHorizontal: '10%',
    borderColor: '#000',
  },
  dialog: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0,
    margin: 0,
  },
  imageContainer: {
    overflow: 'hidden',
  },
  imageLoadError: {
    fontFamily: 'Times New Roman',
    textAlign: 'center',
    color: '#FECE00',
    fontWeight: 'bold',
    fontSize: 12,
  },
  btnStyle: {
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 20,
  },
});
