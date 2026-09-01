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

export type HelpTopicId =
  | 'identity'
  | 'home'
  | 'repeating'
  | 'upset'
  | 'missing-person'
  | 'untrue'
  | 'not-talking'
  | 'unknown-answer'
  | 'nothing-to-say';

type HelpTopic = {
  id: HelpTopicId;
  label: string;
  tint: string;
};

const HELP_TOPICS: HelpTopic[] = [
  {
    id: 'identity',
    label: "They don't know who I am",
    tint: colors.yellowSoft,
  },
  {
    id: 'home',
    label: 'They want to go home',
    tint: colors.pinkSoft,
  },
  {
    id: 'repeating',
    label: "They're repeating themselves",
    tint: colors.greenSoft,
  },
  {
    id: 'upset',
    label: "They're upset with me",
    tint: colors.lightBlue,
  },
  {
    id: 'missing-person',
    label: "They're asking for someone who isn't here",
    tint: colors.purpleSoft,
  },
  {
    id: 'untrue',
    label: "They're saying something that isn't true",
    tint: colors.yellowSoft,
  },
  {
    id: 'not-talking',
    label: "They're not talking",
    tint: colors.pinkSoft,
  },
  {
    id: 'unknown-answer',
    label: "They asked me something I don't know how to answer",
    tint: colors.greenSoft,
  },
  {
    id: 'nothing-to-say',
    label: "I just don't know what to say",
    tint: colors.lightBlue,
  },
];

export default function HelpScreen({
  onSelectTopic,
  onBack,
}: {
  onSelectTopic?: (topic: HelpTopicId) => void;
  onBack?: () => void;
}) {
  const { width } = useWindowDimensions();
  const gardenHeight = width * GARDEN_ASPECT * GARDEN_BAND_FRAC;
  const [page, setPage] = useState<0 | 1>(0);
  const visibleTopics = page === 0 ? HELP_TOPICS.slice(0, 5) : HELP_TOPICS.slice(5);

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safe} edges={['top']}>
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
          <View style={styles.header}>
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

            <Text style={styles.title} accessibilityRole="header">
              What&apos;s happening?
            </Text>
            <Text style={styles.pageIndicator}>{page + 1} of 2</Text>
          </View>

          <View style={styles.options}>
            {visibleTopics.map((topic) => (
            <Pressable
              key={topic.id}
              accessibilityRole="button"
              accessibilityLabel={topic.label}
              onPress={() => onSelectTopic?.(topic.id)}
              style={({ pressed }) => [
                styles.option,
                { backgroundColor: topic.tint },
                pressed && styles.optionPressed,
              ]}
            >
              <Text style={styles.optionText}>{topic.label}</Text>
            </Pressable>
            ))}
          </View>

          <View style={styles.actions}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={
                page === 0 ? 'More situations' : 'Back to first page'
              }
              onPress={() => setPage(page === 0 ? 1 : 0)}
              style={({ pressed }) => [
                styles.pageButton,
                pressed && styles.optionPressed,
              ]}
            >
              {page === 1 ? (
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M15 4l-7 8 7 8"
                    stroke={colors.navy}
                    strokeWidth={2.4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              ) : null}
              <Text style={styles.pageButtonText}>
                {page === 0 ? 'More situations' : 'Back'}
              </Text>
              {page === 0 ? (
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

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Back to Visit Garden"
              onPress={onBack}
              style={({ pressed }) => [
                styles.gardenButton,
                pressed && styles.optionPressed,
              ]}
            >
              <Text style={styles.gardenButtonText}>
                Back to Visit Garden
              </Text>
            </Pressable>
          </View>
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
    paddingTop: 12,
    paddingHorizontal: 24,
    paddingBottom: 12,
  },
  header: {
    alignItems: 'center',
    marginBottom: 18,
  },
  beeScene: {
    width: 250,
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bee: {
    width: 125,
    height: 125,
  },
  title: {
    fontFamily: Platform.select({
      ios: 'Fraunces_700Bold',
      android: 'Fraunces_700Bold',
      default: 'serif',
    }),
    fontSize: 36,
    lineHeight: 44,
    color: colors.navy,
    textAlign: 'center',
    marginTop: 2,
  },
  pageIndicator: {
    fontFamily: Platform.select({
      ios: 'Nunito_700Bold',
      android: 'Nunito_700Bold',
      default: 'System',
    }),
    fontSize: 24,
    color: colors.softText,
    marginTop: 2,
  },
  options: {
    gap: 12,
  },
  option: {
    minHeight: 58,
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.daisyOutline,
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  optionPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },
  optionText: {
    fontFamily: Platform.select({
      ios: 'Nunito_700Bold',
      android: 'Nunito_700Bold',
      default: 'System',
    }),
    fontSize: 24,
    lineHeight: 30,
    color: colors.navy,
  },
  actions: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingTop: 16,
    paddingBottom: 12,
    paddingHorizontal: 4,
    gap: 10,
  },
  pageButton: {
    minHeight: 62,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 24,
    backgroundColor: colors.yellow,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: colors.daisyOutline,
  },
  pageButtonText: {
    fontFamily: Platform.select({
      ios: 'Nunito_700Bold',
      android: 'Nunito_700Bold',
      default: 'System',
    }),
    fontSize: 24,
    color: colors.navy,
  },
  gardenButton: {
    minHeight: 62,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: colors.white,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: colors.daisyOutline,
  },
  gardenButtonText: {
    fontFamily: Platform.select({
      ios: 'Nunito_700Bold',
      android: 'Nunito_700Bold',
      default: 'System',
    }),
    fontSize: 24,
    color: colors.navy,
  },
});
