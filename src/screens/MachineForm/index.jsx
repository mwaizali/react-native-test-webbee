import React, {useState} from 'react';
import {
  View,
  TextInput,
  Switch,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addNewForm,
  getMachines,
  getMachinesData,
  updateForm,
} from '../../ducks/machineCategories';
import styles from './styles';

const MachineForm = ({route}) => {
  const id = route.params?.id ?? '';
  const machineFormData = useSelector(getMachinesData(id));
  const dispatch = useDispatch();
  console.log(machineFormData);

  const addNewFormPress = () => {
    dispatch(
      addNewForm({
        id: id,
        data: [...machineFormData.attributes],
      }),
    );
  };

  const handleAttributeChange = (index, formId, val) => {
    dispatch(
      updateForm({
        machineId: id,
        index: index,
        formId: formId,
        value: val,
      }),
    );
  };

  const renderItem = ({item, index}) => {
    console.log('item', item);

    return (
      <>
        {item.map((attribute, itemIndex) => (
          <View key={itemIndex} style={styles.attributeContainer}>
            {console.log('attribute:', attribute.name)}
            <Text style={styles.attributeLabel}>{attribute.name}</Text>
            {attribute.type === 'TEXT' || attribute.type === 'NUMBER' ? (
              <TextInput
                style={styles.input}
                value={attribute.value}
                onChangeText={value =>
                  handleAttributeChange(index, attribute.id, value)
                }
              />
            ) : attribute.type === 'CHECKBOX' ? (
              <Switch
                value={attribute.value}
                onValueChange={value =>
                  handleAttributeChange(index, attribute.id, value)
                }
              />
            ) : (
              // For date type, you can use a DatePicker component
              <TouchableOpacity
                onPress={() => console.log('Implement DatePicker here')}>
                <Text style={styles.datePickerText}>
                  {attribute.value ? attribute.value.toString() : 'Select Date'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.addFormButtonView}>
        <Text style={styles.titletext}>{machineFormData.name}</Text>
        <TouchableOpacity
          onPress={addNewFormPress}
          style={styles.addMachineTypeButton}>
          <Text style={styles.addMachineTypeButtonText}>Add New Form</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        <FlatList data={machineFormData?.forms ?? []} renderItem={renderItem} />
      </View>
    </View>
  );
};

export default MachineForm;