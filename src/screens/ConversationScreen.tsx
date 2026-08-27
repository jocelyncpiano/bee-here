import React from 'react';
import IdeaCard, { IdeaContent } from '../components/IdeaCard';

const CONVERSATION_IDEAS: IdeaContent[] = [
  {
    prompt: "I'm really happy to spend some time with you today.",
    guidance: "You don't always have to ask a question.",
  },
  {
    prompt: 'What kind of music do you enjoy?',
    guidance: 'Follow wherever the conversation goes.',
  },
  {
    prompt: "It's nice sitting here with you.",
    guidance: 'Sometimes a simple comment is enough.',
  },
  {
    prompt: 'This is such a nice room.',
    guidance: 'Look around together and notice something nearby.',
  },
  {
    prompt: 'What foods do you really enjoy?',
    guidance:
      'If answering seems difficult, share something you like instead.',
  },
  {
    prompt: "It's a beautiful day today.",
    guidance: 'Talk about what you can see, hear, or feel right now.',
  },
  {
    prompt: 'I heard a song today that made me smile.',
    guidance:
      'Sharing something about yourself can take the pressure off them.',
  },
  {
    prompt: "I'm glad I'm here with you.",
    guidance: "That's enough.",
  },
  {
    prompt:
      'Instead of:\n"Do you remember when...?"\n\nTry:\n"I was thinking about the time we..."',
    guidance:
      'It lets you share a memory without making them prove they remember it.',
    unquoted: true,
    long: true,
  },
  {
    prompt: 'Tell me about something you enjoy.',
    guidance:
      "If the question doesn't go anywhere, that's okay. Try something else.",
  },
];

export default function ConversationScreen({
  onBack,
}: {
  onBack?: () => void;
}) {
  return (
    <IdeaCard
      kicker="Try this"
      ideas={CONVERSATION_IDEAS}
      ideaKind="conversation"
      onBack={onBack}
    />
  );
}
