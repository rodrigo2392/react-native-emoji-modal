import { Dimensions } from 'react-native';
import e from '../const/emoji_es.json';
import e_en from '../const/emoji.json';

import type { Category, CategoryEn, Emoji } from '../types';

export const emojis: Emoji[] = e;

export const emojis_en: Emoji[] = e_en;

export const Categories: Category[] = [
  {
    symbol: '😀',
    key: 'Emoticonos y emociones',
  },
  {
    symbol: '🧑',
    key: 'Personas y cuerpo',
  },
  {
    symbol: '🦄',
    key: 'Animales y naturaleza',
  },
  {
    symbol: '🍔',
    key: 'Comida y bebida',
  },
  {
    symbol: '⚾️',
    key: 'Actividades',
  },
  {
    symbol: '✈️',
    key: 'Viajes y lugares',
  },
  {
    symbol: '💡',
    key: 'Objetos',
  },
  {
    symbol: '🔣',
    key: 'Símbolos',
  },
  {
    symbol: '🇸🇦',
    key: 'Banderas',
  },
];

export const Categories_En: CategoryEn[] = [
  {
    symbol: '😀',
    key: 'Smileys & Emotion',
  },
  {
    symbol: '🧑',
    key: 'People & Body',
  },
  {
    symbol: '🦄',
    key: 'Animals & Nature',
  },
  {
    symbol: '🍔',
    key: 'Food & Drink',
  },
  {
    symbol: '⚾️',
    key: 'Activities',
  },
  {
    symbol: '✈️',
    key: 'Travel & Places',
  },
  {
    symbol: '💡',
    key: 'Objects',
  },
  {
    symbol: '🔣',
    key: 'Symbols',
  },
  {
    symbol: '🇸🇦',
    key: 'Flags',
  },
];

export function charFromUtf16(utf16: string) {
  try {
    return String.fromCodePoint(
      ...(utf16.split('-').map((u) => '0x' + u) as any)
    );
  } catch (err) {
    console.log({ err, utf16 });
    return null;
  }
}

export function charFromEmojiObject(obj: Emoji) {
  return charFromUtf16(obj.unified) || '';
}

const filteredEmojis = emojis.filter((elmt) => !elmt.obsoleted_by);

export function getEmojisByCategory(category: string) {
  return filteredEmojis.filter((elmt) => elmt.category === category);
}

export const heigh = Dimensions.get('screen').height;
export const width = Dimensions.get('screen').width;
