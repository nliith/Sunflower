import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const SunCard = ({ id, title }: Movie) => {
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const randomNumber = Math.floor(Math.random() * 2); // 0 or 1
        const image = randomNumber === 1
            ? require('../assets/images/first.png')
            : require('../assets/images/sec.png');

        setSelectedImage(image);
    }, []);

    if (!selectedImage) return null;
    return (
        <Link href={`/movies/${id}`} asChild>
            <TouchableOpacity className='w-[30%]'>
                <Image source={selectedImage}
                    className='w-full h-52 rounded-lg'
                    resizeMode='cover'
                />
                <Text className='text-sm font-bold text-black mt-2' numberOfLines={1}>{title}</Text>
                <View className='flex-row items-center justify-between'>
                    <Text className='text-xs text-light-300 font-medium mt-1'>2025 Data</Text>
                    <Text className='text-xs text-light-300 font-medium mt-1'></Text>
                </View>
            </TouchableOpacity>
        </Link>
    )
}

export default SunCard