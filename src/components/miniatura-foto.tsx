// Atividade 2 — Componente de Miniatura de Foto
// Onde: src/components/miniatura-foto.tsx
//
// ATENÇÃO: este componente deve morar em src/components/, NUNCA em src/app/
// (pois qualquer arquivo em src/app vira rota no Expo Router).

import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import type { ImagePickerAsset } from 'expo-image-picker';

type MiniaturaFotoProps = {
  item: ImagePickerAsset;
};

export function MiniaturaFoto({ item }: MiniaturaFotoProps) {
  // recyclingKey (Aula 5): a FlatList recicla as células, e sem ela a miniatura antiga
  // pisca por um instante no lugar da nova.
  return (
    <Image
      source={{ uri: item.uri }}
      style={estilos.miniatura}
      contentFit="cover"
      recyclingKey={item.uri}
    />
  );
}

const estilos = StyleSheet.create({
  miniatura: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 8,
    maxWidth: '33%', // impede a última foto de esticar pela linha inteira
  },
});
