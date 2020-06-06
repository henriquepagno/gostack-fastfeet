import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'react-native';
import { format, parseISO } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Avatar from '~/components/Avatar';

import { signOut } from '~/store/modules/user/actions';

import {
  Background,
  Container,
  LogoutButton,
  Label,
  Data,
  DataContainer,
} from './styles';

import Colors from '~/styles/Constants';

export default function Profile() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.user.loading);
  let profile = useSelector((state) => state.user.profile);

  profile = {
    ...profile,
    formattedDate: useMemo(
      () => format(parseISO(profile.createdAt), 'dd/MM/yyyy'),
      [profile]
    ),
  };

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <Background>
        <Container>
          <Avatar
            source={profile.avatar ? profile.avatar.url : ''}
            name={profile.name}
            size={150}
          />
          <DataContainer>
            <Label>Nome completo</Label>
            <Data>{profile.name}</Data>
            <Label>Email</Label>
            <Data>{profile.email}</Data>
            <Label>Data de cadastro</Label>
            <Data>{profile.formattedDate}</Data>
          </DataContainer>
          <LogoutButton
            loading={loading}
            onPress={handleLogout}
            color={Colors.red}
          >
            Logout
          </LogoutButton>
        </Container>
      </Background>
    </>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu perfil',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={30} color={tintColor} />
  ),
};
