import React from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {dropdownstyle} from '../styles/dropdownStyles';

const DropDownSelection = ({
  labelField,
  valueField,
  data,
  selectedValue,
  onChange,
  placeholder,
  searchPlaceholder,
  renderItem,
}) => {
  return (
    <Dropdown
      style={dropdownstyle.dropdown}
      placeholderStyle={dropdownstyle.placeholderStyle}
      selectedTextStyle={dropdownstyle.selectedTextStyle}
      inputSearchStyle={dropdownstyle.inputSearchStyle}
      iconStyle={dropdownstyle.iconStyle}
      data={data}
      search
      maxHeight={300}
      labelField={labelField}
      valueField={valueField}
      placeholder={placeholder}
      searchPlaceholder={searchPlaceholder}
      value={selectedValue}
      onChange={onChange}
      //   renderLeftIcon={() => (
      //     <AntDesign
      //       style={dropdownstyle.icon}
      //       color="black"
      //       name="Safety"
      //       size={20}
      //     />
      //   )}
      renderItem={renderItem}
    />
  );
};

export default DropDownSelection;
