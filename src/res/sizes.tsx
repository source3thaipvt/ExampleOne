import { Dimensions, Platform, StatusBar } from 'react-native';


const sizes = new (class {
    _screen_width = Dimensions.get('window').width;
    _screen_height = Dimensions.get('window').height;
})

export { sizes }