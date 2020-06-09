import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import Colors from '~/styles/Constants';

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  margin-top: 60px;
`;

export const InfoContainer = styled.View`
  padding: 15px 15px;
  padding-right: 30px;
  justify-content: center;
  align-items: flex-start;
  border-radius: 4px;
  border: 2px solid ${Colors.lightGray};
  width: 100%;
  background: ${Colors.white};
  margin-bottom: 10px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  margin-left: 5px;
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.purple};
`;

export const Label = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${Colors.gray};
  text-transform: uppercase;
  margin-top: 10px;
  margin-bottom: 5px;
`;

export const DatesContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const DateContainer = styled.View`
  align-items: flex-start;
`;

export const Data = styled.Text`
  font-size: 16px;
  color: ${Colors.lightBlack};
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const Button = styled(RectButton)`
  padding: 5px 20px;
  background: ${Colors.lightGray};
  align-items: center;
  border: 1px solid ${Colors.lightBlack};
  justify-content: center;

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
    `}
`;

export const ButtonText = styled.Text`
  margin: 5px 0;
  font-size: 14px;
  color: ${Colors.darkGray};
  text-align: center;
  width: 80px;
`;
