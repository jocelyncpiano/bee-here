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
import MusicScreen from './src/screens/MusicScreen';
import DoSomethingFunScreen from './src/screens/DoSomethingFunScreen';
import QuietTimeScreen from './src/screens/QuietTimeScreen';
import HelpScreen from './src/screens/HelpScreen';
import IdentityHelpScreen, {
  IdentityAvoidScreen,
  IdentityIntroductionScreen,
} from './src/screens/IdentityHelpScreen';
import KeepItEasyScreen from './src/screens/KeepItEasyScreen';
import HomeHelpScreen, {
  HomeDontArgueScreen,
  HomeRedirectFinalScreen,
  HomeRedirectSecondScreen,
  HomeRedirectThirdScreen,
  HomeRedirectScreen,
  HomeWordsScreen,
} from './src/screens/HomeHelpScreen';
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
  | 'activities'
  | 'music'
  | 'fun'
  | 'quiet'
  | 'help'
  | 'identity-help'
  | 'identity-introduction'
  | 'identity-avoid'
  | 'keep-it-easy'
  | 'home-help'
  | 'home-words'
  | 'home-dont-argue'
  | 'home-redirect'
  | 'home-redirect-second'
  | 'home-redirect-third'
  | 'home-redirect-final';

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
        ) : screen === 'music' ? (
          <MusicScreen onBack={() => setScreen('connect')} />
        ) : screen === 'fun' ? (
          <DoSomethingFunScreen onBack={() => setScreen('connect')} />
        ) : screen === 'quiet' ? (
          <QuietTimeScreen onBack={() => setScreen('connect')} />
        ) : screen === 'help' ? (
          <HelpScreen
            onSelectTopic={(topic) => {
              if (topic === 'identity') {
                setScreen('identity-help');
              } else if (topic === 'home') {
                setScreen('home-help');
              }
            }}
            onBack={() => setScreen('connect')}
          />
        ) : screen === 'identity-help' ? (
          <IdentityHelpScreen
            onNext={() => setScreen('identity-introduction')}
          />
        ) : screen === 'identity-introduction' ? (
          <IdentityIntroductionScreen
            onNext={() => setScreen('identity-avoid')}
          />
        ) : screen === 'identity-avoid' ? (
          <IdentityAvoidScreen
            onNext={() => setScreen('keep-it-easy')}
          />
        ) : screen === 'keep-it-easy' ? (
          <KeepItEasyScreen
            onSelectOption={(option) => {
              if (option === 'music') {
                setScreen('music');
              } else if (option === 'together') {
                setScreen('activities');
              } else if (option === 'quiet') {
                setScreen('quiet');
              } else {
                setScreen('conversation');
              }
            }}
            onAnotherProblem={() => setScreen('help')}
          />
        ) : screen === 'home-help' ? (
          <HomeHelpScreen onNext={() => setScreen('home-words')} />
        ) : screen === 'home-words' ? (
          <HomeWordsScreen onNext={() => setScreen('home-dont-argue')} />
        ) : screen === 'home-dont-argue' ? (
          <HomeDontArgueScreen onRedirect={() => setScreen('home-redirect')} />
        ) : screen === 'home-redirect' ? (
          <HomeRedirectScreen
            onNext={() => setScreen('home-redirect-second')}
          />
        ) : screen === 'home-redirect-second' ? (
          <HomeRedirectSecondScreen
            onNext={() => setScreen('home-redirect-third')}
          />
        ) : screen === 'home-redirect-third' ? (
          <HomeRedirectThirdScreen
            onNext={() => setScreen('home-redirect-final')}
          />
        ) : screen === 'home-redirect-final' ? (
          <HomeRedirectFinalScreen
            onAnotherProblem={() => setScreen('help')}
          />
        ) : (
          <ConnectScreen
            onNeedHelp={() => setScreen('help')}
            onSelectTopic={(topic) => {
              if (topic === 'conversation') {
                setScreen('conversation');
              } else if (topic === 'activities') {
                setScreen('activities');
              } else if (topic === 'music') {
                setScreen('music');
              } else if (topic === 'look') {
                setScreen('fun');
              } else if (topic === 'quiet') {
                setScreen('quiet');
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
