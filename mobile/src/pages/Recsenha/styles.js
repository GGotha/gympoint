import LinearGradient from "react-native-linear-gradient";
import styled from "styled-components";
import { StyleSheet } from "react-native";
import { colors, metrics } from "../../styles";

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

export const BordaSeparate = styled.View`
  border: 1px solid rgba(151, 151, 151, 0.2);
  margin: 4% 0 2% 0;
`;

const styles = StyleSheet.create({
  form: {
    marginTop: metrics.baseMargin
  },

  input: {
    backgroundColor: "rgba(0, 0, 0, 0.2);",
    color: colors.white,
    borderRadius: metrics.baseRadius,
    height: 50,
    width: 315,
    paddingHorizontal: metrics.basePadding,
    marginTop: metrics.baseMargin * 0.5
  },

  button: {
    backgroundColor: colors.secondary,
    borderRadius: metrics.baseRadius,
    height: 50,
    marginTop: metrics.baseMargin,
    justifyContent: "center",
    alignItems: "center"
  },

  buttonLeave: {
    backgroundColor: "#D44059",
    borderRadius: metrics.baseRadius,
    height: 42,
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
