import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import Table from '~/components/Table';
import Pagination from '~/components/Pagination';
import ConfirmDialog from '~/components/ConfirmationDialog';
import Modal from '~/components/Modal';

import api from '~/services/api';

import { Content } from '~/styles/global';

export default function Problem() {
  const [problems, setProblems] = useState();
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);
  const [alertOpen, setAlertOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentProblem, setCurrentProblem] = useState();
  const [cancelableId, setCancelableId] = useState(null);

  useEffect(() => {
    async function loadProblems() {
      const response = await api.get('/deliveries/problems', {
        params: { page },
      });

      setTotalPages(response.data.totalPages);

      setProblems(response.data.rows);
    }

    loadProblems();
  }, [page]);

  async function cancelDelivery(id) {
    try {
      await api.delete(`/problem/${id}/cancel-delivery`);
      toast.success('Encomenda cancelada com sucesso');
    } catch (err) {
      // toast.error('Erro de comunicação com o servidor');
      if (err.response) {
        toast.error(
          (err.response && err.response.data.error) ||
            'Erro de comunicação com o servidor'
        );
      }
    }

    setCancelableId(null);
  }

  function handleCancel(id) {
    setAlertOpen(true);
    setCancelableId(id);
  }

  function handleOpen(problem) {
    setCurrentProblem(problem);
    setModalVisible(!modalVisible);
  }

  return (
    <>
      <Content>
        <header>Problemas na entrega</header>
        <>
          {problems && (
            <Table
              type="Problems"
              data={problems}
              handleOpen={handleOpen}
              handleDelete={handleCancel}
            />
          )}
          {totalPages > 1 && (
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          )}
          <ConfirmDialog
            title="Tem certeza que deseja cancelar a encomenda?"
            message="Esse processo é irreversível."
            open={alertOpen}
            setOpen={() => {
              setAlertOpen(!alertOpen);
            }}
            onConfirm={() => {
              cancelDelivery(cancelableId);
            }}
          />
        </>
      </Content>
      <Modal visible={modalVisible} setVisible={setModalVisible}>
        {currentProblem && (
          <>
            <h3>VISUALIZAR PROBLEMA</h3>
            <p>{currentProblem.description}</p>
          </>
        )}
      </Modal>
    </>
  );
}
