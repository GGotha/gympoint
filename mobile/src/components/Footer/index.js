import React, { Component } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { withNavigation } from "react-navigation";

import styles, { Container, Lista, ListaFooter } from "./styles";

import M from "../../assets/M.png";

class Footer extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.divImagem}>
        <Lista>
          <TouchableOpacity
            style={styles.btnOpacity}
            onPress={() => navigation.navigate("Meetups")}
          >
            <Icon name="bars" size={20} color="#fff" />

            <ListaFooter>Meetups</ListaFooter>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnOpacity}
            onPress={() => navigation.navigate("Inscricoes")}
          >
            <Icon name="tag" size={20} color="#fff" />

            <ListaFooter>Inscrições</ListaFooter>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnOpacity}
            onPress={() => navigation.navigate("Recsenha")}
          >
            <Icon name="user" size={20} color="#fff" />

            <ListaFooter>Meu Perfil</ListaFooter>
          </TouchableOpacity>
        </Lista>
      </View>
    );
  }
}

export default withNavigation(Footer);
