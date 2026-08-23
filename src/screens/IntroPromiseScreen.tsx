import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';
import { colors } from '../theme/colors';

/** A small heart outline/fill centered at (cx, cy) with radius s. */
function heart(cx: number, cy: number, s: number): string {
  return (
    `M ${cx} ${cy + s * 0.3} ` +
    `C ${cx} ${cy - s * 0.35}, ${cx - s} ${cy - s * 0.35}, ${cx - s} ${cy + s * 0.12} ` +
    `C ${cx - s} ${cy + s * 0.52}, ${cx} ${cy + s * 0.82}, ${cx} ${cy + s * 1.08} ` +
    `C ${cx} ${cy + s * 0.82}, ${cx + s} ${cy + s * 0.52}, ${cx + s} ${cy + s * 0.12} ` +
    `C ${cx + s} ${cy - s * 0.35}, ${cx} ${cy - s * 0.35}, ${cx} ${cy + s * 0.3} Z`
  );
}

function HeartIcon() {
  return (
    <Svg width={34} height={34} viewBox="0 0 40 40" fill="none">
      <Path d={heart(20, 12, 12)} fill={colors.greenDeep} />
    </Svg>
  );
}

function FlowerIcon() {
  const petals = [
    [20, 12],
    [27.6, 17.5],
    [24.7, 26.5],
    [15.3, 26.5],
    [12.4, 17.5],
  ];
  return (
    <Svg width={34} height={34} viewBox="0 0 40 40" fill="none">
      {petals.map(([cx, cy], i) => (
        <Circle key={i} cx={cx} cy={cy} r={6.4} fill={colors.plum} />
      ))}
      <Circle cx={20} cy={20} r={5} fill={colors.yellow} />
    </Svg>
  );
}

function HandsIcon() {
  return (
    <Svg width={36} height={36} viewBox="0 0 40 40" fill="none">
      <Path d={heart(20, 11, 8)} fill={colors.daisyCenter} />
      <Path
        d="M8 22 C 8 33, 32 33, 32 22"
        stroke={colors.daisyCenter}
        strokeWidth={4}
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}

type Promise = {
  Icon: () => React.JSX.Element;
  tint: string;
  title: string;
  body: string;
};

const PROMISES: Promise[] = [
  {
    Icon: HeartIcon,
    tint: 'rgba(183,227,198,0.5)',
    title: "You don't have to get it right.",
    body: "There's no perfect visit.",
  },
  {
    Icon: FlowerIcon,
    tint: 'rgba(220,198,255,0.5)',
    title: 'Small moments matter.',
    body: "Connection doesn't require memory.",
  },
  {
    Icon: HandsIcon,
    tint: 'rgba(255,214,107,0.4)',
    title: "You're not alone.",
    body: 'Buzzy is here to help.',
  },
];

/** Intro page 2 — "Our Promise to You". */
export default function IntroPromiseScreen({
  onBegin,
}: {
  onBegin?: () => void;
}) {
  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={styles.content}>
          <Text style={styles.kicker} accessibilityRole="header">
            OUR PROMISE TO YOU
          </Text>

          {PROMISES.map(({ Icon, tint, title, body }) => (
            <View key={title} style={styles.row}>
              <View style={[styles.iconCircle, { backgroundColor: tint }]}>
                <Icon />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.rowTitle}>{title}</Text>
                <Text style={styles.rowBody}>{body}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Let's begin"
            onPress={onBegin}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>Let's begin</Text>
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
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  kicker: {
    fontFamily: Platform.select({
      ios: 'Nunito_700Bold',
      android: 'Nunito_700Bold',
      default: 'System',
    }),
    fontSize: 26,
    letterSpacing: 2,
    color: colors.greenDeep,
    textAlign: 'center',
    marginBottom: 28,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 26,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 18,
  },
  rowText: {
    flex: 1,
  },
  rowTitle: {
    fontFamily: Platform.select({
      ios: 'Nunito_700Bold',
      android: 'Nunito_700Bold',
      default: 'System',
    }),
    fontSize: 25,
    lineHeight: 31,
    color: colors.navy,
  },
  rowBody: {
    fontFamily: Platform.select({
      ios: 'Nunito_600SemiBold',
      android: 'Nunito_600SemiBold',
      default: 'System',
    }),
    fontSize: 24,
    lineHeight: 30,
    color: colors.softText,
    marginTop: 2,
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
