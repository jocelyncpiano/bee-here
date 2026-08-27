import React from 'react';
import IdeaCard, { IdeaContent } from '../components/IdeaCard';
import { colors } from '../theme/colors';

const FUN_IDEAS: IdeaContent[] = [
  {
    prompt: 'Find something yellow.',
    guidance: "That's it.",
    unquoted: true,
  },
  {
    prompt: 'Look outside and find something moving.',
    unquoted: true,
  },
  {
    prompt: 'See if you can make each other smile.',
    guidance: 'No memory required.',
    unquoted: true,
  },
  {
    prompt: 'Find the prettiest thing in the room.',
    unquoted: true,
  },
  {
    prompt: 'Listen for three different sounds.',
    unquoted: true,
  },
  {
    prompt: 'Hum a tune.',
    guidance: 'See what happens.',
    unquoted: true,
  },
  {
    prompt: 'Find something soft.',
    unquoted: true,
  },
  {
    prompt: 'Look for something that makes you both smile.',
    unquoted: true,
  },
];

export default function DoSomethingFunScreen({
  onBack,
}: {
  onBack?: () => void;
}) {
  return (
    <IdeaCard
      kicker="Tiny Mission"
      ideas={FUN_IDEAS}
      ideaKind="fun"
      anotherButtonColor={colors.pink}
      onBack={onBack}
    />
  );
}
