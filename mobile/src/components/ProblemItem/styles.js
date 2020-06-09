import styled from 'styled-components/native';

import Colors from '~/styles/Constants';

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  border: 1px solid ${Colors.lightGray};
  border-radius: 4px;
  margin-bottom: 15px;
  align-items: flex-start;
  width: 100%;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 15px;
  padding-top: 20px;
  padding-bottom: 20px;
  background: ${Colors.white};
`;

export const Description = styled.Text`
  color: ${Colors.darkGray};
  font-size: 16px;
  text-align: justify;
  width: 230px;
`;

export const Date = styled.Text`
  color: ${Colors.gray};
`;
