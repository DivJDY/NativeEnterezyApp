import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  tabBarLabel: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
  headerLeft: {
    marginLeft: 15,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  headerRight: {
    marginRight: 15,
  },
  // drawer content
  drawerLabel: {
    fontSize: 14,
  },
  drawerLabelFocused: {
    fontSize: 14,
    color: '#551E18',
    fontWeight: '500',
  },
  // drawerItem: {
  //   height: 50,
  //   justifyContent: 'center',
  // },
  drawerItemFocused: {
    backgroundColor: '#ba9490',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  drawerItem: {
    padding: 10,
  },
  drawerItemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
