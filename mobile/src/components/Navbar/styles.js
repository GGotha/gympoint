import styled from "styled-components/native";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height;

export const Container = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.3);
`;

const styles = StyleSheet.create({
  imagem: {
    height: 27,
    width: 25
  },
  divImagem: {
    height: 64,
    backgroundColor: "rgba(0, 0, 0, 0.3);",
    width: width,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    flex: 1,
    alignSelf: "stretch",
    right: 0,
    left: 0
  }
});

export default styles;
