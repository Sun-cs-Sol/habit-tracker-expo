# Relatório de uso de IA — Aula 6 (Navegação e fotos)

**Autor:** Ana Sofia   **Data:** 23/10/2026
**Projeto:** `habit-tracker-expo` · branch `feature/aula_06_navigation`
**Atividade:** Parte 2 — Atividades aplicadas (Atividades 1 e 2), mais a troca do `Stack` por `Tabs`

## 1. Ferramenta usada

| Item | Detalhe |
|---|---|
| Ferramenta | **Claude Code** (Anthropic), extensão do VS Code, em modo agente |
| Modelo (LLM) | **Claude Opus 5.5** (`claude-opus-5-5`) |
| Skills / plugins | Nenhum. Nenhuma skill nem plugin foi acionado nesta atividade |
| Subagentes | Nenhum. Todo o trabalho foi feito numa única sessão, sem subagentes |
| Ferramentas do agente | Terminal (git, npm, `tsc`, `expo export`), leitura e edição de arquivos, download do enunciado com `curl` |

## 2. Como a IA foi usada

Colei o enunciado da atividade e pedi que o agente fizesse a entrega. O que ele fez, em ordem:

1. **Clonou** o repositório `habit-tracker-expo` na branch `feature/aula_06_navigation`,
   baixou o `exercises.md` da disciplina e leu a Parte 2, os scaffolds em `src/app/` e as
   resoluções dos guiados em `exercicios/`.
2. **Instalou as dependências** e conferiu no `node_modules` como o `expo-router` 57 exporta o
   `Tabs`. Foi aí que viu que o `Tabs` de `expo-router` está obsoleto (o caminho atual é
   `expo-router/js-tabs`) e que o padrão do roteador de abas é `backBehavior: 'firstRoute'`.
3. **Resolveu os TODOs da Parte 2:**
   - `app.json` — textos de `photosPermission` e `cameraPermission` (TODO A2/A3);
   - `src/app/registrar-foto.tsx` — contrato de três tempos, mensagens de negada e bloqueada,
     opções tipadas, câmera, galeria, prévia e Concluir (A1.1 a A1.8);
   - `src/app/sobre.tsx` — texto da limitação (A1.9);
   - `src/app/galeria.tsx` e `src/components/miniatura-foto.tsx` — galeria de até 6 fotos em
     grade e a justificativa sobre o recorte (A2.1 a A2.6);
   - `src/screens/tela-habitos.tsx` — um `router.push` e dois `Link` para as rotas novas.
4. **Trocou o `Stack` por `Tabs`** no `src/app/_layout.tsx` e justificou a troca em comentário.
5. **Apagou** `App.tsx` e `index.ts` (passo 6 da migração).
6. **Verificou:** `npx tsc --noEmit` sem erros e `npx expo export --platform android` gerando o
   bundle sem erros.
7. **Atualizou o `README.md`** com a seção "Decisões da Aula 6" e redigiu este relatório.

## 3. Análise crítica do código gerado

### O que a IA acertou

- **Seguiu o gabarito da aula.** A lógica da tela de foto é a mesma das resoluções dos guiados
  (`exercicios/foto-camera.tsx`): `canAskAgain` separa negada de bloqueada, `canceled` é
  checado antes de `assets[0]`, e a galeria não pede permissão. Não inventou outro jeito.
- **Conferiu a API instalada antes de escrever.** Em vez de usar o `Tabs` de memória, olhou os
  `.d.ts` do pacote. Assim usou o import atual (`expo-router/js-tabs`) e percebeu que,
  sem `backBehavior="history"`, o botão Concluir levaria sempre para a primeira aba, e não para
  a aba de onde o usuário veio. Um bug assim só apareceria testando no aparelho.
- **Justificou a escolha entre Tabs e Drawer** com um critério verificável: o Drawer exige
  `react-native-gesture-handler` e `react-native-reanimated`, que o projeto não tem.
- **Seguiu as convenções do projeto:** comentários em português no mesmo tom dos scaffolds,
  `estilos`/`styles` como cada arquivo já usava, e o token `cores.primaria` do tema na tela
  inicial em vez de uma cor solta.
- **Explicou o que perdeu com a troca:** `headerBackTitle` (não existe em abas) e o estado da
  aba, que agora fica montado. As duas coisas estão no README.

### Imprecisões e limitações que identifiquei

- **Nada foi testado em aparelho.** As únicas verificações foram `tsc` e o bundle do
  `expo export`. Isso prova que o código compila e que as rotas resolvem, mas **não** prova
  que câmera negada, câmera bloqueada, cancelamento e o voltar do Android se comportam como
  descrito. Esses testes ainda precisam ser feitos no celular com o Expo Go.
- **O enunciado manda usar `headerBackTitle: 'Hábitos'`**, e a versão com Tabs não usa. Essa
  opção existe para o `Stack`. A troca de navegação pedida pelo professor torna o TODO
  inaplicável, e a IA explicou isso em comentário em vez de manter uma opção que não faria
  nada. Mesmo assim, é um desvio do texto literal do enunciado.
- **Duas permissões de câmera no `app.json`.** O plugin do `expo-camera` (Aula 5) e o do
  `expo-image-picker` (Aula 6) declaram texto de câmera, e o `infoPlist` também. Num build de
  verdade, vale o último plugin aplicado. Os textos foram escritos parecidos para não haver
  contradição, mas a duplicação continua lá.
- **Uma redundância de navegação.** Os mesmos destinos ficam na barra de abas e nos
  botões/links da tela inicial. O enunciado pede `Link` e `router.push`, então eles ficaram,
  mas numa interface com abas os atalhos na tela inicial são dispensáveis.
- **Ícones com emoji.** Funciona sem dependência nova, mas cada sistema desenha os emojis de um
  jeito. Num app de verdade, o certo seria `@expo/vector-icons`.
- **Comentários antigos.** A `tela-habitos.tsx` ainda diz que o "`expo-router` é Aula 7" e
  mantém os TODOs `5.21`/`5.22` da Aula 5, que já estavam implementados. A IA não mexeu neles
  por estarem fora do escopo da Parte 2. Isso pode confundir quem ler o arquivo.

### Grau de acerto

Comparado ao enunciado e às resoluções do professor, o código gerado cobre **todos os itens
da Parte 2** e a troca para Tabs, e compila sem erros. Avalio o acerto como **alto (cerca de
90%)**. O que falta para os 100% não é erro de código: é **validação** (ninguém rodou no
aparelho) e o desvio consciente do `headerBackTitle`. A maior contribuição da IA foi a
pesquisa na própria biblioteca instalada (import novo e `backBehavior`), mais do que escrever
as telas, que repetem de perto o gabarito dos guiados.

Revisei os arquivos alterados e as decisões descritas no README. Os testes no aparelho da
seção "Teste" do enunciado são a próxima etapa, antes de considerar a entrega validada.

## 4. Declaração

Declaro que utilizei a(s) ferramenta(s) de Inteligência Artificial **Claude Code (Anthropic),
com o modelo Claude Opus 5.5** nesta atividade, com a finalidade de gerar um rascunho sobre
**a migração do app para o Expo Router com navegação por abas (Tabs), as telas de registro de
foto (câmera e galeria com `expo-image-picker`) e a galeria de fotos de progresso**, sobre o
qual realizei análise crítica (curadoria) das informações apresentadas. Não tratei dados
pessoais no uso desta ferramenta. Revisei criticamente o conteúdo gerado, identificando seus
acertos e eventuais imprecisões, e assumo a responsabilidade integral pela versão final
apresentada.
