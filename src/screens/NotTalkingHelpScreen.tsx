import React from 'react';
import IdeaCard, { IdeaContent } from '../components/IdeaCard';
import { colors } from '../theme/colors';

const NOT_TALKING_HELP: IdeaContent[] = [
  {
    prompt: 'You can stop trying to make conversation happen.',
    unquoted: true,
  },
];

const QUIET_CONNECTION: IdeaContent[] = [
  {
    prompt:
      'Listen to music\nLook outside\nLook through something together\nOffer your hand if touch is welcome\nSimply sit nearby',
    unquoted: true,
    long: true,
  },
];

const SILENCE_CONNECTION: IdeaContent[] = [
  {
    prompt: 'Silence can still be connection.',
    unquoted: true,
  },
];

export default function NotTalkingHelpScreen({
  onNext,
}: {
  onNext?: () => void;
}) {
  return (
    <IdeaCard
      kicker="That’s okay."
      ideas={NOT_TALKING_HELP}
      ideaKind="quiet guidance"
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

export function SilenceConnectionScreen({
  onAnotherProblem,
}: {
  onAnotherProblem?: () => void;
}) {
  return (
    <IdeaCard
      kicker="Remember:"
      ideas={SILENCE_CONNECTION}
      ideaKind="quiet reminder"
      cardColor={colors.cream}
      titleKicker
      compactTitle
      compactCard
      showPrimaryButton={false}
      secondaryButtonLabel="Another problem"
      onBack={onAnotherProblem}
    />
  );
}

export function QuietConnectionScreen({
  onNext,
}: {
  onNext?: () => void;
}) {
  return (
    <IdeaCard
      kicker="Try quiet connection."
      ideas={QUIET_CONNECTION}
      ideaKind="quiet connection"
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
