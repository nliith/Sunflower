import { icons } from '@/constants/icons';
import React from 'react';
import { Image, TextInput, View } from 'react-native';

interface Props {
    placeholder: string;
    onPress?: () => void;
    value: string;
    onChangeText: (text: string) => void;
}

const SearchBar = ({ placeholder, onPress, value, onChangeText }: Props) => {
    return (
        <View className='flex-row items-center bg-gray-100 rounded-full px-5 py-4 gap-x-2'>
            <Image source={icons.search} className='size-5' resizeMode='contain' tintColor='#548C2F' />
            <TextInput
                onPress={onPress}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor='#A8B5DB'
                className='flex-1 ml-2 text-black'
            />
        </View>
    )
}

export default SearchBar