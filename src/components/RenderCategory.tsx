import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { heigh, width, Categories } from '../utils';
import type { Key, Key_EN } from '../types';

interface IFilterBarProps {
  categories: Key[] | Key_EN[];
  onPress: (key: Key) => void;
  selectedCategory: string;
  darkMode?: boolean;
}

const size = Math.floor((width - 100) / 9);

export default function RenderCategory({
  onPress,
  selectedCategory,
  categories,
}: IFilterBarProps) {
  const result = Categories.filter((item) =>
    categories.find((el) => el === item.key)
  );

  const styles = StyleSheet.create({
    container: {
      width: size,
      height: size,
    },
    wrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: 10,
      borderBottomWidth: 2,
      borderColor: '#5C5470',
    },
    icon: {
      fontSize: heigh * 0.025,
    },
    active: {
      opacity: 1,
    },
    inactive: {
      opacity: 0.3,
    },
  });

  return (
    <View style={styles.wrapper}>
      {result.map((category, index) => (
        <TouchableOpacity
          onPress={() => onPress(category.key)}
          key={index}
          style={[
            styles.container,
            selectedCategory === category.key ? styles.active : styles.inactive,
          ]}
        >
          <Text style={styles.icon}>{category.symbol}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
