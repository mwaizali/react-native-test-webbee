import {
  StackActions,
  CommonActions,
  DrawerActions,
  TabActions,
  NavigationContainerRef,
  Route,
} from '@react-navigation/native';
import React from 'react';

export const navigationRef = React.createRef<NavigationContainerRef>();

function navigate(routeName: string, params?: object, stackName?: string) {
  if (stackName) {
    navigationRef.current?.navigate(stackName, { screen: routeName, params });
  } else {
    navigationRef.current?.navigate(routeName, params);
  }
}

function replace(routeName: string, params?: object) {
  navigationRef.current?.dispatch(StackActions.replace(routeName, params));
}

function push(routeName: string, params?: object) {
  navigationRef.current?.dispatch(StackActions.push(routeName, params));
}

function pop(number?: number) {
  navigationRef.current?.dispatch(StackActions.pop(number));
}

function popToTop() {
  navigationRef.current?.dispatch(StackActions.popToTop());
}

function getNavigator(): NavigationContainerRef | null {
  return navigationRef.current;
}

function reset(name: string, params?: object) {
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{ name, params }],
  });
  navigationRef.current?.dispatch(resetAction);
}

function jumpTo(routeName: string, params?: object) {
  navigationRef.current?.dispatch(TabActions.jumpTo(routeName, params));
}

function getCurrentRoute(): Route<string> | undefined {
  return navigationRef.current?.getCurrentRoute();
}

function getCurrentRouteName(): string | undefined {
  return navigationRef.current?.getCurrentRoute()?.name;
}

function goBack() {
  navigationRef.current?.dispatch(CommonActions.goBack());
}

function closeDrawer() {
  navigationRef.current?.dispatch(DrawerActions.closeDrawer());
}

function hideHeader(navigation: { setOptions: (options: object) => void }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
}

function setTitle(
  navigation: { setOptions: (options: object) => void },
  title: string,
  dependency: any[] = []
) {
  React.useEffect(() => {
    navigation.setOptions({ title });
  }, dependency);
}

export default {
  navigationRef,
  replace,
  push,
  pop,
  jumpTo,
  getCurrentRoute,
  getNavigator,
  navigate,
  reset,
  popToTop,
  goBack,
  closeDrawer,
  hideHeader,
  setTitle,
  getCurrentRouteName,
};
