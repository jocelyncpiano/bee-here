import React from 'react';
import IdeaCard, { IdeaContent } from '../components/IdeaCard';
import { colors } from '../theme/colors';

const HOME_HELP: IdeaContent[] = [
  {
    prompt:
      'Rather than arguing about where “home” is, try listening first.',
    unquoted: true,
  },
];

const HOME_WORDS: IdeaContent[] = [
  {
    prompt: 'You really want to go home.',
    guidance: 'or\n\n“Tell me what you’re missing.”',
  },
];

const HOME_DONT_ARGUE: IdeaContent[] = [
  {
    prompt: 'But you ARE home.',
  },
];

const HOME_REDIRECT: IdeaContent[] = [
  {
    prompt: 'Would you listen to some music with me?',
  },
];

const HOME_REDIRECT_SECOND: IdeaContent[] = [
  {
    prompt: "Let's sit over here together.",
  },
];

const HOME_REDIRECT_THIRD: IdeaContent[] = [
  {
    prompt: 'Come look at this with me.',
  },
];

const HOME_REDIRECT_FINAL: IdeaContent[] = [
  {
    prompt: 'Would you like to have a drink with me?',
    guidance:
      "Only offer food or drink if you know it’s safe for them.",
  },
];

export default function HomeHelpScreen({
  onNext,
}: {
  onNext?: () => void;
}) {
  return (
    <IdeaCard
      kicker="Start with the feeling."
      ideas={HOME_HELP}
      ideaKind="home guidance"
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

export function HomeWordsScreen({
  onNext,
}: {
  onNext?: () => void;
}) {
  return (
    <IdeaCard
      kicker="You could say:"
      ideas={HOME_WORDS}
      ideaKind="home response"
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

export function HomeDontArgueScreen({
  onRedirect,
}: {
  onRedirect?: () => void;
}) {
  return (
    <IdeaCard
      kicker="Try not to argue:"
      ideas={HOME_DONT_ARGUE}
      ideaKind="home redirection"
      cardColor={colors.cream}
      anotherButtonColor={colors.pink}
      titleKicker
      compactTitle
      compactCard
      primaryButtonLabel="Help me redirect"
      primaryButtonIcon="none"
      showSecondaryButton={false}
      onPrimaryPress={onRedirect}
    />
  );
}

export function HomeRedirectScreen({
  onNext,
}: {
  onNext?: () => void;
}) {
  return (
    <IdeaCard
      kicker="Try something gentle."
      ideas={HOME_REDIRECT}
      ideaKind="redirect"
      cardColor={colors.cream}
      anotherButtonColor={colors.pink}
      titleKicker
      compactTitle
      compactCard
      primaryButtonLabel="Another redirect"
      primaryButtonIcon="next"
      showSecondaryButton={false}
      onPrimaryPress={onNext}
    />
  );
}

export function HomeRedirectSecondScreen({
  onNext,
}: {
  onNext?: () => void;
}) {
  return (
    <IdeaCard
      kicker="Try something gentle."
      ideas={HOME_REDIRECT_SECOND}
      ideaKind="redirect"
      cardColor={colors.cream}
      anotherButtonColor={colors.pink}
      titleKicker
      compactTitle
      compactCard
      primaryButtonLabel="Another redirect"
      primaryButtonIcon="next"
      showSecondaryButton={false}
      onPrimaryPress={onNext}
    />
  );
}

export function HomeRedirectThirdScreen({
  onNext,
}: {
  onNext?: () => void;
}) {
  return (
    <IdeaCard
      kicker="Try something gentle."
      ideas={HOME_REDIRECT_THIRD}
      ideaKind="redirect"
      cardColor={colors.cream}
      anotherButtonColor={colors.pink}
      titleKicker
      compactTitle
      compactCard
      primaryButtonLabel="Another redirect"
      primaryButtonIcon="next"
      showSecondaryButton={false}
      onPrimaryPress={onNext}
    />
  );
}

export function HomeRedirectFinalScreen({
  onAnotherProblem,
}: {
  onAnotherProblem?: () => void;
}) {
  return (
    <IdeaCard
      kicker="Try something gentle."
      ideas={HOME_REDIRECT_FINAL}
      ideaKind="redirect"
      cardColor={colors.cream}
      titleKicker
      compactTitle
      showPrimaryButton={false}
      secondaryButtonLabel="Another problem"
      onBack={onAnotherProblem}
    />
  );
}
