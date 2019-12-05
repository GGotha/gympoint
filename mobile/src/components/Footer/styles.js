import styled from "styled-components/native";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height;

import { metrics } from "../../styles";

export const Container = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const Lista = styled.View`
  flex-direction: row;
`;

export const ListaFooter = styled.Text`
  color: rgba(255, 255, 255, 0.7);
  font-family: "Helvetica, sans-serif";
  font-size: 12px;
  flex-direction: column;
`;

const styles = StyleSheet.create({
  imagem: {
    height: 27,
    width: 25
  },
  divImagem: {
    height: 60,
    backgroundColor: "#2B1A2F",
    width: width,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    flex: 1,
    alignSelf: "stretch",
    right: 0,
    left: 0,
    bottom: 0
  },
  btnOpacity: {
    flexDirection: "column",
    alignItems: "center",
    margin: metrics.baseMargin * 4
  }
});

export default styles;
