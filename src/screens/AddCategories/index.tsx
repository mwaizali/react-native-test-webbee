import { Picker } from '@react-native-picker/picker';
import React, { useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDrawer } from '../../common';
import { options } from '../../data';
import {
  addMachineAttribute,
  addMachineCategory,
  getMachines,
  removeMachineAttribute,
  removeMachineCategory,
  updateMachineAttribute,
  updateMachineCategory,
} from '../../ducks/machineCategories';
import { DropDown, DropDownRefProps } from '../../modal';
import { Util } from '../../utils';
import styles from './styles';

interface Attribute {
  id: string;
  name: string;
  type: string; // Adjust the type to a string to accommodate other attribute types
  value: string;
}

interface MachineType {
  id: string;
  name: string;
  titleAttribute: string;
  attributes: Attribute[];
  forms: any[]; // You may want to specify a type for "forms" if possible
}

const AddCategories: React.FC = () => {
  const dropDownModal = useRef<DropDownRefProps>(null);
  const dispatch = useDispatch();

  const machinesData = useSelector(getMachines);

  const addMachineType = (name: string) => {
    dispatch(
      addMachineCategory({
        id: Util.makeRandomString(),
        name,
        titleAttribute: '',
        attributes: [],
        forms: [],
      }),
    );
  };

  const removeMachineType = (id: string) => {
    dispatch(removeMachineCategory(id));
  };

  const updateMachineTitle = (id: string, machineName: string) => {
    dispatch(
      updateMachineCategory({
        id: id,
        machineName: machineName,
      }),
    );
  };

  const addFieldToMachineType = (machineTypeId: string, attribute: Attribute) => {
    dispatch(
      addMachineAttribute({
        id: machineTypeId,
        attribute: [attribute],
      }),
    );
  };

  const removeFieldFromMachineType = (machineTypeId: string, attribute: Attribute) => {
    dispatch(
      removeMachineAttribute({
        id: machineTypeId,
        attribute: attribute,
      }),
    );
  };

  const updateAttributeName = (machineTypeId: string, attribute: Attribute, text: string) => {
    const newData = { ...attribute };
    newData.name = text;
    console.log(newData);
    dispatch(
      updateMachineAttribute({
        id: machineTypeId,
        attribute: newData,
      }),
    );
  };

  const updateAttributeType = (machineTypeId: string, attribute: Attribute, newType: string) => {
    const newData = { ...attribute };
    newData.type = newType;
    console.log(newData);
    dispatch(
      updateMachineAttribute({
        id: machineTypeId,
        attribute: newData,
      }),
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <FlatList
          data={machinesData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.machineTypeContainer}>
              <Text style={styles.machineTypeTitle}>{item.name}</Text>
              <View style={styles.formCreator}>
                <View style={styles.formInput}>
                  <TextInput
                    placeholder="Field Title"
                    value={item.titleAttribute}
                    onChangeText={(text) => updateMachineTitle(item.id, text)}
                    style={styles.input}
                  />
                </View>
                <View>
                  <Text style={styles.label}>Attributes:</Text>
                  {item.attributes.map((attribute, index) => (
                    <View key={index} style={styles.formField}>
                      <TextInput
                        placeholder="Attribute Name"
                        value={attribute.name}
                        onChangeText={(text) => updateAttributeName(item.id, attribute, text)}
                        style={styles.attributeNameInput}
                      />
                      <TouchableOpacity
                        style={styles.attributeTypePicker}
                        onPress={() => {
                          dropDownModal.current?.show({
                            data: options.attributeOptions,
                            onPress: (type) => {
                              updateAttributeType(item.id, attribute, type.identifier);
                            },
                          });
                        }}>
                        <Text>{attribute.type}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => removeFieldFromMachineType(item.id, attribute)}
                        style={styles.removeButton}>
                        <Text style={styles.removeButtonText}>Remove</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                  <View style={styles.addFieldButtonContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        dropDownModal.current?.show({
                          data: options.attributeOptions,
                          onPress: (type) => {
                            addFieldToMachineType(item.id, {
                              id: Util.makeRandomString(10),
                              name: '',
                              type: type.identifier,
                              value: '',
                            });
                          },
                        });
                      }}
                      style={styles.addFieldButton}>
                      <Text style={styles.addButtonText}>Add Attribute</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => removeMachineType(item.id)}
                style={styles.removeMachineTypeButton}>
                <Text style={styles.removeMachineTypeButtonText}>Remove Machine Type</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <View style={styles.addMachineTypeButtonContainer}>
          <TouchableOpacity
            onPress={() => addMachineType('New Machine Type')}
            style={styles.addMachineTypeButton}>
            <Text style={styles.addMachineTypeButtonText}>Add Machine Type</Text>
          </TouchableOpacity>
        </View>
        <DropDown ref={dropDownModal} />
        <AppDrawer />
      </View>
    </ScrollView>
  );
};

export default AddCategories;
