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
import Svg, { Path, Circle, Ellipse, G } from 'react-native-svg';
import { colors } from '../theme/colors';

export type TopicId =
  | 'conversation'
  | 'music'
  | 'look'
  | 'activities'
  | 'quiet';

type ConnectScreenProps = {
  onSelectTopic?: (topic: TopicId) => void;
  onNeedHelp?: () => void;
};

type PetalStyle = 'daisy' | 'sun' | 'round';

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

const CENTER_X = 50;
const CENTER_Y = 46;

function Petals({ style, fill }: { style: PetalStyle; fill: string }) {
  const count = style === 'round' ? 6 : 12;
  const origin = `${CENTER_X}, ${CENTER_Y}`;
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const angle = (360 / count) * i;
        return (
          <G key={i} rotation={angle} origin={origin}>
            {style === 'daisy' ? (
              <Ellipse
                cx={CENTER_X}
                cy={CENTER_Y - 26}
                rx={7}
                ry={16}
                fill={fill}
                stroke={colors.daisyOutline}
                strokeWidth={1.8}
              />
            ) : style === 'sun' ? (
              <Path
                d={`M ${CENTER_X} ${CENTER_Y - 44}
                    C ${CENTER_X + 7} ${CENTER_Y - 30}, ${CENTER_X + 7} ${CENTER_Y - 20}, ${CENTER_X} ${CENTER_Y - 12}
                    C ${CENTER_X - 7} ${CENTER_Y - 20}, ${CENTER_X - 7} ${CENTER_Y - 30}, ${CENTER_X} ${CENTER_Y - 44} Z`}
                fill={fill}
              />
            ) : (
              <Circle
                cx={CENTER_X}
                cy={CENTER_Y - 22}
                r={16}
                fill={fill}
              />
            )}
          </G>
        );
      })}
      {style === 'round' ? (
        <Circle cx={CENTER_X} cy={CENTER_Y} r={18} fill={fill} />
      ) : null}
    </>
  );
}

function Stem() {
  return (
    <>
      <Path
        d={`M ${CENTER_X} ${CENTER_Y + 24} V ${CENTER_Y + 62}`}
        stroke={colors.stem}
        strokeWidth={3.4}
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d={`M ${CENTER_X} ${CENTER_Y + 48}
            C ${CENTER_X - 12} ${CENTER_Y + 42}, ${CENTER_X - 18} ${CENTER_Y + 52}, ${CENTER_X - 15} ${CENTER_Y + 60}
            C ${CENTER_X - 6} ${CENTER_Y + 61}, ${CENTER_X - 1} ${CENTER_Y + 55}, ${CENTER_X} ${CENTER_Y + 48} Z`}
        fill={colors.leaf}
      />
      <Path
        d={`M ${CENTER_X} ${CENTER_Y + 48}
            C ${CENTER_X + 12} ${CENTER_Y + 42}, ${CENTER_X + 18} ${CENTER_Y + 52}, ${CENTER_X + 15} ${CENTER_Y + 60}
            C ${CENTER_X + 6} ${CENTER_Y + 61}, ${CENTER_X + 1} ${CENTER_Y + 55}, ${CENTER_X} ${CENTER_Y + 48} Z`}
        fill={colors.leaf}
      />
    </>
  );
}

function ConversationIcon() {
  return (
    <>
      <Circle cx={CENTER_X} cy={CENTER_Y} r={13} fill={colors.daisyCenter} />
      {[-6, 0, 6].map((dx) => (
        <Circle
          key={dx}
          cx={CENTER_X + dx}
          cy={CENTER_Y}
          r={2.4}
          fill={colors.buttonText}
        />
      ))}
    </>
  );
}

function MusicIcon() {
  return (
    <>
      <Circle cx={CENTER_X} cy={CENTER_Y} r={14} fill={colors.buttonText} />
      <Path
        d={`M ${CENTER_X - 4} ${CENTER_Y + 8} V ${CENTER_Y - 4} L ${CENTER_X + 9} ${CENTER_Y - 7} V ${CENTER_Y + 4}`}
        stroke={colors.yellow}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Ellipse
        cx={CENTER_X - 6.6}
        cy={CENTER_Y + 8.4}
        rx={3.4}
        ry={2.8}
        fill={colors.yellow}
      />
      <Ellipse
        cx={CENTER_X + 6.4}
        cy={CENTER_Y + 4.4}
        rx={3.4}
        ry={2.8}
        fill={colors.yellow}
      />
    </>
  );
}

