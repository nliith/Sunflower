import SearchBar from "@/components/SearchBar";
import SunCard from "@/components/SunCard";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/apiPlaceholder";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";


export default function Index() {
    const router = useRouter();

    const {
        data: movies,
        loading: moviesLoading,
        error: moviesError
    } = useFetch(() => fetchMovies({ query: '' }))

    return (
        <View className="flex-1 bg-white">
            <Image source={images.bg} className="absolute w-full z-0" />
            <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}>
                <Image source={images.logoMain} className="w-16 h-16 mt-20 mb-5 mx-auto" />
                {moviesLoading ? (
                    <ActivityIndicator
                        size="large"
                        color="#0000FF"
                        className="mt-10 self-center"
                    />
                ) : moviesError ? (
                    <Text>Error: {moviesError?.message}</Text>
                ) : (
                    <View className="flex-1 mt-5">
                        <SearchBar
                            onPress={() => router.push("/search")}
                            placeholder="Search for reality"
                            value=""
                            onChangeText={() => { }}
                        />

                        <>
                            <Text className="text-lg text-accent font-bold mt-5 mb-3">Latest Viewed Data</Text>
                            <FlatList
                                data={movies}
                                renderItem={({ item }) => (
                                    <SunCard {...item} />
                                )}
                                keyExtractor={(item) => item.id.toString()}
                                numColumns={3}
                                columnWrapperStyle={{
                                    justifyContent: 'flex-start',
                                    gap: 20,
                                    paddingRight: 5,
                                    marginBottom: 10
                                }}
                                className="mt-2 pb-32"
                                scrollEnabled={false}
                            />
                        </>
                    </View>
                )}

            </ScrollView>

        </View>

    );
}
