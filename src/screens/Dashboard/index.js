import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {getMachines} from '../../ducks/machineCategories';
import {NavigationService} from '../../utils';
import styles from './styles';

const Dashboard = () => {
  const machinesData = useSelector(getMachines);

  return (
    <View style={styles.container}>
      {machinesData.length === 0 && (
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
      )}
    </View>
  );
};

export default Dashboard;
