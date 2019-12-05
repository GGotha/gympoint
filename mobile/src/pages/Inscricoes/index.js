import React, { Component } from "react";

import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import styles, { Container, ImagemCard, Card } from "./styles";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import { colors, metrics } from "../../styles";

class Inscricoes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Navbar />
        <View>
          <Card style={styles.card}>
            <ImagemCard
              style={styles.imagem}
              source={require("../../assets/image.png")}
            />
            <View style={styles.viewFundoCard}>
              <View style={styles.viewCard}>
                <Text style={styles.textoCardTitulo}>
                  Meetup de React Native
                </Text>
                <Text style={styles.textoCard}>
                  <Icon name="calendar" size={14} color="#999999" />
                  <Text> 24 de Junho, às 20h</Text>
                </Text>
                <Text style={styles.textoCard}>
                  <Icon name="map-marker" size={16} color="#999999" />
                  <Text style={styles.icon}> Rua Guilherme Gembala, 260</Text>
                </Text>
                <Text style={styles.textoCard}>
                  <Icon name="user" size={14} color="#999999" />
                  <Text> Organizador: Diego Fernandes</Text>
                </Text>
                <TouchableOpacity style={styles.button} onPress={() => {}}>
                  <Text style={styles.buttonText}>Cancelar Inscrição</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        </View>
      </Container>
    );
  }
}

Inscricoes.navigationOptions = {
  tabBarLabel: "Inscrições",
  tabBarIcon: () => <Icon name="tag" size={20} color="#fff" />
};

export default Inscricoes;
