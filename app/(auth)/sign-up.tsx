import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useSignUp } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";
import ReactNativeModal from "react-native-modal";

const SignUp = () => {
    const { isLoaded, signUp, setActive } = useSignUp()
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [verification, setVerification] = useState({
        state: 'default',
        error: '',
        code: '',
    })

    const onSignUpPress = async () => {
        if (!isLoaded) return

        try {
            await signUp.create({
                emailAddress: form.email,
                password: form.password,
            })

            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

            setVerification({ ...verification, state: 'pending' })
        } catch (err: any) {
            Alert.alert('Error', err.errors[0].longMessage)
        }
    }

    const onVerifyPress = async () => {
        if (!isLoaded) return;

        try {
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code: verification.code,
            })

            if (signUpAttempt.status === 'complete') {
                //TODO: create database user
                await setActive({ session: signUpAttempt.createdSessionId });
                setVerification({ ...verification, state: 'success' })
                //router.replace('/(tabs)')
            } else {
                setVerification({ ...verification, state: 'failed', error: 'Verification Failed' })
            }
        } catch (err: any) {
            setVerification({ ...verification, state: 'failed', error: err.errors[0].longMessage })
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
                            <Text className="text-2xl text-black font-semibold absolute bottom-5 left-5">Create your Account</Text>
                        </View>
                        <View className="p-5">
                            <InputField
                                label="Name"
                                placeholder="Enter your name"
                                icon={icons.person}
                                value={form.name}
                                onChangeText={(value) => setForm({
                                    ...form,
                                    name: value
                                })}
                            />
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
                                <CustomButton title="Sign Up" onPress={onSignUpPress} classname="mt-6 bg-accent" textClassname="text-white" />
                                <OAuth />
                                <Pressable onPress={() => router.push("/sign-in")} className="flex flex-row text-lg text-center text-slate-300">
                                    <Text>Already have an account? </Text>
                                    <Text className="text-accent">Log In</Text>
                                </Pressable>
                            </View>
                            <ReactNativeModal isVisible={verification.state === 'pending'} onModalHide={() => {
                                if (verification.state === 'success') setShowSuccessModal(true)
                            }}>
                                <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px] justify-center items-center">
                                    <Text className="text-2xl font-bold mb-2 text-center">Verification</Text>
                                    <Text className="text-base text-gray-400 text-center mb-5">Verification code sent to {form.email}.</Text>
                                    <InputField
                                        label="Code"
                                        icon={icons.home}
                                        placeholder="12345"
                                        value={verification.code}
                                        onChangeText={(code) => setVerification({ ...verification, code })}
                                    />
                                    {verification.error && (<Text className="text-red-500 text-sm mt-1">{verification.error}</Text>)}
                                    <CustomButton title="Verify Email" onPress={onVerifyPress} classname="mt-5 bg-accent" textClassname="text-white" />
                                </View>
                            </ReactNativeModal>
                            <ReactNativeModal isVisible={showSuccessModal}>
                                <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px] justify-center items-center">
                                    <Image source={images.rankingGradient} className="w-[110px] h-[110px] mx-auto my-5" />
                                    <Text className="text-3xl font-bold text-center">Verified</Text>
                                    <Text className="text-base text-gray-400 text-center mt-2">You have successfully verified your account.</Text>
                                    <CustomButton title="Browse Home" onPress={() => {
                                        setShowSuccessModal(false)
                                        router.push('/(tabs)')
                                    }}
                                        classname="mt-5 bg-accent" textClassname="text-white" />
                                </View>
                            </ReactNativeModal>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default SignUp;