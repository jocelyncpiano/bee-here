import React from 'react';
import IdeaCard, { IdeaContent } from '../components/IdeaCard';
import { colors } from '../theme/colors';

const REPEATING_HELP: IdeaContent[] = [
  {
    prompt: 'They may not remember asking or telling you before.',
    guidance:
      'When you can, respond as though it’s the first time.',
    unquoted: true,
  },
];

const REPEATING_FRUSTRATED: IdeaContent[] = [
  {
    prompt: 'Gently change direction.',
    guidance:
      'Try:\n\n“Let’s look at this together.”\n\nor\n\n“Would you like to listen to some music?”',
    unquoted: true,
    long: true,
  },
];

const REPEATING_DONT_SAY: IdeaContent[] = [
  {
    prompt: 'You already told me that.',
  },
];

export default function RepeatingHelpScreen({
  onNext,
}: {
  onNext?: () => void;
}) {
  return (
    <IdeaCard
      kicker="It’s okay."
      ideas={REPEATING_HELP}
      ideaKind="repeating guidance"
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

export function RepeatingFrustratedScreen({
  onNext,
}: {
  onNext?: () => void;
}) {
  return (
    <IdeaCard
      kicker="If you’re getting frustrated..."
      ideas={REPEATING_FRUSTRATED}
      ideaKind="repeating redirection"
      cardColor={colors.cream}
      anotherButtonColor={colors.pink}
      titleKicker
      smallTitle
      primaryButtonLabel="Next"
      primaryButtonIcon="next"
      showSecondaryButton={false}
      onPrimaryPress={onNext}
    />
  );
}

export function RepeatingDontSayScreen({
  onDistraction,
  onAnotherProblem,
}: {
  onDistraction?: () => void;
  onAnotherProblem?: () => void;
}) {
  return (
    <IdeaCard
      kicker="Try not to say:"
      ideas={REPEATING_DONT_SAY}
      ideaKind="repeating distraction"
      cardColor={colors.cream}
      anotherButtonColor={colors.pink}
      titleKicker
      compactTitle
      compactCard
      primaryButtonLabel="Give me a distraction"
      primaryButtonIcon="none"
      secondaryButtonLabel="Another problem"
      onPrimaryPress={onDistraction}
      onBack={onAnotherProblem}
    />
  );
}
