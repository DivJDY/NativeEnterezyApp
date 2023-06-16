/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {View, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import MultiSelect from 'react-native-multiple-select';

const Selection = ({
  title,
  placeholder,
  ref,
  options,
  displayKey,
  single,
  selectedItem,
  onChangeText,
}) => {
  // console.warn('shelf rack selected value => ', selectedItem[0]);
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={{flex: 1, width: 320}}>
        <MultiSelect
          hideTags
          items={options}
          uniqueKey="id"
          ref={ref}
          onSelectedItemsChange={onChangeText}
          selectedItems={selectedItem}
          selectText={title}
          searchInputPlaceholderText={placeholder}
          onChangeInput={text => console.warn('gggg' + text)}
          altFontFamily="ProximaNova-Light"
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#FECE00"
          selectedItemIconColor="#FECE00"
          itemTextColor="black"
          displayKey={displayKey}
          searchInputStyle={{color: 'black'}}
          submitButtonColor="black"
          submitButtonText="Submit"
          hideDropdown={true}
          single={single}
        />
      </View>
    </ScrollView>
  );
};

export default Selection;
