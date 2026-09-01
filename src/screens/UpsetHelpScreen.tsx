import React from 'react';
import IdeaCard, { IdeaContent } from '../components/IdeaCard';
import { colors } from '../theme/colors';

const UPSET_HELP: IdeaContent[] = [
  {
    prompt: 'You don’t have to win the argument.',
    guidance:
      'Try speaking softly and acknowledging the feeling.',
    unquoted: true,
  },
];

const UPSET_WORDS: IdeaContent[] = [
  {
    prompt: 'I can see this is upsetting.',
    guidance: '“I’m here with you.”\n\n“Let’s slow down.”',
  },
];

const UPSET_DONT: IdeaContent[] = [
  {
    prompt: 'Argue, quiz, or insist that you’re right.',
    unquoted: true,
  },
];

export default function UpsetHelpScreen({
  onNext,
}: {
  onNext?: () => void;
}) {
  return (
    <IdeaCard
      kicker="Slow things down."
      ideas={UPSET_HELP}
      ideaKind="upset guidance"
      cardColor={colors.cream}
      anotherButtonColor={colors.pink}
      showBee
      titleKicker
      compactTitle
      primaryButtonLabel="Next"
      primaryButtonIcon="next"
      showSecondaryButton={false}
      onPrimaryPress={onNext}
    />
  );
}

export function UpsetWordsScreen({
  onNext,
}: {
  onNext?: () => void;
}) {
  return (
    <IdeaCard
      kicker="You could say:"
      ideas={UPSET_WORDS}
      ideaKind="upset response"
      cardColor={colors.cream}
      anotherButtonColor={colors.pink}
      titleKicker
      compactTitle
      primaryButtonLabel="Next"
      primaryButtonIcon="next"
      showSecondaryButton={false}
      onPrimaryPress={onNext}
    />
  );
}

export function UpsetDontScreen({
  onCalmer,
}: {
  onCalmer?: () => void;
}) {
  return (
    <IdeaCard
      kicker="Try not to:"
      ideas={UPSET_DONT}
      ideaKind="calming guidance"
      cardColor={colors.cream}
      anotherButtonColor={colors.pink}
      titleKicker
      compactTitle
      compactCard
      primaryButtonLabel="How can I make things calmer?"
      primaryButtonIcon="none"
      showSecondaryButton={false}
      onPrimaryPress={onCalmer}
    />
  );
}
