// Atividade 1 — Tela Sobre
// Onde: src/app/sobre.tsx
//
// Requisitos:
//   1. Nome do app.
//   2. Versão da aula (Aula 6).
//   3. Declaração da limitação técnica das telas ainda não conversarem.

import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function TelaSobre() {
  const router = useRouter();

  return (
    <View style={estilos.tela}>
      <Text style={estilos.titulo}>Rastreador de Micro-hábitos</Text>
      <Text style={estilos.subtitulo}>Versão: Aula 6 (Navegação & Fotos)</Text>

      <Text style={estilos.limitacao}>
        Limitação conhecida: a foto registrada (na aba Foto ou na Galeria) não volta para
        a lista de hábitos — levar dados entre telas será implementado na próxima aula.
      </Text>

      <Pressable onPress={() => router.back()} style={estilos.botao}>
        <Text style={estilos.textoBotao}>Voltar</Text>
      </Pressable>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, padding: 24, gap: 16, justifyContent: 'center' },
  titulo: { fontSize: 22, fontWeight: '700', color: '#333' },
  subtitulo: { fontSize: 16, color: '#666' },
  limitacao: { fontSize: 14, color: '#999', fontStyle: 'italic', lineHeight: 20 },
  botao: { backgroundColor: '#f26522', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  textoBotao: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