function PinwheelIcon() {
  const bladeColors = [
    colors.yellow,
    colors.greenDeep,
    colors.plum,
    colors.sky,
  ];

  return (
    <>
      <Path
        d={`M ${CENTER_X} ${CENTER_Y + 4} L ${CENTER_X + 8} ${CENTER_Y + 20}`}
        stroke={colors.navy}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      {bladeColors.map((color, index) => (
        <G
          key={color}
          rotation={index * 90}
          origin={`${CENTER_X}, ${CENTER_Y}`}
        >
          <Path
            d={`M ${CENTER_X} ${CENTER_Y}
                C ${CENTER_X - 1} ${CENTER_Y - 12}, ${CENTER_X + 5} ${CENTER_Y - 18}, ${CENTER_X + 14} ${CENTER_Y - 18}
                C ${CENTER_X + 14} ${CENTER_Y - 9}, ${CENTER_X + 9} ${CENTER_Y - 3}, ${CENTER_X} ${CENTER_Y} Z`}
            fill={color}
          />
        </G>
      ))}
      <Circle
        cx={CENTER_X}
        cy={CENTER_Y}
        r={4}
        fill={colors.navy}
      />
    </>
  );
}

function ActivitiesIcon() {
  return (
    <G scale={0.78} origin={`${CENTER_X}, ${CENTER_Y}`}>
      <Path
        d={`M ${CENTER_X - 2} ${CENTER_Y + 20}
            V ${CENTER_Y + 7}
            C ${CENTER_X - 5} ${CENTER_Y + 3}, ${CENTER_X - 9} ${CENTER_Y}, ${CENTER_X - 13} ${CENTER_Y - 4}
            C ${CENTER_X - 16} ${CENTER_Y - 7}, ${CENTER_X - 20} ${CENTER_Y - 5}, ${CENTER_X - 18} ${CENTER_Y - 1}
            L ${CENTER_X - 12} ${CENTER_Y + 5}
            C ${CENTER_X - 19} ${CENTER_Y + 2}, ${CENTER_X - 23} ${CENTER_Y - 3}, ${CENTER_X - 24} ${CENTER_Y - 10}
            C ${CENTER_X - 25} ${CENTER_Y - 14}, ${CENTER_X - 30} ${CENTER_Y - 13}, ${CENTER_X - 29} ${CENTER_Y - 8}
            L ${CENTER_X - 27} ${CENTER_Y + 2}
            C ${CENTER_X - 25} ${CENTER_Y + 10}, ${CENTER_X - 18} ${CENTER_Y + 14}, ${CENTER_X - 11} ${CENTER_Y + 17}
            V ${CENTER_Y + 20} Z`}
        fill={colors.navy}
      />
      <Path
        d={`M ${CENTER_X + 2} ${CENTER_Y + 20}
            V ${CENTER_Y + 7}
            C ${CENTER_X + 5} ${CENTER_Y + 3}, ${CENTER_X + 9} ${CENTER_Y}, ${CENTER_X + 13} ${CENTER_Y - 4}
            C ${CENTER_X + 16} ${CENTER_Y - 7}, ${CENTER_X + 20} ${CENTER_Y - 5}, ${CENTER_X + 18} ${CENTER_Y - 1}
            L ${CENTER_X + 12} ${CENTER_Y + 5}
            C ${CENTER_X + 19} ${CENTER_Y + 2}, ${CENTER_X + 23} ${CENTER_Y - 3}, ${CENTER_X + 24} ${CENTER_Y - 10}
            C ${CENTER_X + 25} ${CENTER_Y - 14}, ${CENTER_X + 30} ${CENTER_Y - 13}, ${CENTER_X + 29} ${CENTER_Y - 8}
            L ${CENTER_X + 27} ${CENTER_Y + 2}
            C ${CENTER_X + 25} ${CENTER_Y + 10}, ${CENTER_X + 18} ${CENTER_Y + 14}, ${CENTER_X + 11} ${CENTER_Y + 17}
            V ${CENTER_Y + 20} Z`}
        fill={colors.navy}
      />
      <Path
        d={`M ${CENTER_X - 25} ${CENTER_Y - 8}
            C ${CENTER_X - 24} ${CENTER_Y}, ${CENTER_X - 20} ${CENTER_Y + 5}, ${CENTER_X - 14} ${CENTER_Y + 7}
            M ${CENTER_X + 25} ${CENTER_Y - 8}
            C ${CENTER_X + 24} ${CENTER_Y}, ${CENTER_X + 20} ${CENTER_Y + 5}, ${CENTER_X + 14} ${CENTER_Y + 7}`}
        stroke={colors.purple}
        strokeWidth={2.2}
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d={heart(CENTER_X, CENTER_Y - 16, 10)}
        fill={colors.white}
      />
    </G>
  );
}

function QuietIcon() {
  return <Path d={heart(CENTER_X, CENTER_Y - 4, 11)} fill={colors.navy} />;
}

type Topic = {
  id: TopicId;
  label: string;
  petalStyle: PetalStyle;
  petalColor: string;
  Icon: () => React.JSX.Element;
};

