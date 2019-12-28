import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';

export const Container = styled.View`
  padding: 0px 20px;

  min-height: 100%;
  /* display: flex; */
  justify-content: center;
`;

const styles = StyleSheet.create({
  image: {
    width: 122,
    height: 85,
    resizeMode: 'contain',
  },
  viewImage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
