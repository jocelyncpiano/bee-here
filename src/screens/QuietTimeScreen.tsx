import React from 'react';
import IdeaCard, { IdeaContent } from '../components/IdeaCard';
import { colors } from '../theme/colors';

const QUIET_TIME_IDEAS: IdeaContent[] = [
  {
    kicker: "You don't have to talk.",
    prompt: 'Sit beside them for a little while.',
    guidance: "That's still a visit.",
    unquoted: true,
  },
  {
    kicker: 'Quiet connection',
    prompt: "If they're comfortable with touch:",
    guidance: 'Offer your hand.\n\nNo words required.',
    unquoted: true,
  },
  {
    kicker: 'Share the view',
    prompt: 'Sit near a window together.',
    guidance: "Notice what's happening outside.",
    unquoted: true,
  },
  {
    kicker: 'Listen together',
    prompt: 'Put on some gentle music.',
    guidance: "You don't have to talk over it.",
    unquoted: true,
  },
  {
    kicker: 'Simply stay.',
    prompt: "You don't have to entertain them.",
    guidance:
      "You don't have to make anything happen.\n\nBeing here counts.",
    unquoted: true,
    long: true,
  },
  {
    kicker: 'This moment is enough.',
    prompt:
      "Maybe they're tired.\nMaybe they aren't talking.\nMaybe nothing seems to be happening.",
    guidance: 'You are still spending time together.',
    unquoted: true,
    long: true,
  },
];

export default function QuietTimeScreen({
  onBack,
}: {
  onBack?: () => void;
}) {
  return (
    <IdeaCard
      kicker="Quiet Time Together"
      ideas={QUIET_TIME_IDEAS}
      ideaKind="quiet time"
      anotherButtonColor={colors.sky}
      onBack={onBack}
    />
  );
}
