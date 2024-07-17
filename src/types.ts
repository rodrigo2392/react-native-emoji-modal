export type Key =
  | 'Emoticonos y emociones'
  | 'Personas y cuerpo'
  | 'Animales y naturaleza'
  | 'Comida y bebida'
  | 'Actividades'
  | 'Viajes y lugares'
  | 'Objetos'
  | 'Símbolos'
  | 'Banderas';

export type Key_EN =
  | 'Smileys & Emotion'
  | 'People & Body'
  | 'Animals & Nature'
  | 'Food & Drink'
  | 'Activities'
  | 'Travel & Places'
  | 'Objects'
  | 'Symbols'
  | 'Flags';

export type Category = {
  symbol: string;
  key: Key;
};

export type CategoryEn = {
  symbol: string;
  key: Key_EN;
};

export type Emoji = {
  name: string;
  unified: string;
  non_qualified?: string | null;
  docomo?: string | null;
  au?: string | null;
  softbank?: string | null;
  google?: string | null;
  image: string;
  sheet_x: number;
  sheet_y: number;
  short_name: string;
  short_names?: string[] | null;
  text?: string | null;
  texts?: string[] | null;
  category: string;
  subcategory: string;
  sort_order: number;
  added_in: string;
  has_img_apple: boolean;
  has_img_google: boolean;
  has_img_twitter: boolean;
  has_img_facebook: boolean;
  skin_variations?: any;
  obsoletes?: string | null;
  obsoleted_by?: string | null;
};
