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
import Svg, { Path } from 'react-native-svg';
import { colors } from '../theme/colors';

const GARDEN_ASPECT = 1536 / 1024;
const GARDEN_BAND_FRAC = (1536 - 636) / 1536;
const GARDEN_CREAM = '#FDFBEF';

const IDEAS = [
  { label: 'Reduce noise', color: colors.purpleSoft },
  { label: 'Move somewhere quieter', color: colors.yellowSoft },
  { label: 'Give them a little space', color: colors.pinkSoft },
  { label: 'Try something familiar', color: colors.greenSoft },
] as const;

export default function CalmerIdeasScreen({
  onNext,
}: {
  onNext?: () => void;
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
          <Text style={styles.title}>Can you make things calmer?</Text>

          {IDEAS.map((idea) => (
            <View
              key={idea.label}
              accessibilityLabel={idea.label}
              style={[styles.idea, { backgroundColor: idea.color }]}
            >
              <Text style={styles.ideaText}>{idea.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Next"
            onPress={onNext}
            style={({ pressed }) => [
              styles.nextButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.nextButtonText}>Next</Text>
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Path
                d="M9 4l7 8-7 8"
                stroke={colors.navy}
                strokeWidth={2.4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
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
    paddingTop: 72,
    paddingHorizontal: 28,
    gap: 12,
    zIndex: 1,
  },
  title: {
    fontFamily: Platform.select({
      ios: 'Fraunces_700Bold',
      android: 'Fraunces_700Bold',
      default: 'serif',
    }),
    fontSize: 32,
    lineHeight: 40,
    color: colors.navy,
    textAlign: 'center',
    marginBottom: 10,
  },
  idea: {
    minHeight: 64,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.daisyOutline,
    borderRadius: 26,
    paddingHorizontal: 22,
  },
  ideaText: {
    fontFamily: Platform.select({
      ios: 'Nunito_600SemiBold',
      android: 'Nunito_600SemiBold',
      default: 'System',
    }),
    fontSize: 24,
    color: colors.navy,
  },
  actions: {
    paddingHorizontal: 28,
    paddingBottom: 12,
    zIndex: 1,
  },
  nextButton: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.pink,
    borderRadius: 30,
  },
  nextButtonText: {
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
