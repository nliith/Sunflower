import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";

const SignIn = () => {
    const { signIn, setActive, isLoaded } = useSignIn()
    const router = useRouter()
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const onSignInPress = async () => {
        if (!isLoaded) return

        try {
            const signInAttempt = await signIn.create({
                identifier: form.email,
                password: form.password,
            })

            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId })
                //router.replace('/')
            } else {
                console.error(JSON.stringify(signInAttempt, null, 2))
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2))
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : "height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false} contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}>
                    <View className="flex-1">
                        <View className="relative w-full h-[150px]">
                            <Image source={images.bg} className="z-0 w-full h-full" />
                            <Text className="text-2xl text-black font-semibold absolute bottom-5 left-5">Welcome Back</Text>
                        </View>
                        <View className="p-5">
                            <InputField
                                label="E-mail"
                                placeholder="Enter your e-mail"
                                icon={icons.home}
                                value={form.email}
                                onChangeText={(value) => setForm({
                                    ...form,
                                    email: value
                                })}
                            />
                            <InputField
                                label="Password"
                                placeholder="Enter your password"
                                icon={icons.search}
                                secureTextEntry={true}
                                value={form.password}
                                onChangeText={(value) => setForm({
                                    ...form,
                                    password: value
                                })}
                            />
                            <View className="flex items-center justify-center">
                                <CustomButton title="Sign In" onPress={onSignInPress} classname="mt-6 bg-accent" textClassname="text-white" />
                                <OAuth />
                                <Pressable onPress={() => router.push("/sign-up")} className="flex flex-row text-lg text-center text-slate-300">
                                    <Text>Don't you have an account? </Text>
                                    <Text className="text-accent">Sign Up</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default SignIn;