import * as yup from "yup";
const phoneRegExp = /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/ // Regex phone number VietNam

const loginPhoneValidateSchema = yup.object().shape({
    username: yup.string().trim().matches(phoneRegExp , 'Số điện thoại không đúng định dạng').required('Vui lòng điền số điện thoại'),
})
const loginValidateSchema = yup.object().shape({
    username: yup.string().trim().required('Vui lòng điền tên đăng nhập'),
    password: yup.string().trim().required('Vui lòng điền mật khẩu')
})
const otpValidateSchema = yup.object().shape({
    otp: yup.number()
})
export {
    loginValidateSchema,
    loginPhoneValidateSchema,
    otpValidateSchema
}