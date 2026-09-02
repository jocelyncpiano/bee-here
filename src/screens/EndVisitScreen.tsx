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
import Svg, { Circle, Path } from 'react-native-svg';
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

function ClosingIllustration() {
  return (
    <View style={styles.illustration}>
      <Svg
        width={210}
        height={210}
        viewBox="0 0 210 210"
        style={StyleSheet.absoluteFill}
      >
        <Circle cx={105} cy={105} r={94} fill={colors.yellowSoft} />
        <Path d={heart(105, 112, 47)} fill={colors.pink} />
        <Circle cx={50} cy={116} r={12} fill={colors.white} />
        <Circle cx={42} cy={108} r={12} fill={colors.white} />
        <Circle cx={58} cy={108} r={12} fill={colors.white} />
        <Circle cx={50} cy={100} r={12} fill={colors.white} />
        <Circle cx={50} cy={108} r={7} fill={colors.yellow} />
        <Circle cx={165} cy={137} r={9} fill={colors.pinkSoft} />
        <Circle cx={158} cy={130} r={9} fill={colors.pinkSoft} />
        <Circle cx={172} cy={130} r={9} fill={colors.pinkSoft} />
        <Circle cx={165} cy={123} r={9} fill={colors.pinkSoft} />
        <Circle cx={165} cy={130} r={5} fill={colors.yellow} />
      </Svg>
      <Image
        source={require('../../assets/bee.png')}
        style={styles.bee}
        resizeMode="contain"
        accessibilityLabel="Buzzy resting on a heart surrounded by flowers"
      />
    </View>
  );
}

type EndVisitScreenProps = {
  onEndVisit?: () => void;
  onKeepVisiting?: () => void;
};

export default function EndVisitScreen({
  onEndVisit,
  onKeepVisiting,
}: EndVisitScreenProps) {
  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <ClosingIllustration />

        <Text style={styles.title} accessibilityRole="header">
          Ready to head out?
        </Text>
        <Text style={styles.kicker}>Before you go...</Text>

        <View style={styles.message}>
          <Text style={styles.body}>
            You didn’t need a perfect conversation.
          </Text>
          <Text style={styles.body}>
            You didn’t need them to remember everything.
          </Text>
          <Text style={styles.body}>
            You showed up.{'\n'}And that matters.
          </Text>
          <Text style={styles.body}>Thanks for being here.</Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="End visit"
            onPress={onEndVisit}
            style={({ pressed }) => [
              styles.endButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>End Visit</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Keep visiting"
            onPress={onKeepVisiting}
            style={({ pressed }) => [
              styles.keepButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>Keep Visiting</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

export function VisitCompleteScreen({
  onDone,
}: {
  onDone?: () => void;
}) {
  const { width } = useWindowDimensions();
  const gardenHeight = width * GARDEN_ASPECT * GARDEN_BAND_FRAC;

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.completeSafe} edges={['top', 'bottom']}>
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

        <View style={styles.completeContent}>
          <ClosingIllustration />
          <Text style={styles.completeTitle} accessibilityRole="header">
            You made a moment today.
          </Text>
          <Text style={styles.completeSubtitle}>That’s enough.</Text>
        </View>

        <View style={styles.completeActions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Done"
            onPress={onDone}
            style={({ pressed }) => [
              styles.doneButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>Done</Text>
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
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  completeSafe: {
    flex: 1,
    paddingHorizontal: 28,
  },
  gardenBand: {
    position: 'absolute',
    left: -28,
    right: -28,
    bottom: 0,
    overflow: 'hidden',
    backgroundColor: GARDEN_CREAM,
  },
  gardenImage: {
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  illustration: {
    width: 210,
    height: 210,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  bee: {
    width: 120,
    height: 120,
    marginTop: -30,
  },
  title: {
    marginTop: -12,
    fontFamily: Platform.select({
      ios: 'Fraunces_700Bold',
      android: 'Fraunces_700Bold',
      default: 'serif',
    }),
    fontSize: 36,
    lineHeight: 44,
    color: colors.navy,
    textAlign: 'center',
  },
  kicker: {
    marginTop: 14,
    fontFamily: Platform.select({
      ios: 'Nunito_600SemiBold',
      android: 'Nunito_600SemiBold',
      default: 'System',
    }),
    fontSize: 24,
    lineHeight: 32,
    color: colors.navy,
    textAlign: 'center',
  },
  message: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingVertical: 20,
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
    width: '100%',
    paddingBottom: 12,
    gap: 10,
  },
  endButton: {
    minHeight: 64,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.yellow,
    borderRadius: 30,
  },
  keepButton: {
    minHeight: 64,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.daisyOutline,
    borderRadius: 30,
  },
  buttonText: {
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
  completeContent: {
    flex: 1,
    alignItems: 'center',
  },
  completeTitle: {
    marginTop: -12,
    fontFamily: Platform.select({
      ios: 'Fraunces_700Bold',
      android: 'Fraunces_700Bold',
      default: 'serif',
    }),
    fontSize: 36,
    lineHeight: 44,
    color: colors.navy,
    textAlign: 'center',
  },
  completeSubtitle: {
    marginTop: 14,
    fontFamily: Platform.select({
      ios: 'Nunito_600SemiBold',
      android: 'Nunito_600SemiBold',
      default: 'System',
    }),
    fontSize: 24,
    lineHeight: 32,
    color: colors.navy,
    textAlign: 'center',
  },
  completeActions: {
    paddingBottom: 12,
    zIndex: 1,
  },
  doneButton: {
    minHeight: 64,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.yellow,
    borderRadius: 30,
  },
});
