import {CommonActions} from '@react-navigation/native';

let navigator: any;
let activeScreen: string;
let parentOfActiveScreen: string;

function setTopLevelNavigator(ref: any) {
  navigator = ref;
}

function navigate(routeName: any, params?: any) {
  console.log('NAVIGATION SERVICE: ' + navigator);

  navigator.dispatch(
    CommonActions.navigate({
      name: routeName,
      params: params,
    }),
  );
}
function push(routeName: any, params?: any) {
  console.log('NAVIGATION SERVICE: ' + navigator);
  navigator.dispatch(
    CommonActions.navigate({
      name: routeName,
      params: params,
    }),
  );
}

function reset(routeName: string, params?: object, action?: any) {
  navigator.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: routeName, params}],
    }),
  );
}

function pop() {
  navigator.dispatch(CommonActions.goBack());
}

function setActiveScreen(screen: string) {
  activeScreen = screen;
}

function getActiveScreen() {
  return activeScreen;
}

function getParentOfActiveScreen() {
  return parentOfActiveScreen;
}

function setParentOfActiveScreen(screen: string) {
  parentOfActiveScreen = screen;
}

function getNavigator() {
  return navigator;
}
export default {
  navigator,
  navigate,
  setTopLevelNavigator,
  pop,
  reset,
  push,
  setActiveScreen,
  getActiveScreen,
  getParentOfActiveScreen,
  setParentOfActiveScreen,
  getNavigator,
};
