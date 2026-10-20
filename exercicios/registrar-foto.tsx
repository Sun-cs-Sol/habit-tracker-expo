// Exercício 1 — RESOLUÇÃO: o botão "Escolher da galeria"
// Nível ⭐⭐ · 7 min · em sala
//
// No sandbox: src/app/registrar-foto.tsx
// Roda no simulador — a galeria do sistema não precisa de aparelho físico.

import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

export default function TelaRegistrarFoto() {
  const router = useRouter();
  const [fotoUri, setFotoUri] = useState<string | null>(null);

  async function escolherDaGaleria() {
    // Só imagens, recorte 4:3, qualidade 0.7.
    // Precisa pedir permissão antes? Não: quem mostra as fotos é o sistema,
    // e o app só recebe a que o usuário escolheu.
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    // Se o usuário cancelou, saia sem mexer em nada.
    if (resultado.canceled) return;

    // Guarda o uri da foto escolhida (resultado.assets é uma lista).
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

      <Pressable onPress={escolherDaGaleria} style={estilos.botao}>
        <Text style={estilos.textoBotao}>Escolher da galeria</Text>
      </Pressable>

      <Pressable
        onPress={() => router.back()}
        disabled={!fotoUri}
        style={[estilos.botao, !fotoUri && estilos.desligado]}
      >
        <Text style={estilos.textoBotao}>Concluir</Text>
      </Pressable>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, padding: 24, gap: 16 },
  previa: { width: '100%', aspectRatio: 4 / 3, borderRadius: 12 },
  semFoto: { backgroundColor: '#eee', alignItems: 'center', justifyContent: 'center' },
  botao: { backgroundColor: '#f26522', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  desligado: { opacity: 0.4 },
  textoBotao: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
