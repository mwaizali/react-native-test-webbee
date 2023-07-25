import React, {useRef} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {FormItem} from '../../common';
import {getMachines, updateForm} from '../../ducks/machineCategories';
import {DatePickerModal} from '../../modal';
import {NavigationService} from '../../utils';
import styles from './styles';

const Dashboard = () => {
  const machinesData = useSelector(getMachines);
  const datePickerModalRef = useRef();
  const dispatch = useDispatch();

  const updateFormRequest = payload => {
    dispatch(updateForm(payload));
  };

  const renderItem = ({item, index}) => {
    const handleAttributeChange = (index, formId, val, isDate) => {
      if (isDate) {
        datePickerModalRef.current.show({
          onSelected: date => {
            updateFormRequest({
              machineId: item.id,
              index: index,
              formId: formId,
              value: date,
            });
          },
        });
      } else {
        updateFormRequest({
          machineId: item.id,
          index: index,
          formId: formId,
          value: val,
        });
      }
    };
    return (
      <View>
        <Text style={styles.machineTypeTitle}>
          {item?.titleAttribute ?? ''}
        </Text>
        {item.forms.map((val, itemIndex) => (
          <FlatList
            data={val ?? []}
            renderItem={({item: itemT, index: itemIndex}) => {
              return (
                <FormItem
                  formData={itemT}
                  machineIndex={index}
                  itemIndex={itemIndex}
                  handleAttributeChange={handleAttributeChange}
                />
              );
            }}
            contentContainerStyle={{marginTop: 10}}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {machinesData?.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={{}}>No Categories Found</Text>
          <View style={styles.addMachineTypeButtonContainer}>
            <TouchableOpacity
              onPress={() => NavigationService.navigate('CreateMachineForm')}
              style={styles.addMachineTypeButton}>
              <Text style={styles.addMachineTypeButtonText}>
                Add New Categories
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            data={machinesData ?? []}
            renderItem={renderItem}
            contentContainerStyle={{marginTop: 10}}
            ItemSeparatorComponent={() => (
              <View style={{width: 1, backgroundColor: '#ccc'}} />
            )}
          />
        </View>
      )}
      <DatePickerModal ref={datePickerModalRef} />
    </View>
  );
};

export default Dashboard;
