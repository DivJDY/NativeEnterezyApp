import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateRangePicker = ({
  startDate,
  endDate,
  handleStartDateChange,
  handleEndDateChange,
  showStartDatePicker,
  showEndDatePicker,
  showStartDatePickerModal,
  showEndDatePickerModal,
}) => {
  //   const [startDate, setStartDate] = useState(null);
  //   const [endDate, setEndDate] = useState(null);
  //   const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  //   const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleStartDate = (event, selectedDate) => {
    handleStartDateChange(event, selectedDate);
  };

  const handleEndDate = (event, selectedDate) => {
    handleEndDateChange(event, selectedDate);
  };

  const formatDate = date => {
    return date ? date.toLocaleDateString('en-GB') : ''; // Format date as "dd/mm/yyyy"
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={showStartDatePickerModal}
        style={styles.button}>
        <Text style={styles.label}>
          {startDate ? `${formatDate(startDate)}` : 'Select Start Date *'}
        </Text>
      </TouchableOpacity>

      {showStartDatePicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display="default"
          onChange={handleStartDate}
        />
      )}

      <TouchableOpacity onPress={showEndDatePickerModal} style={styles.button}>
        <Text style={styles.label}>
          {endDate ? `${formatDate(endDate)}` : 'Select End Date *'}
        </Text>
      </TouchableOpacity>

      {showEndDatePicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display="default"
          onChange={handleEndDate}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginLeft: -10,
  },
  button: {
    backgroundColor: '#fff',
    width: '40%',
    borderColor: '#000',
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    height: 50,
  },
  label: {
    fontSize: 16,
    color: '#000',
  },
});

export default DateRangePicker;
