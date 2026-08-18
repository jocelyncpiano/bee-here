import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type BeeWithTrailProps = {
  size?: number;
};

const TRAIL = '#B9B2A6';

/** A small heart outline centered at (cx, cy) with radius s. */
function heart(cx: number, cy: number, s: number): string {
  return (
    `M ${cx} ${cy + s * 0.28} ` +
    `C ${cx} ${cy - s * 0.35}, ${cx - s} ${cy - s * 0.35}, ${cx - s} ${cy + s * 0.12} ` +
    `C ${cx - s} ${cy + s * 0.5}, ${cx} ${cy + s * 0.8}, ${cx} ${cy + s * 1.05} ` +
    `C ${cx} ${cy + s * 0.8}, ${cx + s} ${cy + s * 0.5}, ${cx + s} ${cy + s * 0.12} ` +
    `C ${cx + s} ${cy - s * 0.35}, ${cx} ${cy - s * 0.35}, ${cx} ${cy + s * 0.28} Z`
  );
}

/**
 * The friendly bee (Buzzy) flying across with a dotted flight path that has a
 * little heart before and after, mirroring the welcome illustration.
 */
export default function BeeWithTrail({ size = 96 }: BeeWithTrailProps) {
  const w = size * 2.5;
  const h = size * 0.95;

  return (
    <View style={[styles.wrap, { width: w, height: h }]}>
      <Svg
        width={w}
        height={h}
        viewBox="0 0 250 95"
        style={StyleSheet.absoluteFill}
        fill="none"
      >
        {/* Incoming flight path + heart (before the bee) */}
        <Path
          d="M12 66 C 26 40, 48 42, 74 56"
          stroke={TRAIL}
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray="1 7"
          fill="none"
        />
        <Path
          d={heart(20, 40, 8)}
          stroke={TRAIL}
          strokeWidth={2}
          strokeLinejoin="round"
          fill="none"
        />

        {/* Outgoing flight path + heart (after the bee) */}
        <Path
          d="M176 52 C 200 66, 222 62, 236 40"
          stroke={TRAIL}
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray="1 7"
          fill="none"
        />
        <Path
          d={heart(236, 28, 8)}
          stroke={TRAIL}
          strokeWidth={2}
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>

      <Image
        source={require('../../assets/bee.png')}
        style={{ width: size, height: size }}
        resizeMode="contain"
        accessibilityLabel="Buzzy the bee"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
