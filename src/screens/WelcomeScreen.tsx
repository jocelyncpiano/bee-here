import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../theme/colors';
import BeeWithTrail from '../components/BeeWithTrail';

type WelcomeScreenProps = {
  onStartVisit?: () => void;
  onLearnMore?: () => void;
};

const GARDEN_ASPECT = 1536 / 1024;
// The flowers occupy the bottom ~58% of the source image (top flower at row 649);
// show that band with a small cream margin so no flower is cropped.
const GARDEN_BAND_FRAC = (1536 - 636) / 1536;
// Cream background baked into the flower image; match it for a seamless blend.
const GARDEN_CREAM = '#FDFBEF';

export default function WelcomeScreen({
  onStartVisit,
  onLearnMore,
}: WelcomeScreenProps) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.stage}>
          {/* Flower garden as a background layer, anchored above the button */}
          <View
            style={[
              styles.gardenBand,
              { height: width * GARDEN_ASPECT * GARDEN_BAND_FRAC },
            ]}
            pointerEvents="none"
          >
            <Image
              source={require('../../assets/flowers.png')}
              style={[styles.gardenImage, { width, height: width * GARDEN_ASPECT }]}
              resizeMode="cover"
              accessibilityLabel="A garden of spring flowers"
            />
            {/* Soft green fade grounding the flowers; continues behind the button */}
            <LinearGradient
              colors={['rgba(183,227,198,0)', 'rgba(183,227,198,0.6)', colors.green]}
              locations={[0, 0.55, 1]}
              style={styles.gardenFade}
              pointerEvents="none"
            />
          </View>

          {/* Text, in front of the garden */}
          <View style={styles.content}>
            {/* Bee flying in */}
            <View style={styles.beeRow}>
              <BeeWithTrail size={104} />
            </View>

            {/* Title */}
            <Text style={styles.title} accessibilityRole="header">
              Bee Here{'\n'}With Me
            </Text>

            {/* Tagline */}
            <Text style={styles.tagline}>
              You don't need the{'\n'}perfect words.
            </Text>
            <Text style={[styles.tagline, styles.taglineStrong]}>
              You just need{'\n'}to be here.
            </Text>
          </View>
        </View>

        {/* Actions */}
        <View style={[styles.actions, { paddingBottom: insets.bottom + 24 }]}>
          {/* Green behind the button, fading back to cream at the bottom */}
          <LinearGradient
            colors={[colors.green, colors.green, GARDEN_CREAM]}
            locations={[0, 0.35, 1]}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Start a Visit"
            onPress={onStartVisit}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>Start a Visit</Text>
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

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="How this app helps"
            onPress={onLearnMore}
            hitSlop={10}
            style={styles.link}
          >
            <Text style={styles.linkFlower}>✿</Text>
            <Text style={styles.linkText}>How this app helps</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: GARDEN_CREAM,
  },
  stage: {
    flex: 1,
  },
  gardenBand: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  gardenImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  gardenFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '38%',
  },
  safe: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 4,
  },
  beeRow: {
    alignItems: 'center',
    marginBottom: 2,
  },
  title: {
    fontFamily: Platform.select({
      ios: 'Fraunces_600SemiBold',
      android: 'Fraunces_600SemiBold',
      default: 'serif',
    }),
    fontSize: 48,
    lineHeight: 52,
    color: colors.navy,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  tagline: {
    fontFamily: Platform.select({
      ios: 'Nunito_600SemiBold',
      android: 'Nunito_600SemiBold',
      default: 'System',
    }),
    fontSize: 24,
    lineHeight: 31,
    color: colors.plum,
    marginTop: 12,
    textAlign: 'center',
  },
  taglineStrong: {
    fontFamily: Platform.select({
      ios: 'Nunito_700Bold',
      android: 'Nunito_700Bold',
      default: 'System',
    }),
    marginTop: 4,
  },
  actions: {
    paddingHorizontal: 28,
    paddingTop: 24,
    alignItems: 'center',
    overflow: 'hidden',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: colors.yellow,
    paddingVertical: 18,
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
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 6,
  },
  linkFlower: {
    color: colors.purple,
    fontSize: 24,
  },
  linkText: {
    fontFamily: Platform.select({
      ios: 'Nunito_600SemiBold',
      android: 'Nunito_600SemiBold',
      default: 'System',
    }),
    fontSize: 24,
    color: colors.softText,
  },
});
