import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import EmojiModal from 'react-native-emoji-modal';

export default function App() {
  const [visible, setVisible] = useState(false);
  const [emoji, setEmoji] = useState('');

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Text>Open</Text>
      </TouchableOpacity>
      <Text style={styles.selected}>{emoji}</Text>
      <EmojiModal
        columns={12}
        onSelect={(val: string) => {
          setEmoji(val);
          setVisible(false);
        }}
        setVisible={setVisible}
        visible={visible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  selected: {
    fontSize: 40,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
