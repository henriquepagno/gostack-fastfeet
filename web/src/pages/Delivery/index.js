import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';

import SeachInput from '~/components/SearchInput';
import Table from '~/components/Table';
import Pagination from '~/components/Pagination';
import ConfirmDialog from '~/components/ConfirmationDialog';
import Modal from '~/components/Modal';
import PageButton from '~/components/PageButton';

import history from '~/services/history';
import api from '~/services/api';

import { Content, ButtonsWrapper } from '~/styles/global';

export default function Delivery() {
  const [deliveries, setDeliveries] = useState();
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [deletableId, setDeletableId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentDelivery, setCurrentDelivery] = useState();

  useEffect(() => {
    async function loadDeliveries() {
      const response = await api.get('deliveries', {
        params: { page, q: filter },
      });

      setTotalPages(response.data.totalPages);

      const rows = response.data.rows.map((row) => ({
        ...row,
        start_date: row.start_date
          ? format(parseISO(row.start_date), 'dd/MM/yyyy HH:MM')
          : null,
        end_date: row.end_date
          ? format(parseISO(row.end_date), 'dd/MM/yyyy HH:MM')
          : null,
      }));

      setDeliveries(rows);
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

  function handleOpen(delivery) {
    setCurrentDelivery(delivery);
    setModalVisible(!modalVisible);
  }

  function handleEdit(id) {
    history.push(`/deliveries/${id}`);
  }

  return (
    <>
      <Content>
        <header>Gerenciando encomendas</header>
        <>
          <ButtonsWrapper>
            {deliveries && (
              <SeachInput
                placeholder="Buscar por encomendas"
                handleSearch={handleSearch}
              />
            )}
            <PageButton
              icon="Add"
              label="CADASTRAR"
              primary
              action={() => history.push('deliveries/new')}
            />
          </ButtonsWrapper>
          {deliveries && (
            <Table
              data={deliveries}
              handleOpen={handleOpen}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          )}
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
      </Content>
      <Modal
        visible={modalVisible}
        setVisible={setModalVisible}
        setCurrentDelivery={setCurrentDelivery}
      >
        {currentDelivery && (
          <>
            <h3>Informações da encomenda</h3>
            <p>
              {currentDelivery.recipient.street},{' '}
              {currentDelivery.recipient.number}
            </p>
            <p>
              {currentDelivery.recipient.city} -{' '}
              {currentDelivery.recipient.state}
            </p>
            <p>{currentDelivery.recipient.formatted_zipcode}</p>
            <h3>Datas</h3>
            <div>
              <strong>Retirada:</strong>
              <p>{currentDelivery.start_date}</p>
            </div>
            <div>
              <strong>Entrega:</strong>
              <p>{currentDelivery.end_date}</p>
            </div>
            {currentDelivery.end_date && currentDelivery.signature && (
              <>
                <h3>Assinatura do destinatário</h3>
                <img src={currentDelivery.signature.url} alt="signature" />
              </>
            )}
          </>
        )}
      </Modal>
    </>
  );
}
