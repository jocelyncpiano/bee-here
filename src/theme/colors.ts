/**
 * Color palette for "Bee Here With Me".
 * Values taken directly from the design reference swatches.
 */
export const colors = {
  yellow: '#FFD66B',
  pink: '#FFBBAE',
  green: '#B7E3C6',
  purple: '#DCC6FF',
  purpleSoft: '#F3ECFF',
  greenSoft: '#E2F3E3',
  yellowSoft: '#FFF2CF',
  pinkSoft: '#FFE4DB',
  lightBlue: '#EAF2FF',
  sky: '#AFC4EE',
  white: '#FFFFFF',

  // Supporting tones
  cream: '#FFFDF6',
  navy: '#243A5E',
  plum: '#6B4FA0',
  greenDeep: '#4E9A6B',
  softText: '#5C6B7A',
  buttonText: '#5A4A1F',
  daisyCenter: '#F6B93B',
  daisyPetal: '#FFF9E8',
  daisyOutline: '#D8C9A8',
  stem: '#8FCB9B',
  leaf: '#A7D8B0',
} as const;

export type ColorName = keyof typeof colors;
