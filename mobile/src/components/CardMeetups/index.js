import React, { Component } from "react";

import Icon from "react-native-vector-icons/FontAwesome";
import styles, { Card, ImagemCard } from "./styles";
import { View, Text, TouchableOpacity } from "react-native";
import moment from "moment";
import "moment/locale/pt-br";
import { withNavigation } from "react-navigation";

const CardMeetups = ({ data, navigation }) => (
  <View>
    <Card onEndReached={data} onEndReachedThreshold={0.1} style={styles.card}>
      <ImagemCard
        style={styles.imagem}
        source={require("../../assets/image.png")}
      />
      <View style={styles.viewFundoCard}>
        <View style={styles.viewCard}>
          <Text style={styles.textoCardTitulo}>{data.titulo}</Text>
          <Text style={styles.textoCard}>
            <Icon name="calendar" size={14} color="#999999" />
            <Text>
              {moment(data.data)
                .locale("pt-br")
                .format("DD MMMM, [às] HH[h]mm")}
            </Text>
          </Text>
          <Text style={styles.textoCard}>
            <Icon name="map-marker" size={16} color="#999999" />
            <Text style={styles.icon}> {data.localizacao}</Text>
          </Text>
          <Text style={styles.textoCard}>
            <Icon name="user" size={14} color="#999999" />
            <Text> Organizador: {data.id}</Text>
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate(
                "Inscricoes",
                {
                  jaburu: data.id
                }(console.tron.log(JSON.stringify(jaburu)))
              )
            }
          >
            <Text style={styles.buttonText}>Realizar Inscrição</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  </View>
);
export default withNavigation(CardMeetups);
