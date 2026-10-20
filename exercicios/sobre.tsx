// Apoio ao Exercício 4 — a tela "sobre" que o enunciado pede para criar.
// No sandbox: src/app/sobre.tsx. Endereço: /sobre.

import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function TelaSobre() {
  const router = useRouter();

  return (
    <View style={estilos.tela}>
      <Text style={estilos.texto}>Rastreador de Micro-hábitos — versão da Aula 6.</Text>
      <Pressable onPress={() => router.back()} style={estilos.botao}>
        <Text style={estilos.textoBotao}>Voltar</Text>
      </Pressable>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, padding: 24, gap: 16, justifyContent: 'center' },
  texto: { fontSize: 16 },
  botao: { backgroundColor: '#f26522', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  textoBotao: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
