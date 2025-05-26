import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constants";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const Onboarding = () => {
    const swiperRef = useRef<Swiper>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const isLastSlide = activeIndex === onboarding.length - 1;

    return (
        <SafeAreaView className="flex h-full items-center justify-between bg-white">
            <TouchableOpacity
                onPress={() => { router.replace("/(auth)/sign-up") }}
                className="w-full flex justify-end items-end p-5"
            >
                <Text className="text-black text-medium font-bold">Skip</Text>
            </TouchableOpacity>
            <Swiper
                ref={swiperRef}
                loop={false}
                dot={<View className="w-[32px] h-[4px] mx-1 bg-slate-100 rounded-full" />}
                activeDot={<View className="w-[32px] h-[4px] mx-1 bg-accent rounded-full" />}
                onIndexChanged={(index) => setActiveIndex(index)}
            >
                {onboarding.map((item) => (
                    <View key={item.id} className="flex items-center justify-center p-5">
                        <View className="flex flex-row items-center justify-center w-full mt-10">
                            <Text className="text-black text-3xl font-bold mx-10 text-center">{item.title}</Text>
                        </View>
                        <Text className="text-md font-semibold text-center mx-10 mt-3 text-slate-400">{item.description}</Text>
                    </View>
                ))}
            </Swiper>
            <CustomButton
                title={isLastSlide ? "Get Started" : "Next"}
                classname="w-11/12mt-10 bg-accent"
                textClassname="text-white"
                onPress={() => isLastSlide ? router.replace('/(auth)/sign-up') : swiperRef.current?.scrollBy(1)}
            />
        </SafeAreaView>
    )
}

export default Onboarding;

// Image for the screen:
//  <Image source={item.image} className="w-full h-[300px]" resizeMode="contain" />