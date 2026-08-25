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

type ConversationIdea = {
  prompt: string;
  guidance: string;
  unquoted?: boolean;
  long?: boolean;
};

const CONVERSATION_IDEAS: ConversationIdea[] = [
  {
    prompt: "I'm really happy to spend some time with you today.",
    guidance: "You don't always have to ask a question.",
  },
  {
    prompt: 'What kind of music do you enjoy?',
    guidance: 'Follow wherever the conversation goes.',
  },
  {
    prompt: "It's nice sitting here with you.",
    guidance: 'Sometimes a simple comment is enough.',
  },
  {
    prompt: 'This is such a nice room.',
    guidance: 'Look around together and notice something nearby.',
  },
  {
    prompt: 'What foods do you really enjoy?',
    guidance:
      'If answering seems difficult, share something you like instead.',
  },
  {
    prompt: "It's a beautiful day today.",
    guidance: 'Talk about what you can see, hear, or feel right now.',
  },
  {
    prompt: 'I heard a song today that made me smile.',
    guidance:
      'Sharing something about yourself can take the pressure off them.',
  },
  {
    prompt: "I'm glad I'm here with you.",
    guidance: "That's enough.",
  },
  {
    prompt:
      'Instead of:\n"Do you remember when...?"\n\nTry:\n"I was thinking about the time we..."',
    guidance:
      'It lets you share a memory without making them prove they remember it.',
    unquoted: true,
    long: true,
  },
  {
    prompt: 'Tell me about something you enjoy.',
    guidance:
      "If the question doesn't go anywhere, that's okay. Try something else.",
  },
];

export default function ConversationScreen({
  onBack,
}: {
  onBack?: () => void;
}) {
  const { width } = useWindowDimensions();
  const gardenHeight = width * GARDEN_ASPECT * GARDEN_BAND_FRAC;
  const [ideaIndex, setIdeaIndex] = useState(0);
  const idea = CONVERSATION_IDEAS[ideaIndex];
  const displayedPrompt = idea.unquoted
    ? idea.prompt
    : `\u201c${idea.prompt}\u201d`;

  const showAnotherIdea = () => {
    const nextOffset =
      1 + Math.floor(Math.random() * (CONVERSATION_IDEAS.length - 1));
    setIdeaIndex((current) => (current + nextOffset) % CONVERSATION_IDEAS.length);
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
          <Text style={styles.kicker}>Try this</Text>

          <View style={[styles.card, idea.long && styles.longCard]}>
            <Text style={[styles.prompt, idea.long && styles.longPrompt]}>
              {displayedPrompt}
            </Text>
            <Text style={[styles.guidance, idea.long && styles.longGuidance]}>
              {idea.guidance}
            </Text>
          </View>
        </View>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Show another conversation idea"
            onPress={showAnotherIdea}
            style={({ pressed }) => [
              styles.anotherButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.anotherButtonText}>Another idea</Text>
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
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back to Visit Garden"
            onPress={onBack}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.backButtonText}>Back to Visit Garden</Text>
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
    paddingTop: 76,
    paddingHorizontal: 28,
    zIndex: 1,
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
    backgroundColor: colors.purple,
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
