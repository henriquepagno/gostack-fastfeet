import styled from 'styled-components/native';

export const Container = styled.View`
  margin-right: 5px;
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  border-radius: ${(props) => `${props.width / 2}px`};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ color }) => `${color}33`};
`;

export const AvatarImage = styled.Image`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  border-radius: ${(props) => `${props.width / 2}px`};
`;

export const AvatarInitials = styled.Text`
  color: ${(props) => `${props.color}`};
  font-size: 60px;
`;
