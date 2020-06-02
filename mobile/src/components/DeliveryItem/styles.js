import styled from 'styled-components/native';

export const Container = styled.View`
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 2px solid #f0f2f8;
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
  color: #7d40e7;
`;

export const InfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  background: #f0f2f8;
  align-items: center;
  height: 70px;
`;

export const DataContainer = styled.View`
  margin-left: 15px;
  flex-direction: column;
`;

export const Label = styled.Text`
  font-size: 12px;
  color: #666;
`;

export const Data = styled.Text`
  font-size: 14px;
  font-weight: bold;
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
  color: #7d40e7;
`;
