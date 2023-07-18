import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {AddCategories, Dashboard, MachineForm} from '../../screens';
import {AppDrawer} from '../../common';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function DrawerScreens() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateMachineForm"
        component={AddCategories}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MachineForm"
        component={MachineForm}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <AppDrawer {...props} />}
>
      <Drawer.Screen name="Home" component={DrawerScreens} />
    </Drawer.Navigator>
  );
}
