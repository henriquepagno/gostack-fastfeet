import styled from 'styled-components/native';

import Colors from '~/styles/Constants';

export const Container = styled.View`
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 2px solid ${Colors.lightGray};
  margin-bottom: 20px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  border-radius: 4px;
  align-items: center;
  align-self: flex-start;
  margin-left: 15px;
  margin-top: 10px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-left: 10px;
  color: ${Colors.purple};
`;

export const InfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  background: ${Colors.lightGray};
  align-items: center;
  height: 70px;
`;

export const DataContainer = styled.View`
  margin-left: 15px;
  flex-direction: column;
`;

export const Label = styled.Text`
  font-size: 12px;
  color: ${Colors.darkGray};
`;

export const Data = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${Colors.lightBlack};
`;

export const DetailsButton = styled.TouchableOpacity`
  height: 20px;
  margin-right: 15px;
`;

export const DetailsButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  margin: auto;
  line-height: 15px;
  color: ${Colors.purple};
`;
