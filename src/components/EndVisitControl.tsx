import React from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

type EndVisitControlProps = {
  onEndVisit: () => void;
};

export default function EndVisitControl({
  onEndVisit,
}: EndVisitControlProps) {
  const insets = useSafeAreaInsets();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="End visit"
      onPress={onEndVisit}
      style={({ pressed }) => [
        styles.endVisitButton,
        { top: insets.top + 2 },
        pressed && styles.buttonPressed,
      ]}
    >
      <Text style={styles.endVisitButtonText}>End visit</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  endVisitButton: {
    position: 'absolute',
    right: 16,
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 14,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.daisyOutline,
    borderRadius: 24,
    zIndex: 20,
    elevation: 8,
  },
  endVisitButtonText: {
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
