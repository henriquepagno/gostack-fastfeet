import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';
import { TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import ProblemItem from '~/components/ProblemItem';

import {
  StackBackground as Background,
  HeaderBackground,
} from '~/styles/globals';
import { Container, Title, ProblemList } from './styles';

import Colors from '~/styles/Constants';

export default function Problem({ navigation }) {
  const deliveryId = navigation.getParam('deliveryId');

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [problems, setProblems] = useState([]);

  async function loadProblems() {
    try {
      setLoading(true);

      const response = await api.get(`/delivery/${deliveryId}/problems`, {
        params: { page },
      });

      const responseData = response.data.rows.map((row) => ({
        ...row,
        formattedDate: format(parseISO(row.created_at), 'dd/MM/yyyy'),
      }));

      setProblems(page > 1 ? [...problems, ...responseData] : responseData);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      Alert.alert(
        'Falha ao buscar os problemas da encomenda.',
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
    setProblems([]);

    if (page === 1) {
      loadProblems();
      return;
    }
    setPage(1);
  }

  useEffect(() => {
    loadProblems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    loadProblems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Background>
      <HeaderBackground />

      <Container>
        <Title>Encomenda {String(`0${deliveryId}`).slice(-2)}</Title>

        {loading && page === 1 ? (
          <ActivityIndicator color={Colors.darkGray} size={30} />
        ) : (
          <ProblemList
            data={problems}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <ProblemItem
                description={item.description}
                date={item.formattedDate}
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
  );
}

Problem.navigationOptions = ({ navigation }) => ({
  title: 'Visualizar problemas',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={20} color={Colors.white} />
    </TouchableOpacity>
  ),
});

Problem.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
