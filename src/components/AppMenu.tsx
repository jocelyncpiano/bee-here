import React, { useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../theme/colors';

type MenuPage =
  | 'privacy'
  | 'about'
  | 'about-philosophy'
  | 'guidance'
  | 'guidance-support';

const MENU_CONTENT: Record<MenuPage, { title: string; body: string }> = {
  privacy: {
    title: 'Private by design',
    body:
      'Bee Here With Me doesn’t require you to create an account or build a profile for your loved one.\n\nWe don’t need their:\nName • Diagnosis • Birthday • Photograph • Medical history • Family information\n\nEach visit begins fresh.',
  },
  about: {
    title: 'About Bee Here With Me',
    body:
      'Visiting someone living with memory loss can feel intimidating.\n\nWhat do I say?\nWhat if they don’t recognize me?\nWhat if something awkward happens?\n\nBee Here With Me was created to make those moments a little easier.',
  },
  'about-philosophy': {
    title: 'Our philosophy',
    body:
      'Connection doesn’t require perfect memory.\n\nSometimes connection is a conversation.\nSometimes it’s a song.\nSometimes it’s a smile.\nAnd sometimes it’s simply sitting beside someone.',
  },
  guidance: {
    title: 'A gentle reminder',
    body:
      'Every person living with dementia is different.\n\nSomething that feels comforting to one person may not work for another.\n\nFollow their cues, respect their preferences, and ask their caregiver or healthcare professional when you’re unsure.',
  },
  'guidance-support': {
    title: 'General support only',
    body:
      'Bee Here With Me provides general educational and communication support and isn’t a substitute for professional medical advice.',
  },
};

export default function AppMenu() {
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState<MenuPage | null>(null);
  const isTwoPartPage =
    page === 'privacy' ||
    page === 'about' ||
    page === 'about-philosophy' ||
    page === 'guidance' ||
    page === 'guidance-support';

  const closeMenu = () => {
    setOpen(false);
    setPage(null);
  };

  const goBack = () => {
    if (page === 'about-philosophy') {
      setPage('about');
    } else if (page === 'guidance-support') {
      setPage('guidance');
    } else {
      setPage(null);
    }
  };

  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Open menu"
        onPress={() => setOpen(true)}
        style={({ pressed }) => [
          styles.menuButton,
          { top: insets.top + 2 },
          pressed && styles.buttonPressed,
        ]}
      >
        <Svg width={28} height={28} viewBox="0 0 28 28" fill="none">
          <Path
            d="M4 7h20M4 14h20M4 21h20"
            stroke={colors.navy}
            strokeWidth={2.6}
            strokeLinecap="round"
          />
        </Svg>
      </Pressable>

      <Modal
        animationType="fade"
        transparent
        visible={open}
        onRequestClose={closeMenu}
      >
        <View style={styles.backdrop}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close menu"
            onPress={closeMenu}
            style={StyleSheet.absoluteFill}
          />

          <View
            accessibilityViewIsModal
            style={[
              styles.panel,
              {
                paddingTop: insets.top + 18,
                paddingBottom: insets.bottom + 24,
              },
            ]}
          >
            <View
              style={[
                styles.header,
                isTwoPartPage && styles.twoPartHeader,
              ]}
            >
              {isTwoPartPage ? (
                <View style={styles.headerControls}>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Go back"
                    onPress={goBack}
                    hitSlop={12}
                    style={styles.headerBackButton}
                  >
                    <Svg width={28} height={28} viewBox="0 0 28 28" fill="none">
                      <Path
                        d="M18 5l-8 9 8 9"
                        stroke={colors.navy}
                        strokeWidth={2.6}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </Pressable>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Close menu"
                    onPress={closeMenu}
                    hitSlop={12}
                    style={styles.closeButton}
                  >
                    <Svg width={28} height={28} viewBox="0 0 28 28" fill="none">
                      <Path
                        d="M6 6l16 16M22 6L6 22"
                        stroke={colors.navy}
                        strokeWidth={2.6}
                        strokeLinecap="round"
                      />
                    </Svg>
                  </Pressable>
                </View>
              ) : null}
              <Text
                style={[
                  styles.headerTitle,
                  isTwoPartPage && styles.twoPartTitle,
                ]}
              >
                {page ? MENU_CONTENT[page].title : 'Menu'}
              </Text>
              {!isTwoPartPage ? (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Close menu"
                  onPress={closeMenu}
                  hitSlop={12}
                  style={styles.closeButton}
                >
                  <Svg width={28} height={28} viewBox="0 0 28 28" fill="none">
                    <Path
                      d="M6 6l16 16M22 6L6 22"
                      stroke={colors.navy}
                      strokeWidth={2.6}
                      strokeLinecap="round"
                    />
                  </Svg>
                </Pressable>
              ) : null}
            </View>

            {page ? (
              <View style={styles.pageContent}>
                <View style={[
                  styles.infoCard,
                  page === 'privacy' && styles.privacyCard,
                  (page === 'about' ||
                    page === 'about-philosophy' ||
                    page === 'guidance' ||
                    page === 'guidance-support') &&
                    styles.aboutContent,
                ]}>
                  <Text style={styles.pageBody}>
                    {MENU_CONTENT[page].body}
                  </Text>
                </View>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={
                    page === 'about' || page === 'guidance'
                      ? 'Next'
                      : 'Back to menu'
                  }
                  onPress={() =>
                    setPage(
                      page === 'about'
                        ? 'about-philosophy'
                        : page === 'guidance'
                          ? 'guidance-support'
                          : null,
                    )
                  }
                  style={({ pressed }) => [
                    styles.backButton,
                    pressed && styles.buttonPressed,
                  ]}
                >
                  <Text style={styles.backButtonText}>
                    {page === 'about' || page === 'guidance'
                      ? 'Next'
                      : 'Back to menu'}
                  </Text>
                  {page === 'about' || page === 'guidance' ? (
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
              </View>
            ) : (
              <View style={styles.menuItems}>
                {(
                  [
                    ['privacy', 'Privacy'],
                    ['about', 'About'],
                    ['guidance', 'Guidance'],
                  ] as const
                ).map(([id, label]) => (
                  <Pressable
                    key={id}
                    accessibilityRole="button"
                    accessibilityLabel={label}
                    onPress={() => setPage(id)}
                    style={({ pressed }) => [
                      styles.menuItem,
                      pressed && styles.buttonPressed,
                    ]}
                  >
                    <Text style={styles.menuItemText}>{label}</Text>
                    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                      <Path
                        d="M9 4l7 8-7 8"
                        stroke={colors.navy}
                        strokeWidth={2.4}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    position: 'absolute',
    left: 16,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.daisyOutline,
    borderRadius: 24,
    zIndex: 30,
    elevation: 9,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(36, 58, 94, 0.38)',
  },
  panel: {
    width: '82%',
    height: '100%',
    paddingHorizontal: 24,
    backgroundColor: colors.cream,
    borderRightWidth: 2,
    borderRightColor: colors.daisyOutline,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  twoPartHeader: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  headerControls: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    flex: 1,
    fontFamily: Platform.select({
      ios: 'Fraunces_700Bold',
      android: 'Fraunces_700Bold',
      default: 'serif',
    }),
    fontSize: 30,
    lineHeight: 38,
    color: colors.navy,
  },
  headerBackButton: {
    width: 44,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  twoPartTitle: {
    flex: 0,
    marginTop: 8,
    textAlign: 'center',
  },
  closeButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  menuItems: {
    marginTop: 34,
    gap: 14,
  },
  menuItem: {
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.daisyOutline,
    borderRadius: 24,
  },
  menuItemText: {
    fontFamily: Platform.select({
      ios: 'Nunito_700Bold',
      android: 'Nunito_700Bold',
      default: 'System',
    }),
    fontSize: 26,
    color: colors.navy,
  },
  pageContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 36,
  },
  infoCard: {
    paddingVertical: 28,
    paddingHorizontal: 22,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.daisyOutline,
    borderRadius: 28,
  },
  privacyCard: {
    minHeight: 430,
    justifyContent: 'center',
    backgroundColor: colors.greenSoft,
  },
  aboutContent: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  pageBody: {
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
  backButton: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.yellow,
    borderRadius: 30,
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
