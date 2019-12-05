import { StyleSheet } from "react-native";
import { colors, metrics } from "../../styles";
import LinearGradient from "react-native-linear-gradient";
import styled from "styled-components";

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

const styles = StyleSheet.create({
  colorWhiter: {
    color: colors.white
  },

  divImagem: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: metrics.baseMargin * 4
  },

  imagem: {
    width: 41,
    height: 42
  },

  form: {
    marginTop: metrics.baseMargin * 2
  },

  input: {
    backgroundColor: "rgba(0, 0, 0, 0.1);",
    color: colors.white,
    borderRadius: metrics.baseRadius,
    height: 50,
    width: 315,
    paddingHorizontal: metrics.basePadding,
    marginTop: metrics.baseMargin
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
  },

  footerText: {
    color: "rgba(255, 255, 255, 0.5)",
    marginTop: metrics.baseMargin * 2,
    textAlign: "center"
  }
});

export default styles;
