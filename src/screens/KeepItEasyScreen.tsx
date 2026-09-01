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

const OPTIONS = [
  { id: 'music', label: 'Put on some music', color: colors.yellowSoft },
  { id: 'together', label: 'Do something together', color: colors.pinkSoft },
  { id: 'quiet', label: 'Just sit together', color: colors.greenSoft },
  {
    id: 'conversation',
    label: 'Try a conversation idea',
    color: colors.lightBlue,
  },
] as const;

export type KeepItEasyOption = (typeof OPTIONS)[number]['id'];

export default function KeepItEasyScreen({
  onSelectOption,
  onAnotherProblem,
}: {
  onSelectOption?: (option: KeepItEasyOption) => void;
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
          <Text style={styles.title}>Keep it easy.</Text>

          <View style={styles.youCould}>
            <Text style={styles.optionText}>You could:</Text>
          </View>

          {OPTIONS.map((option) => (
            <Pressable
              key={option.id}
              accessibilityRole="button"
              accessibilityLabel={option.label}
              onPress={() => onSelectOption?.(option.id)}
              style={({ pressed }) => [
                styles.option,
                { backgroundColor: option.color },
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.optionText}>{option.label}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Another problem"
            onPress={onAnotherProblem}
            style={({ pressed }) => [
              styles.anotherProblem,
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
    fontSize: 40,
    lineHeight: 48,
    color: colors.navy,
    textAlign: 'center',
    marginBottom: 8,
  },
  youCould: {
    minHeight: 58,
    justifyContent: 'center',
    backgroundColor: colors.purpleSoft,
    borderWidth: 2,
    borderColor: colors.daisyOutline,
    borderRadius: 26,
    paddingHorizontal: 22,
  },
  option: {
    minHeight: 64,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.daisyOutline,
    borderRadius: 26,
    paddingHorizontal: 22,
  },
  optionText: {
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
  anotherProblem: {
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
