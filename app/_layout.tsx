import { StatusBar } from "expo-status-bar";
import { Slot } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';

import 'react-native-reanimated';
import React from "react";
import { AuthenticationProvider } from "@/context/AuthContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function Root() {
  return (
    <>
    <StatusBar style="dark" />
    {/* use authenticatin provider in AuthContext */}
<AuthenticationProvider> 
     <Slot />
     </AuthenticationProvider>
    </>
  );
}
