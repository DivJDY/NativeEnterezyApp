/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
export const startup_styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    height: 290,
    width: '100%',
    backgroundColor: '#FECE00',
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0, // Set other border radii to 0
    borderBottomRightRadius: 90, // Adjust the value to change the curve radius
    overflow: 'hidden', // Make sure content is clipped to the rounded border
    paddingBottom: 40,
  },
  image: {
    justifyContent: 'center',
    alignContent: 'center',
    marginLeft: '30%',
    marginTop: 0,
    marginBottom: 10,
    width: 110,
    height: 150,
    paddingBottom: 0,
  },
  title: {
    textAlign: 'center',
    paddingTop: 12,
    paddingBottom: 5,
    color: 'black',
    fontSize: 40,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 28,
    textAlign: 'center',
    paddingTop: 15,
    marginBottom: 10,
  },
  card_body: {
    backgroundColor: '#000000',
    marginTop: 25,
    margin: 10,
    borderRadius: 20,
    paddingTop: 5,
    paddingBottom: 0,
  },
  body: {
    color: 'white',
    textAlign: 'center',
  },
  btn_view: {
    flex: 1,
    marginTop: '25%',
    alignContent: 'center',
    alignItems: 'center',
  },

  btn: {
    // backgroundColor: '#FECE00',
    borderRadius: 25,
    paddingVertical: 4,
  },

  btnTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },

  // Gmap screen styles
  gmaptitle: {
    marginTop: 20,
    marginBottom: 8,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  mapCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    elevation: 5,
  },
  map: {
    height: 150,
    borderRadius: 10,
  },

  // ThanksSignup screen styles
  thanksTitle: {
    marginTop: '25%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  thanksSubtitle: {
    marginHorizontal: 20,
    fontSize: 18,
    marginTop: '8%',
    textAlign: 'center',
    lineHeight: 25,
    fontStyle: 'italic',
  },
});
