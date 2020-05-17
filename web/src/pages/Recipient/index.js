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

export default function Recipient() {
  const [recipients, setRecipients] = useState();
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [deletableId, setDeletableId] = useState(null);

  useEffect(() => {
    async function loadRecipients() {
      const response = await api.get('recipients', {
        params: { page, q: filter },
      });

      setTotalPages(response.data.totalPages);

      setRecipients(response.data.rows);
    }

    loadRecipients();
  }, [page, filter]);

  function handleSearch(filterValue) {
    setPage(1);
    setFilter(filterValue);
  }

  async function deleteDelivery(id) {
    try {
      await api.delete(`deliveries/${id}`);
      setRecipients(recipients.filter((recipient) => recipient.id !== id));
      toast.success('Destinatário excluído com sucesso');
    } catch (err) {
      toast.error('Erro de comunicação com o servidor');
    }

    setDeletableId(null);
  }

  function handleDelete(id) {
    setAlertOpen(true);
    setDeletableId(id);
  }

  function handleEdit(id) {
    history.push(`/recipients/${id}`);
  }

  return (
    <>
      <Content>
        <header>Gerenciando destinatário</header>
        <>
          <ButtonsWrapper>
            {recipients && (
              <SeachInput
                placeholder="Buscar por destinatário"
                handleSearch={handleSearch}
              />
            )}
            <PageButton
              icon="Add"
              label="CADASTRAR"
              primary
              action={() => history.push('recipients/new')}
            />
          </ButtonsWrapper>
          {recipients && (
            <Table
              type="Recipients"
              data={recipients}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          )}
          {totalPages > 1 && (
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          )}
          <ConfirmDialog
            title="Tem certeza que deseja excluir o destinarário?"
            message="Esse processo é irreversível e o destinatário e suas respectivas encomendas não poderão mais ser
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
