import React, { useEffect, useState } from "react";

import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  FlatList,
  AsyncStorage
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles, { Container, Card, ImagemCard, List } from "./styles";

import api from "../../services/api";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import { colors, metrics } from "../../styles";

import image from "../../assets/image.png";
import CardMeetups from "../../components/CardMeetups";

import Background from "../../components/Background";

// const data = [1, 2, 3, 4];

export default function Meetups() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const token = await AsyncStorage.getItem("@Meetapp:token");

      console.tron.log(token);

      const response = await api.get("/meetup/all", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.tron.log(response.data.getMeetupsUser);

      setMeetups(response.data.getMeetupsUser);
    }

    loadMeetups();
  }, []);

  return (
    <Background>
      <Navbar />
      <View>
        <View style={styles.viewDate}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity>
              <Icon name="chevron-left" size={25} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.date}> 31 de Maio </Text>
            <TouchableOpacity>
              <Icon name="chevron-right" size={25} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
        <List
          showsVerticalScrollIndicator={false}
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <CardMeetups data={item} />}
        />
      </View>
    </Background>
  );
}

Meetups.navigationOptions = {
  tabBarLabel: "Meetups",
  tabBarIcon: () => <Icon name="bars" size={20} color="#fff" />
};
