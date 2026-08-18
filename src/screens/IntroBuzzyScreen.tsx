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

type IntroBuzzyScreenProps = {
  onNext?: () => void;
};

const TRAIL = '#C9C2B6';

/** A small heart outline centered at (cx, cy) with radius s. */
function heart(cx: number, cy: number, s: number): string {
  return (
    `M ${cx} ${cy + s * 0.3} ` +
    `C ${cx} ${cy - s * 0.35}, ${cx - s} ${cy - s * 0.35}, ${cx - s} ${cy + s * 0.12} ` +
    `C ${cx - s} ${cy + s * 0.52}, ${cx} ${cy + s * 0.82}, ${cx} ${cy + s * 1.08} ` +
    `C ${cx} ${cy + s * 0.82}, ${cx + s} ${cy + s * 0.52}, ${cx + s} ${cy + s * 0.12} ` +
    `C ${cx + s} ${cy - s * 0.35}, ${cx} ${cy - s * 0.35}, ${cx} ${cy + s * 0.3} Z`
  );
}

/** Intro page 1 — "Meet Buzzy". */
export default function IntroBuzzyScreen({ onNext }: IntroBuzzyScreenProps) {
  const { width } = useWindowDimensions();
  const beeSize = Math.min(width * 0.55, 220);

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={styles.content}>
          {/* Heading */}
          <Text style={styles.kicker} accessibilityRole="header">
            MEET BUZZY
          </Text>
          <Svg width={26} height={24} viewBox="0 0 24 22" fill="none">
            <Path
              d="M12 20 C 3 13.5, 1 8, 4.3 4.2 C 6.5 1.7, 9.9 2.1, 12 5 C 14.1 2.1, 17.5 1.7, 19.7 4.2 C 23 8, 21 13.5, 12 20 Z"
              fill={colors.yellow}
            />
          </Svg>

          {/* Buzzy with a dotted flight path looping into a heart */}
          <View
            style={[
              styles.beeArea,
              { width: beeSize * 1.7, height: beeSize * 1.55 },
            ]}
          >
            <Svg
              style={styles.trail}
              width={beeSize * 1.7}
              height={beeSize * 1.1}
              viewBox="0 0 220 150"
              fill="none"
            >
              {/* lead-in swoop from the bee down into the heart */}
              <Path
                d="M150 8 C 96 6, 30 34, 78 74"
                stroke={TRAIL}
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeDasharray="1 8"
                fill="none"
              />
              {/* the heart the flight path traces */}
              <Path
                d={heart(120, 74, 40)}
                stroke={TRAIL}
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="1 8"
                fill="none"
              />
            </Svg>
            <Image
              source={require('../../assets/bee.png')}
              style={{ width: beeSize, height: beeSize }}
              resizeMode="contain"
              accessibilityLabel="Buzzy the bee"
            />
          </View>

          {/* Guiding copy */}
          <Text style={styles.body}>
            Buzzy is here to guide{'\n'}you through your visit.
          </Text>
          <Text style={styles.script}>I've got you!</Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Next"
            onPress={onNext}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>Next</Text>
            <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
              <Path
                d="M7 4l6 6-6 6"
                stroke={colors.buttonText}
                strokeWidth={2.2}
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
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  kicker: {
    fontFamily: Platform.select({
      ios: 'Nunito_700Bold',
      android: 'Nunito_700Bold',
      default: 'System',
    }),
    fontSize: 26,
    letterSpacing: 3,
    color: colors.plum,
    marginBottom: 10,
  },
  beeArea: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 8,
  },
  trail: {
    position: 'absolute',
    bottom: 0,
  },
  body: {
    fontFamily: Platform.select({
      ios: 'Nunito_600SemiBold',
      android: 'Nunito_600SemiBold',
      default: 'System',
    }),
    fontSize: 24,
    lineHeight: 32,
    color: colors.navy,
    textAlign: 'center',
    marginTop: 8,
  },
  script: {
    fontFamily: Platform.select({
      ios: 'Caveat_700Bold',
      android: 'Caveat_700Bold',
      default: 'System',
    }),
    fontSize: 40,
    lineHeight: 48,
    color: colors.plum,
    textAlign: 'center',
    alignSelf: 'stretch',
    paddingHorizontal: 16,
    marginTop: 14,
  },
  actions: {
    paddingHorizontal: 28,
    paddingBottom: 12,
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: colors.yellow,
    paddingVertical: 14,
    paddingHorizontal: 44,
    borderRadius: 30,
    gap: 8,
    shadowColor: '#E0A93B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
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
