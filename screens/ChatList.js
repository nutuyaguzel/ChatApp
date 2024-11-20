import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { List, Avatar, Divider, FAB, Portal, Dialog, Button, TextInput } from 'react-native-paper';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc, onSnapshot, query, where } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

const ChatList = () => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const navigation = useNavigation();
  const db = getFirestore();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setEmail(user.email);
      }
    });

    // Cleanup function to avoid memory leaks
    return () => unsubscribe();
  }, []); // Boş bağımlılık dizisi, sadece ilk render'da çalışır

  const addChat = async () => {
    if (!email || !userEmail) return; 
    setIsLoading(true);
    try {
      const response = await addDoc(collection(db, 'chats'), {
        users: [email, userEmail], // Kullanıcıları ekliyoruz
      });
      setIsDialogVisible(false); // Dialogu kapat
      navigation.navigate('Chat', { chatId: response.id }); // Chat sayfasına git
    } catch (error) {
      console.error('Error adding chat:', error);
    } finally {
      setIsLoading(false); // İşlem bittiğinde loading durumu kapanır
    }
  };
  
  // Chat listesini almak için kullanıyoruz
  useEffect(() => {
    if (!email) return;

    const q = query(collection(db, 'chats'), where('users', 'array-contains', email));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const chatList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChats(chatList); // Chatleri state'e kaydediyoruz
    });

    return () => unsubscribe(); // Bellek sızıntısını önlemek için temizlik fonksiyonu
  }, [email]);

  return (
    <View style={{ flex: 1 }}>
      {chats.map((chat) => (
        <React.Fragment key={chat.id}>
          <List.Item  
            title={chat.users.find((x) => x !== email)}
            description={(chat.messages ?? [])[0]?.text ?? undefined}
            left={() => (
              <Avatar.Text 
                label={chat.users.find((x) => x !== email).split(' ').reduce((prev, current) => prev + current[0], ' ')} 
                size={56} 
              />
            )}
            onPress={() => navigation.navigate('Chat', { chatId: chat.id })}
          />
          <Divider inset />
        </React.Fragment>
      ))}
      
      <Portal> 
        <Dialog visible={isDialogVisible} onDismiss={() => setIsDialogVisible(false)}>
          <Dialog.Title>New Chat</Dialog.Title>
          <Dialog.Content>
            <TextInput 
              value={userEmail}
              label='Enter user email'
              onChangeText={(text) => setUserEmail(text)}
            />
          </Dialog.Content>
          <Dialog.Actions>  
            <Button onPress={() => setIsDialogVisible(false)}>Cancel</Button>
            <Button onPress={addChat} loading={isLoading}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <FAB 
        icon="plus" 
        style={{ position: "absolute", bottom: 16, right: 16 }}
        onPress={() => setIsDialogVisible(true)} 
      />
    </View>
  );
}; 

export default ChatList;
