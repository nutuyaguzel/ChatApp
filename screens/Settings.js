import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Avatar, Button, Subheading, Title } from 'react-native-paper';
import { firebase } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const Settings = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    getAuth().onAuthStateChanged(user => {
      setName(user.displayName ?? '');
      setEmail(user?.email ?? '');
    })
  }, []);

  return (
    <View style={{ alignItems: 'center', marginTop: 16}}>
      <Avatar.Text 
      label={name.split(" ").reduce((prev, current) => prev + current[0], " ")}/>
        <Title>{name}</Title>
        <Subheading>{email}</Subheading>
        <Button onPress={() => getAuth().signOut()}> SIGN OUT</Button>
      
    </View>
  );
};

export default Settings;