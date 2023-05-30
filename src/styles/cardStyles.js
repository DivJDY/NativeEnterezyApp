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
});

