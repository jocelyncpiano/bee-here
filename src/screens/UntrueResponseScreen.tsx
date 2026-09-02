import React from 'react';
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

const GARDEN_ASPECT = 1536 / 1024;
const GARDEN_BAND_FRAC = (1536 - 636) / 1536;
const GARDEN_CREAM = '#FDFBEF';

export default function UntrueResponseScreen({
  onAnotherProblem,
}: {
  onAnotherProblem?: () => void;
}) {
  const { width } = useWindowDimensions();
  const gardenHeight = width * GARDEN_ASPECT * GARDEN_BAND_FRAC;

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View
          style={[styles.gardenBand, { height: gardenHeight }]}
          pointerEvents="none"
        >
          <Image
            source={require('../../assets/flowers.png')}
            style={[
              styles.gardenImage,
              { width, height: width * GARDEN_ASPECT },
            ]}
            resizeMode="cover"
            accessibilityLabel="A garden of spring flowers"
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Respond to the feeling.</Text>
          <Text style={styles.body}>
            Rather than arguing over the facts, try:
          </Text>
          <Text style={styles.body}>“That sounds important to you.”</Text>
          <Text style={styles.body}>or</Text>
          <Text style={styles.body}>“Tell me more.”</Text>
          <Text style={styles.body}>Then gently redirect if needed.</Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Another problem"
            onPress={onAnotherProblem}
            style={({ pressed }) => [
              styles.anotherProblemButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.anotherProblemText}>Another problem</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  safe: {
    flex: 1,
  },
  gardenBand: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    backgroundColor: GARDEN_CREAM,
  },
  gardenImage: {
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 72,
    paddingHorizontal: 32,
    gap: 28,
    zIndex: 1,
  },
  title: {
    fontFamily: Platform.select({
      ios: 'Fraunces_700Bold',
      android: 'Fraunces_700Bold',
      default: 'serif',
    }),
    fontSize: 30,
    lineHeight: 38,
    color: colors.navy,
    textAlign: 'center',
  },
  body: {
    fontFamily: Platform.select({
      ios: 'Nunito_600SemiBold',
      android: 'Nunito_600SemiBold',
      default: 'System',
    }),
    fontSize: 24,
    lineHeight: 34,
    color: colors.navy,
    textAlign: 'center',
  },
  actions: {
    paddingHorizontal: 28,
    paddingBottom: 12,
    zIndex: 1,
  },
  anotherProblemButton: {
    minHeight: 64,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.daisyOutline,
    borderRadius: 30,
  },
  anotherProblemText: {
    fontFamily: Platform.select({
      ios: 'Nunito_700Bold',
      android: 'Nunito_700Bold',
      default: 'System',
    }),
    fontSize: 24,
    color: colors.navy,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
});
