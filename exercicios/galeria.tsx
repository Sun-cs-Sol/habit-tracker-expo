// Exercício 2 — RESOLUÇÃO: a galeria com seleção múltipla
// Nível ⭐⭐ · 12 min
//
// No sandbox: src/app/galeria.tsx. Roda no simulador.

import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';

// renderItem FORA do componente, com recyclingKey (Aula 5).
function renderFoto({ item }: { item: ImagePicker.ImagePickerAsset }) {
  return (
    <Image
      source={{ uri: item.uri }}
      style={estilos.miniatura}
      contentFit="cover"
      recyclingKey={item.uri}
    />
  );
}

// Componente da lista vazia, também fora.
function ListaVazia() {
  return <Text style={estilos.vazio}>Nenhuma foto escolhida ainda.</Text>;
}

export default function TelaGaleria() {
  // Lista de assets, começando vazia e tipada com ImagePicker.ImagePickerAsset.
  const [fotos, setFotos] = useState<ImagePicker.ImagePickerAsset[]>([]);

  async function escolherVarias() {
    // Seleção múltipla com limite de 6.
    // allowsEditing não convive com allowsMultipleSelection (o sistema ignora o recorte).
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      selectionLimit: 6,
      quality: 0.7,
    });

    if (resultado.canceled) return;
    setFotos(resultado.assets);
  }

  return (
    <View style={estilos.tela}>
      <Pressable onPress={escolherVarias} style={estilos.botao}>
        <Text style={estilos.textoBotao}>Escolher até 6 fotos</Text>
      </Pressable>

      <FlatList
        data={fotos}
        keyExtractor={(foto) => foto.uri}
        renderItem={renderFoto}
        numColumns={3}
        columnWrapperStyle={estilos.linha}
        contentContainerStyle={estilos.grade}
        ListEmptyComponent={ListaVazia}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, padding: 24, gap: 16 },
  botao: { backgroundColor: '#f26522', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  textoBotao: { color: '#fff', fontWeight: '700', fontSize: 16 },
  grade: { gap: 8 },
  linha: { gap: 8 },
  miniatura: { flex: 1, aspectRatio: 1, borderRadius: 8, maxWidth: '33%' },
  vazio: { fontSize: 15, color: '#666' },
});
