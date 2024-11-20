import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { Button, TextInput, Subheading } from 'react-native-paper';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"; // Doğru Firebase Auth importları
import { useNavigation } from '@react-navigation/core';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigation = useNavigation();
  const auth = getAuth(); // Firebase auth'ı başlatma

  const createAccount = async () => {
    setIsLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password); // Auth işlemi
      await updateProfile(response.user, { displayName: name }); // Kullanıcı adını güncelleme
      navigation.popToTop(); // Kayıttan sonra anasayfaya dönme
    } catch (e) { 
      setIsLoading(false);  
      setError(e.message); // Hata mesajını ayarlama
    }
  };

  return (
    <View style={{ margin: 16 }}>
      {!!error && ( <Subheading style={{ color: 'red', textAlign: 'center', marginBottom: 16 }}> {error}</Subheading>)}
      <TextInput label="Name" value={name} onChangeText={(text) => setName(text)}/>
      <TextInput label="Email" 
      style={{ marginTop: 12}} 
      value={email} 
      onChangeText={(text) => setEmail(text.toLowerCase())}
      keyboardType="email-address"/>
      <TextInput label="Password" style={{ marginTop: 12}} value={password} onChangeText={(text) => setPassword(text)} secureTextEntry/>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16}}>
        <Button compact onPress={() => navigation.navigate("SignIn")} mode="contained-tonal" style={{ paddingRight: 2}}> SIGN IN</Button>
        <Button mode="contained" onPress={() => createAccount()} loading={isLoading}> SIGN UP</Button>
      </View>
    </View>
  );
};

export default SignUp;