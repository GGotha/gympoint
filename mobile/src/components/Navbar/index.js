import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import styles, { Container } from "./styles";

import M from "../../assets/M.png";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.divImagem}>
        <TouchableOpacity onPress={() => navigation.navigate("Meetups")}>
          <Image style={styles.imagem} source={M} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(Navbar);
