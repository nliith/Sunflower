import { icons } from '@/constants/icons';
import { fetchMovieDetails } from '@/services/apiPlaceholder';
import useFetch from '@/services/useFetch';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface MovieInfoProps {
    label: string;
    value?: string | number | null;
}


const MovieInfo = ({ label, value }: MovieInfoProps) => (
    <View className='flex-col items-start justify-center pl-4'>
        <Text className='text-light-200 font-normal text-sm'>{label}</Text>
        <Text className='text-light-100 font-bold text-sm'>lorem ipsum {value}</Text>
    </View>
)

const MovieDetails = () => {
    const { id } = useLocalSearchParams();

    const { data: movie, loading } = useFetch(() => fetchMovieDetails(id as string));
    return (
        <View className='bg-white flex-1'>
            <ScrollView contentContainerStyle={{
                paddingBottom: 80
            }}>
                <View>
                    <Image
                        source={require('../../assets/images/first.png')}
                        className='w-full h-[400px]' resizeMode='stretch' />
                </View>
                <View className='flex-col items-start justify-center mt-5 px-5'>
                    <Text className='text-black font-bold text-xl'>Housing Statistics{movie?.title}</Text>
                </View>
                <View className='flex-row items-center justify-start gap-x-1 mt-2 pl-4'>
                    <Text className='text-light-200 text-sm'>2025{movie?.id}</Text>
                </View>
                <MovieInfo label='Overview' value={movie?.overview} />
            </ScrollView>
            <TouchableOpacity className='absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50'
                onPress={router.back}>
                <Image source={icons.arrow} className='size-5 mr-1 mt-0.5 rotate-180' tintColor='#fff' />
                <Text className='text-white font-semibold text-base'>Go back</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MovieDetails