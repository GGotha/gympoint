import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export const Container = styled.View``;

export const Content = styled.View``;

export const List = styled.FlatList.attrs({
  showVerticalScrollIndicator: false,
  marginTop: 30,
})``;
