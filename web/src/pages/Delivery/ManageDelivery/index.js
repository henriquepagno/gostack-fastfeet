import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import Input from '~/components/Input';
import PageButton from '~/components/PageButton';
import ReactSelect from '~/components/ReactSelect';

import history from '~/services/history';
import api from '~/services/api';

import { Container, HeaderWrapper, ButtonsWrapper } from '~/styles/form';

import { Content } from './styles';

export default function ManageDelivery() {
  const [isLoading, setIsLoading] = useState(false);
  const [recipients, setRecipients] = useState();
  const [deliverymen, setDeliverymen] = useState();

  const formRef = useRef(null);
  const { id: deliveryId } = useParams();

  const schema = Yup.object().shape({
    recipient_id: Yup.string().required('O destinatário é obrigatório.'),
    deliveryman_id: Yup.string().required('O entregador é obrigatório.'),
    product: Yup.string().required('O produto é obrigatório.'),
  });

  const customStyles = {
    option: (styles) => ({
      ...styles,
      fontWeight: 'normal',
      marginTop: '0',
    }),
    container: (styles) => ({ ...styles, width: '100%' }),
    control: (styles, state) => ({
      ...styles,
      border: '1px solid #eee',
      boxShadow: state.isFocused && '1px solid rgba(0, 0, 0, 0.149)',
      '&:hover': {
        border: '1px solid #eee',
      },
      borderRadius: '4px',
      width: '100%',
      height: '45px',
      fontWeight: 'normal',
      marginTop: '11px',
      marginBottom: '11px',
      background: 'rgba(255, 255, 255, 0.1)',
      padding: '0px 5px',
    }),
    placeholder: (styles) => ({
      ...styles,
      color: 'rgba(0, 0, 0, 0.4)',
    }),
    indicatorSeparator: (styles) => ({
      ...styles,
      display: 'none',
    }),
    singleValue: (styles) => ({ ...styles, color: '#8e8e8e' }),
    menuList: (styles) => ({ ...styles, color: '#8e8e8e' }),
  };

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });

      if (deliveryId) {
        await api.put(`deliveries/${deliveryId}`, { ...data });

        toast.success('Encomenda atualizada com sucesso');
        history.push(`/deliveries`);
      } else {
        const res = await api.post('deliveries', { ...data });

        toast.success('Encomenda cadastrada com sucesso');
        history.push(`/deliveries/${res.data.id}`);
      }
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      }
    }
  }

  function formatResponse(data) {
    return data.map((reg) => ({
      value: reg.id,
      label: reg.name,
    }));
  }

  useEffect(() => {
    async function loadRecipients() {
      const response = await api.get('recipients', {
        params: { page: 1 },
      });

      setRecipients(formatResponse(response.data.rows));
    }

    async function loadDeliverymen() {
      const response = await api.get('deliverymen', {
        params: { page: 1 },
      });

      setDeliverymen(formatResponse(response.data.rows));
    }

    async function loadDelivery() {
      const { data } = await api.get(`/deliveries/${deliveryId}`);

      formRef.current.setData(data);
      formRef.current.setFieldValue('recipient_id', {
        value: data.recipient.id,
        label: data.recipient.name,
      });
      formRef.current.setFieldValue('deliveryman_id', {
        value: data.deliveryman.id,
        label: data.deliveryman.name,
      });
    }

    setIsLoading(true);

    Promise.all([loadRecipients(), loadDeliverymen()]);

    if (deliveryId) {
      loadDelivery();
    }

    setIsLoading(false);
  }, [deliveryId]);

  return (
    <Container>
      <HeaderWrapper>
        <header>
          {deliveryId ? 'Edição de encomenda' : 'Cadastro de encomenda'}
        </header>
        <ButtonsWrapper>
          <PageButton
            icon="Back"
            label="VOLTAR"
            action={() => {
              history.push('/deliveries');
            }}
          />
          <PageButton
            icon="Save"
            type="submit"
            form="deliveryForm"
            label="SALVAR"
            primary
          />
        </ButtonsWrapper>
      </HeaderWrapper>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit} id="deliveryForm">
          <div className="select-container">
            <ReactSelect
              isLoading={isLoading}
              isSearchable
              name="recipient_id"
              label="Destinatário"
              options={recipients}
              placeholder="Informe o destinatário"
              styles={customStyles}
            />
            <ReactSelect
              isLoading={isLoading}
              isSearchable
              name="deliveryman_id"
              label="Entregador"
              options={deliverymen}
              placeholder="Informe o entregador"
              styles={customStyles}
            />
          </div>
          <Input
            name="product"
            type="text"
            label="Produto"
            placeholder="Informe o produto da entrega"
          />
        </Form>
      </Content>
    </Container>
  );
}
