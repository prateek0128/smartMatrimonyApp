// src/screens/chat/Chat.tsx
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Message = { id: string; text: string; fromMe?: boolean };

export default function Chat() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Welcome to the chat!" },
  ]);

  const send = () => {
    if (!text.trim()) return;
    setMessages((m) => [
      ...m,
      { id: Date.now().toString(), text, fromMe: true },
    ]);
    setText("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat</Text>

      <FlatList
        style={{ flex: 1 }}
        data={messages}
        keyExtractor={(m) => m.id}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.fromMe ? styles.me : styles.them]}>
            <Text style={{ color: item.fromMe ? "#fff" : "#111827" }}>
              {item.text}
            </Text>
          </View>
        )}
        contentContainerStyle={{ gap: 8, paddingVertical: 12 }}
        inverted
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Type a message..."
        />
        <TouchableOpacity style={styles.send} onPress={send}>
          <Text style={{ color: "#fff", fontWeight: "700" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingBottom: 8 },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 8 },
  bubble: {
    maxWidth: "80%",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    alignSelf: "flex-start",
    backgroundColor: "#E5E7EB",
  },
  me: { alignSelf: "flex-end", backgroundColor: "#4F46E5" },
  them: { backgroundColor: "#E5E7EB" },
  inputRow: { flexDirection: "row", gap: 8, alignItems: "center" },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  send: {
    backgroundColor: "#111827",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
});
