import {FlatList, SafeAreaView, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import {ButtonView} from '../../components';
import {useSelector} from 'react-redux';
import {getMachines} from '../../ducks/machineCategories';
import {NavigationService} from '../../utils';

const AppDrawer: React.FC = () => {
  const machinesData = useSelector(getMachines);

  const onPressItem = (item: any) => {
    NavigationService.navigate('MachineForm', {id: item.id});
  };

  const headerView = () => (
    <>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          NavigationService.navigate('Dashboard');
        }}>
        <Text style={[styles.buttonTextStyle]}>{'Dashboard'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          NavigationService.navigate('CreateMachineForm');
        }}>
        <Text style={[styles.buttonTextStyle]}>{'Manage Categories'}</Text>
      </TouchableOpacity>
    </>
  );

  const renderItem = ({item}: {item: any}) => {
    return (
      <TouchableOpacity style={styles.buttonStyle} onPress={() => onPressItem(item)}>
        <Text style={[styles.buttonTextStyle]}>{item.titleAttribute}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        ListHeaderComponent={headerView}
        data={machinesData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default AppDrawer;
