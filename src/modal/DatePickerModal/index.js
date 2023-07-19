import DateTimePickerModal from 'react-native-modal-datetime-picker';
import React, {useImperativeHandle, useState} from 'react';

import {DATE_PICKER_TYPE} from '../../config/Constants';
import moment from 'moment';
import {Platform} from 'react-native';

const DatePickerModal = (props, forwardedRef) => {
  //set default state
  const [modalInfo, setInfo] = useState({
    mode: 'date',
    onSelected: undefined,
    isVisiable: false,
    format: '',
    date: '',
    extraProps: {},
    displayMode: 'inline',
  });

  // hide modal function
  const hideDatePicker = () => {
    setInfo({...modalInfo, isVisiable: false});
  };

  // show and hide functions for ref
  useImperativeHandle(forwardedRef, () => ({
    show: data => {
      const {extraProps, ...rest} = modalInfo;
      setInfo({...rest, ...data, isVisiable: true});
    },
  }));

  // handle date select click
  const handleConfirm = date => {
    // hide datepicker
    hideDatePicker();
    // check onSelected
    if (modalInfo.onSelected) {
      //  format date and call onSelected
      modalInfo.onSelected(date, moment(date).valueOf());
    }
  };

  // set selected date when popup open
  // const currentDate = Util.stringToDateObject(
  //   modalInfo.date,
  //   AppUtil.getDateFormat(modalInfo.mode),
  // );

  const currentDate = modalInfo.date ? new Date(modalInfo.date) : new Date();

  // main render
  return (
    <DateTimePickerModal
      isVisible={modalInfo.isVisiable}
      mode={modalInfo.mode}
      onConfirm={handleConfirm}
      onCancel={hideDatePicker}
      date={currentDate}
      // display="spinner"
      display={Platform.OS === 'android' ? 'default' : modalInfo.displayMode}
      {...modalInfo.extraProps}
    />
  );
};
export default React.forwardRef(DatePickerModal);
