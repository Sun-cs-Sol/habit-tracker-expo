// Atividades 1 e 2 — Layout Raiz
// Onde: src/app/_layout.tsx
//
// Troca do Stack por Tabs: as quatro rotas estáticas (/, /registrar-foto, /galeria e
// /sobre) viram abas irmãs na barra inferior. Os nomes continuam sendo o nome do arquivo
// sem a extensão — "index", não "/".
//
// Por que Tabs e não Drawer: o Drawer do Expo Router exige react-native-gesture-handler
// e react-native-reanimated, que este projeto não tem; o Tabs já vem dentro do
// expo-router. Com quatro destinos, a barra inferior deixa todos a um toque e visíveis.
//
// O que mudou em relação ao Stack:
//   - `headerBackTitle: 'Hábitos'` saiu: entre abas não há pilha nem seta de voltar,
//     então a opção nem existe no tipo das opções do Tabs.
//   - `backBehavior="history"`: o padrão do Tabs é voltar para a PRIMEIRA aba. Com
//     "history", o router.back() do "Concluir" e o voltar do Android retornam para a aba
//     de onde o usuário veio — o mesmo contrato que a tela tinha no Stack.

import { Text } from 'react-native';
import { Tabs } from 'expo-router/js-tabs';

const LARANJA = '#f26522';

function icone(emoji: string) {
  return ({ focused }: { focused: boolean }) => (
    <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>{emoji}</Text>
  );
}

export default function LayoutRaiz() {
  return (
    <Tabs
      backBehavior="history"
      screenOptions={{ headerTintColor: LARANJA, tabBarActiveTintColor: LARANJA }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Meus hábitos', tabBarLabel: 'Hábitos', tabBarIcon: icone('✅') }}
      />
      <Tabs.Screen
        name="registrar-foto"
        options={{ title: 'Foto do hábito', tabBarLabel: 'Foto', tabBarIcon: icone('📷') }}
      />
      <Tabs.Screen
        name="galeria"
        options={{ title: 'Galeria do hábito', tabBarLabel: 'Galeria', tabBarIcon: icone('🖼️') }}
      />
      <Tabs.Screen
        name="sobre"
        options={{ title: 'Sobre o app', tabBarLabel: 'Sobre', tabBarIcon: icone('ℹ️') }}
      />
    </Tabs>
  );
}
