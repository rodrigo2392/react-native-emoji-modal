import {
  View,
  Modal,
  StyleSheet,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
} from 'react-native';
import SearchInput from './components/SearchInput';
import { FlashList } from '@shopify/flash-list';
import { charFromEmojiObject, emojis, emojis_en } from './utils';
import RenderCategory from './components/RenderCategory';
import { useMemo, useState } from 'react';
import type { Emoji, Key, Key_EN } from './types';
import EmojiCell from './components/EmojiElement';

interface Props {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onSelect: (emoji: string) => void;
  searchPlaceholder?: string;
  noResultText?: string;
  position?: 'top' | 'bottom' | 'center';
  columns?: number;
  language?: 'es' | 'en';
  dark?: boolean;
  zIndex?: number;
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
  position = 'center',
  onSelect,
  language = 'es',
  dark = false,
  zIndex = 99999,
}: Props) {
  const colSize = Math.floor((width - 80) / columns);
  const [selectedCategory, setSelectedCategory] = useState<Key | Key_EN>(
    catsByLanguage[language][0]!
  );
  const [search, setSearch] = useState('');
  const positionStyle = useMemo(() => {
    switch (position) {
      case 'top':
        return 'flex-start';
      case 'bottom':
        return 'flex-end';
      default:
        return 'center';
    }
  }, [position]);

  const styles = StyleSheet.create({
    safeArea: {
      height,
      width,
      position: 'absolute',
    },
    backDrop: {
      width,
      height,
      position: 'absolute',
      backgroundColor: 'rgba(0,0,0,0.5)',
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
    },
    searchContainer: {
      marginTop: 20,
    },
    emojiContainer: {
      marginTop: 10,
      flex: 1,
      paddingBottom: 90,
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
    <Modal
      transparent
      visible={visible}
      onRequestClose={() => setVisible(false)}
      style={styles.modal}
    >
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        <View style={styles.backDrop} />
      </TouchableWithoutFeedback>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
          style={[styles.container, { justifyContent: positionStyle }]}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
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
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}
