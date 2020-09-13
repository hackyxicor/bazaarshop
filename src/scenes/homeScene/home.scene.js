import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

function Home() {
  useEffect(() => {
    fetch();
  }, [])

  async function fetch() {
    const user = (await firestore().collection("users").doc(auth().currentUser.uid).get({ source: "server" })).data();
    const shopRef = user.shop;
    console.log("user", user);

    const shop = (await shopRef.get({ source: "server" })).data();

    console.log("shop", shop);
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }} >

    </View>
  )
}

export default Home;
