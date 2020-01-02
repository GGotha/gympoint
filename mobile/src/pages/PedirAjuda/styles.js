import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.View.attrs({
  padding: 20,
})``;

export const List = styled.FlatList.attrs({
  showVerticalScrollIndicator: false,
  marginTop: 30,
})``;
