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
import CheckInScreen from './src/screens/CheckInScreen';
import MoodResponseScreen from './src/screens/MoodResponseScreen';
import ConnectScreen from './src/screens/ConnectScreen';
import ConversationScreen from './src/screens/ConversationScreen';
import ActivitiesScreen from './src/screens/ActivitiesScreen';
import { colors } from './src/theme/colors';

SplashScreen.preventAutoHideAsync().catch(() => {});

type Screen =
  | 'welcome'
  | 'intro1'
  | 'intro2'
  | 'checkin'
  | 'calm'
  | 'difficult'
  | 'hard'
  | 'unsure'
  | 'connect'
  | 'conversation'
  | 'activities';

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
        ) : screen === 'intro2' ? (
          <IntroPromiseScreen onBegin={() => setScreen('checkin')} />
        ) : screen === 'checkin' ? (
          <CheckInScreen
            onBack={() => setScreen('intro2')}
            onSelect={(mood) =>
              setScreen(
                mood === 'well'
                  ? 'calm'
                  : mood === 'difficult'
                    ? 'difficult'
                    : mood === 'hard'
                      ? 'hard'
                      : mood === 'unsure'
                        ? 'unsure'
                        : 'connect',
              )
            }
          />
        ) : screen === 'calm' ? (
          <MoodResponseScreen
            title="Wonderful."
            message="Let's find a little way to connect."
            onContinue={() => setScreen('connect')}
          />
        ) : screen === 'difficult' ? (
          <MoodResponseScreen
            title="That's okay."
            message="Let's keep things simple and comfortable."
            onContinue={() => setScreen('connect')}
          />
        ) : screen === 'hard' ? (
          <MoodResponseScreen
            title="Let's slow things down."
            message="A calm voice and a little reassurance can go a long way."
            onContinue={() => setScreen('connect')}
          />
        ) : screen === 'unsure' ? (
          <MoodResponseScreen
            title="That's completely fine."
            message="Let's start with something easy."
            onContinue={() => setScreen('connect')}
          />
        ) : screen === 'conversation' ? (
          <ConversationScreen onBack={() => setScreen('connect')} />
        ) : screen === 'activities' ? (
          <ActivitiesScreen onBack={() => setScreen('connect')} />
        ) : (
          <ConnectScreen
            onSelectTopic={(topic) => {
              if (topic === 'conversation') {
                setScreen('conversation');
              } else if (topic === 'activities') {
                setScreen('activities');
              }
            }}
          />
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