const TOPICS: Topic[] = [
  {
    id: 'conversation',
    label: 'Conversation',
    petalStyle: 'daisy',
    petalColor: colors.daisyPetal,
    Icon: ConversationIcon,
  },
  {
    id: 'music',
    label: 'Music',
    petalStyle: 'sun',
    petalColor: colors.yellow,
    Icon: MusicIcon,
  },
  {
    id: 'look',
    label: 'Do Something\nFun',
    petalStyle: 'round',
    petalColor: colors.pink,
    Icon: PinwheelIcon,
  },
  {
    id: 'activities',
    label: 'Activities',
    petalStyle: 'round',
    petalColor: colors.purple,
    Icon: ActivitiesIcon,
  },
  {
    id: 'quiet',
    label: 'Quiet\nTime Together',
    petalStyle: 'round',
    petalColor: colors.sky,
    Icon: QuietIcon,
  },
];

function FlowerButton({
  topic,
  size,
  columnWidth,
  onPress,
}: {
  topic: Topic;
  size: number;
  columnWidth: number;
  onPress?: () => void;
}) {
  const { Icon } = topic;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={topic.label.replace('\n', ' ')}
      onPress={onPress}
      style={({ pressed }) => [
        styles.flowerButton,
        { width: columnWidth },
        pressed && styles.flowerPressed,
      ]}
    >
      <Svg width={size} height={size * 1.18} viewBox="0 0 100 118">
        <Stem />
        <Petals style={topic.petalStyle} fill={topic.petalColor} />
        <Icon />
      </Svg>
      <Text style={styles.flowerLabel}>{topic.label}</Text>
    </Pressable>
  );
}

/** Idea picker — "Let's find a way to connect". */
export default function ConnectScreen({
  onSelectTopic,
  onNeedHelp,
}: ConnectScreenProps) {
  const { width } = useWindowDimensions();
  const columnWidth = (width - 40) / 2;
  const flowerSize = Math.min(112, columnWidth * 0.8);

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={styles.content}>
          <Text style={styles.title} accessibilityRole="header">
            Let's find a way{'\n'}to connect
          </Text>

          <Svg width={26} height={26} viewBox="0 0 26 26" fill="none">
            <Path d={heart(13, 8, 8)} fill={colors.yellow} />
          </Svg>

          <Text style={styles.subtitle}>Tap a flower to get ideas.</Text>

          <View style={styles.grid}>
            <View style={styles.row}>
              {TOPICS.slice(0, 2).map((topic) => (
                <FlowerButton
                  key={topic.id}
                  topic={topic}
                  size={flowerSize}
                  columnWidth={columnWidth}
                  onPress={() => onSelectTopic?.(topic.id)}
                />
              ))}
            </View>
            <View style={styles.row}>
              {TOPICS.slice(2, 4).map((topic) => (
                <FlowerButton
                  key={topic.id}
                  topic={topic}
                  size={flowerSize}
                  columnWidth={columnWidth}
                  onPress={() => onSelectTopic?.(topic.id)}
                />
              ))}
            </View>
            <View style={styles.row}>
              <FlowerButton
                topic={TOPICS[4]}
                size={flowerSize}
                columnWidth={columnWidth}
                onPress={() => onSelectTopic?.(TOPICS[4].id)}
              />
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="I need help right now"
            onPress={onNeedHelp}
            style={({ pressed }) => [
              styles.helpButton,
              pressed && styles.flowerPressed,
            ]}
          >
            <Image
              source={require('../../assets/bee.png')}
              style={styles.helpBee}
              resizeMode="contain"
              accessibilityLabel="Buzzy the bee"
            />
            <Text style={styles.helpText}>I need help right now</Text>
            <Svg width={22} height={22} viewBox="0 0 20 20" fill="none">
              <Path
                d="M7 4l6 6-6 6"
                stroke={colors.navy}
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
    paddingHorizontal: 20,
    paddingTop: 40,
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
    marginTop: 2,
  },
  grid: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'space-evenly',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  flowerButton: {
    alignItems: 'center',
  },
  flowerPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  flowerLabel: {
    fontFamily: Platform.select({
      ios: 'Nunito_700Bold',
      android: 'Nunito_700Bold',
      default: 'System',
    }),
    fontSize: 24,
    lineHeight: 28,
    color: colors.navy,
    textAlign: 'center',
  },
  actions: {
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 8,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: colors.greenDeep,
    paddingVertical: 12,
    paddingHorizontal: 20,
    gap: 10,
  },
  helpBee: {
    width: 34,
    height: 34,
  },
  helpText: {
    fontFamily: Platform.select({
      ios: 'Nunito_700Bold',
      android: 'Nunito_700Bold',
      default: 'System',
    }),
    fontSize: 24,
    color: colors.navy,
  },
});
