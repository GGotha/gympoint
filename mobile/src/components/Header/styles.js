import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

var width = Dimensions.get('window').width;

export const Container = styled.View`
  flex-direction: row;
  height: 50;
  border-bottom-color: #999999;
  border-bottom-width: 0.5;
  align-items: center;
  justify-content: center;
  width: ${width};
  background-color: #fff;
`;

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 50,
    resizeMode: 'contain',
  },
  text: {
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    color: '#ee4e62',
    textTransform: 'uppercase',
    marginLeft: width * 0.01,
  },
});

export default styles;
