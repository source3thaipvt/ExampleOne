import * as yup from "yup";

const loginValidateSchema = yup.object().shape({
    username: yup.string().trim().required('Vui lòng điền tên đăng nhập'),
    password: yup.string().trim().required('Vui lòng điền mật khẩu')
})
const otpValidateSchema = yup.object().shape({
    otp: yup.number()
})
export {
    loginValidateSchema,
    otpValidateSchema
}