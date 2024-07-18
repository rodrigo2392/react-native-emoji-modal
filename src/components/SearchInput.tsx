import { TextInput, StyleSheet } from 'react-native';

export default function SearchInput({
  placeholder,
  onChange,
  dark = false,
}: {
  placeholder?: string;
  onChange: (val: string) => void;
  dark?: boolean;
}) {
  const styles = StyleSheet.create({
    container: {
      color: dark ? '#FFF' : '#121212',
      backgroundColor: dark ? '#292929' : '#f2f2f2',
      paddingLeft: 20,
      padding: 10,
      borderRadius: 10,
      borderBlockColor: '#292929',
      fontSize: 16,
    },
  });

  return (
    <TextInput
      placeholderTextColor={dark ? '#FFF' : '#121212'}
      style={styles.container}
      placeholder={placeholder ?? 'Buscar emoji'}
      onChangeText={onChange}
    />
  );
}
