// import component
import React  from 'react';
import {View} from 'react-native';
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
     <View style={{flex: 1}}>
       <MultiSelect
         hideTags
         items={options}
         uniqueKey="id"
         ref={component => {
           multiSelect = component;
         }}
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
       {/* <View>selectedItems)}</View> */}
     </View>
   );
 };



export default Selection;
