import React, { useEffect, useState } from 'react';
import { StatusBar, ActivityIndicator, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { parseISO, format } from 'date-fns';

import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Avatar from '~/components/Avatar';
import DeliveryItem from '~/components/DeliveryItem';

import { signOut } from '~/store/modules/user/actions';

import { StackBackground as Background } from '~/styles/globals';
import {
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

import Colors from '~/styles/Constants';

function Dashboard({ navigation }) {
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
        formattedEndDate: row.end_date
          ? format(parseISO(row.end_date), 'dd/MM/yyyy')
          : '-- / -- / --',
        formattedStartDate: row.start_date
          ? format(parseISO(row.start_date), 'dd/MM/yyyy')
          : '-- / -- / --',
      }));

      setDeliveries(page > 1 ? [...deliveries, ...responseData] : responseData);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      Alert.alert(
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
    loadDeliveries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, delivered]);

  useEffect(() => {
    loadDeliveries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
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
              <Icon name="exit-to-app" size={30} color={Colors.red} />
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
            <ActivityIndicator color={Colors.darkGray} size={30} />
          ) : (
            <DeliveryList
              data={deliveries}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <DeliveryItem
                  data={item}
                  onPressDetails={() =>
                    navigation.navigate('Detail', { item, refreshList })
                  }
                />
              )}
              refreshing={refreshing}
              onRefresh={refreshList}
              onEndReachedThreshold={0.3}
              onEndReached={loadMore}
            />
          )}
          {loading && page !== 1 && (
            <ActivityIndicator color={Colors.darkGray} size={30} />
          )}
        </Container>
      </Background>
    </>
  );
}

Dashboard.navigationOptions = () => ({
  title: null,
});

Dashboard.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default withNavigationFocus(Dashboard);
