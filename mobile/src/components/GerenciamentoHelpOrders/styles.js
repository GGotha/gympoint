import styled from 'styled-components/native';

export const Container = styled.View.attrs({})`
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 4px;
  background: #fff;
  font-weight: 900;
  border: #dddddd;
  height: auto;
`;

export const CardHeader = styled.View.attrs({})`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const StatusOrder = styled.View.attrs({})`
  display: flex;
  flex-direction: row;
`;

export const Main = styled.View.attrs({})`
  margin-top: 15;
`;
