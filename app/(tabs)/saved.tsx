import { icons } from '@/constants/icons'
import React from 'react'
import { Image, Text, View } from 'react-native'

const saved = () => {
    return (
        <View className="flex-1 bg-white">
            <View className='flex justify-center items-center flex-1 flex-col gap-5'>
                <Image source={icons.save} className='size-10' tintColor='#FF9F1C' />
                <Text className='text-base text-accent font-extrabold'>Events</Text>
            </View>
        </View>
    )
}

export default saved