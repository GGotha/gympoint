import styled from 'styled-components/native';

export const Container = styled.View.attrs({})`
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 4px;
  background: #fff;
  font-weight: 900;
  border: #dddddd;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Time = styled.Text`
  color: #666666;
`;

export const CheckinText = styled.Text`
  font-weight: bold;
`;
