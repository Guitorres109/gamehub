// Etapa 1 - Inicio do projeto

// O que fazemos aqui?
// Esta é a tela inicial do App (rota "/")

import { StyleSheet, Text, View, ScrollView, FlatList, Pressable } from "react-native";

//Acesso ao objeto Router, tem a função de navegação baseada em arquivos.
import { useRouter } from "expo-router";

//Reutilizar componentes, isso evita duplicação e mentem a consistencia visual.
import GameCard from "./components/Gamecard";

//Importante array de objetos do arquivo data/jogos
import { jogos } from "./data/jogos"

//Importante array de cores do arquivo data/tema
import { cores } from "./data/tema"


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
      />
        

        {/* // -------------------------------
        // BLOCO 2.2 - SEÇÂO "MAIS POPULARES"
        // ------------------------------- */}

      <Text style={styles.secaoTitulo}>Mais Populares</Text>
      {/* Titulo da segunda seção, reaproveitando o mesmo estilo "Seção Titulo" */}

      <FlatList
        // Desta vez a fonte de dados é o array "populares" (top 5 por nota)
        data={populares}
        // Mesma logica de chave unica no id do jogo
        keyExtractor={(item) => item.id}
        // Lista horizontal, igual da seção anterior
        horizontal
        // Esconder indicador de rolagem
        showsHorizontalScrollIndicator
        // Reutiliza o mesmo componente gamecard, provando que ele funciona em qualquer lista de jogos!
        renderItem={({item}) => <GameCard jogo={item}/>}
      />

      {/* // -------------------------------
        // BLOCO 2.3 - Botão "Ver todos jogos"
        // ------------------------------- */}

        {/* Pressable oferece mais controle sobre o estilo e feedback visual */}

        <Pressable
          // Aplica um estilo visual no botão
          style={styles.botao}
          // onPress: Função executada quando o usuario toca no botão
          // router.push("./jogos") navega para a rota "/jogos"
          onPress={() => router.push("./jogos")}
        >
          <Text style={styles.textobotao}>Ver todos os jogos</Text>
        </Pressable>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: cores.fundo,
  },
  conteudo: {
    padding: 20,
    paddingBottom: 40, 
  },  
  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    color: cores.textoPrincipal
  },
  subtitulo: {
    fontSize: 15  ,
    color: cores.textoSecundario,
    marginTop: 4,
    marginBotton: 24,
  },
  secaoTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: cores.textoPrincipal,
    marginTop: 8,
    marginBottom: 12
  },
  botao: {
    backgroundColor: cores.roxo,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 24,
  },
  textobotao: {
    color: cores.textoPrincipal,
    fontSize: 16,
    fontWeight: "bold", 
  }
});
