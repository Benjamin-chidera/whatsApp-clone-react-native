import { useFonts } from "expo-font";
import { Link, Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useEffect } from "react";
import "react-native-reanimated";
import { ClerkProvider, ClerkLoaded, useAuth } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import Colors from "@/constants/Colors";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

// Cache the Clerk JWT
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const router = useRouter();
  const segments = useSegments();
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const inTabsGroup = segments[0] === "(tabs)";

    if (isSignedIn && !inTabsGroup) {
      router.replace("/(tabs)/calls");
    } else if (!isSignedIn) {
      router.replace("/");
    }
  }, [isSignedIn]);

  if (!loaded || !isLoaded) {
    return null;
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="otp"
          options={{
            headerTitle: "Enter Your Phone Number",
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="verify/[phone]"
          options={{
            headerTitle: "Verify ",
            headerBackTitle: "Edit number",
          }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(modals)/new-chats"
          options={{
            // headerShown: false,
            presentation: "modal",
            title: "New Chat",
            headerTransparent: true,
            headerBlurEffect: "regular",
            headerStyle: {
              backgroundColor: Colors.background,
            },
            headerSearchBarOptions: {
              placeholder: "Search",
              hideWhenScrolling: false,
            },

            headerRight: () => (
              <Link href={"/(tabs)/chats"} asChild>
                <TouchableOpacity
                  style={{
                    backgroundColor: Colors.lightGray,
                    borderRadius: 20,
                    padding: 4,
                  }}
                >
                  <Ionicons name="close" color={Colors.gray} size={30} />
                </TouchableOpacity>
              </Link>
            ),
          }}
        />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
};

const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <InitialLayout />
    </ClerkProvider>
  );
};

export default RootLayout;
