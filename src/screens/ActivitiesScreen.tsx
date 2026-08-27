import React from 'react';
import IdeaCard, { IdeaContent } from '../components/IdeaCard';
import { colors } from '../theme/colors';

const ACTIVITY_IDEAS: IdeaContent[] = [
  {
    prompt: 'Look through a magazine together.',
    guidance: 'Point out anything interesting you notice.',
    unquoted: true,
  },
  {
    prompt: 'Look out the window together.',
    guidance: 'Notice birds, trees, people, clouds, cars, or flowers.',
    unquoted: true,
  },
  {
    prompt: 'Look at a few photos together.',
    guidance:
      'You don\'t need to ask who anyone is.\n\nTry:\n"I really like this picture."',
    unquoted: true,
    long: true,
  },
  {
    prompt: 'Fold a few towels together.',
    guidance:
      "Simple, familiar tasks can give your hands something to do while you're together.",
    unquoted: true,
  },
  {
    prompt: 'Take a short walk together.',
    guidance: "Only if it's appropriate and safe for them.",
    unquoted: true,
  },
  {
    prompt: 'Have a snack or drink together.',
    guidance: "Only if you know it's safe for them to eat or drink.",
    unquoted: true,
  },
  {
    prompt: 'Find something interesting in the room and talk about it.',
    guidance:
      'A painting.\nA flower.\nA photograph.\nSomething outside.',
    unquoted: true,
    long: true,
  },
  {
    prompt: 'Sit somewhere comfortable together.',
    guidance: "You don't actually have to do anything.",
    unquoted: true,
  },
];

export default function ActivitiesScreen({
  onBack,
}: {
  onBack?: () => void;
}) {
  return (
    <IdeaCard
      kicker="Little thing to try"
      ideas={ACTIVITY_IDEAS}
      ideaKind="activity"
      anotherButtonColor={colors.yellow}
      onBack={onBack}
    />
  );
}
