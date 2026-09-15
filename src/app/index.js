// Etapa 1 - Inicio do projeto

// O que fazemos aqui?
// Esta é a tela inicial do App (rota "/")

import { useRouter } from "expo-router"; //Acesso ao objeto Router, tem a função de navegação baseada em arquivos.

import GameCard from "./components/Gamecard"; //Reutilizar componentes, isso evita duplicação e mentem a consistencia visual.

import { jogos } from "./data/jogos" //Importante array de objetos do arquivo data/jogos

import { cores } from "./data/tema"

import { StyleSheet, Text, View, ScrollView, FlatList, Pressable } from "react-native";

// View: Container basicos
// Text: Para exibir textos
// scrollView: Permitir rolagem vertical
// Flatlist: Lista otimizada com rolagem
// Pressable: Botão de feedback de toque

export default function Inicio() {

  // -------------------------------
  // BLOCO 1 - OBTENÇÂO DE DADOS
  // -------------------------------

  // Obtemos o objeto de navegação
  const router = useRouter()

  // Percorre o array de jogos e cria um novo array destaques contendo apenas os objetos cuja o campo "destaque" seja true.
  const destaques = jogos.filter((jogo) => jogo.destaque)
  
  // ...jogos -> Cria uma cópia do array original
  // sort ((a, b) => b.nota - a.nota) ordena a copia da maior para a menor
  // .slice(0, 5): Extrai apenas os 5 primeiros elementos do array
  const populares = [...jogos].sort((a, b) => b.nota - a.nota).slice(0, 5)

  // -------------------------------
  // BLOCO 2 - ESTRUTURA DA TELA
  // -------------------------------

  return (
    // Inicio do JSX retornando pelo componente: defie o que será rendenizado na tela
    // ScrollView - Container com rolagem vertical
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
      {/* Exibe o texto "Gamehub" como titulo usando o estilo "titulo" */}
      <Text style={styles.titulo}>Gamehub</Text>
      {/* Define o titulo desta seção, usando o estlo "secaotitulo" */}
      <Text style={styles.subtitulo}>Seu universo de jogos em um só lugar</Text>

      {/* // -------------------------------
      // BLOCO 2.1 - SEÇÂO DE JOGOS
      // ------------------------------- */}

      <FlatList
        // Define a fonte de dados da lista - array "destaques"
        data={destaques}
        // Função que retorna uma chave única
        keyExtractor={(item) => item.id}
        // Faz a lista rolar
        horizontal
        // Oculta a barrinha de rolagem horizontal, deixando a interface mais limpa
        showsVerticalScrollIndicator={false}
        // Função chamada para cada elemento do array "data"
        renderItem={(item) => <GameCard jogo={item}/>}
      >
        
        {/* // -------------------------------
        // BLOCO 2.2 - SEÇÂO "MAIS POPULARES"
        // ------------------------------- */}

      </FlatList>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  titulo: {
    fontSize: 35,
    fontWeight: "bold",
  },
  subtitulo: {
    fontSize: 20  ,
    color: "#38434D",
  },
});
