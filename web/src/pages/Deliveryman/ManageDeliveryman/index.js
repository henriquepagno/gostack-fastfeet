import React, { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import Input from '~/components/Input';
import PageButton from '~/components/PageButton';
import AvatarInput from '~/components/AvatarInput';

import history from '~/services/history';
import api from '~/services/api';

import { Container, HeaderWrapper, ButtonsWrapper } from '~/styles/form';

import { Content } from './styles';

export default function ManageDeliveryman() {
  const formRef = useRef(null);
  const { id: deliverymanId } = useParams();

  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório.'),
    email: Yup.string().required('O email é obrigatório.'),
  });

  async function handleAvatar(avatar, id) {
    const data = new FormData();

    data.append('file', avatar);

    const res = await api.post(`/deliverymen/${id}/avatar`, data);

    return res.data;
  }

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });

      const { name, email } = data;

      if (deliverymanId) {
        await api.put(`deliverymen/${deliverymanId}`, { name, email });

        if (data.avatar) {
          await handleAvatar(data.avatar, deliverymanId);
        }

        toast.success('Entregador atualizada com sucesso');
        history.push('/deliverymen');
      } else {
        const res = await api.post('deliverymen', { name, email });

        if (data.avatar) {
          await handleAvatar(data.avatar, res.data.id);
        }

        toast.success('Entregador cadastrada com sucesso');
        history.push(`/deliverymen/${res.data.id}`);
      }
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      }
      if (err.response) {
        toast.error(
          (err.response && err.response.data.error) ||
            'Erro de comunicação com o servidor'
        );
      }
    }
  }

  useEffect(() => {
    async function loadDeliveryman() {
      const { data } = await api.get(`/deliverymen/${deliverymanId}`);

      formRef.current.setData(data);
      if (data.avatar) {
        formRef.current.setFieldValue('avatar', data.avatar.url);
      }
    }

    if (deliverymanId) {
      loadDeliveryman();
    }
  }, [deliverymanId]);

  return (
    <Container>
      <HeaderWrapper>
        <header>
          {deliverymanId
            ? 'Edição de entregadores'
            : 'Cadastro de entregadores'}
        </header>
        <ButtonsWrapper>
          <PageButton
            icon="Back"
            label="VOLTAR"
            action={() => {
              history.push('/deliverymen');
            }}
          />
          <PageButton
            icon="Save"
            type="submit"
            form="deliverymenForm"
            label="SALVAR"
            primary
          />
        </ButtonsWrapper>
      </HeaderWrapper>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit} id="deliverymenForm">
          <AvatarInput name="avatar" />
          <Input
            name="name"
            type="text"
            label="Nome"
            placeholder="Informe o nome do entregador"
          />
          <Input
            name="email"
            type="email"
            label="Email"
            placeholder="Informe o email do entregador"
          />
        </Form>
      </Content>
    </Container>
  );
}
