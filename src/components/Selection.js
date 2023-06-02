/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import MultiSelect from 'react-native-multiple-select';

const Selection = ({
  title,
  placeholder,
  options,
  displayKey,
  single,
  selectedItem,
  onChangeText,
}) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={{flex: 1, width: 300}}>
        <MultiSelect
          hideTags
          items={options}
          uniqueKey="id"
          onSelectedItemsChange={onChangeText}
          selectedItems={selectedItem}
          selectText={title}
          searchInputPlaceholderText={placeholder}
          onChangeInput={text => console.warn('gggg' + text)}
          altFontFamily="ProximaNova-Light"
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="blue"
          selectedItemIconColor="blue"
          itemTextColor="black"
          displayKey={displayKey}
          searchInputStyle={{color: 'black'}}
          submitButtonColor="blue"
          submitButtonText="Submit"
          hideDropdown={true}
          single={single}
        />
      </View>
    </ScrollView>
  );
};

export default Selection;
