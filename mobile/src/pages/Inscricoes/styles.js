import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import LinearGradient from "react-native-linear-gradient";
import { colors, metrics } from "../../styles";

import Icon from "react-native-vector-icons/FontAwesome";

import { Dimensions } from "react-native";
import { black } from "ansi-colors";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height;

export const Container = styled(LinearGradient).attrs({
  colors: ["#22202C", "#402845"],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 }
})`
  flex: 1;
  padding: 40px;
  justify-content: center;
  align-items: center;
`;

export const Blabla = styled.Text`
  margin-right: 10px;
`;

export const ImagemCard = styled.Image`
  width: 100%;
`;
export const Card = styled.View``;

const styles = StyleSheet.create({
  viewDate: {
    alignItems: "center",
    marginBottom: metrics.baseMargin * 2
  },
  date: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Roboto, sans-serif",
    fontWeight: "bold",
    marginRight: metrics.baseMargin * 2,
    marginLeft: metrics.baseMargin * 2
  },
  imagem: {
    overflow: "hidden",
    borderTopLeftRadius: metrics.baseRadius,
    borderTopRightRadius: metrics.baseRadius,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  card: {
    width: width * 0.9,
    borderRadius: metrics.baseRadius
  },
  viewFundoCard: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: metrics.baseRadius,
    borderBottomRightRadius: metrics.baseRadius
  },
  viewCard: {
    margin: metrics.baseMargin,
    borderRadius: metrics.baseRadius
  },
  textoCardTitulo: {
    fontSize: 18,
    fontFamily: "Helvetica, sans-serif",
    marginTop: metrics.baseMargin,
    marginBottom: metrics.baseMargin
  },
  textoCard: {
    color: "#999999",
    margin: metrics.baseMargin * 0.5,
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    backgroundColor: colors.secondary,
    borderRadius: metrics.baseRadius,
    height: 50,
    marginTop: metrics.baseMargin,
    justifyContent: "center",
    alignItems: "center"
  },

  buttonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16
  }
});
export default styles;
