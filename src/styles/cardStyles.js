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
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: 500,
  },
  cardPara: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'justify',
    marginBottom: 2,
  },

  line: {
    marginTop: 8,
    borderBottomColor: 'black',
    borderBottomWidth: 1.5,
    width: '100%',
  },
  submitbtn: {
    borderRadius: 12,
    marginHorizontal: '10%',
    // backgroundColor: 'yellow',
    color: 'black',
  },
  dialog: {
    position: 'absolute',
    // width:'90%',
    bottom: 25,
    margin: 0,
  },

  // checkboxContainer: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // checkboxWrapper: {
  //   width: 24,
  //   height: 24,
  //   borderRadius: 12,
  //   borderWidth: 2,
  //   borderColor: 'black',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});
