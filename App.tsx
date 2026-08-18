import React, { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  Fraunces_600SemiBold,
  Fraunces_700Bold,
} from '@expo-google-fonts/fraunces';
import {
  Nunito_600SemiBold,
  Nunito_700Bold,
} from '@expo-google-fonts/nunito';
import { Caveat_700Bold } from '@expo-google-fonts/caveat';
import WelcomeScreen from './src/screens/WelcomeScreen';
import IntroBuzzyScreen from './src/screens/IntroBuzzyScreen';
import IntroPromiseScreen from './src/screens/IntroPromiseScreen';
import { colors } from './src/theme/colors';

SplashScreen.preventAutoHideAsync().catch(() => {});

type Screen = 'welcome' | 'intro1' | 'intro2';

export default function App() {
  const [fontsLoaded] = useFonts({
    Fraunces_600SemiBold,
    Fraunces_700Bold,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Caveat_700Bold,
  });
  const [screen, setScreen] = useState<Screen>('welcome');

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <View style={styles.root} onLayout={onLayoutRootView}>
        <StatusBar style="dark" />
        {screen === 'welcome' ? (
          <WelcomeScreen
            onStartVisit={() => setScreen('intro1')}
          />
        ) : screen === 'intro1' ? (
          <IntroBuzzyScreen onNext={() => setScreen('intro2')} />
        ) : (
          <IntroPromiseScreen />
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.cream,
  },
});
