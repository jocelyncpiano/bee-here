import React from 'react';
import IdeaCard, { IdeaContent } from '../components/IdeaCard';
import { colors } from '../theme/colors';

const MISSING_PERSON_HELP: IdeaContent[] = [
  {
    prompt: 'Try:',
    guidance:
      '“You really want to see them.”\n\nor\n\n“It sounds like you miss them.”',
    unquoted: true,
  },
];

const FOLLOW_THE_FEELING: IdeaContent[] = [
  {
    prompt: 'You don’t necessarily need to correct them immediately.',
    guidance: 'Try:\n\n“Tell me about them.”',
    unquoted: true,
  },
];

const MORE_DISTRESS: IdeaContent[] = [
  {
    prompt: 'Gently move toward something comforting instead.',
    unquoted: true,
  },
];

export default function MissingPersonHelpScreen({
  onNext,
}: {
  onNext?: () => void;
}) {
  return (
    <IdeaCard
      kicker="Start with what they’re feeling."
      ideas={MISSING_PERSON_HELP}
      ideaKind="missing person guidance"
      cardColor={colors.cream}
      anotherButtonColor={colors.pink}
      showBee
      titleKicker
      smallTitle
      primaryButtonLabel="Next"
      primaryButtonIcon="next"
      showSecondaryButton={false}
      onPrimaryPress={onNext}
    />
  );
}

export function MoreDistressScreen({
  onComforting,
}: {
  onComforting?: () => void;
}) {
  return (
    <IdeaCard
      kicker="If that causes more distress..."
      ideas={MORE_DISTRESS}
      ideaKind="comforting guidance"
      cardColor={colors.cream}
      anotherButtonColor={colors.pink}
      titleKicker
      smallTitle
      compactCard
      primaryButtonLabel="Give me something comforting"
      primaryButtonIcon="none"
      showSecondaryButton={false}
      onPrimaryPress={onComforting}
    />
  );
}

export function FollowTheFeelingScreen({
  onNext,
}: {
  onNext?: () => void;
}) {
  return (
    <IdeaCard
      kicker="Follow the feeling."
      ideas={FOLLOW_THE_FEELING}
      ideaKind="missing person guidance"
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
