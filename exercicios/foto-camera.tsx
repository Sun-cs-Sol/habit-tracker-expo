// Exercício 3 — RESOLUÇÃO: a câmera com os três estados (casa)
// Nível ⭐⭐⭐ · 15 min
//
// No sandbox: src/app/foto-camera.tsx.
// Precisa de APARELHO FÍSICO: o iOS Simulator não tem câmera.

import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';

type Falha = 'camera-negada' | 'camera-bloqueada';

// Duas mensagens DIFERENTES, cada uma dizendo ao usuário o que ELE pode fazer.
// A bloqueada explica o caminho nas Configurações; as duas lembram da galeria.
const MENSAGENS: Record<Falha, string> = {
  'camera-negada':
    'Precisamos da câmera para registrar a foto do seu hábito. Toque em "Tirar foto" de novo para autorizar — ou escolha uma foto da galeria.',
  'camera-bloqueada':
    'A câmera está bloqueada para este app. Para liberar, abra Ajustes → Rastreador de Hábitos → Câmera. Enquanto isso, escolha uma foto da galeria.',
};

// Opções declaradas uma única vez, tipadas, para usar na câmera e na galeria.
const OPCOES: ImagePicker.ImagePickerOptions = {
  mediaTypes: ['images'],
  allowsEditing: true,
  aspect: [4, 3],
  quality: 0.7,
};

export default function TelaFotoCamera() {
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [falha, setFalha] = useState<Falha | null>(null);

  async function tirarFoto() {
    setFalha(null);

    // Pede permissão de câmera. canAskAgain separa a negada da bloqueada.
    const permissao = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissao.granted) {
      setFalha(permissao.canAskAgain ? 'camera-negada' : 'camera-bloqueada');
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync(OPCOES);
    if (resultado.canceled) return;
    setFotoUri(resultado.assets[0].uri);
  }

  async function escolherDaGaleria() {
    setFalha(null);
    // Galeria do sistema não precisa de permissão prévia.
    const resultado = await ImagePicker.launchImageLibraryAsync(OPCOES);
    if (resultado.canceled) return;
    setFotoUri(resultado.assets[0].uri);
  }

  return (
    <View style={estilos.tela}>
      {fotoUri ? (
        <Image
          source={{ uri: fotoUri }}
          style={estilos.previa}
          contentFit="cover"
          transition={300}
        />
      ) : (
        <View style={[estilos.previa, estilos.semFoto]}>
          <Text>Nenhuma foto ainda</Text>
        </View>
      )}

      <Pressable onPress={tirarFoto} style={estilos.botao}>
        <Text style={estilos.textoBotao}>Tirar foto</Text>
      </Pressable>

      <Pressable onPress={escolherDaGaleria} style={estilos.botaoSecundario}>
        <Text style={estilos.textoBotaoSecundario}>Escolher da galeria</Text>
      </Pressable>

      {falha && <Text style={estilos.erro}>{MENSAGENS[falha]}</Text>}
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, padding: 24, gap: 16 },
  previa: { width: '100%', aspectRatio: 4 / 3, borderRadius: 12 },
  semFoto: { backgroundColor: '#eee', alignItems: 'center', justifyContent: 'center' },
  botao: { backgroundColor: '#f26522', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  textoBotao: { color: '#fff', fontWeight: '700', fontSize: 16 },
  botaoSecundario: { borderWidth: 2, borderColor: '#f26522', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  textoBotaoSecundario: { color: '#f26522', fontWeight: '700', fontSize: 16 },
  erro: { fontSize: 15, color: '#b00020' },
});
