// Tela inicial do sandbox para navegar pelas resoluções dos exercícios guiados da Aula 6.
// No sandbox: src/app/index.tsx

import { Link, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function TelaInicialGuiadosResolvidos() {
  const router = useRouter();

  return (
    <View style={estilos.tela}>
      <Text style={estilos.titulo}>Resoluções dos Guiados — Aula 6</Text>

      {/* Link direto para a tela de registrar foto */}
      <Link href="/registrar-foto" asChild>
        <Pressable style={estilos.botao}>
          <Text style={estilos.textoBotao}>Ex 1: Escolher da galeria</Text>
        </Pressable>
      </Link>

      {/* Navegação imperativa com router.push para a galeria */}
      <Pressable onPress={() => router.push('/galeria')} style={estilos.botao}>
        <Text style={estilos.textoBotao}>Ex 2: Galeria múltipla</Text>
      </Pressable>

      {/* Link para a câmera */}
      <Link href="/foto-camera" asChild>
        <Pressable style={estilos.botao}>
          <Text style={estilos.textoBotao}>Ex 3: Câmera com 3 estados</Text>
        </Pressable>
      </Link>

      {/* Link de texto simples para a tela sobre */}
      <Link href="/sobre" style={estilos.link}>
        Ex 4: Sobre o app
      </Link>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, padding: 24, gap: 16, justifyContent: 'center' },
  titulo: { fontSize: 20, fontWeight: '700', marginBottom: 12, color: '#333' },
  link: { fontSize: 16, color: '#f26522', textDecorationLine: 'underline', textAlign: 'center' },
  botao: { backgroundColor: '#f26522', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  textoBotao: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
