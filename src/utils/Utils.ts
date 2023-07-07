// import Toast from 'react-native-simple-toast';

// export const showToast = (message: string, duration?: number) => {
//     Toast.show(message, duration ?? 1000)
// }

export enum TypeRegEx {
    EMAIL = '/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i',
    ONLY_NUMBER = '/^[0-9]\d*$/',
    PHONE_NUMBER = '/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/'
}

export const isCheckEmail = (value: string= 'dsad@gmai.com') => {
    return value.match(TypeRegEx.EMAIL)
}

