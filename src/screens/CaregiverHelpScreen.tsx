import React from 'react';
import IdeaCard, { IdeaContent } from '../components/IdeaCard';
import { colors } from '../theme/colors';

const CAREGIVER_HELP: IdeaContent[] = [
  {
    prompt:
      'If their distress is sudden, severe, unusual, or you think they may be in danger, please involve their caregiver right away.',
    unquoted: true,
  },
];

export default function CaregiverHelpScreen({
  onAnotherProblem,
}: {
  onAnotherProblem?: () => void;
}) {
  return (
    <IdeaCard
      kicker="Please involve their caregiver."
      ideas={CAREGIVER_HELP}
      ideaKind="caregiver guidance"
      cardColor={colors.purpleSoft}
      titleKicker
      smallTitle
      compactCard
      showPrimaryButton={false}
      secondaryButtonLabel="Another problem"
      onBack={onAnotherProblem}
    />
  );
}
