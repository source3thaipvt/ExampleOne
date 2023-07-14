import { ActivityIndicator, FlatList, Image, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import HeaderApp from '../../component/HeaderApp'
import images from '../../../res/images'
import { AuthContext } from '../../context/AuthContext'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import TouchButton from '../../../components/TouchButton'
import { setLoading } from '../../../redux/auth/authSlice'
import api from '../../../api/api'
import ItemPost from './component/ItemPost'
import { addPosts, removePost, resetStatePost } from '../../../redux/post/postSlice'
import _, { debounce } from 'lodash'
import { addUser, resetUsers } from '../../../redux/users/userSlice'
import TextViewBase from '../../../components/TextViewBase'
import NavigationService from '../base/NavigationService'
import { ScreenName } from '../base/AppContainer'
import InputBase from '../../../components/InputBase'
export interface TPost {
    id: number,
    title: string,
    body: string,
    userId: number,
    tags: string[],
    reactions: number,
    user?: TUser
}
export interface TUser {
    id: number,
    firstName: string,
    lastName: string,
    maidenName: string,
    image: string,
    email: string,
    gender: string,
    phone: string,
    birthDate: string,
    age: number
}
const defaultSearch: {
    visable: boolean,
    text: string,
    data: TPost[]
} = {
    visable: false,
    text: '',
    data: []
}
const HomeScreen = (props: any) => {
    const { userToken, user } = useContext(AuthContext)
    const { userInfo } = useAppSelector(state => state.auth)
    const { posts } = useAppSelector(state => state.post)
    const { users } = useAppSelector(state => state.users)
    const [loadingMore, setLoadingMore] = useState(false)
    const [skip, setSkip] = useState<any>(0)
    const [lastSkip, setLastSkip] = useState<any>(0)
    const [data, setData] = useState<TPost[]>([])
    const [search, setSearch] = useState(defaultSearch)
    const [dataUser, setDataUser] = useState(user ?? userInfo)
    const [isRefreshing, setIsRefreshing] = useState(false)
    let limit = 7
    let onEndReachedCalledDuringMomentum = true
    const dispatch = useAppDispatch()
    useEffect(() => {
        getPosts()
    }, [])
    const getPosts = async (loader = true) => {
        console.log("getPosts")
        setLoadingMore(loader)
        setTimeout(async () => {
            try {
                const res = await api.getPost(limit, skip)
                if (res && res.status == 200) {
                    let arrPostUserId = _.map(res.data.posts, 'userId')
                    const uniqArrPostUserId: number[] = _.uniq(arrPostUserId);
                    const arrUserId = _.map(users, 'id')
                    const arrCallUser = _.difference(uniqArrPostUserId, arrUserId)
                    let newArrUsers: TUser[] = await getUsers(arrCallUser)
                    const listUsers: TUser[] = [...users, ...newArrUsers]
                    let listPost: TPost[] = res.data.posts
                    for (const iterator in listPost) {
                        const post = listPost[iterator]
                        const user = _.find(listUsers, (e) => e.id == post.userId)
                        listPost[iterator] = { ...listPost[iterator], user: user }
                    }
                    dispatch(addPosts(listPost))
                    setData([...data, ...listPost])
                    setLastSkip(res.data.total)
                    console.log("data", data.length)
                    setSkip(data.length + listPost.length)
                }
            } finally {
                setLoadingMore(false)
            }
        }, 2000)
    }
    const getUsers = async (data: number[]) => {
        console.log("getUsers")
        let newArrUsers: TUser[] = []
        for (const iterator of data) {
            const resUser = await api.getUser(iterator)
            if (resUser && resUser.status == 200) {
                newArrUsers.push(resUser.data)
                dispatch(addUser(resUser.data))
            }
        }
        return newArrUsers
    }
    const onRefesh = () => {
        console.log("onRefesh")
        setIsRefreshing(true)
        if (search.visable) {
            onSearchText(search.text, true)
            return
        }
        dispatch(resetStatePost())
        try {
        } catch (error) {
            setSkip(0)
            getPosts()
        } finally {
            setIsRefreshing(false)
        }
    }
    const onLoadMore = () => {  
        if (onEndReachedCalledDuringMomentum || skip >= lastSkip) {
            return
        }
        console.log("Loadmore")
        getPosts();
    }
    const goProfile = (params: Object) => {
        NavigationService.navigate(ScreenName.PROFILESCREEN, params)
    }
    const onSearchText = debounce(async (text: string, visable) => {
        if (!visable) {
            setLoadingMore(true)
        }
        setSearch({ ...search, text: text })
        setTimeout(async () => {
            const res = await api.getSearchPost(text)
            if (res && res.status == 200) {
                let arrPostUserId = _.map(res.data.posts, 'userId')
                const uniqArrPostUserId: number[] = _.uniq(arrPostUserId);
                const arrUserId = _.map(users, 'id')
                const arrCallUser = _.difference(uniqArrPostUserId, arrUserId)
                let newArrUsers: TUser[] = await getUsers(arrCallUser)
                const listUsers: TUser[] = [...users, ...newArrUsers]
                let listPost: TPost[] = res.data.posts
                for (const iterator in listPost) {
                    const post = listPost[iterator]
                    const user = _.find(listUsers, (e) => e.id == post.userId)
                    listPost[iterator] = { ...listPost[iterator], user: user }
                }
                setLoadingMore(false)
                setIsRefreshing(false)
                setSearch({ ...search, data: listPost, text: text })
            } else {
                setLoadingMore(false)
                setIsRefreshing(false)
            }
        }, 2000)
    }, 1000)
    return (

        <View>
            <HeaderApp
                navigation={props.navigation}
                iconRight={!search.visable ? images.ic_search : false}
                onPressRight={() => { setSearch({ ...search, visable: true }) }}
            >
                {
                    !search.visable ?
                        <TouchButton
                            style={{ flexDirection: 'row', padding: 20 }}
                            onPress={() => { goProfile({ data: dataUser, isAuth: true }) }}>
                            <Image
                                source={{ uri: dataUser?.image ?? 'https://robohash.org/autquiaut.png' }}
                                style={{ width: 30, backgroundColor: 'gray', height: 30, borderRadius: 90 }} />
                            <TextViewBase
                                title={`${dataUser?.firstName} ${dataUser?.lastName}`}
                                containerStyles={{ marginLeft: 5, justifyContent: 'center' }} />
                        </TouchButton>
                        :
                        <View style={{ flex: 1, marginHorizontal: 20, marginRight: 20 }}>
                            <InputBase
                                boxStyles={{ backgroundColor: '#F8F9FA', borderRadius: 20 }}
                                onChangeText={onSearchText}
                                textRight='X'
                                onPressRight={() => { setSearch(defaultSearch) }}
                                textRightStyles={styles.iconCancel}
                                rightStyles={styles.boxIconCancel} />
                        </View>}
            </HeaderApp>
            <View>
                <FlatList
                    data={search.text.length > 0 ? search.data : data}
                    renderItem={({ item }) => {
                        return <ItemPost
                            item={item}
                            onPressUser={(dataUser: any) => { goProfile({ data: dataUser }) }} />
                    }}
                    contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 130 }}
                    keyExtractor={(e, index) => `ItemPost ${index}`}
                    ItemSeparatorComponent={() => {
                        return <View style={{ height: 20 }} />
                    }}
                    onEndReached={search.visable ? () => { } : onLoadMore}
                    onEndReachedThreshold={0}
                    onMomentumScrollBegin={()=>{ onEndReachedCalledDuringMomentum= false}}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={onRefesh}
                            tintColor='red'
                        />
                    }
                    ListEmptyComponent={() => {
                        if (!loadingMore) {
                            return (
                                <View style={{ marginTop: 80, alignItems: 'center' }}>
                                    <TextViewBase title='Không có dữ liệu' textStyles={{ fontSize: 24 }} />
                                </View>
                            )
                        }
                    }}
                    ListFooterComponent={() => {
                        if (!loadingMore) {
                            return null
                        }
                        return <ActivityIndicator color="red" size={'large'} style={{ justifyContent: 'center', alignItems: 'center' }} />
                    }}
                />
            </View>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    iconCancel: {
        textAlign: 'center',
        left: 1,
        width: 20,
        height: 20,
        textAlignVertical: 'center',
        alignSelf: 'center',
        color: '#343A40'
    },
    boxIconCancel: {
        borderRadius: 90,
        backgroundColor: 'rgba(108, 117, 125, 0.6)',
        width: 30,
        height: 30,
        right: 0
    }
})