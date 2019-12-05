import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Dimensions,
  AsyncStorage,
  Alert
} from "react-native";
import styles, { Container, BordaSeparate } from "./styles";
import M from "../../assets/M.png";
import { colors, metrics } from "../../styles";
import Icon from "react-native-vector-icons/FontAwesome";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../services/api";
import { withNavigation } from "react-navigation";

class Recsenha extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nome: undefined,
      email: undefined
    };
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem("@Meetapp:token");
    console.tron.log("tokenzito", token);

    const response = await api.get("/find", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    this.setState({ nome: response.data.getInfoUser.name });
    this.setState({ email: response.data.getInfoUser.email });

    console.tron.log("responsezitopapi", response);
  }

  // async removetoken() {
  //   const token = await AsyncStorage.getItem("@Meetapp:token");

  //   if (token === true) {
  //     await AsyncStorage.removeItem("@Meetapp:token");
  //     this.props.navigation.navigate("Meetups");
  //   }
  // }

  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <Navbar />
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            value={
              this.state.nome === undefined ? "Carregando..." : this.state.nome
            }
            placeholderTextColor={colors.light}
            underlineColorAndroid="transparent"
          />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Email"
            value={
              this.state.email === undefined
                ? "Carregando..."
                : this.state.email
            }
            placeholderTextColor={colors.light}
            underlineColorAndroid="transparent"
          />

          <BordaSeparate />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Senha atual"
            placeholderTextColor={colors.light}
            underlineColorAndroid="transparent"
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Nova senha"
            placeholderTextColor={colors.light}
            underlineColorAndroid="transparent"
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Confirmação de senha"
            placeholderTextColor={colors.light}
            underlineColorAndroid="transparent"
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Salvar Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonLeave}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>Sair do Meetapp</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}

Recsenha.navigationOptions = {
  tabBarLabel: "Meu Perfil",
  tabBarIcon: () => <Icon name="user" size={20} color="#fff" />
};

export default withNavigation(Recsenha);
