import { icons } from '@/constants/icons'
import React from 'react'
import { Image, Text, View } from 'react-native'
import CustomButton from './CustomButton'

function OAuth() {
    const handleGoogleSignIn = async () => {

    }

    return (
        <View>
            <View className='flex flex-row justify-center items-center mt-4 gap-x-3'>
                <View className='flex-1 h-[1px] bg-slate-300' />
                <Text className='text-lg'>Or</Text>
                <View className='flex-1 h-[1px] bg-slate-300' />
            </View>
            <View className="flex items-center justify-center">
                <CustomButton
                    title='Log In with Google'
                    classname='mt-5 bg-white border border-1 border-slate-300'
                    textClassname='text-slate-500'
                    IconLeft={() => (<Image source={icons.play} resizeMode='contain' className='w-5 h-5 mx-2' />)}
                    onPress={handleGoogleSignIn}
                />
            </View>
        </View>
    )
}

export default OAuth