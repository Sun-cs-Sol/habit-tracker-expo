import { useState } from 'react';
import { SectionList, StyleSheet, Text, TextInput, View } from 'react-native';
import { Link, useRouter } from 'expo-router';

import { BotaoAcao } from '../components/botao-acao';
import { ItemHabito } from '../components/item-habito';
import { ListaVazia } from '../components/lista-vazia';
import { HABITOS } from '../data/habitos';
import { agrupar, filtrarPorTitulo, type Secao } from '../lib/agrupar';
import { cores, espaco, tipografia } from '../theme';
import type { Habito } from '../types/habito';
import { TelaRegistrarHabito } from './tela-registrar-habito';

function Cabecalho({ busca, onBuscaChange }: { busca: string; onBuscaChange: (busca: string) => void; }) {
  return (
    <TextInput
      style={styles.busca}
      placeholder="Buscar hábito"
      value={busca}
      onChangeText={onBuscaChange}
    />
  );
}

export function TelaHabitos() {
  const router = useRouter();
  const [habitos, setHabitos] = useState<Habito[]>(HABITOS);
  const [busca, setBusca] = useState('');
  const [atualizando, setAtualizando] = useState(false);
  // Aula 5 — a tela de registro aparece por CONDICIONAL, não por navegação
  // (`expo-router` é Aula 7). Este booleano é a "navegação" que temos.
  const [registrando, setRegistrando] = useState(false);

  function alternar(id: string) {
    setHabitos((prev) =>
      prev.map((h) =>
        h.id === id
          ? { ...h, status: h.status === 'pendente' ? 'concluido' : 'pendente' }
          : h
      )
    );
  }

  function remover(id: string) {
    setHabitos((prev) => prev.filter((h) => h.id !== id));
  }

  function recarregar() {
    setAtualizando(true);

    // Recarregar volta ao mock, mas NÃO joga fora o que o usuário registrou: um hábito
    // que custou duas permissões não pode sumir no primeiro puxão de tela. Os
    // registrados são os que não estão no mock — os do topo continuam no topo.
    setHabitos((prev) => {
      const idsDoMock = new Set(HABITOS.map((h) => h.id));
      const registrados = prev.filter((h) => !idsDoMock.has(h.id));
      return [...registrados, ...HABITOS];
    });

    setBusca('');
    setAtualizando(false);
  }

  function adicionar(novo: Habito) {
    // TODO 5.22: acrescente o hábito recém-registrado à lista — array NOVO, como na
    //           Aula 4 — e feche a tela de registro.
    //           Pense em onde ele deve entrar: no fim da lista o usuário não vê o
    //           resultado do que acabou de fazer sem rolar até lá.
    //           ⚠️ Depois de implementar, TESTE o "puxar para atualizar": do jeito que
    //           `recarregar()` está escrito hoje, o hábito que custou duas permissões ao
    //           usuário some no primeiro puxão. Decida o que fazer a respeito.

    // Array NOVO, como na Aula 4 — nunca `push` no anterior. E ele entra no TOPO: no fim
    // da lista o usuário teria que rolar para ver o resultado do que acabou de fazer.
    setHabitos((prev) => [novo, ...prev]);
    // A busca antiga pode esconder justamente o hábito recém-criado.
    setBusca('');
    setRegistrando(false);
  }

  const secoes = agrupar(filtrarPorTitulo(habitos, busca));


  // TODO 5.21: quando `registrando` for true, devolva a <TelaRegistrarHabito /> no lugar
  //           da lista — é assim que se troca de tela sem navegação (Aula 7).
  //           Ela precisa de duas funções: o que fazer com o hábito salvo (`adicionar`)
  //           e o que fazer no cancelamento.
  //           Enquanto ela NÃO está montada, a câmera do aparelho está desligada.

  // Troca de tela sem navegação: `expo-router` é Aula 7, e até lá este booleano é a
  // "navegação" que temos. Enquanto a tela de registro NÃO está montada, a câmera do
  // aparelho está desligada.
  if (registrando) {
    return (
      <TelaRegistrarHabito onSalvar={adicionar} onCancelar={() => setRegistrando(false)} />
    );
  }

  return (
    <View style={styles.tela}>
      <SectionList
        sections={secoes}
        renderItem={({ item }) => (
          <ItemHabito
            habito={item}
            onAlternar={alternar}
            onRemover={remover}
          />
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.cabecalhoSecao}>{section.title}</Text>
        )}
        ItemSeparatorComponent={() => <View style={styles.separador} />}
        ListEmptyComponent={() => <ListaVazia primeiroAcesso={false} onLimparBusca={recarregar} />}
        stickySectionHeadersEnabled
        refreshing={atualizando}
        onRefresh={recarregar}
        ListHeaderComponent={<Cabecalho busca={busca} onBuscaChange={setBusca} />}
        contentContainerStyle={styles.conteudo}
      />
      <View style={styles.rodape}>
        <BotaoAcao rotulo="Novo hábito" onPressionar={() => setRegistrando(true)} />
        {/* router.push: é uma AÇÃO disparada pelo botão reutilizável da Aula 4, que só
            sabe receber um onPressionar — não dá para embrulhá-lo num Link. */}
        <BotaoAcao rotulo="Foto do hábito" onPressionar={() => router.push('/registrar-foto')} />
        {/* Link: são DESTINOS fixos, declarados no JSX como um endereço. */}
        <View style={styles.links}>
          <Link href="/galeria" style={styles.link}>Galeria de progresso</Link>
          <Link href="/sobre" style={styles.link}>Sobre o app</Link>
        </View>
      </View>
    </View>
  );
}

export default TelaHabitos;

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo, borderRadius: espaco.lg },
  conteudo: { padding: espaco.md, paddingBottom: espaco.lg },
  busca: {
    borderWidth: 1,
    borderColor: cores.textoFraco,
    borderRadius: espaco.sm,
    padding: espaco.sm,
    marginBottom: espaco.sm,
    backgroundColor: cores.cartao,
    fontSize: 16,
  },
  cabecalhoSecao: {
    ...tipografia.legenda,
    fontWeight: '700',
    textTransform: 'uppercase',
    backgroundColor: cores.fundo,
    paddingVertical: espaco.sm,
  },
  separador: { height: espaco.sm },
  rodape: { padding: espaco.md, gap: espaco.sm },
  links: { flexDirection: 'row', justifyContent: 'space-around' },
  link: { fontSize: 16, color: cores.primaria, textDecorationLine: 'underline' },
});
