import React, { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import Input from '~/components/Input';
import PageButton from '~/components/PageButton';

import history from '~/services/history';
import api from '~/services/api';

import { Container, HeaderWrapper, ButtonsWrapper } from '~/styles/form';

import { Content, ContentWrapper } from './styles';

export default function ManageRecipient() {
  const formRef = useRef(null);
  const { id: recipientId } = useParams();

  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório.'),
    street: Yup.string().required('A rua é obrigatória.'),
    number: Yup.string().required('O número é obrigatório'),
    complement: Yup.string(),
    state: Yup.string()
      .min(2, 'O estado deve ter no mínimo dois caracteres.')
      .max(2, 'O estado deve ter no máximo dois caracteres.')
      .required('O estado é obrigatório'),
    city: Yup.string().required('A cidade é obrigatória'),
    zipcode: Yup.string().min(8).max(8).required('O CEP é obrigatório.'),
  });

  async function handleSubmit(data) {
    try {
      data.zipcode = data.zipcode.replace(/[^0-9]+/g, '');

      formRef.current.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });

      if (recipientId) {
        await api.put(`recipients/${recipientId}`, data);

        toast.success('Destinatário atualizado com sucesso');
        history.push('/recipients');
      } else {
        const res = await api.post('recipients', data);

        toast.success('Destinatário cadastrado com sucesso');
        history.push(`/recipients/${res.data.id}`);
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
    async function loadRecipient() {
      const { data } = await api.get(`/recipients/${recipientId}`);

      data.zipcode = data.formatted_zipcode;

      formRef.current.setData(data);
      if (data.avatar) {
        formRef.current.setFieldValue('avatar', data.avatar.url);
      }
    }

    if (recipientId) {
      loadRecipient();
    }
  }, [recipientId]);

  return (
    <Container>
      <HeaderWrapper>
        <header>
          {recipientId ? 'Edição de destinatário' : 'Cadastro de destinatário'}
        </header>
        <ButtonsWrapper>
          <PageButton
            icon="Back"
            label="VOLTAR"
            action={() => {
              history.push('/recipients');
            }}
          />
          <PageButton
            icon="Save"
            type="submit"
            form="recipientForm"
            label="SALVAR"
            primary
          />
        </ButtonsWrapper>
      </HeaderWrapper>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit} id="recipientForm">
          <Input
            name="name"
            type="text"
            label="Nome"
            placeholder="Informe o nome do destinatário"
          />
          <ContentWrapper>
            <Input
              name="street"
              type="text"
              label="Rua"
              placeholder="Informe a rua"
            />
            <Input
              name="number"
              type="number"
              label="Número"
              placeholder="Número"
            />
            <Input
              name="complement"
              type="text"
              label="Complement"
              placeholder="Complemento"
            />
          </ContentWrapper>
          <ContentWrapper>
            <Input
              name="city"
              type="text"
              label="Cidade"
              placeholder="Informe a cidade"
            />
            <Input
              name="state"
              type="text"
              label="Estado"
              placeholder="Sigla do estado"
            />
            <Input
              name="zipcode"
              type="text"
              label="CEP"
              placeholder="CEP"
              mask="99999-999"
            />
          </ContentWrapper>
        </Form>
      </Content>
    </Container>
  );
}
