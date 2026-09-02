import React from 'react';
import IdeaCard, { IdeaContent } from '../components/IdeaCard';
import { colors } from '../theme/colors';

const NOTHING_TO_SAY_HELP: IdeaContent[] = [
  {
    prompt: 'I’m really glad I get to spend some time with you today.',
  },
];

const THEN_STOP_HELP: IdeaContent[] = [
  {
    prompt: 'You don’t need another question.',
    guidance: 'You are doing just fine.',
    unquoted: true,
  },
];

export default function NothingToSayHelpScreen({
  onNext,
}: {
  onNext?: () => void;
}) {
  return (
    <IdeaCard
      kicker="Say this:"
      ideas={NOTHING_TO_SAY_HELP}
      ideaKind="conversation guidance"
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

export function ThenStopScreen({
  onAnotherProblem,
}: {
  onAnotherProblem?: () => void;
}) {
  return (
    <IdeaCard
      kicker="Then stop."
      ideas={THEN_STOP_HELP}
      ideaKind="conversation guidance"
      cardColor={colors.pinkSoft}
      titleKicker
      compactTitle
      compactCard
      showPrimaryButton={false}
      secondaryButtonLabel="Another problem"
      onBack={onAnotherProblem}
    />
  );
}
