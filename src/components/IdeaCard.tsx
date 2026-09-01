import React, { useState } from 'react';
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

export type IdeaContent = {
  kicker?: string;
  prompt: string;
  guidance?: string;
  unquoted?: boolean;
  long?: boolean;
};

type IdeaCardProps = {
  kicker: string;
  ideas: IdeaContent[];
  ideaKind: string;
  anotherButtonColor?: string;
  cardColor?: string;
  showBee?: boolean;
  titleKicker?: boolean;
  compactTitle?: boolean;
  compactCard?: boolean;
  showPrimaryButton?: boolean;
  showSecondaryButton?: boolean;
  primaryButtonLabel?: string;
  primaryButtonIcon?: 'refresh' | 'next' | 'none';
  secondaryButtonLabel?: string;
  onPrimaryPress?: () => void;
  onBack?: () => void;
};

export default function IdeaCard({
  kicker,
  ideas,
  ideaKind,
  anotherButtonColor = colors.purple,
  cardColor = colors.purpleSoft,
  showBee = false,
  titleKicker = false,
  compactTitle = false,
  compactCard = false,
  showPrimaryButton = true,
  showSecondaryButton = true,
  primaryButtonLabel = 'Another idea',
  primaryButtonIcon = 'refresh',
  secondaryButtonLabel = 'Back to Visit Garden',
  onPrimaryPress,
  onBack,
}: IdeaCardProps) {
  const { width } = useWindowDimensions();
  const gardenHeight = width * GARDEN_ASPECT * GARDEN_BAND_FRAC;
  const [ideaIndex, setIdeaIndex] = useState(0);
  const idea = ideas[ideaIndex];
  const displayedPrompt = idea.unquoted
    ? idea.prompt
    : `\u201c${idea.prompt}\u201d`;

  const showAnotherIdea = () => {
    if (ideas.length < 2) {
      return;
    }
    const nextOffset =
      1 + Math.floor(Math.random() * (ideas.length - 1));
    setIdeaIndex((current) => (current + nextOffset) % ideas.length);
  };

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
          {showBee ? (
            <View style={styles.beeScene}>
              <Svg
                width={250}
                height={130}
                viewBox="0 0 250 130"
                fill="none"
                style={StyleSheet.absoluteFill}
              >
                <Path
                  d="M18 111 C 42 81, 65 88, 88 105"
                  stroke={colors.softText}
                  strokeOpacity={0.35}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeDasharray="2 8"
                />
                <Path
                  d="M183 105 C 201 91, 221 91, 235 106"
                  stroke={colors.softText}
                  strokeOpacity={0.3}
                  strokeWidth={2}
                  strokeLinecap="round"
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
          ) : null}

          <Text
            style={[
              styles.kicker,
              titleKicker && styles.titleKicker,
              compactTitle && styles.compactTitle,
            ]}
          >
            {idea.kicker ?? kicker}
          </Text>

          <View
            style={[
              styles.card,
              { backgroundColor: cardColor },
              compactCard && styles.compactCard,
              idea.long && styles.longCard,
            ]}
          >
            <Text style={[styles.prompt, idea.long && styles.longPrompt]}>
              {displayedPrompt}
            </Text>
            {idea.guidance ? (
              <Text style={[styles.guidance, idea.long && styles.longGuidance]}>
                {idea.guidance}
              </Text>
            ) : null}
          </View>
        </View>

        <View style={styles.actions}>
          {showPrimaryButton ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={
                primaryButtonLabel === 'Another idea'
                  ? `Show another ${ideaKind} idea`
                  : primaryButtonLabel
              }
              onPress={onPrimaryPress ?? showAnotherIdea}
              style={({ pressed }) => [
                styles.anotherButton,
                { backgroundColor: anotherButtonColor },
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.anotherButtonText}>{primaryButtonLabel}</Text>
              {primaryButtonIcon === 'refresh' ? (
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M19 8a8 8 0 1 0 1 7"
                    stroke={colors.navy}
                    strokeWidth={2.2}
                    strokeLinecap="round"
                  />
                  <Path
                    d="M19 3v5h-5"
                    stroke={colors.navy}
                    strokeWidth={2.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              ) : primaryButtonIcon === 'next' ? (
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M9 4l7 8-7 8"
                    stroke={colors.navy}
                    strokeWidth={2.4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              ) : null}
            </Pressable>
          ) : null}

          {showSecondaryButton ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={secondaryButtonLabel}
              onPress={onBack}
              style={({ pressed }) => [
                styles.backButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.backButtonText}>{secondaryButtonLabel}</Text>
            </Pressable>
          ) : null}
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
    paddingTop: 76,
    paddingHorizontal: 28,
    zIndex: 1,
  },
  beeScene: {
    width: 250,
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -52,
  },
  bee: {
    width: 125,
    height: 125,
  },
  kicker: {
    fontFamily: Platform.select({
      ios: 'Caveat_700Bold',
      android: 'Caveat_700Bold',
      default: 'System',
    }),
    fontSize: 40,
    lineHeight: 48,
    color: colors.plum,
    marginBottom: 18,
  },
  titleKicker: {
    fontFamily: Platform.select({
      ios: 'Fraunces_700Bold',
      android: 'Fraunces_700Bold',
      default: 'serif',
    }),
    color: colors.navy,
  },
  compactTitle: {
    fontSize: 30,
    lineHeight: 38,
  },
  card: {
    width: '100%',
    minHeight: 270,
    justifyContent: 'space-evenly',
    backgroundColor: colors.purpleSoft,
    borderWidth: 2,
    borderColor: colors.daisyOutline,
    borderRadius: 28,
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  compactCard: {
    minHeight: 220,
  },
  prompt: {
    fontFamily: Platform.select({
      ios: 'Fraunces_600SemiBold',
      android: 'Fraunces_600SemiBold',
      default: 'serif',
    }),
    fontSize: 29,
    lineHeight: 39,
    color: colors.navy,
    textAlign: 'center',
  },
  longPrompt: {
    fontFamily: Platform.select({
      ios: 'Fraunces_600SemiBold',
      android: 'Fraunces_600SemiBold',
      default: 'serif',
    }),
    fontSize: 24,
    lineHeight: 32,
  },
  guidance: {
    fontFamily: Platform.select({
      ios: 'Fraunces_600SemiBold',
      android: 'Fraunces_600SemiBold',
      default: 'serif',
    }),
    fontSize: 27,
    lineHeight: 37,
    color: colors.navy,
    textAlign: 'center',
  },
  longCard: {
    minHeight: 330,
  },
  longGuidance: {
    fontFamily: Platform.select({
      ios: 'Fraunces_600SemiBold',
      android: 'Fraunces_600SemiBold',
      default: 'serif',
    }),
    fontSize: 24,
    lineHeight: 32,
  },
  actions: {
    paddingHorizontal: 28,
    paddingBottom: 12,
    gap: 10,
    zIndex: 1,
  },
  anotherButton: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 30,
  },
  backButton: {
    minHeight: 64,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.daisyOutline,
    borderRadius: 30,
  },
  anotherButtonText: {
    fontFamily: Platform.select({
      ios: 'Nunito_700Bold',
      android: 'Nunito_700Bold',
      default: 'System',
    }),
    fontSize: 24,
    color: colors.navy,
  },
  backButtonText: {
    fontFamily: Platform.select({
      ios: 'Nunito_700Bold',
      android: 'Nunito_700Bold',
      default: 'System',
    }),
    fontSize: 24,
    color: colors.navy,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
});
