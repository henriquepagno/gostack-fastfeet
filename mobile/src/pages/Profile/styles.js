import styled from 'styled-components/native';
import Button from '~/components/Button';

import Colors from '~/styles/Constants';

export const Background = styled.View`
  flex: 1;
  background-color: ${Colors.white};
`;

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const DataContainer = styled.View`
  margin-top: 40px;
  align-self: flex-start;
`;

export const LogoutButton = styled(Button)`
  margin-top: 10px;
  align-self: stretch;
`;

export const Label = styled.Text`
  font-size: 14px;
  color: ${Colors.darkGray};
`;

export const Data = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${Colors.lightBlack};
  margin-bottom: 15px;
`;
