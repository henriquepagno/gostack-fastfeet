import styled, { css } from 'styled-components/native';

import Colors from '~/styles/Constants';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

export const ProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
`;

export const GreetingContainer = styled.View`
  margin-left: 10px;
  flex: 1;
  flex-direction: column;
`;

export const Greeting = styled.Text`
  color: ${Colors.gray};
  font-size: 14px;
`;

export const GreetingName = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${Colors.lightBlack};
  width: 180px;
`;

export const LogoutButton = styled.TouchableOpacity`
  padding: 5px 5px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 5px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${Colors.lightBlack};
`;

export const FilterContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const FilterButton = styled.TouchableOpacity`
  margin: 0 8px;
  height: 20px;

  ${({ enabled }) =>
    enabled &&
    css`
      border-color: ${Colors.purple};
      border-bottom-width: 1px;
      border-style: solid;
    `}
`;

export const FilterButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  margin: auto;
  line-height: 15px;
  color: ${({ enabled }) => (enabled ? Colors.purple : Colors.gray)};
`;

export const DeliveryList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingTop: 15, paddingBottom: 150 },
})``;
