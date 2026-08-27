import React from 'react';
import IdeaCard, { IdeaContent } from '../components/IdeaCard';
import { colors } from '../theme/colors';

const MUSIC_IDEAS: IdeaContent[] = [
  {
    kicker: "Let's try some music.",
    prompt:
      'Familiar music can give you something to enjoy together without needing much conversation.',
    guidance:
      'Play something familiar\nTap along\nSing or hum\nJust listen',
    unquoted: true,
    long: true,
  },
  {
    kicker: 'Music memories',
    prompt: 'Choose something you think they might enjoy.',
    guidance:
      'Instead of asking:\n"Do you remember this song?"\n\nTry:\n"I really like this song."\n\nThen just listen together.',
    unquoted: true,
    long: true,
  },
  {
    kicker: 'Feel the beat',
    prompt: 'Try gently tapping your hand or foot with the music.',
    guidance: "If they join you, wonderful.\n\nIf they don't, that's okay too.",
    unquoted: true,
  },
  {
    kicker: 'Sing or hum',
    prompt: "You don't have to sing well.",
    guidance: 'Hum a familiar tune and see where the moment goes.',
    unquoted: true,
  },
  {
    kicker: 'Let music fill the space',
    prompt: 'Let the music fill the silence.',
    guidance: 'Just listen together.',
    unquoted: true,
  },
];

export default function MusicScreen({
  onBack,
}: {
  onBack?: () => void;
}) {
  return (
    <IdeaCard
      kicker="Music moment"
      ideas={MUSIC_IDEAS}
      ideaKind="music"
      anotherButtonColor={colors.yellow}
      onBack={onBack}
    />
  );
}
