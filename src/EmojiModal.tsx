import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import SearchInput from './components/SearchInput';
import { FlashList } from '@shopify/flash-list';
import { charFromEmojiObject, emojis, emojis_en } from './utils';
import RenderCategory from './components/RenderCategory';
import { useState } from 'react';
import type { Emoji, Key, Key_EN } from './types';
import EmojiCell from './components/EmojiElement';
import { Portal } from '@gorhom/portal';

interface Props {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onSelect: (emoji: string) => void;
  searchPlaceholder?: string;
  noResultText?: string;
  columns?: number;
  language?: 'es' | 'en';
  dark?: boolean;
  zIndex?: number;
  opacity?: number;
}

const { width, height } = Dimensions.get('screen');

const cats = [
  'Emoticonos y emociones',
  'Actividades',
  'Animales y naturaleza',
  'Banderas',
  'Comida y bebida',
  'Objetos',
  'Personas y cuerpo',
  'Símbolos',
  'Viajes y lugares',
] as Key[];

const catsEn = [
  'Smileys & Emotion',
  'Activities',
  'Animals & Nature',
  'Flags',
  'Food & Drink',
  'Objects',
  'People & Body',
  'Symbols',
  'Travel & Places',
] as Key_EN[];

const listByLanguage = {
  es: emojis,
  en: emojis_en,
};

const catsByLanguage = {
  es: cats,
  en: catsEn,
};
export default function EmojiModal({
  visible,
  setVisible,
  searchPlaceholder,
  noResultText,
  columns = 10,
  onSelect,
  language = 'es',
  dark = false,
  zIndex = 99999,
  opacity = 0.5,
}: Props) {
  const colSize = Math.floor((width - 80) / columns);
  const [selectedCategory, setSelectedCategory] = useState<Key | Key_EN>(
    catsByLanguage[language][0]!
  );
  const [search, setSearch] = useState('');

  const styles = StyleSheet.create({
    safeArea: {
      height,
      width,
      position: 'absolute',
    },
    backDrop: {
      width,
      height: height * 0.5,
      position: 'absolute',
      backgroundColor: `rgba(0,0,0,${opacity})`,
    },
    container: {
      position: 'absolute',
      bottom: 0,
      height: height * 0.6,
      width,
      backgroundColor: dark ? '#121212' : '#FFF',
      paddingHorizontal: 20,
      paddingTop: 10,
      borderTopEndRadius: 15,
      borderTopStartRadius: 15,
      justifyContent: 'center',
      zIndex,
    },
    searchContainer: {
      marginTop: 20,
    },
    emojiContainer: {
      marginTop: 10,
      flex: 1,
      paddingBottom: 20,
    },
    noResultWrapper: {
      marginVertical: 10,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    noResultText: {
      fontSize: 20,
      color: '#666',
    },
    categoryContainer: {
      marginTop: 20,
    },
    modal: {
      zIndex,
    },
  });

  return (
    visible && (
      <Portal name="emoji-modal-view" key="emoji-modal-view">
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <Animated.View style={styles.backDrop} />
        </TouchableWithoutFeedback>
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <SearchInput
              dark={dark}
              onChange={setSearch}
              placeholder={searchPlaceholder}
            />
          </View>
          <View style={styles.categoryContainer}>
            <RenderCategory
              categories={catsByLanguage[language]}
              onPress={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
          </View>
          <View style={styles.emojiContainer}>
            <FlashList
              showsVerticalScrollIndicator={false}
              data={listByLanguage[language].filter((item) => {
                if (search === '') {
                  return item.category === selectedCategory;
                } else {
                  return item.name.includes(search.toLocaleUpperCase());
                }
              })}
              keyExtractor={(_, index) => index.toString()}
              ListEmptyComponent={
                <View style={styles.noResultWrapper}>
                  <Text style={styles.noResultText}>
                    {noResultText ?? 'Ningún resultado'}
                  </Text>
                </View>
              }
              renderItem={({ item }) => (
                <EmojiCell
                  colSize={colSize ?? 10}
                  emoji={item}
                  onPress={(emoji: Emoji) => {
                    setSearch('');
                    onSelect(charFromEmojiObject(emoji));
                    setSelectedCategory(catsByLanguage[language][0]!);
                  }}
                />
              )}
              estimatedItemSize={200}
              numColumns={10}
            />
          </View>
        </View>
      </Portal>
    )
  );
}
