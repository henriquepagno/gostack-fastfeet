import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RNCamera } from 'react-native-camera';

import api from '~/services/api';

import {
  StackBackground as Background,
  HeaderBackground,
} from '~/styles/globals';
import { Container, Camera, SnapButton, SubmitButton } from './styles';

import Colors from '~/styles/Constants';

export default function Confirm({ navigation }) {
  const deliveryId = navigation.getParam('deliveryId');
  const profile = useSelector((state) => state.user.profile);

  const [image, setImage] = useState();

  async function takePicture(camera) {
    if (camera) {
      const options = { quality: 0.2, base64: true };
      const data = await camera.takePictureAsync(options);
      setImage(data.uri);
    }
  }

  async function handleSubmit() {
    if (!image) return;

    try {
      const data = new FormData();

      const uriParts = image.split('.');
      const fileType = uriParts[uriParts.length - 1];

      data.append('file', {
        uri: image,
        name: `signature-delivery-${deliveryId}.${fileType}`,
        type: `image/${fileType}`,
      });

      await api.post(`/deliveries/${deliveryId}/signature`, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

      navigation.navigate('Dashboard');
    } catch (err) {
      Alert.alert(
        'Falha ao confirmar entrega.',
        err.response
          ? err.response.data.error
          : 'Erro de conexão com o servidor'
      );
    }
  }

  return (
    <Background>
      <HeaderBackground />

      <Container>
        <Camera type={RNCamera.Constants.Type.back} captureAudio={false}>
          {({ camera, status }) => {
            if (status !== 'READY') return null;
            return (
              <SnapButton onPress={() => takePicture(camera)}>
                <Icon name="camera" size={32} color={Colors.white} />
              </SnapButton>
            );
          }}
        </Camera>
        <SubmitButton
          disabled={!image}
          color={Colors.purple}
          onPress={() => handleSubmit()}
        >
          Enviar
        </SubmitButton>
      </Container>
    </Background>
  );
}

Confirm.navigationOptions = ({ navigation }) => ({
  title: 'Confirmar entrega',
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
