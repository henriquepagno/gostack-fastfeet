import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import SeachInput from '~/components/SearchInput';
import Table from '~/components/Table';
import Pagination from '~/components/Pagination';
import ConfirmDialog from '~/components/ConfirmationDialog';
import PageButton from '~/components/PageButton';

import history from '~/services/history';
import api from '~/services/api';

import { Content, ButtonsWrapper } from '~/styles/global';

export default function Deliverymen() {
  const [deliverymen, setDeliverymen] = useState();
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [deletableId, setDeletableId] = useState(null);

  useEffect(() => {
    async function loadDeliverymen() {
      const response = await api.get('deliverymen', {
        params: { page, q: filter },
      });

      setTotalPages(response.data.totalPages);

      setDeliverymen(response.data.rows);
    }

    loadDeliverymen();
  }, [page, filter]);

  function handleSearch(filterValue) {
    setPage(1);
    setFilter(filterValue);
  }

  function handleEdit(id) {
    history.push(`/deliverymen/${id}`);
  }

  function handleDelete(id) {
    setAlertOpen(true);
    setDeletableId(id);
  }

  async function deleteDelivery(id) {
    try {
      await api.delete(`deliverymen/${id}`);
      setDeliverymen(deliverymen.filter((delivery) => delivery.id !== id));
      toast.success('Entregador excluído com sucesso');
    } catch (err) {
      toast.error('Erro de comunicação com o servidor');
    }

    setDeletableId(null);
  }

  return (
    <>
      <Content>
        <header>Gerenciando entregadores</header>
        <>
          <ButtonsWrapper>
            {deliverymen && (
              <SeachInput
                placeholder="Buscar por entregadores"
                handleSearch={handleSearch}
              />
            )}
            <PageButton
              icon="Add"
              label="CADASTRAR"
              primary
              action={() => history.push('deliverymen/new')}
            />
          </ButtonsWrapper>
          {deliverymen && (
            <Table
              type="Deliverymen"
              data={deliverymen}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          )}
          {totalPages > 1 && (
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          )}
          <ConfirmDialog
            title="Tem certeza que deseja excluir o entregador?"
            message="Esse processo é irreversível e o entregador e suas respectivas encomendas não poderão mais ser
            acessados."
            open={alertOpen}
            setOpen={() => {
              setAlertOpen(!alertOpen);
            }}
            onConfirm={() => {
              deleteDelivery(deletableId);
            }}
          />
        </>
      </Content>
    </>
  );
}
