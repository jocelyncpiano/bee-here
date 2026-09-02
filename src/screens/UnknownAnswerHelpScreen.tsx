import React from 'react';
import IdeaCard, { IdeaContent } from '../components/IdeaCard';
import { colors } from '../theme/colors';

const UNKNOWN_ANSWER_HELP: IdeaContent[] = [
  {
    prompt: 'Start with what they’re feeling.',
    unquoted: true,
  },
];

const ANSWER_SUGGESTIONS: IdeaContent[] = [
  {
    prompt: 'That’s a good question.',
    guidance:
      '“Tell me more about that.”\n\nor simply:\n\n“I’m here with you.”',
  },
];

const WHEN_TO_ASK_FOR_HELP: IdeaContent[] = [
  {
    prompt:
      'If the question involves their health, medication, safety, leaving the facility, or something you’re unsure about:',
    guidance:
      'Ask their caregiver or healthcare professional for help.',
    unquoted: true,
    long: true,
  },
];

export default function UnknownAnswerHelpScreen({
  onNext,
}: {
  onNext?: () => void;
}) {
  return (
    <IdeaCard
      kicker="You don’t need a perfect answer."
      ideas={UNKNOWN_ANSWER_HELP}
      ideaKind="answer guidance"
      cardColor={colors.cream}
      anotherButtonColor={colors.pink}
      showBee
      titleKicker
      compactTitle
      compactCard
      primaryButtonLabel="Next"
      primaryButtonIcon="next"
      showSecondaryButton={false}
      onPrimaryPress={onNext}
    />
  );
}

export function WhenToAskForHelpScreen({
  onAnotherProblem,
}: {
  onAnotherProblem?: () => void;
}) {
  return (
    <IdeaCard
      kicker="When to ask for help"
      ideas={WHEN_TO_ASK_FOR_HELP}
      ideaKind="caregiver guidance"
      cardColor={colors.cream}
      titleKicker
      compactTitle
      showPrimaryButton={false}
      secondaryButtonLabel="Another problem"
      onBack={onAnotherProblem}
    />
  );
}

export function AnswerSuggestionsScreen({
  onNext,
}: {
  onNext?: () => void;
}) {
  return (
    <IdeaCard
      kicker="You can try:"
      ideas={ANSWER_SUGGESTIONS}
      ideaKind="answer suggestion"
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
