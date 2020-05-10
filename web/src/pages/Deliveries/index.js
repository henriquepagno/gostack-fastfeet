import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import SeachInput from '~/components/SearchInput';
import Table from '~/components/Table';
import Pagination from '~/components/Pagination';
import ConfirmDialog from '~/components/ConfirmationDialog';

import api from '~/services/api';

import { Content } from '~/styles/global';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState();
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [deletableId, setDeletableId] = useState(null);

  useEffect(() => {
    async function loadDeliveries() {
      const response = await api.get('deliveries', {
        params: { page, q: filter },
      });

      setTotalPages(response.data.totalPages);
      setDeliveries(response.data.rows);
    }

    loadDeliveries();
  }, [page, filter]);

  function handleSearch(filterValue) {
    setPage(1);
    setFilter(filterValue);
  }

  async function deleteDelivery(id) {
    try {
      await api.delete(`deliveries/${id}`);
      setDeliveries(deliveries.filter((delivery) => delivery.id !== id));
      toast.success('Encomenda excluída com sucesso');
    } catch (err) {
      toast.error('Erro de comunicação com o servidor');
    }

    setDeletableId(null);
  }

  function handleDelete(id) {
    setAlertOpen(true);
    setDeletableId(id);
  }

  return (
    <Content>
      <header>Gerenciando encomendas</header>
      {deliveries && (
        <>
          <SeachInput
            placeholder="Buscar por encomendas"
            handleSearch={handleSearch}
          />
          <Table data={deliveries} handleDelete={handleDelete} />
          {totalPages > 1 && (
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          )}
          <ConfirmDialog
            title="Tem certeza que deseja excluir a encomenda?"
            message="Esse processo é irreversível e a encomenda não poderá mais ser
            acessada."
            open={alertOpen}
            setOpen={() => {
              setAlertOpen(!alertOpen);
            }}
            onConfirm={() => {
              deleteDelivery(deletableId);
            }}
          />
        </>
      )}
    </Content>
  );
}
