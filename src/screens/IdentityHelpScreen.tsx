import React from 'react';
import IdeaCard, { IdeaContent } from '../components/IdeaCard';
import { colors } from '../theme/colors';

const IDENTITY_HELP: IdeaContent[] = [
  {
    prompt: 'Try introducing yourself naturally.',
    unquoted: true,
  },
];

const IDENTITY_INTRODUCTION: IdeaContent[] = [
  {
    prompt: "Hi! It's Sarah. I'm really happy to see you.",
  },
];

const IDENTITY_AVOID: IdeaContent[] = [
  {
    prompt: "Don't you remember me?",
    guidance:
      "They don't have to identify you for your time together to matter.",
  },
];

export default function IdentityHelpScreen({
  onNext,
}: {
  onNext?: () => void;
}) {
  return (
    <IdeaCard
      kicker="That's okay."
      ideas={IDENTITY_HELP}
      ideaKind="identity help"
      cardColor={colors.pinkSoft}
      anotherButtonColor={colors.pink}
      showBee
      titleKicker
      primaryButtonLabel="Next"
      primaryButtonIcon="next"
      showSecondaryButton={false}
      onPrimaryPress={onNext}
    />
  );
}

export function IdentityIntroductionScreen({
  onNext,
}: {
  onNext?: () => void;
}) {
  return (
    <IdeaCard
      kicker="You could say:"
      ideas={IDENTITY_INTRODUCTION}
      ideaKind="identity introduction"
      cardColor={colors.cream}
      titleKicker
      anotherButtonColor={colors.pink}
      primaryButtonLabel="Next"
      primaryButtonIcon="next"
      showSecondaryButton={false}
      onPrimaryPress={onNext}
    />
  );
}

export function IdentityAvoidScreen({
  onNext,
}: {
  onNext?: () => void;
}) {
  return (
    <IdeaCard
      kicker="Try not to say:"
      ideas={IDENTITY_AVOID}
      ideaKind="identity guidance"
      cardColor={colors.cream}
      titleKicker
      anotherButtonColor={colors.pink}
      primaryButtonLabel="What should I do next?"
      primaryButtonIcon="none"
      showSecondaryButton={false}
      onPrimaryPress={onNext}
    />
  );
}
