import React, { useEffect, useRef, useState } from 'react';
import { View, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getFirestore, doc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';
import { GiftedChat } from "react-native-gifted-chat";
import { getAuth } from 'firebase/auth';

const Chat = () => {
  const route = useRoute();
  const [messages, setMessages] = useState([]); // Başlangıçta boş bir dizi
  const [uid, setUid] = useState("");
  const [name, setName] = useState("");


    
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUid(user?.uid);
      setName(user?.displayName);
    });
    
    return () => unsubscribe();
  }, []); 

  useEffect(() => {
    const db = getFirestore();  // Firestore referansı alıyoruz
    const chatDocRef = doc(db, "chats", route.params.chatId);  // Belirtilen chat ID'si ile doküman referansı alıyoruz
  
    const unsubscribe = onSnapshot(chatDocRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        // Eğer messages alanı varsa ve bu bir array ise işlem yap
        if (Array.isArray(data.messages)) {
          const formattedMessages = data.messages.map(msg => ({
            _id: msg._id,
            text: msg.text,
            createdAt: msg.createdAt.toDate(),  // Firestore Timestamp'ini Date objesine çeviriyoruz
            user: msg.user,
          }));
          setMessages(formattedMessages);  // Mesajları state'e kaydediyoruz
        } else {
          console.log("Messages field is missing or not an array");
        }
      } else {
        console.log("Chat not found");
      }
    });
  
    return () => unsubscribe();  // Bellek sızıntısını önlemek için cleanup fonksiyonu
  }, [route.params.chatId]);

  
  const onSend = async (m = []) => {
    const db = getFirestore(); // Firestore referansı alıyoruz
    const chatDocRef = doc(db, 'chats', route.params.chatId); // Belirli chat ID'si ile doküman referansı alıyoruz
  
    try {
      await updateDoc(chatDocRef, {
        messages: arrayUnion(...m), // Mevcut mesajları ekleyerek yeni mesajları diziye ekle
      });
    } catch (error) {
      console.error("Error sending message: ", error); // Hata durumunda bir mesaj göster
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
          <GiftedChat
            messages={messages}
            onSend={onSend}
            user={{
              _id: uid,
              name: name,
            }}
            alwaysShowSend // Send butonunu her zaman göster
            scrollToBottom // Mesajlar sona kaydırılsın
          />
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );z
}; 

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 40,
  },
});

export default Chat;
  