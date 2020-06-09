import styled from 'styled-components/native';

import Colors from '~/styles/Constants';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 0 20px;
  margin-top: 60px;
`;

export const Title = styled.Text`
  color: ${Colors.white};
  font-size: 20px;
  font-weight: bold;
`;

export const ProblemList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingTop: 15, paddingBottom: 150 },
})`
  margin-top: 10px;
`;
