import { Image, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import TextViewBase from '../../../../components/TextViewBase'
import images from '../../../../res/images'
import { TPost } from '../HomeScreen'
import TouchButton from '../../../../components/TouchButton'
import moment from 'moment'

const ItemPost = memo((props: { item: TPost, onPressUser: (user: any) => void }) => {
    const item = props.item
    return (
        <View style={styles.container}>
            <TouchButton
                style={{ ...styles.row }}
                onPress={() => { props.onPressUser(item.user) }}>
                <Image source={{ uri: item?.user?.image ?? 'https://robohash.org/hicveldicta.png?size=50x50&set=set1' }} style={styles.avt} />
                <TextViewBase title={`${item?.user?.firstName} ${item?.user?.lastName} ${item.id}`} containerStyles={{ flex: 1 }} />
            </TouchButton>

            <TextViewBase title={item.title}
                containerStyles={{ paddingVertical: 3 }}
            />
            <View style={{ minHeight: 60 }}>
                <TextViewBase title={item.body}
                    containerStyles={{ paddingVertical: 3 }}
                    textStyles={{ fontSize: 12, letterSpacing: 0.7, fontWeight: '300' }}
                />
            </View>
            <View style={{ ...styles.row }}>
                <View style={{ flexDirection: 'row' }}>
                    {item.tags.map((e, index) => {
                        return (
                            <TextViewBase title={`#${e}`}
                                containerStyles={{ paddingRight: 3 }}
                                key={`keyTagPost ${e} ${index} ${moment().unix()}`}
                            />
                        )
                    })}
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextViewBase title={item.reactions.toString()} containerStyles={{ marginRight: 3 }} />
                    <Image source={images.ic_heart} style={styles.heart} resizeMode='contain' />
                </View>
            </View>
        </View>
    )
})

export default ItemPost

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        padding: 8,
        borderRadius: 8,

    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    avt: {
        width: 30,
        height: 30,
        borderRadius: 150,
        backgroundColor: 'gray',
        marginRight: 8
    },
    heart: {
        width: 20
    }

})