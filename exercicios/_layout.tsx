// Exercício 4 — RESOLUÇÃO: o _layout.tsx com três telas
// Nível ⭐ · 5 min · em sala
//
// No sandbox: src/app/_layout.tsx

import { Stack } from 'expo-router';

export default function LayoutRaiz() {
  return (
    // Uma prop no Stack vale para TODAS as telas.
    <Stack screenOptions={{ headerTintColor: '#f26522' }}>
      {/* name é o nome do arquivo, sem extensão — "index", não "/" */}
      <Stack.Screen name="index" options={{ title: 'Meus hábitos' }} />
      {/* headerBackTitle é o texto ao lado da seta, no iOS */}
      <Stack.Screen
        name="registrar-foto"
        options={{ title: 'Foto do hábito', headerBackTitle: 'Hábitos' }}
      />
      <Stack.Screen name="sobre" options={{ title: 'Sobre o app' }} />
      {/* Rota da galeria (Exercício 2) */}
      <Stack.Screen name="galeria" options={{ title: 'Galeria de fotos' }} />
      {/* Rota da câmera (Exercício 3) */}
      <Stack.Screen name="foto-camera" options={{ title: 'Tirar foto' }} />
    </Stack>
  );
}
