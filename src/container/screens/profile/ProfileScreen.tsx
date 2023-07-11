import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import images from '../../../res/images'
import HeaderApp from '../../component/HeaderApp'
import { AuthContext } from '../../context/AuthContext'
import TextViewBase from '../../../components/TextViewBase'
import { useAppSelector } from '../../../redux/hooks'
import _ from 'lodash'
import { TUser } from '../home/HomeScreen'
import api from '../../../api/api'
import fonts from '../../../res/fonts'
import TouchButton from '../../../components/TouchButton'

const ProfileScreen = (props: any) => {
    const [data, setData] = useState(props.route.params.data)
    const { users } = useAppSelector(state => state.users)
    const { logout } = useContext(AuthContext)
    useEffect(() => {
        const isAuth = props.route.params.isAuth
        if (isAuth) {
            let newUser = _.find(users, (e) => e.id == data.id)
            setData(newUser)
            if (!newUser) {
                callApiUser(data.id)
            }
        }
    }, [])
    const callApiUser = async (id: number) => {
        try {
            const res = await api.getUser(id)
            if (res && res.status == 200) {
                setData(res.data)
            } else {
                return data
            }
        } catch (error) {
            return data
        }
    }
    const LineTextContent = (props: { label: string, content: string }) => {
        return (
            <Text style={{ ...styles.txt_content, ...styles.txt_label }}>
                {props.label}:{' '}
                <Text style={{ ...styles.txt_content }}>{props.content}</Text>
            </Text>
        )
    }
    return (
        <View style={styles.container}>
            <HeaderApp navigation={props.navigation} title='Hồ sơ' iconLeft={images.ic_back_black} />
            <ScrollView contentContainerStyle={styles.body}>
                <Image source={{ uri: data?.image }} style={styles.avt} />
                <TextViewBase
                    title={`${data?.firstName} ${data?.lastName}`}
                    containerStyles={{ marginTop: 12, justifyContent: 'center' }}
                    textStyles={{ fontSize: 24 }}
                />
                <View style={styles.content}>
                    <LineTextContent label='Địa chỉ' content={`${data?.address?.address}, ${data?.address?.city}`} />
                    <LineTextContent label='Email' content={`${data?.email}`} />
                    <LineTextContent label='Số điện thoại' content={`${data?.phone}`} />
                    <LineTextContent label='Nhóm máu' content={`${data?.bloodGroup}`} />
                    <LineTextContent label='Bằng cấp' content={`${data?.university}`} />
                    <LineTextContent label='Vị trí' content={`${data?.company?.department}`} />
                    <LineTextContent label='Công ty' content={`${data?.company?.title}`} />
                </View>
                {props.route.params.isAuth &&
                    <TouchButton 
                    onPress={logout}
                    containerStyles={{ backgroundColor: 'red', borderRadius: 8, marginTop: 40 }}>
                        <TextViewBase title='Đăng xuất' textStyles={{ color: '#ffffff' }} />
                    </TouchButton>}
            </ScrollView>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        paddingHorizontal: 20,
        paddingTop: 20,
        alignItems: 'center'
    },
    avt: {
        width: 150,
        height: 150,
        borderRadius: 150,
        borderWidth: 1,
    },
    content: {
        width: '100%',
        marginTop: 40
    },
    txt_label: {
        fontFamily: fonts.RobotoSlabMedium,
        paddingBottom: 5
    },
    txt_content: {
        fontSize: 14,
        letterSpacing: 1,
        fontFamily: fonts.RobotoSlabLight,
        color: 'black'
    }
})