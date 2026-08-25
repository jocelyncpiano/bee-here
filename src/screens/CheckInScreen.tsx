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
import Svg, { Path, Circle } from 'react-native-svg';
import { colors } from '../theme/colors';

const TRAIL = '#C9C2B6';
const GARDEN_ASPECT = 1536 / 1024;
// The flowers occupy the bottom ~59% of the source image (top flower at row 636);
// show that whole band so no flower is cropped.
const GARDEN_BAND_FRAC = (1536 - 636) / 1536;
// Cream background baked into the flower image; match it for a seamless blend.
const GARDEN_CREAM = '#FDFBEF';

type CheckInScreenProps = {
  onBack?: () => void;
  onSelect?: (mood: MoodId) => void;
};

type MoodId = 'well' | 'difficult' | 'hard' | 'unsure';
type FaceType = 'happy' | 'neutral' | 'sad' | 'question';

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

/** A small emoji-style face drawn in the given tone. */
function Face({ type, color }: { type: FaceType; color: string }) {
  const mouth =
    type === 'happy'
      ? 'M13.5 24 Q 20 30, 26.5 24'
      : type === 'sad'
      ? 'M13.5 27 Q 20 21, 26.5 27'
      : 'M14 25 L 26 25';
  return (
    <Svg width={30} height={30} viewBox="0 0 40 40" fill="none">
      <Circle cx={14.5} cy={17} r={2.4} fill={color} />
      <Circle cx={25.5} cy={17} r={2.4} fill={color} />
      <Path
        d={mouth}
        stroke={color}
        strokeWidth={2.6}
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}

type Mood = {
  id: MoodId;
  face: FaceType;
  tint: string;
  iconBg: string;
  faceColor: string;
  label: string;
};

const MOODS: Mood[] = [
  {
    id: 'well',
    face: 'happy',
    tint: '#E2F3E3',
    iconBg: colors.green,
    faceColor: '#2F6B45',
    label: 'Things are going well',
  },
  {
    id: 'difficult',
    face: 'neutral',
    tint: '#FFF2CF',
    iconBg: colors.yellow,
    faceColor: '#9A6B12',
    label: 'A little difficult',
  },
  {
    id: 'hard',
    face: 'sad',
    tint: '#FFE4DB',
    iconBg: colors.pink,
    faceColor: '#B44A3A',
    label: "It's a really hard day",
  },
  {
    id: 'unsure',
    face: 'question',
    tint: '#F1E7FA',
    iconBg: colors.purple,
    faceColor: colors.plum,
    label: 'Not sure',
  },
];

/** Mood check-in — "How are things right now?". */
export default function CheckInScreen({
  onBack,
  onSelect,
}: CheckInScreenProps) {
  const { width } = useWindowDimensions();
  const gardenHeight = width * GARDEN_ASPECT * GARDEN_BAND_FRAC;

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.stage}>
          {/* Garden strip anchored at the bottom */}
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

          <View style={[styles.content, { paddingBottom: gardenHeight }]}>
            {/* Header */}
            <View style={styles.header}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Go back"
                onPress={onBack}
                hitSlop={12}
                style={styles.headerButton}
              >
                <Svg width={26} height={26} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M15 4l-7 8 7 8"
                    stroke={colors.navy}
                    strokeWidth={2.4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </Pressable>
            </View>

            {/* Buzzy with a dotted heart trail */}
            <View style={styles.beeRow}>
              <Svg width={70} height={48} viewBox="0 0 70 48" fill="none">
                <Path
                  d="M4 40 C 14 26, 30 26, 40 34"
                  stroke={TRAIL}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeDasharray="1 7"
                  fill="none"
                />
                <Path
                  d={heart(26, 18, 11)}
                  stroke={TRAIL}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="1 7"
                  fill="none"
                />
              </Svg>
              <Image
                source={require('../../assets/bee.png')}
                style={styles.bee}
                resizeMode="contain"
                accessibilityLabel="Buzzy the bee"
              />
            </View>

            {/* Prompt */}
            <Text style={styles.title} accessibilityRole="header">
              How are things right now?
            </Text>
            <Text style={styles.subtitle}>
              This helps Buzzy give helpful ideas.
            </Text>

            {/* Mood options */}
            <View style={styles.options}>
              {MOODS.map((mood) => (
                <Pressable
                  key={mood.id}
                  accessibilityRole="button"
                  accessibilityLabel={mood.label}
                  onPress={() => onSelect?.(mood.id)}
                  style={({ pressed }) => [
                    styles.card,
                    { backgroundColor: mood.tint },
                    pressed && styles.cardPressed,
                  ]}
                >
                  <View style={[styles.iconCircle, { backgroundColor: mood.iconBg }]}>
                    {mood.face === 'question' ? (
                      <Text style={[styles.questionMark, { color: mood.faceColor }]}>
                        ?
                      </Text>
                    ) : (
                      <Face type={mood.face} color={mood.faceColor} />
                    )}
                  </View>
                  <Text style={styles.cardLabel}>{mood.label}</Text>
                </Pressable>
              ))}
            </View>
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
    backgroundColor: 'transparent',
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
    backgroundColor: GARDEN_CREAM,
    zIndex: 0,
  },
  gardenImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 4,
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  beeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  bee: {
    width: 80,
    height: 80,
  },
  title: {
    fontFamily: Platform.select({
      ios: 'Fraunces_700Bold',
      android: 'Fraunces_700Bold',
      default: 'serif',
    }),
    fontSize: 32,
    lineHeight: 38,
    color: colors.navy,
    textAlign: 'center',
    alignSelf: 'center',
    maxWidth: 260,
    marginTop: 6,
  },
  subtitle: {
    fontFamily: Platform.select({
      ios: 'Nunito_600SemiBold',
      android: 'Nunito_600SemiBold',
      default: 'System',
    }),
    fontSize: 24,
    lineHeight: 30,
    color: colors.softText,
    textAlign: 'center',
    alignSelf: 'center',
    maxWidth: 240,
    marginTop: 4,
  },
  options: {
    marginTop: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginBottom: 10,
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  questionMark: {
    fontFamily: Platform.select({
      ios: 'Nunito_700Bold',
      android: 'Nunito_700Bold',
      default: 'System',
    }),
    fontSize: 26,
  },
  cardLabel: {
    flex: 1,
    fontFamily: Platform.select({
      ios: 'Nunito_700Bold',
      android: 'Nunito_700Bold',
      default: 'System',
    }),
    fontSize: 24,
    color: colors.navy,
  },
});
