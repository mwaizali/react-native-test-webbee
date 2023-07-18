/** @format */

import React, {useImperativeHandle, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {ButtonView} from '../../components';
import styles from './styles';
const Item = ({item, onPress, disabled = false, isSelected = false}) => {
  return (
    <TouchableOpacity
      style={[styles.itemContainer]}
      onPress={() => onPress && onPress(item)}
      disabled={disabled}
      disabledOpacity={1}>
      {item?.image ? (
        <Image source={item.image} style={styles.imageStyle} />
      ) : (
        <></>
      )}
      <Text style={[styles.textStyle, isSelected && styles.selectedTextStyle]}>
        {item?.text ?? ''}
      </Text>
    </TouchableOpacity>
  );
};

const DropDown = (props, forwardedRef) => {
  const [data, setData] = useState({
    data: [],
    isVisible: false,
    title: undefined,
    buttonDisabled: false,
    isReset: false,
    isSelected: '',
    onResetPress: () => {},
    onPress: () => {},
  });

  // hide modal function
  const hideModal = () => {
    setData({...data, isVisible: false});
  };

  // show and hide functions for ref
  useImperativeHandle(forwardedRef, () => ({
    show: (options = data) => {
      setData({...options, isVisible: true});
    },
    hide: hideModal,
  }));

  return (
    <Modal
      backdropTransitionOutTiming={0}
      onBackdropPress={hideModal}
      style={styles.modal}
      isVisible={data.isVisible}>
      <View style={styles.mainContainer}>
        {data.title ? (
          <View style={styles.cancelWithTitleView}>
            <TouchableOpacity onPress={hideModal}>
              <Text style={styles.cancelTitleText}>{'Cancel'}</Text>
            </TouchableOpacity>
            <Text
              style={[styles.titleText, !data.isReset && {marginRight: 40}]}>
              {data.title}
            </Text>
            {data.isReset && (
              <TouchableOpacity
                onPress={() => {
                  hideModal();
                  data?.onResetPress();
                }}>
                <Text style={styles.resetTitleText}>{'Reset'}</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <TouchableOpacity onPress={hideModal}>
            <Text style={styles.cancelText}>{'Cancel'}</Text>
          </TouchableOpacity>
        )}

        <ScrollView>
          {data.data?.map(item => (
            <React.Fragment key={item.identifier}>
              <Item
                item={item}
                onPress={item => {
                  hideModal();
                  setTimeout(() => {
                    data.onPress && data.onPress(item);
                  }, 300);
                }}
                disabled={data.buttonDisabled}
                isSelected={data?.isSelected === item?.identifier}
              />
            </React.Fragment>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default React.forwardRef(DropDown);
