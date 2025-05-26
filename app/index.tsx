import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

const HomeIndex = () => {
    const { isSignedIn } = useAuth();

    if (isSignedIn) {
        return <Redirect href="/(tabs)" />
    }
    return <Redirect href="/(tabs)" />
};

export default HomeIndex;

// <Redirect href="/(auth)/welcome" />