import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../theme/colors';

const GARDEN_ASPECT = 1536 / 1024;
const GARDEN_BAND_FRAC = (1536 - 636) / 1536;
const GARDEN_CREAM = '#FDFBEF';

function heart(cx: number, cy: number, s: number): string {
  return (
    `M ${cx} ${cy + s * 0.3} ` +
    `C ${cx} ${cy - s * 0.35}, ${cx - s} ${cy - s * 0.35}, ${cx - s} ${cy + s * 0.12} ` +
    `C ${cx - s} ${cy + s * 0.52}, ${cx} ${cy + s * 0.82}, ${cx} ${cy + s * 1.08} ` +
    `C ${cx} ${cy + s * 0.82}, ${cx + s} ${cy + s * 0.52}, ${cx + s} ${cy + s * 0.12} ` +
    `C ${cx + s} ${cy - s * 0.35}, ${cx} ${cy - s * 0.35}, ${cx} ${cy + s * 0.3} Z`
  );
}

type MoodResponseScreenProps = {
  title: string;
  message: string;
  onContinue?: () => void;
};

export default function MoodResponseScreen({
  title,
  message,
  onContinue,
}: MoodResponseScreenProps) {
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
          <Svg width={28} height={28} viewBox="0 0 28 28" fill="none">
            <Path d={heart(14, 8, 8)} fill={colors.yellow} />
          </Svg>

          <View style={styles.beeScene}>
            <Svg
              width={280}
              height={170}
              viewBox="0 0 280 170"
              fill="none"
              style={StyleSheet.absoluteFill}
            >
              <Path
                d="M18 145 C 44 110, 70 120, 94 137"
                stroke={colors.softText}
                strokeOpacity={0.4}
                strokeWidth={2}
                strokeLinecap="round"
                strokeDasharray="2 8"
              />
              <Path
                d={heart(232, 125, 13)}
                stroke={colors.softText}
                strokeOpacity={0.3}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="2 8"
              />
            </Svg>
            <Image
              source={require('../../assets/bee.png')}
              style={styles.bee}
              resizeMode="contain"
              accessibilityLabel="Buzzy the bee"
            />
          </View>

          <Text style={styles.title} accessibilityRole="header">
            {title}
          </Text>
          <Text style={styles.subtitle}>{message}</Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Continue"
            onPress={onContinue}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>Continue</Text>
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
    paddingTop: 24,
    paddingHorizontal: 24,
    zIndex: 1,
  },
  beeScene: {
    width: 280,
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  bee: {
    width: 150,
    height: 150,
  },
  title: {
    fontFamily: Platform.select({
      ios: 'Fraunces_700Bold',
      android: 'Fraunces_700Bold',
      default: 'serif',
    }),
    fontSize: 40,
    lineHeight: 48,
    color: colors.navy,
    textAlign: 'center',
    marginTop: 2,
  },
  subtitle: {
    fontFamily: Platform.select({
      ios: 'Nunito_600SemiBold',
      android: 'Nunito_600SemiBold',
      default: 'System',
    }),
    fontSize: 24,
    lineHeight: 31,
    color: colors.navy,
    textAlign: 'center',
    marginTop: 8,
  },
  actions: {
    paddingHorizontal: 28,
    paddingBottom: 12,
    zIndex: 1,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.yellow,
    borderRadius: 30,
    paddingVertical: 15,
    shadowColor: colors.daisyCenter,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 9,
    elevation: 4,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  buttonText: {
    fontFamily: Platform.select({
      ios: 'Nunito_700Bold',
      android: 'Nunito_700Bold',
      default: 'System',
    }),
    fontSize: 24,
    color: colors.buttonText,
  },
});
