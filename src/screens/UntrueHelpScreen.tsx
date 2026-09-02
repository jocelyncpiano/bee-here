import React from 'react';
import IdeaCard, { IdeaContent } from '../components/IdeaCard';
import { colors } from '../theme/colors';

const UNTRUE_HELP: IdeaContent[] = [
  {
    prompt: 'First ask yourself:',
    guidance: 'Is anyone in danger?',
    unquoted: true,
  },
];

const PROFESSIONAL_HELP: IdeaContent[] = [
  {
    prompt:
      'If unusual confusion, hallucinations, or beliefs appear suddenly or are causing significant distress, let their caregiver or healthcare professional know.',
    unquoted: true,
    long: true,
  },
];

export default function UntrueHelpScreen({
  onNo,
  onYesOrUnsure,
}: {
  onNo?: () => void;
  onYesOrUnsure?: () => void;
}) {
  return (
    <IdeaCard
      kicker="You don’t have to prove them wrong."
      ideas={UNTRUE_HELP}
      ideaKind="safety guidance"
      cardColor={colors.cream}
      anotherButtonColor={colors.pink}
      showBee
      titleKicker
      compactTitle
      compactCard
      primaryButtonLabel="No"
      primaryButtonIcon="none"
      secondaryButtonLabel="Yes / I’m not sure"
      onPrimaryPress={onNo}
      onBack={onYesOrUnsure}
    />
  );
}

export function ProfessionalHelpScreen({
  onAnotherProblem,
}: {
  onAnotherProblem?: () => void;
}) {
  return (
    <IdeaCard
      kicker="Get their caregiver or healthcare professional."
      ideas={PROFESSIONAL_HELP}
      ideaKind="professional guidance"
      cardColor={colors.pinkSoft}
      titleKicker
      compactTitle
      showPrimaryButton={false}
      secondaryButtonLabel="Another problem"
      onBack={onAnotherProblem}
    />
  );
}
