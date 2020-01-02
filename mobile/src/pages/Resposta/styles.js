import styled from 'styled-components/native';
import Input from '~/components/Input';
import { Dimensions } from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export const Container = styled.View``;
export const Content = styled.View.attrs({
  padding: 20,
})``;

export const AskArea = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const CardBox = styled.View.attrs({
  padding: 20,
  backgroundColor: '#fff',
})`
  border-color: #dddddd;
  border-width: 0.5;
`;

export const Title = styled.Text`
  text-transform: uppercase;
  font-weight: bold;
`;

export const TextArea = styled.Text`
  margin-top: 20;
  font-size: 14;
  color: #666666;
  letter-spacing: 0.3px;
`;

export const AnwserArea = styled.View`
  margin-top: 20;
`;
export const Time = styled.Text`
  color: #666666;
`;
