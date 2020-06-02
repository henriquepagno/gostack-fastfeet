import React, { useEffect, useState } from 'react';
import { StatusBar, ActivityIndicator, Alert } from 'react-native';
import Proptypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { parseISO, format } from 'date-fns';

import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Avatar from '~/components/Avatar';
import DeliveryItem from '~/components/DeliveryItem';

import { signOut } from '~/store/modules/user/actions';

import {
  Background,
  Container,
  ProfileContainer,
  GreetingContainer,
  Greeting,
  GreetingName,
  LogoutButton,
  TitleContainer,
  Title,
  FilterContainer,
  FilterButton,
  FilterButtonText,
  DeliveryList,
} from './styles';

function Dashboard({ isFocused }) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  const [deliveries, setDeliveries] = useState([]);
  const [delivered, setDelivered] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  function handleLogout() {
    dispatch(signOut());
  }

  async function loadDeliveries() {
    try {
      setLoading(true);

      const response = await api.get(
        `/deliveries/deliveryman/${profile.id}/deliveries`,
        {
          params: { page, delivered },
        }
      );

      const responseData = response.data.rows.map((row) => ({
        ...row,
        formattedDate: format(parseISO(row.createdAt), 'dd/MM/yyyy'),
      }));

      setDeliveries(page > 1 ? [...deliveries, ...responseData] : responseData);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      Alert(
        'Falha ao buscar as encomendas.',
        err.response
          ? err.response.data.error
          : 'Erro de conexão com o servidor'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  function loadMore() {
    if (page >= totalPages || loading) return;

    setPage(page + 1);
  }

  function refreshList() {
    setRefreshing(true);
    setDeliveries([]);

    if (page === 1) {
      loadDeliveries();
      return;
    }
    setPage(1);
  }

  function handleDelivered(deliveryFilter) {
    setDelivered(deliveryFilter);
    setPage(1);
  }

  useEffect(() => {
    if (isFocused) {
      loadDeliveries();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, page, delivered]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Background>
        <Container>
          <ProfileContainer>
            <Avatar
              source={profile.avatar ? profile.avatar.url : ''}
              name={profile.name}
              size={85}
            />
            <GreetingContainer>
              <Greeting>Bem vindo de volta,</Greeting>
              <GreetingName>{profile.name}</GreetingName>
            </GreetingContainer>
            <LogoutButton
              onPress={() => {
                handleLogout();
              }}
            >
              <Icon name="exit-to-app" size={30} color="#e74040" />
            </LogoutButton>
          </ProfileContainer>

          <TitleContainer>
            <Title>Entregas</Title>
            <FilterContainer>
              <FilterButton
                onPress={() => {
                  handleDelivered(false);
                }}
                enabled={!delivered}
              >
                <FilterButtonText enabled={!delivered}>
                  Pendentes
                </FilterButtonText>
              </FilterButton>
              <FilterButton
                onPress={() => {
                  handleDelivered(true);
                }}
                enabled={delivered}
              >
                <FilterButtonText enabled={delivered}>
                  Entregues
                </FilterButtonText>
              </FilterButton>
            </FilterContainer>
          </TitleContainer>

          {loading && page === 1 ? (
            <ActivityIndicator color="#666" size={30} />
          ) : (
            <DeliveryList
              data={deliveries}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => <DeliveryItem data={item} />}
              refreshing={refreshing}
              onRefresh={refreshList}
              onEndReachedThreshold={0.3}
              onEndReached={loadMore}
            />
          )}
          {loading && page !== 1 && (
            <ActivityIndicator color="#666" size={30} />
          )}
        </Container>
      </Background>
    </>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Entregas',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="toc" size={30} color={tintColor} />
  ),
};

Dashboard.propTypes = {
  isFocused: Proptypes.bool.isRequired,
};

export default withNavigationFocus(Dashboard);
