import { images } from '@/constants/images'
import React from 'react'
import { Image, Text, View } from 'react-native'

const profile = () => {
    return (
        <View className="flex-1 bg-white">
            <View className='flex justify-center items-center flex-1 flex-col gap-5'>
                <Image source={images.logoMain} className='size-40' tintColor='#000000' />
                <Text className='text-base text-accent font-extrabold'>Profile</Text>
            </View>
        </View>
    )
}

export default profile