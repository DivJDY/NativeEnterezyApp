import React from 'react';
import {View} from 'react-native';
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
  width,
}) => {
  return (
    <View style={{borderRadius: 50, overflow: 'visible'}}>
      <Dropdown
        dropdownOffset={{top: 10}}
        style={[dropdownstyle.dropdown, {width: width}]}
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
    </View>
  );
};

export default DropDownSelection;
