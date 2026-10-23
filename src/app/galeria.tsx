// Atividade 2 — A Galeria do Hábito
// Onde: src/app/galeria.tsx
//
// Por que a seleção múltipla e o recorte (allowsEditing) NÃO convivem: a tela de recorte
// do sistema edita UMA imagem por vez — ela recebe uma foto, devolve uma foto. Com
// allowsMultipleSelection o picker devolve uma lista inteira de uma vez, e não existe uma
// tela de recorte em lote para encaixar no meio. Por isso, quando as duas opções vêm
// juntas, o sistema ignora o allowsEditing (e o aspect junto com ele): as fotos chegam no
// formato original e o quadrado da grade é feito na exibição, com contentFit="cover".

import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// Regra de ouro da arquitetura: o componente de miniatura mora em src/components/,
// NUNCA declarado dentro de src/app/ para não gerar rotas fantasmas.
import { MiniaturaFoto } from '../components/miniatura-foto';

// Fora do componente: não é recriado a cada render.
function ListaVazia() {
  return <Text style={estilos.vazio}>Nenhuma foto escolhida ainda.</Text>;
}

function renderFoto({ item }: { item: ImagePicker.ImagePickerAsset }) {
  return <MiniaturaFoto item={item} />;
}

export default function TelaGaleria() {
  const [fotos, setFotos] = useState<ImagePicker.ImagePickerAsset[]>([]);

  async function escolherFotos() {
    // O limite de 6 é aplicado pelo próprio picker do sistema.
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      selectionLimit: 6,
      quality: 0.7,
    });

    // Cancelou: a grade anterior continua como estava.
    if (resultado.canceled) return;
    setFotos(resultado.assets);
  }

  return (
    <View style={estilos.tela}>
      <Pressable onPress={escolherFotos} style={estilos.botao}>
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
  vazio: { fontSize: 15, color: '#666', textAlign: 'center', marginTop: 24 },
});
